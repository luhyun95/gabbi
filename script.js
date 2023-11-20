
function fetchRandomQuestion() {
    fetch('/get-random-question')
    .then(response => response.json())
    .then(data => {
        document.getElementById('question-area').innerText = data.question;
    })
    .catch(error => {
        console.error('Error fetching question:', error);
    });
}

// Fetch a random question when the page loads
document.addEventListener('DOMContentLoaded', fetchRandomQuestion);

document.getElementById('submit-btn').addEventListener('click', function() {
var userInput = document.getElementById('user-input').value;
fetch('/analyze', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answer: userInput }),
})
.then(response => response.json())
.then(data => {
    document.getElementById('response-area').innerText = data.response;
})
.catch((error) => {
    console.error('Error:', error);
});
});
