(() => {
    const root = document.documentElement;
    const body = document.body;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const safeStorage = {
        get(key) {
            try {
                return window.localStorage.getItem(key);
            } catch (_) {
                return null;
            }
        },
        set(key, value) {
            try {
                window.localStorage.setItem(key, value);
            } catch (_) {
                // The site still works when storage is disabled.
            }
        }
    };

    function applyTheme(theme) {
        root.dataset.theme = theme;
        const toggle = document.querySelector('.theme-toggle');
        if (!toggle) return;
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        toggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
        toggle.setAttribute('title', `Switch to ${nextTheme} theme`);
        document.querySelector('meta[name="theme-color"]')?.setAttribute(
            'content',
            theme === 'light' ? '#f3efe7' : '#071521'
        );
    }

    const savedTheme = safeStorage.get('tonyd-theme');
    const initialTheme = savedTheme || 'dark';
    applyTheme(initialTheme);

    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
        const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
        applyTheme(nextTheme);
        safeStorage.set('tonyd-theme', nextTheme);
    });

    const header = document.querySelector('[data-header]');
    const navToggle = document.querySelector('.nav-toggle');
    const primaryNav = document.querySelector('.primary-nav');

    function setMenu(open) {
        if (!header || !navToggle) return;
        header.classList.toggle('menu-open', open);
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    }

    navToggle?.addEventListener('click', () => {
        setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    primaryNav?.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setMenu(false);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 760) setMenu(false);
    });

    function updateHeader() {
        header?.classList.toggle('scrolled', window.scrollY > 18);
    }

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    body.classList.add('motion-ready');
    const revealItems = document.querySelectorAll('.reveal, .process-header');

    if ('IntersectionObserver' in window && !reduceMotion.matches) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    if (body.dataset.page === 'home') {
        const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
        const sections = navLinks
            .map((link) => document.querySelector(link.getAttribute('href')))
            .filter(Boolean);

        let activeNavFrame = 0;
        const updateActiveNav = () => {
            activeNavFrame = 0;
            const readingLine = window.scrollY + Math.min(window.innerHeight * 0.36, 360);
            let currentSection = null;

            sections.forEach((section) => {
                if (section.offsetTop <= readingLine) currentSection = section;
            });

            const atPageEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
            if (atPageEnd) currentSection = sections.at(-1);

            navLinks.forEach((link) => {
                link.classList.toggle(
                    'active',
                    Boolean(currentSection) && link.getAttribute('href') === `#${currentSection.id}`
                );
            });
        };

        window.addEventListener('scroll', () => {
            if (!activeNavFrame) activeNavFrame = window.requestAnimationFrame(updateActiveNav);
        }, { passive: true });
        window.addEventListener('resize', updateActiveNav);
        updateActiveNav();
    }

    const parallax = document.querySelector('[data-parallax]');
    if (parallax && !reduceMotion.matches && window.matchMedia('(pointer: fine)').matches) {
        parallax.addEventListener('pointermove', (event) => {
            const bounds = parallax.getBoundingClientRect();
            const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
            const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;
            parallax.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });

        parallax.addEventListener('pointerleave', () => {
            parallax.style.transform = 'translate3d(0, 0, 0)';
        });
    }

    const audioPlayer = document.querySelector('[data-audio-player]');
    if (audioPlayer) {
        const audio = audioPlayer.querySelector('[data-audio]');
        const toggle = audioPlayer.querySelector('[data-audio-toggle]');
        const progress = audioPlayer.querySelector('[data-audio-progress]');
        const time = audioPlayer.querySelector('[data-audio-time]');

        const formatTime = (value) => {
            if (!Number.isFinite(value)) return '0:00';
            const minutes = Math.floor(value / 60);
            const seconds = Math.floor(value % 60).toString().padStart(2, '0');
            return `${minutes}:${seconds}`;
        };

        const updateAudioState = () => {
            const isPlaying = !audio.paused;
            audioPlayer.classList.toggle('playing', isPlaying);
            toggle.setAttribute('aria-label', isPlaying ? 'Pause coding track' : 'Play coding track');
        };

        audio.addEventListener('loadedmetadata', () => {
            progress.max = Number.isFinite(audio.duration) ? audio.duration : 0;
        });

        audio.addEventListener('timeupdate', () => {
            progress.value = audio.currentTime;
            time.textContent = formatTime(audio.currentTime);
        });

        audio.addEventListener('play', updateAudioState);
        audio.addEventListener('pause', updateAudioState);
        audio.addEventListener('ended', () => {
            audio.currentTime = 0;
            updateAudioState();
        });

        toggle.addEventListener('click', async () => {
            if (audio.paused) {
                try {
                    await audio.play();
                } catch (_) {
                    updateAudioState();
                }
            } else {
                audio.pause();
            }
        });

        progress.addEventListener('input', () => {
            audio.currentTime = Number(progress.value);
        });
    }

    const filterButtons = [...document.querySelectorAll('[data-filter]')];
    const archiveRows = [...document.querySelectorAll('[data-category]')];

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            filterButtons.forEach((item) => {
                const selected = item === button;
                item.classList.toggle('active', selected);
                item.setAttribute('aria-pressed', String(selected));
            });

            archiveRows.forEach((row) => {
                const show = filter === 'all' || row.dataset.category === filter;
                row.hidden = !show;
                if (!show) row.querySelector('details')?.removeAttribute('open');
            });
        });
    });

    document.querySelectorAll('[data-year]').forEach((element) => {
        element.textContent = new Date().getFullYear();
    });
})();
