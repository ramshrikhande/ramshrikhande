const dialog = document.querySelector("#archive-dialog");
const images = document.querySelectorAll('.archive-card');
const mainImage = document.querySelector('#main-image');
const credit = document.querySelector('#credit')
const stripImages = document.querySelectorAll('.strip-card')
const strip = document.querySelector('#strip')
const btnLeft = document.querySelector('#btn-left');
const btnRight = document.querySelector('#btn-right');
const dialogContent = document.querySelector('#dialog-content');

const getOriginalUrl = (url_string) => {
    const path = url_string.split("/")
    const base_url = path.slice(0, 4)
    const file_name = path.slice(path.length - 1)
    let url = base_url.concat(file_name)
    url = url.join("/")
    return url;
}

const imagePath = (url) => {
    const path = url.split("/")
    const file_name = path.slice(path.length - 1)
    return file_name[0]
}

let index


const srcImages = Array.from(stripImages).map(image => imagePath(image.childNodes[1].src));

images.forEach((image) => {
    image.addEventListener('click', function (e) {
        e.preventDefault();
        credit.children[0].innerHTML = e.target.parentNode.dataset.credit
        credit.children[0].href = e.target.parentNode.dataset.link
        const url = getOriginalUrl(e.target.src)
        mainImage.src = url;
        index = srcImages.indexOf(imagePath(url))
        dialog.showModal();
        setTimeout(() => {
            stripImages[index].scrollIntoView({ behavior: 'smooth' })
        }, 50)
    })
})

stripImages.forEach((img) => {
    img.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        credit.children[0].setAttribute('href', e.target.parentNode.dataset.link)
        credit.children[0].innerHTML = e.target.parentNode.dataset.credit
        const url = getOriginalUrl(e.target.src)
        mainImage.src = url;
        index = srcImages.indexOf(imagePath(url))
        stripImages[index].scrollIntoView({ behavior: 'smooth' })
    })
})


dialog.addEventListener('click', function (e) {
    mainImage.src = ''
    dialog.close();
})

mainImage.addEventListener('click', function (e) {
    e.stopPropagation();
})

strip.addEventListener('click', function (e) {
    e.stopPropagation();
})

credit.addEventListener('click', function (e) {
    e.stopPropagation();
})

// img transitions
const imageTransitionLeft = (imagePath) => {
    mainImage.classList.toggle('animation-main')
    mainImage.style.transform = `translateX(-150%)`
    setTimeout(() => {
        mainImage.classList.toggle('animation-main')
        mainImage.src = imagePath
        mainImage.style.transform = `translateX(0)`
    }, 200)

}

const imageTransitionRight = (imagePath) => {
    mainImage.classList.toggle('animation-main')
    mainImage.style.transform = `translateX(150%)`
    setTimeout(() => {
        mainImage.classList.toggle('animation-main')
        mainImage.src = imagePath
        mainImage.style.transform = `translateX(0)`
    }, 100)
}

// const change credits
const changeCredits = (parent) => {
    credit.children[0].innerHTML = parent.dataset.credit
    credit.children[0].href = parent.dataset.link
}

// img swap fn
const leftImageSwap = () => {
    let currentIndex
    if (index > 0) {
        currentIndex = index - 1
        index = currentIndex
        stripImages[index].scrollIntoView({ behavior: 'smooth' })
        const url = getOriginalUrl(stripImages[index].children[0].src)
        imageTransitionLeft(url)
        changeCredits(stripImages[index])
    }
}

const rightImageSwap = () => {
    let currentIndex
    if (index < images.length - 1) {
        currentIndex = index + 1
        index = currentIndex
        stripImages[index].scrollIntoView({ behavior: 'smooth' })
        const url = getOriginalUrl(stripImages[index].children[0].src)
        imageTransitionRight(url);
        changeCredits(stripImages[index])
    }
}

// Btn listeners
btnLeft.addEventListener('click', function (e) {
    e.stopPropagation()
    leftImageSwap()
})

btnRight.addEventListener('click', function (e) {
    e.stopPropagation()
    rightImageSwap()
})

// touch events
let touchstartX = 0
let touchendX = 0

function changeImage() {
    if (touchendX < touchstartX) rightImageSwap()
    if (touchendX > touchstartX) leftImageSwap()
}

dialogContent.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
})

dialogContent.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    changeImage()
})