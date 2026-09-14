document.addEventListener("DOMContentLoaded", function () {

    const slider = document.getElementById("productsSlider");

    if (!slider) return;

    let products = Array.from(
        slider.querySelectorAll(".products-container")
    );

    if (products.length === 0) return;

    /*
    ==========================================
    CLONE PRODUCTS FOR INFINITE LOOP
    ==========================================
    */

    const originalCount = products.length;

    products.forEach(product => {
        const clone = product.cloneNode(true);
        clone.classList.add("cloned-product");
        slider.appendChild(clone);
    });

    /*
    ==========================================
    GET CARD WIDTH
    ==========================================
    */

    function getScrollAmount() {

        const product = slider.querySelector(".products-container");

        if (!product) return 0;

        const style = window.getComputedStyle(slider);

        const gap = parseFloat(style.columnGap || style.gap) || 0;

        return product.offsetWidth + gap;
    }


    /*
    ==========================================
    AUTO SLIDER
    ==========================================
    */

    let currentIndex = 0;

    function nextSlide() {

        currentIndex++;

        const scrollAmount = getScrollAmount();

        slider.scrollTo({
            left: currentIndex * scrollAmount,
            behavior: "smooth"
        });


        /*
        ======================================
        WHEN WE REACH CLONED PRODUCTS
        RESET TO ORIGINAL FIRST PRODUCT
        ======================================
        */

        if (currentIndex >= originalCount) {

            setTimeout(() => {

                slider.style.scrollBehavior = "auto";

                currentIndex = 0;

                slider.scrollLeft = 0;

                slider.style.scrollBehavior = "smooth";

            }, 600);
        }
    }


    /*
    ==========================================
    PREVIOUS SLIDE
    ==========================================
    */

    function previousSlide() {

        if (currentIndex <= 0) {

            slider.style.scrollBehavior = "auto";

            currentIndex = originalCount;

            slider.scrollLeft =
                currentIndex * getScrollAmount();

            slider.style.scrollBehavior = "smooth";

        }

        currentIndex--;

        slider.scrollTo({
            left: currentIndex * getScrollAmount(),
            behavior: "smooth"
        });
    }


    /*
    ==========================================
    BUTTON FUNCTION
    ==========================================
    */

    window.scrollProducts = function (direction) {

        if (direction === "next") {
            nextSlide();
        }

        if (direction === "prev") {
            previousSlide();
        }

    };


    /*
    ==========================================
    START AUTO SLIDER
    ==========================================
    */

    let autoSlide = setInterval(nextSlide, 2500);


    /*
    ==========================================
    PAUSE ON HOVER
    ==========================================
    */

    slider.addEventListener("mouseenter", function () {
        clearInterval(autoSlide);
    });


    /*
    ==========================================
    RESUME AFTER HOVER
    ==========================================
    */

    slider.addEventListener("mouseleave", function () {

        autoSlide = setInterval(nextSlide, 2500);

    });

});





document.addEventListener("DOMContentLoaded", function () {

    const track = document.querySelector(".slider-track");
    const slides = document.querySelectorAll(".slider-item");

    let currentIndex = 0;

    function getSlidesPerView() {
        if (window.innerWidth <= 640) {
            return 1;
        }

        if (window.innerWidth <= 768) {
            return 2;
        }

        if (window.innerWidth <= 1024) {
            return 3;
        }

        return 4;
    }

    function slideNext() {
        const slidesPerView = getSlidesPerView();
        const maxIndex = slides.length - slidesPerView;

        currentIndex++;

        if (currentIndex > maxIndex) {
            currentIndex = 0;
        }

        const slideWidth = slides[0].offsetWidth + 24;

        track.style.transform =
            `translateX(-${currentIndex * slideWidth}px)`;
    }

    setInterval(slideNext, 2500);

    window.addEventListener("resize", function () {
        currentIndex = 0;
        track.style.transform = "translateX(0)";
    });

});


function toggleAccountMenu() {
    const menu = document.getElementById('accountMenu');
    const arrow = document.getElementById('accountArrow');

    menu.classList.toggle('opacity-0');
    menu.classList.toggle('invisible');
    menu.classList.toggle('translate-y-2');

    arrow.classList.toggle('rotate-180');
}