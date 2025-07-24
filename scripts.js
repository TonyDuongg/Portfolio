// === THEME TOGGLE (Light/Dark Mode) ===
(function () {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;
    function updateIcon() {
        themeBtn.innerHTML = document.body.classList.contains('light-mode')
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    }
    themeBtn.onclick = () => {
        document.body.classList.toggle('light-mode');
        updateIcon();
    };
    updateIcon();
})();

// === ENTRY ANIMATION & SCROLL REVEAL (AOS) ===
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => document.body.classList.add('page-show'), 180);
    const reveals = document.querySelectorAll('.about, .skills, .contact, .quick-block, .avatar, .social, .job-title-btn');
    function revealOnScroll() {
        reveals.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) el.classList.add('reveal');
            else el.classList.remove('reveal');
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});

// === TYPING EFFECT FOR JOB TITLE & QUOTE ===
(function () {
    function typeText(el, text, speed = 48) {
        if (!el || !text) return;
        el.textContent = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                el.textContent += text[i++];
                setTimeout(type, speed);
            }
        }
        type();
    }
    window.addEventListener('DOMContentLoaded', () => {
        const jobEl = document.getElementById('job-title-btn');
        const jobText = jobEl ? jobEl.getAttribute('data-typed') : '';
        if (jobEl && jobText) typeText(jobEl, jobText, 36);

        const quoteEl = document.getElementById('quick-quote');
        const quote = quoteEl ? quoteEl.getAttribute('data-typed') : '';
        if (quoteEl && quote) typeText(quoteEl, quote, 28);
    });
})();

// === AVATAR GLOW EFFECT ON HOVER ===
(function () {
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.addEventListener('mouseenter', () => {
            avatar.style.boxShadow = '0 0 0 12px #fffbe6, 0 10px 28px #ffe18e99';
            avatar.style.transform = 'scale(1.08) rotate(-2deg)';
        });
        avatar.addEventListener('mouseleave', () => {
            avatar.style.boxShadow = '';
            avatar.style.transform = '';
        });
    }
})();

// === SOUND EFFECT WHEN CLICK BUTTON/SOCIAL ICON (nhẹ nhàng) ===
(function () {
    const soundUrl = "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa8bdb.mp3";
    const audio = new Audio(soundUrl);
    audio.volume = 0.12;
    function playSound() {
        audio.currentTime = 0;
        audio.play();
    }
    document.querySelectorAll('.project-btn, .social a, .cta-btn, .theme-toggle')
        .forEach(el => el.addEventListener('click', playSound));
})();

// === DAYS CODING COUNTER ===
(function () {
    function updateDaysCount() {
        const startDate = new Date('2023-01-17');
        const now = new Date();
        const diff = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
        const daysCount = document.getElementById('days-count');
        if (daysCount) daysCount.textContent = diff + ' days';
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateDaysCount);
    } else {
        updateDaysCount();
    }
})();

// === SCROLL TO SKILLS SECTION WHEN CLICK SKILL ===
document.querySelectorAll('.skill-scroll').forEach(el => {
    el.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.getElementById('skills');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            target.style.boxShadow = '0 0 0 4px #e2c378, 0 0 22px #ffd25699';
            setTimeout(() => target.style.boxShadow = '', 800);
        }
    });
});

(function() {
    const audio = document.getElementById('bg-music');
    const btn = document.getElementById('music-play-btn');
    const progress = document.getElementById('music-progress');
    const cur = document.getElementById('music-current-time');
    const dur = document.getElementById('music-duration');
    let isPlaying = false;

    if (!audio || !btn || !progress) return;

    // Cập nhật time format
    function formatTime(t) {
        t = Math.floor(t);
        const m = Math.floor(t / 60);
        const s = t % 60;
        return m + ':' + (s < 10 ? '0' + s : s);
    }

    // Khi nhạc load xong
    audio.addEventListener('loadedmetadata', () => {
        progress.max = Math.floor(audio.duration);
        dur.textContent = '/ ' + formatTime(audio.duration);
    });

    // Khi nhấn play/pause
    btn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    // Đổi icon khi play/pause
    audio.addEventListener('play', function() {
        btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        isPlaying = true;
    });
    audio.addEventListener('pause', function() {
        btn.innerHTML = '<i class="fa-solid fa-play"></i>';
        isPlaying = false;
    });

    // Khi kéo seekbar
    progress.addEventListener('input', function() {
        audio.currentTime = progress.value;
    });

    // Update progress bar/time khi chạy
    audio.addEventListener('timeupdate', function() {
        progress.value = Math.floor(audio.currentTime);
        cur.textContent = formatTime(audio.currentTime);
        // (Có thể cập nhật hiệu ứng nếu muốn)
    });

    // Khi hết bài thì reset
    audio.addEventListener('ended', function() {
        btn.innerHTML = '<i class="fa-solid fa-play"></i>';
        progress.value = 0;
        cur.textContent = '0:00';
    });
})();

