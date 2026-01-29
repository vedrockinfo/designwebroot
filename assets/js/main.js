// document.addEventListener("DOMContentLoaded", function () {
//     const popup = document.getElementById("autoPopup");
//     const closeBtn = document.querySelector(".close-popup");
//     const popupKey = "popupShown";

//     // 👉 Show popup only if not shown before
//     if (!localStorage.getItem(popupKey)) {
//         setTimeout(() => {
//             popup.classList.add("active");
//         }, 500);
//     }

//     // 👉 Close popup function
//     function closePopup() {
//         popup.classList.remove("active");
//         localStorage.setItem(popupKey, "true");
//     }

//     // Close on close icon
//     closeBtn.addEventListener("click", closePopup);

//     // Close on outside click
//     popup.addEventListener("click", function (e) {
//         if (!e.target.closest(".popup-content")) {
//             closePopup();
//         }
//     });
// });


// Header Fixed On Scroll 

const myHeader = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        myHeader.classList.add("scrolled");
    } else {
        myHeader.classList.remove("scrolled");
    }
})


// Toggle Nav on Mobile Device

const toggle = document.querySelector("#toggle");
const menu = document.querySelector("nav");

toggle.addEventListener("click", () => {
    menu.classList.toggle("toggled");
})


document.querySelectorAll(".has-submenu > .dropDown").forEach(link => {
    link.addEventListener("click", function (e) {
        if (window.innerWidth < 992) {
            e.preventDefault(); // stop navigation
            const submenu = this.nextElementSibling;
            submenu.classList.toggle("open");
        }
    });
});

// Counter on Section Visit 

const counters = document.querySelectorAll('.counter');
let started = false;

function startCounter(counter) {
    const target = +counter.dataset.target;
    const suffix = counter.dataset.suffix || '';
    let count = 0;
    const speed = target / 100;

    const update = () => {
        if (count < target) {
            count += speed;
            counter.textContent = Math.floor(count) + suffix;
            requestAnimationFrame(update);
        } else {
            counter.textContent = target + suffix;
        }
    };
    update();
}

function checkCounter() {
    const section = document.querySelector('#counterSection');
    if (!section || started) return;

    const rect = section.getBoundingClientRect();

    if (rect.top < window.innerHeight && !started) {
        counters.forEach(counter => startCounter(counter));
        started = true;
    }
}

window.addEventListener('scroll', checkCounter);

// Progress While Visting Section 

const progressBars = document.querySelectorAll(".progressFill");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percentage = bar.dataset.percentage;
                const text = bar.querySelector(".progressText");

                bar.style.width = percentage + "%";

                let count = 0;
                const interval = setInterval(() => {
                    if (count >= percentage) {
                        clearInterval(interval);
                    } else {
                        count++;
                        text.textContent = count + "%";
                    }
                }, 15);

                observer.unobserve(bar);
            }
        });
    },
    { threshold: 0.5 }
);

progressBars.forEach(bar => observer.observe(bar));

// Portfolio Tabs

const radios = document.querySelectorAll('input[name="myProjects"]');
const items = document.querySelectorAll('.projectGrid__Item');


radios.forEach(radio => {
    radio.addEventListener('change', () => {
        const filter = radio.value;

        items.forEach(item => {
            if (filter === 'all' || item.dataset.target === filter) {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.style.display = 'none';
                item.style.transform = 'scale(0.95)';
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    });
});
