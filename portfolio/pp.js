const imgBoxes = document.querySelectorAll('.box');
const imageStrip = document.querySelector('#strip');
const images = document.querySelectorAll('.strip-card-img');
const mainImage = document.querySelector('#dialog-image');
const juxtaToggle = document.querySelector('#juxta-toggle');
const gallery = document.querySelector('.dialogwrapper');
const iframeContainer = document.querySelector('.iframe-container');
const juxtaToggleStrip = document.querySelector('#juxta-toggle-strip')
const dialogContent = document.querySelector('.dialog-content');


const getOriginalUrl = (url_string) => {
    const path = url_string.split("/")
        const base_url = path.slice(0,6)
        const file_name = path.slice(path.length-1)
        let url = base_url.concat(file_name)
        url = url.join("/")
        return url;
}

imgBoxes.forEach((box) => {
    box.addEventListener('click',function(e) {
        gallery.style.visibility = 'visible';
        const url = getOriginalUrl(e.target.src)
        mainImage.src = url;
        if (iframeContainer !== null){
            iframeContainer.style.display = 'none'
        }
        mainImage.style.display = 'block';
    })
})

juxtaToggle?.addEventListener('click',function(e) {
    gallery.style.visibility = 'visible';
    iframeContainer.style.display = 'block'
    mainImage.style.display = 'none';
})

juxtaToggleStrip?.addEventListener('click',function(e) {
    iframeContainer.style.display = 'block'
    mainImage.style.display = 'none';
})


gallery.addEventListener('click',function(e) {
    gallery.style.visibility = 'hidden';
    mainImage.style.display = 'none';
    if (iframeContainer !== null){
        iframeContainer.style.display = 'none'
    }
    
})

imageStrip.addEventListener('click',function(e) {
    e.stopPropagation(); // prevent
})

mainImage.addEventListener('click', function(e) {
    e.stopPropagation(); // prevent
})


images.forEach((image) => {
    image.addEventListener('click', function(e){
        e.preventDefault();
        const url = getOriginalUrl(e.target.src)
        mainImage.src = url;
        mainImage.style.display = 'block';
        if(iframeContainer != null){
            iframeContainer.style.display = 'none';
        }
    })
})