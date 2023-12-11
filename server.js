const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const Sentiment = require('sentiment');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/assets', express.static('assets')); // Serving files from the 'assets' directory


// OpenAI API key
const OPENAI_API_KEY = 'KEY';

// Sentiment analysis instance
const sentiment = new Sentiment();

const questions = [
  "What keeps you up at night?",
  "What can you do to make a difference?",
  "To where does your soul want to travel?",
  "When was the last time you couldn't stop laughing or smiling?",
  "What risk can you take now?",
  "What are the dominant emotion that run your life?",
  "What do you want to burn?",
  "Who am I ready to forgive?",
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
    const keywords = {
      Fire: ["passionate", "energetic", "bold", "ambitious", "enthusiastic", "courageous"],
      Earth: ["grounded", "stable", "practical", "reliable", "dependable", "patient"],
      Water: ["emotional", "intuitive", "empathetic", "calm", "peaceful", "adaptable"],
      Air: ["intellectual", "curious", "communicative", "adaptable", "analytical", "abstract"]
    };
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

    // Update scores based on sentiment
        if (sentimentScore > 0.5) elementScores['Fire']++;
        else if (sentimentScore > -0.2 && sentimentScore < 0.2) elementScores['Earth']++;
        else if (sentimentScore < 0) elementScores['Water']++;
        else if (sentimentScore > 0.2) elementScores['Air']++;

        // Update scores based on answer length
        if (answerLength < 10) elementScores['Earth']++;
        else if (answerLength >= 30) elementScores['Air']++;

        // Determine the highest score
        let maxElement = '';
        let maxScore = 0;
        for (const element in elementScores) {
            if (elementScores[element] > maxScore) {
                maxScore = elementScores[element];
                maxElement = element;
            }
        }

    return maxElement || 'Undetermined';
}

// Endpoint to analyze user answer
 app.post('/analyze', async (req, res) => {
    try {
        const userAnswer = req.body.answer;
        const sentimentScore = analyzeSentiment(userAnswer); // Sentiment analysis
        const category = determineCategory(userAnswer, sentimentScore); // Category determination
        // Continue from the previous code snippet
        res.json({ response: `You are: ${category}` });

  } catch (error) {
      console.error('Axios Error:', error.response ? error.response.data : error.message);
        // Send detailed error information
        res.status(500).json({
            error: 'Error processing the OpenAI API request',
            details: error.message,
            response: error.response ? error.response.data : null
        });
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

// email subscription
app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    // Perform subscription logic (e.g., save to database, send confirmation email)

    // Simulate success response
    res.json({ message: `Subscribed successfully! Thank you, ${email}!` });
});


exports.app = functions.https.onRequest(app);
