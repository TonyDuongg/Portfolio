// === LANGUAGE SWITCHER ===
(function() {
    const content = {
        en: {
            name: "Nguyen Hai Duong",
            jobTitle: "Game Developer",
            aboutTitle: "About",
            skillsTitle: "Skills",
            projectsTitle: "Projects",
            contactTitle: "Contact",
            emailLabel: 'Email: <a href="mailto:nguyenhaiduong052005@gmail.com">nguyenhaiduong052005@gmail.com</a>',
            phoneLabel: 'Phone: <a href="tel:0374264592">0374264592</a>',
            aboutContent: `- I am a passionate and creative game developer, always striving to turn ideas into reality.<br>
- I embrace challenges as opportunities to grow and innovate.<br>
- My goal is to craft unique experiences that inspire and delight players.<br>
- I believe in lifelong learning, collaboration, and making a positive impact through technology.`,
            quickQuote: "Dreams only become reality when you take action"
        },
        vi: {
            name: "Nguyễn Hải Dương",
            jobTitle: "Lập trình viên Game",
            aboutTitle: "Giới thiệu",
            skillsTitle: "Kỹ năng",
            projectsTitle: "Dự án",
            contactTitle: "Liên hệ",
            emailLabel: 'Email: <a href="mailto:nguyenhaiduong052005@gmail.com">nguyenhaiduong052005@gmail.com</a>',
            phoneLabel: 'Điện thoại: <a href="tel:0374264592">0374264592</a>',
            aboutContent: `- Tôi là một lập trình viên game đầy đam mê và sáng tạo, luôn nỗ lực biến ý tưởng thành hiện thực.<br>
- Tôi xem thử thách là cơ hội để phát triển và đổi mới.<br>
- Mục tiêu của tôi là tạo ra những trải nghiệm độc đáo, truyền cảm hứng cho người chơi.<br>
- Tôi tin vào việc học hỏi suốt đời, hợp tác và tạo ra giá trị tích cực qua công nghệ.`,
            quickQuote: "Ước mơ chỉ thành hiện thực khi bạn hành động"
        }
    };

    function setLang(lang) {
        const get = id => document.getElementById(id);

        if (get('name')) get('name').textContent = content[lang].name;
        const jobTitle = get('job-title-btn');
        if (jobTitle) jobTitle.innerHTML = `<i class="fa-solid fa-gamepad"></i> ${content[lang].jobTitle}`;
        if (get('about-title')) get('about-title').textContent = content[lang].aboutTitle;
        if (get('skills-title')) get('skills-title').textContent = content[lang].skillsTitle;
        if (get('projects-title')) get('projects-title').textContent = content[lang].projectsTitle;
        if (get('contact-title')) get('contact-title').textContent = content[lang].contactTitle;
        if (get('email-label')) get('email-label').innerHTML = content[lang].emailLabel;
        if (get('phone-label')) get('phone-label').innerHTML = content[lang].phoneLabel;
        if (get('about-content')) get('about-content').innerHTML = content[lang].aboutContent;
        if (get('quick-quote')) get('quick-quote').textContent = content[lang].quickQuote;

        document.querySelectorAll('.skill-name').forEach(e => {
            if (e.getAttribute('data-' + lang)) e.textContent = e.getAttribute('data-' + lang);
        });
        document.querySelectorAll('.project-title').forEach(e => {
            if (e.getAttribute('data-' + lang)) e.textContent = e.getAttribute('data-' + lang);
        });
        document.querySelectorAll('.project-desc').forEach(e => {
            if (e.getAttribute('data-' + lang)) e.textContent = e.getAttribute('data-' + lang);
        });
        document.querySelectorAll('.project-btn').forEach(e => {
            if (e.getAttribute('data-' + lang)) e.textContent = e.getAttribute('data-' + lang);
        });

        if (get('lang-en')) get('lang-en').classList.toggle('active', lang === 'en');
        if (get('lang-vi')) get('lang-vi').classList.toggle('active', lang === 'vi');

        // Update nav menu if exists (new structure)
        if (get('nav-home')) {
            get('nav-home').innerHTML = lang === 'vi'
                ? '<i class="fa-solid fa-home nav-icon"></i><span class="nav-text">Trang chủ</span>'
                : '<i class="fa-solid fa-home nav-icon"></i><span class="nav-text">Home</span>';
        }
        if (get('nav-projects')) {
            get('nav-projects').innerHTML = lang === 'vi'
                ? '<i class="fa-solid fa-folder-open nav-icon"></i><span class="nav-text">Dự án</span>'
                : '<i class="fa-solid fa-folder-open nav-icon"></i><span class="nav-text">Projects</span>';
        }
    }

    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(function() {
        if (document.getElementById('lang-en'))
            document.getElementById('lang-en').onclick = () => setLang('en');
        if (document.getElementById('lang-vi'))
            document.getElementById('lang-vi').onclick = () => setLang('vi');
        setLang('en');
    });
})();