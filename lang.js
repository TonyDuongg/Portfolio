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
            ? `- Tôi là một lập trình viên game còn non trẻ, đang học hỏi và phát triển từng ngày với niềm đam mê sáng tạo và công nghệ.<br>
               - Luôn tìm kiếm những thử thách mới để nâng cao kỹ năng và kiến thức.<br>
               - Đam mê xây dựng những sản phẩm mang lại trải nghiệm thú vị cho người chơi.<br>
               - Sẵn sàng hợp tác, học hỏi từ cộng đồng và đồng nghiệp để phát triển bản thân.`
            : `- I am a young game developer, learning and growing every day with a passion for creativity and technology.<br>
               - Always seeking new challenges to improve my skills and knowledge.<br>
               - Passionate about building products that bring exciting experiences to players.<br>
               - Ready to collaborate and learn from the community and colleagues to develop myself.`;
        document.getElementById('quick-quote').textContent = document.getElementById('quick-quote').getAttribute('data-' + lang);
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
    }
    document.getElementById('lang-en').onclick = () => setLang('en');
    document.getElementById('lang-vi').onclick = () => setLang('vi');
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setLang('en'); });
    } else {
        setLang('en');
    }
})();