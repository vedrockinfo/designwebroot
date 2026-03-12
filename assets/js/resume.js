const sidebar = $('#sideBar');
const toggle = $('#sidebarToggle');
const mycontent = $('#mainContent');
const navLinks = $('nav a');
const sections = [];

jQuery(document).ready(function () {

    // Collect section data
    navLinks.each(function () {
        const href = $(this).attr('href');
        sections.push({
            id: href,
            link: $(this)
        });
    });

    // Toggle Sidebar
    toggle.on('click', function () {
        const isOpen = sidebar.hasClass('open');

        if (isOpen) {
            sidebar.removeClass('open');
            toggle.removeClass('open');
            mycontent.removeClass('sidebarOpened');
        } else {
            sidebar.addClass('open');
            toggle.addClass('open');
            mycontent.addClass('sidebarOpened');
        }
    });

    // Smooth scroll
    navLinks.on('click', function (e) {
        e.preventDefault();

        const target = $(this).attr('href');
        const targetElement = $(target);

        if (targetElement.length) {
            $('html, body').animate({
                scrollTop: targetElement.offset().top
            }, 600);
        }

        if ($(window).width() < 768) {
            sidebar.removeClass('open');
            toggle.removeClass('open');
            mycontent.removeClass('sidebarOpened');
        }
    });

    // Active link on scroll
    $(window).on('scroll', function () {
        const scrollPosition = $(window).scrollTop() + 150;

        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionElement = $(section.id);

            if (sectionElement.length) {
                const sectionTop = sectionElement.offset().top;

                if (scrollPosition >= sectionTop) {
                    navLinks.removeClass('active');
                    section.link.addClass('active');
                    break;
                }
            }
        }
    });

});