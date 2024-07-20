$(document).ready(function () {
    $("#navigation").load("../nav/nav.html", () => {
            const hamburger = document.getElementById('burger');
            const menu = document.getElementById('menu');
            
            hamburger.addEventListener('input', (e) => {
                /*menu.style.visibility = e.target.checked ? 'visible' : 'hidden';*/
                menu.style.width = e.target.checked ? '120%' : '0';
                document.body.style.overflowY = e.target.checked ? 'hidden' : 'scroll';
            })
           

            
        
            // menu preivew change
            const menuItems = document.querySelectorAll('[data-img]');
            const preview = document.getElementById('preview');
            menuItems.forEach(item =>
                item.addEventListener('mouseover', function (e) {
                    let target = e.target
                    if(e.target.tagName.toLowerCase() === 'a'){
                        target = e.target.parentElement
                    }
                    const imgUrl = target.dataset.img
                    preview.style.background = `url("${imgUrl}") no-repeat center/cover`
                    preview.style.visibility = 'visible';
                }));
        
            menuItems.forEach(item =>
                item.addEventListener('mouseout', function (e) {
                    preview.style.visibility = 'hidden';
                    preview.style.background = null
                }));
        }
    );
});


