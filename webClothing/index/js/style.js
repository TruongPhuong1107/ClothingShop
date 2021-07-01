window.addEventListener('DOMContentLoaded', (event)=>{
	const { matches } = window.matchMedia("prefers-reduced-motion: reduce");
    if (!matches) {
        const text = document.querySelector(".img-slide-title");
        const textLength = text.getAttribute("textLength");
        text.innerHTML = text.textContent
            .split("")
            .map((letter) => `<tspan textLength="${textLength}">${letter}</tspan>`)
            .join("");
        const animation = anime.timeline();
        animation.add({
            targets: "p tspan",
            opacity: [0,1],
            duration: 425,
            easing: "easeInOutQuad",
            delay: (d, i) => 50 * i + 500
        });
        window.addEventListener("click", () => animation.restart());
    }
    console.log('textLength');
	
})
function glide() {
    document.querySelectorAll(".product-list").forEach (e=>{
        new Glide(e.querySelector(".glide"),{
            type:'slider',
            startAt:0,
            perView:4,
            rewind:false,
            bound:true,
    
    
        }).mount()
        
        
    })	
}
window.onload= function(){
  
	
	glide();
   
};

