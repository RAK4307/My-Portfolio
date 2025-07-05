/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
} 
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

const contactForm = document.querySelector('.contact__form');

const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default browser submission

    const myForm = e.target;
    const formData = new FormData(myForm);

    // Use fetch to submit the form data to Netlify
    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
    })
    .then(() => {
        // Show your custom success message
        const msg = document.createElement('div');
        msg.textContent = "Thank You. I'll get back to you soon!";
        msg.style.position = "fixed";
        msg.style.top = "30px";
        msg.style.right = "30px";
        msg.style.background = "#d4edda";
        msg.style.color = "#155724";
        msg.style.padding = "1rem 2rem";
        msg.style.borderRadius = "0.5rem";
        msg.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
        msg.style.fontWeight = "bold";
        msg.style.zIndex = "9999";
        document.body.appendChild(msg);

        // Remove the message after 3 seconds and reset the form
        setTimeout(() => msg.remove(), 3000);
        contactForm.reset();
    })
    .catch((error) => alert("There was an error submitting your message. Please try again."));
};

contactForm.addEventListener('submit', handleSubmit);




const typewriterTexts = [
  "Final Year CSE (AI & ML)",
  "Full-Stack Dev",
  "AI/ML Enthusiast"
];
let twIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById("typewriter");

function typeWriter() {
  const currentText = typewriterTexts[twIndex];
  if (isDeleting) {
    charIndex--;
    typewriterElement.textContent = currentText.substring(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      twIndex = (twIndex + 1) % typewriterTexts.length;
      setTimeout(typeWriter, 700);
    } else {
      setTimeout(typeWriter, 40);
    }
  } else {
    charIndex++;
    typewriterElement.textContent = currentText.substring(0, charIndex);
    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1200);
    } else {
      setTimeout(typeWriter, 80);
    }
  }
}
typeWriter();
