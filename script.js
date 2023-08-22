

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

