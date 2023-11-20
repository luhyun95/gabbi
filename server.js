const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const Sentiment = require('sentiment');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// OpenAI API key
const OPENAI_API_KEY = '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';

// Sentiment analysis instance
const sentiment = new Sentiment();

const questions = [
    "What activity makes you feel most like yourself?",
    "Describe a dream you've had more than once.",
    "What's a skill you've always wanted to learn?",
    "When do you feel most at peace?",
    // ... more questions ...
];

// Function to analyze sentiment
function analyzeSentiment(answer) {
    const result = sentiment.analyze(answer);
    return result.score; // Returns a score between -5 and 5
}

// Function to determine the category based on your logic
function determineCategory(answer) {
    const sentimentScore = analyzeSentiment(answer);
    const answerLength = answer.split(' ').length;
    const keywords = {/* ... same as before ... */};
    const elementScores = { Fire: 0, Earth: 0, Water: 0, Air: 0 };

    // Convert answer to lower case for case-insensitive matching
    const lowerCaseAnswer = answer.toLowerCase();

    // Update scores based on keywords
    for (const element in keywords) {
        keywords[element].forEach(keyword => {
            if (lowerCaseAnswer.includes(keyword)) {
                elementScores[element]++;
            }
        });
    }

    // ... rest of the logic remains the same ...

    return maxElement || 'Undetermined';
}

// Endpoint to analyze user answer
app.post('/analyze', async (req, res) => {
    const userAnswer = req.body.answer;
    const category = determineCategory(userAnswer);

    // OpenAI API request
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
            prompt: `Write a response in a [Tone: Encouraging] for a person with [Category: ${category}]. The user's answer was: [${userAnswer}]`,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        });

        res.json({ response: response.data.choices[0].text });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing the request');
    }
});

// Endpoint to get a random question
app.get('/get-random-question', (req, res) => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    res.json({ question: randomQuestion });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
