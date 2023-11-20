

function hoverButton() {
    const character = document.querySelector('.character');
    character.style.backgroundImage = "url('https://i.ibb.co/PMNyMNn/IMG-0741-removebg-preview.png')";
    character.style.width = "100px";
    character.style.height = "150px";
    character.style.margin = "20px 5px";
    character.style.backgroundSize = "contain";
}

function unhoverButton() {
    const character = document.querySelector('.character');
    // Reset to original styles (you might need to adjust these values)
    character.style.backgroundImage = "url('https://i.ibb.co/P6W6T7h/IMG-0728-removebg-preview.png')";
    character.style.width = "originalWidth";  // Replace with original width
    character.style.height = "originalHeight";  // Replace with original height
    character.style.margin = "originalMargin";  // Replace with original margin
    character.style.backgroundSize = "originalBackgroundSize";  // Replace with original background-size
}

function changeCharacter() {
    // Code to handle button click, if needed
}


//slideshows for #gabbi
let slideIndex = 0;
let slides = document.querySelectorAll(".slideshow-container .slide");


// Initially, display the first slide and hide the others
slides[0].style.display = "block";
for (let i = 1; i < slides.length; i++) {
    slides[i].style.display = "none";
}

// Click event to change the slide
document.querySelector(".slideshow-container").addEventListener('click', function() {
    // Hide the current slide
    slides[slideIndex].style.display= "none";

// Increment the slideIndex
slideIndex++;

if (slideIndex >= slides.length) {
    slideIndex = 0;
}

// Show the next slide
slides[slideIndex].style.display = "block";

// Handle the typewriter effect for the subtitle
let subtitle = slides[slideIndex].querySelector(".subtitle");
subtitle.style.width = '0'; // Reset the width to start the typewriter effect from the beginning
let text = subtitle.getAttribute('data-text');
subtitle.innerText = text; // Set the text for the subtitle
});

      console.log("Slide clicked. Current slide index:", slideIndex);
