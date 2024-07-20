
// slideshow
const headerImg = document.getElementById('header-img');

fetch("./media_header.json")
.then((res)=> res.json())
.then(async (data)=> {
    let currIndex = 1;
    function changeImage(data){
        headerImg.classList.add('transitioning-src')
        setTimeout(() => {
            headerImg.src = data[currIndex];
            headerImg.classList.remove('transitioning-src')
        }, 400)
        currIndex = (currIndex+1)%data.length;
    }
    setInterval(()=>{
        changeImage(data);
    },4000)
})
