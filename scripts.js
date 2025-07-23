// === THEME TOGGLE (Light/Dark Mode) ===
(function() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;
    function updateIcon() {
        themeBtn.innerHTML = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
    }
    themeBtn.onclick = () => {
        document.body.classList.toggle('light-mode');
        updateIcon();
    };
    updateIcon();
})();

// === TYPING EFFECT FOR JOB TITLE (only on first load) ===
(function() {
    function typingEffect() {
        const jobTitle = document.getElementById('job-title');
        if (!jobTitle) return;
        let text = jobTitle.textContent.trim();
        if (jobTitle.querySelector('i')) {
            text = jobTitle.childNodes[jobTitle.childNodes.length - 1].textContent.trim();
        }
        jobTitle.innerHTML = '<i class="fa-solid fa-gamepad"></i> ';
        let i = 0;
        function type() {
            if (i < text.length) {
                jobTitle.innerHTML = '<i class="fa-solid fa-gamepad"></i> ' + text.slice(0, i + 1);
                i++;
                setTimeout(type, 60);
            }
        }
        type();
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', typingEffect);
    } else {
        typingEffect();
    }
})();

// === SKILL BAR ANIMATION ON SCROLL ===
(function() {
    function animateSkillBars() {
        document.querySelectorAll('.progress').forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 40) {
                bar.style.width = bar.getAttribute('style').match(/width:\s*([\d.]+%)/)[1];
                bar.style.transition = 'width 1s cubic-bezier(.68,-0.55,.27,1.55)';
            } else {
                bar.style.width = '0';
            }
        });
    }
    window.addEventListener('scroll', animateSkillBars);
    window.addEventListener('load', animateSkillBars);
})();

// === CLICK EFFECT FOR BUTTONS & ICONS ===
(function() {
    document.querySelectorAll('.project-btn, .social a').forEach(el => {
        el.addEventListener('click', () => {
            el.classList.add('clicked');
            setTimeout(() => el.classList.remove('clicked'), 300);
        });
    });
    // Add click effect CSS
    const clickStyle = document.createElement('style');
    clickStyle.innerHTML = `.clicked { box-shadow: 0 0 16px #00ffff99, 0 0 8px #ff2d55; transform: scale(1.12); }`;
    document.head.appendChild(clickStyle);
})();

// === FOOTER: CURRENT YEAR & LIVE TIME ===
(function() {
    const yearDiv = document.createElement('div');
    yearDiv.style.textAlign = 'center';
    yearDiv.style.margin = '18px 0 8px 0';
    yearDiv.style.color = 'var(--main)';
    yearDiv.style.fontFamily = "'Orbitron', 'Oxanium', Arial, sans-serif";
    yearDiv.style.fontSize = '1rem';
    yearDiv.innerHTML = `&copy; ${new Date().getFullYear()} | Thời gian: <span id="nowTime"></span>`;
    document.body.appendChild(yearDiv);
    function updateTime() {
        const now = new Date();
        document.getElementById('nowTime').textContent =
            now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    setInterval(updateTime, 1000);
    updateTime();
})();

// === DAYS CODING COUNTER ===
(function() {
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