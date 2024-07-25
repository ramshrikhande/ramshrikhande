const dialog = document.querySelector("#archive-dialog");
const images = document.querySelectorAll('.archive-card');
const credit = document.querySelector('#credit')
const stripImages = document.querySelectorAll('.strip-card')
const strip = document.querySelector('#strip')
const btnLeft = document.querySelector('#btn-left');
const btnRight = document.querySelector('#btn-right');
const dialogContent = document.querySelector('#dialog-content');


var swiper = new Swiper(".swiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
})

const swiperStripChange = () => {
    const idx = swiper.realIndex
    stripImages[idx].scrollIntoView({ behavior: 'smooth' });
}

swiper.on('slideChange', swiperStripChange)


images.forEach((image, idx) => {
    image.dataset["idx"] = idx
    image.addEventListener('click', function (e) {
        const index = parseInt(e.target.parentNode.dataset["idx"])
        e.preventDefault();
        swiper.enable();
        swiper.activeIndex = index
        swiper.update();
        dialog.showModal();
        stripImages[idx].scrollIntoView({ behavior: 'smooth' });
    })
})

stripImages.forEach((img, idx) => {
    img.dataset["idx"] = idx
    img.addEventListener('click', function (e) {
        e.preventDefault();
        const index = parseInt(e.target.parentNode.dataset["idx"])
        swiper.activeIndex = index
        swiper.update()
        e.stopPropagation();
    })
})


dialog.addEventListener('click', function (e) {
    swiper.disable();
    dialog.close();
})


strip.addEventListener('click', function (e) {
    e.stopPropagation();
})

credit.addEventListener('click', function (e) {
    e.stopPropagation();
})

dialogContent.addEventListener('click', function (e) {
    e.stopPropagation(); // prevent
})
