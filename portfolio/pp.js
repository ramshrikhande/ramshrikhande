const imgBoxes = document.querySelectorAll('.box');
const imageStrip = document.querySelector('#strip');
const images = document.querySelectorAll('.strip-card-img');
const gallery = document.querySelector('.dialogwrapper');
const iframeContainer = document.querySelector('.iframe-container');
const dialogContent = document.querySelector('.dialog-content');

var swiper = new Swiper(".swiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
})

const swiperStripChange = () => {
    const idx = swiper.realIndex
    images[idx].scrollIntoView({ behavior: 'smooth' });
}

swiper.on('slideChange',swiperStripChange)

imgBoxes.forEach((box, idx) => {
    box.dataset["idx"] = idx
    box.addEventListener('click', function (e) {
        gallery.style.display = 'flex';
        const index = parseInt(e.target.parentNode.dataset["idx"])
        swiper.enable();
        swiper.activeIndex = index
        swiper.update();
        images[index].scrollIntoView({ behavior: 'smooth' });
    })
})


gallery.addEventListener('click', function (e) {
    swiper.disable();
    gallery.style.display = 'none';
})

imageStrip.addEventListener('click', function (e) {
    e.stopPropagation(); // prevent
})


images.forEach((image, idx) => {
    image.dataset["idx"] = idx
    image.addEventListener('click', function (e) {
        e.preventDefault();
        const index = parseInt(e.target.dataset["idx"])
        swiper.activeIndex = index
        swiper.update()
    })
})

// To stop closing dialog on click inside dialog
dialogContent.addEventListener('click', function (e) {
    e.stopPropagation(); // prevent
})


