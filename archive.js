const dialog = document.querySelector("#archive-dialog");
const images = document.querySelectorAll('.archive-card');
const mainImage = document.querySelector('#main-image');
const credit = document.querySelector('#credit')
const stripImages = document.querySelectorAll('.strip-card')
const strip = document.querySelector('#strip')

const getOriginalUrl = (url_string) => {
    const path = url_string.split("/")
    const base_url = path.slice(0,4)
        const file_name = path.slice(path.length-1)
        let url = base_url.concat(file_name)
        url = url.join("/")
        return url;
}

images.forEach((image) => {
    image.addEventListener('click', function(e){
        e.preventDefault();
        credit.children[0].innerHTML = e.target.parentNode.dataset.credit
        credit.children[0].href = e.target.parentNode.dataset.link
        mainImage.src = getOriginalUrl(e.target.src);
        dialog.showModal();
    })
})

dialog.addEventListener('click', function(e){
    mainImage.src = ''
    dialog.close();
})

mainImage.addEventListener('click', function(e){
    e.stopPropagation();
})

strip.addEventListener('click', function(e){
    e.stopPropagation();
})

credit.addEventListener('click', function(e){
    e.stopPropagation();
})

stripImages.forEach((img) => {
    img.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        credit.children[0].setAttribute('href',  e.target.parentNode.dataset.link)
        credit.children[0].innerHTML = e.target.parentNode.dataset.credit
        mainImage.src = getOriginalUrl(e.target.src);
    })
})