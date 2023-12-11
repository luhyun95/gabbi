document.addEventListener('DOMContentLoaded', function() {
  // Initially hide the main content
    document.querySelector('#chat-container').style.display = 'none';
    // Typewriter effect for the welcome screen
    setupWelcomeScreenTypewriter();

    // Setup enter key event listener for input field
    setupEnterKeyListener();
});

function setupWelcomeScreenTypewriter() {
    const welcomeText = document.querySelector('#welcome-screen h2');
    const originalText = welcomeText.innerHTML; // Save the original text
    welcomeText.innerHTML = ''; // Clear the text for the typewriter effect

    let i = 0;
    const speed = 100; // Speed of typing, in milliseconds

    function welcomeTypeWriter() {
        if (i < originalText.length) {
            welcomeText.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(welcomeTypeWriter, speed);
        } else {
            // After the typewriter effect is complete, display "let me in" after 2 seconds
            setTimeout(() => {
                document.getElementById('welcome-btn').style.display = 'block';
            }, 1000); // 2000 milliseconds = 2 seconds
        }
    }

    welcomeTypeWriter();
}

function fetchRandomQuestion() {
    fetch('/get-random-question')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const questionArea = document.getElementById('question-area');
        questionArea.innerHTML = `<h1></h1>`; // Clear for typewriter effect

        let textIndex = 0;
        const text = data.question;
        const questionSpeed = 80; // Speed of typing, in milliseconds

        function questionTypeWriter() {
            if (textIndex < text.length) {
                questionArea.querySelector('h1').innerHTML += text.charAt(textIndex);
                textIndex++;
                setTimeout(questionTypeWriter, questionSpeed);
            }
        }

        questionTypeWriter(); // Start the effect
        // Set a timeout to display the input group after 2 seconds
        setTimeout(() => {
            document.querySelector('.input-group').style.display = 'flex'; // Change display to flex
        }, 2000); // 2000 milliseconds = 2 seconds
    })
    .catch(error => {
        console.error('Error fetching question:', error);
        document.getElementById('question-area').innerText = 'Error loading question.';
    });
}


document.getElementById('welcome-screen').addEventListener('click', function() {
    console.log('Welcome screen clicked');
    this.style.display = 'none';
    document.querySelector('#chat-container').style.display = 'block';

    // Add the scale-down-animation class to each border image
    document.querySelectorAll('.border-image').forEach(function(element) {
        element.classList.add('scale-down-animation');
    });

    fetchRandomQuestion();
});



//Submit
document.getElementById('submit-btn').addEventListener('click', function() {
    var userInput = document.getElementById('user-input').value;
    fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer: userInput }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })

    .then(data => {
        const result = imageUrlBasedOnResponse(data.response);
        const resultContentDiv = document.querySelector('#result-content');

        if (resultContentDiv) {
            // Debugging: Log the result
            console.log("Result:", result);

            const imageElement = document.createElement('img');
            const textElement = document.createElement('p');

            imageElement.src = result.imageUrl;
            imageElement.alt = "Element Image";
            imageElement.className = "fade-in"; // Apply fade-in animation

            // Clear existing content and append new elements
            resultContentDiv.innerHTML = '';
            resultContentDiv.appendChild(imageElement);
            resultContentDiv.appendChild(textElement);

            // Debugging: Check if image loads
            imageElement.onload = () => {
                console.log("Image loaded.");
                textTypeWriter(textElement, result.text, 50, 0); // Adjust speed and delay as needed
            };

            imageElement.onerror = () => {
                console.log("Error loading image.");
            };
        }

        // Hide chat-container and display result-screen
        document.querySelector('#chat-container').style.display = 'none';
        document.querySelector('#result-screen').style.display = 'block';
    })


    .catch((error) => {
        console.error('Error:', error);
        var resultContentDiv = document.querySelector('#response-area');
        if (resultContentDiv) {
            resultContentDiv.innerText = 'An error occurred: ' + error.message; // Display error message
        }
    });
});



function imageUrlBasedOnResponse(response) {
    let imageUrl = '';
    let text = '';

    if (response.includes("Fire")) {
        imageUrl = 'assets/fire.png'; // Replace with actual image path
        text = 'Your element is Fire. Passionate and strong.';
    } else if (response.includes("Water")) {
        imageUrl = 'assets/water.png'; // Replace with actual image path
        text = 'Your element is Water. Flexible and deep.';
    } else if (response.includes("Air")) {
        imageUrl = 'assets/air.png'; // Replace with actual image path
        text = 'Your element is Air. Free and ever-changing.';
    } else if (response.includes("Earth")) {
        imageUrl = 'assets/earth.png'; // Replace with actual image path
        text = 'Your element is Earth. Grounded and stable.';
    }

    return { imageUrl, text };
}

function textTypeWriter(element, text, speed = 50, delay = 2000) {
    setTimeout(() => {
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        typeWriter();
    }, delay); // Start after the delay
}


document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default Enter key behavior
        document.getElementById('submit-btn').click(); // Trigger the click event on the submit button
    }
});

document.getElementById('subscription-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = document.getElementById('email-input');
    const subscriptionStatus = document.getElementById('subscription-status');

    // Simulate sending the email to the backend (replace this with actual backend logic)
    const email = emailInput.value;

    // Assuming you have a backend endpoint to handle subscriptions (replace 'backendEndpoint' with your actual endpoint)
    const backendEndpoint = '/subscribe';

    fetch(backendEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
    .then(response => response.json())
    .then(data => {
        subscriptionStatus.textContent = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
        subscriptionStatus.textContent = 'An error occurred during subscription.';
    });
});
