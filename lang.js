// === LANGUAGE SWITCHER ===
(function() {
    function setLang(lang) {
        document.getElementById('name').textContent = lang === 'vi' ? 'Nguyễn Hải Dương' : 'Nguyen Hai Duong';
        const jobTitle = document.getElementById('job-title-btn');
        jobTitle.innerHTML = `<i class="fa-solid fa-gamepad"></i> ${lang === 'vi' ? 'Lập trình viên Game' : 'Game Developer'}`;
        document.getElementById('about-title').textContent = lang === 'vi' ? 'Giới thiệu' : 'About';
        document.getElementById('skills-title').textContent = lang === 'vi' ? 'Kỹ năng' : 'Skills';
        document.getElementById('projects-title').textContent = lang === 'vi' ? 'Dự án' : 'Projects';
        document.getElementById('contact-title').textContent = lang === 'vi' ? 'Liên hệ' : 'Contact';
        document.getElementById('email-label').innerHTML = (lang === 'vi' ? 'Email: ' : 'Email: ') + '<a href="mailto:nguyenhaiduong052005@gmail.com">nguyenhaiduong052005@gmail.com</a>';
        document.getElementById('phone-label').innerHTML = (lang === 'vi' ? 'Điện thoại: ' : 'Phone: ') + '<a href="tel:0374264592">0374264592</a>';
        document.getElementById('about-content').innerHTML = lang === 'vi'
            ? `- Tôi là một lập trình viên game đầy đam mê và sáng tạo, luôn nỗ lực biến ý tưởng thành hiện thực.<br>
               - Tôi xem thử thách là cơ hội để phát triển và đổi mới.<br>
               - Mục tiêu của tôi là tạo ra những trải nghiệm độc đáo, truyền cảm hứng cho người chơi.<br>
               - Tôi tin vào việc học hỏi suốt đời, hợp tác và tạo ra giá trị tích cực qua công nghệ.`
            : `- I am a passionate and creative game developer, always striving to turn ideas into reality.<br>
               - I embrace challenges as opportunities to grow and innovate.<br>
               - My goal is to craft unique experiences that inspire and delight players.<br>
               - I believe in lifelong learning, collaboration, and making a positive impact through technology.`;
        document.getElementById('quick-quote').textContent = lang === 'vi' ? 'Ước mơ chỉ thành hiện thực khi bạn hành động' : 'Dreams only become reality when you take action';
        document.querySelectorAll('.skill-name').forEach(e => {
            e.textContent = e.getAttribute('data-' + lang);
        });
        document.querySelectorAll('.project-title').forEach(e => {
            e.textContent = e.getAttribute('data-' + lang);
        });
        document.querySelectorAll('.project-desc').forEach(e => {
            e.textContent = e.getAttribute('data-' + lang);
        });
        document.querySelectorAll('.project-btn').forEach(e => {
            e.textContent = e.getAttribute('data-' + lang);
        });
        document.getElementById('lang-en').classList.toggle('active', lang === 'en');
        document.getElementById('lang-vi').classList.toggle('active', lang === 'vi');

        // Update nav menu if exists (new structure)
        if (document.getElementById('nav-home')) {
            document.getElementById('nav-home').textContent = lang === 'vi' ? 'Trang chủ' : 'Home';
        }
        if (document.getElementById('nav-projects')) {
            document.getElementById('nav-projects').textContent = lang === 'vi' ? 'Dự án' : 'Projects';
        }
    }
    document.getElementById('lang-en').onclick = () => setLang('en');
    document.getElementById('lang-vi').onclick = () => setLang('vi');
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setLang('en'); });
    } else {
        setLang('en');
    }
})();
