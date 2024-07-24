const imgBoxes = document.querySelectorAll('.box');
const imageStrip = document.querySelector('#strip');
const images = document.querySelectorAll('.strip-card-img');
const mainImage = document.querySelector('#dialog-image');
const juxtaToggle = document.querySelector('#juxta-toggle');
const gallery = document.querySelector('.dialogwrapper');
const iframeContainer = document.querySelector('.iframe-container');
const juxtaToggleStrip = document.querySelector('#juxta-toggle-strip')
const dialogContent = document.querySelector('.dialog-content');
const btnLeft = document.querySelector('#btn-left');
const btnRight = document.querySelector('#btn-right');

let index = 0

const getOriginalUrl = (url_string) => {
    const path = url_string.split("/")
    const base_url = path.slice(0, 6)
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

const srcImages = Array.from(images).map(image => imagePath(image.src));

const activateNormalImage = () => {
    mainImage.style.display = 'block';
    if (iframeContainer != null) {
        iframeContainer.style.display = 'none';
    }
}

imgBoxes.forEach((box) => {
    box.addEventListener('click', function (e) {
        gallery.style.visibility = 'visible';
        const url = getOriginalUrl(e.target.src)
        mainImage.src = url;
        activateNormalImage();
        path = imagePath(url)
        index = srcImages.indexOf(path)
        images[index].scrollIntoView({ behavior: 'smooth' })
    })
})

const activatejuxtaposeImage = () => {
    iframeContainer.style.display = 'block'
    mainImage.style.display = 'none';
    index = srcImages.length - 1;
    images[index].scrollIntoView({ behavior: 'smooth' })
    console.log(index)
}

juxtaToggle?.addEventListener('click', function (e) {
    gallery.style.visibility = 'visible';
    activatejuxtaposeImage();
})

juxtaToggleStrip?.addEventListener('click', function (e) {
    activatejuxtaposeImage();
})



gallery.addEventListener('click', function (e) {
    gallery.style.visibility = 'hidden';
    mainImage.style.display = 'none';
    if (iframeContainer !== null) {
        iframeContainer.style.display = 'none'
    }

})

imageStrip.addEventListener('click', function (e) {
    e.stopPropagation(); // prevent
})



images.forEach((image) => {
    image.addEventListener('click', function (e) {
        e.preventDefault();
        const url = getOriginalUrl(e.target.src)
        mainImage.src = url;
        activateNormalImage();
        path = imagePath(url)
        index = srcImages.indexOf(path)
        images[index].scrollIntoView({ behavior: 'smooth' })
    })
})

// To stop closing dialog on click inside dialog
dialogContent.addEventListener('click', function (e) {
    e.stopPropagation(); // prevent
})

// image transition function
const imageTransitionLeft = (imagePath) => {
    mainImage.classList.toggle('animation-main')
    mainImage.style.transform = `translateX(-150%)`
    setTimeout(() => {
        mainImage.classList.toggle('animation-main')
        mainImage.src = imagePath
        mainImage.style.transform = `translateX(0)`
    }, 100)

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

// iframe transition function
const iframeTransition = () => {
    iframeContainer.style.display = 'block'
    mainImage.style.display = 'none';
}

// imageSwap functions
const leftImageSwap = () => {
    // if iframe selected 
    let currentIndex
    if (index > 0) {
        if (index == images.length - 1 && juxtaToggleStrip != null) {
            activateNormalImage();
        }
        currentIndex = index - 1
        index = currentIndex
        imageTransitionLeft(getOriginalUrl(images[currentIndex].src))
        images[currentIndex].scrollIntoView({ behavior: 'smooth' })
    }
}

const rightImageSwap = () => {
    // iframe setup
    let currentIndex
    if (index < images.length - 1) {
        currentIndex = index + 1
        index = currentIndex
        // Check if index is last
        images[currentIndex].scrollIntoView({ behavior: 'smooth' })
        if (index == images.length - 1 && juxtaToggleStrip != null) {
            activatejuxtaposeImage();
            return
        }
        imageTransitionRight(getOriginalUrl(images[currentIndex].src));
    }
}

// Touch events
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

// Button clicks
btnLeft.addEventListener('click', function () {
    leftImageSwap()
})

btnRight.addEventListener('click', function () {
    rightImageSwap()
})


