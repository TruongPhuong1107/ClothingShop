// manual button click slider
var slideIndex = 1;
const currentSlide = (n) => {
    let slide = document.getElementsByClassName("banner");
    if(n>slide.length)
    {
        slideIndex = 1;
    }
    if(n<1)
    {
        slideIndex = slide.length;
    }
    for(let i =0;i<slide.length;i++){
        slide[i].classList.remove("active");
    }
    slide[slideIndex-1].classList.add("active");
}
currentSlide(slideIndex);
const next = (n) => {
   currentSlide(slideIndex+=n)
}
const prev = () => {
    if(slideIndex < 0){
        slideIndex = slideIndex.length;
    }
    slideIndex--;
}
// auto slide
showSlides();
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("banner");
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slideIndex++;
  if (slideIndex > slides.length) 
  {slideIndex = 1}
  slides[slideIndex-1].classList.add("active");
  setTimeout(showSlides, 4000);
}
// new products slider
window.onload= function(){
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
   glide();
};

