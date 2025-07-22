// 🎨 Light/Dark Mode Toggle
const themeBtn = document.createElement('button');
themeBtn.innerHTML = '🌙';
themeBtn.className = 'theme-toggle';
themeBtn.style.position = 'fixed';
themeBtn.style.top = '24px';
themeBtn.style.right = '32px';
themeBtn.style.zIndex = '99';
themeBtn.style.fontSize = '1.5rem';
themeBtn.style.background = 'none';
themeBtn.style.border = 'none';
themeBtn.style.cursor = 'pointer';
document.body.appendChild(themeBtn);

themeBtn.onclick = () => {
    document.body.classList.toggle('light-mode');
    themeBtn.innerHTML = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
};

// Thêm CSS cho light mode
const style = document.createElement('style');
style.innerHTML = `
body.light-mode {
    background: linear-gradient(135deg, #eeeeee 0%, #d1faff 100%);
    color: #232526;
}
body.light-mode .container {
    background: #fff;
    border-color: #00ffff;
}
body.light-mode h1, body.light-mode h2, body.light-mode .job-title, body.light-mode .project-title {
    color: #00cccc !important;
}
body.light-mode .about, body.light-mode .skills, body.light-mode .contact, body.light-mode .projects {
    background: #e6f7ff !important;
}
body.light-mode .project-card {
    background: #f8ffff !important;
}
body.light-mode .project-btn {
    background: #00cccc !important;
    color: #fff !important;
}
`;
document.head.appendChild(style);

// 🟢 Typing effect cho tiêu đề "Game Developer" (chỉ chạy 1 lần khi load)
function typingEffect() {
    const jobTitle = document.getElementById('job-title');
    if (!jobTitle) return;
    // Lấy text sau icon nếu có
    let text = jobTitle.textContent.replace(/^\s+|\s+$/g, '');
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
// Chỉ chạy khi load lần đầu
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', typingEffect);
} else {
    typingEffect();
}

// 📊 Skill bar animation khi cuộn tới
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

// 💫 Hover Glow Animation cho nút và icon (CSS đã làm tốt, chỉ thêm click effect)
document.querySelectorAll('.project-btn, .social a').forEach(el => {
    el.addEventListener('click', e => {
        el.classList.add('clicked');
        setTimeout(() => el.classList.remove('clicked'), 300);
    });
});

// Thêm CSS cho click effect
const clickStyle = document.createElement('style');
clickStyle.innerHTML = `
.clicked {
    box-shadow: 0 0 16px #00ffff99, 0 0 8px #ff2d55;
    transform: scale(1.12);
}
`;
document.head.appendChild(clickStyle);

// 📅 Hiển thị năm hiện tại tự động ở cuối trang
const yearDiv = document.createElement('div');
yearDiv.style.textAlign = 'center';
yearDiv.style.margin = '18px 0 8px 0';
yearDiv.style.color = 'var(--main)';
yearDiv.style.fontFamily = "'Orbitron', 'Oxanium', Arial, sans-serif";
yearDiv.style.fontSize = '1rem';
yearDiv.innerHTML = `&copy; ${new Date().getFullYear()} | Thời gian: <span id="nowTime"></span>`;
document.body.appendChild(yearDiv);

// Hiển thị thời gian thực
function updateTime() {
    const now = new Date();
    document.getElementById('nowTime').textContent =
        now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
setInterval(updateTime, 1000);
updateTime();

// Đồng hồ đếm số ngày code (ví dụ bắt đầu từ 2023-01-17)
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