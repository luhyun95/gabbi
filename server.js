const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Replace 'your_api_key' with your actual OpenAI API key
const OPENAI_API_KEY = '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';

//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

app.post('/analyze', async (req, res) => {
    const userAnswer = req.body.answer;
    // Logic to categorize the answer goes here
    // For example, you might check for certain keywords or themes

    let category = determineCategory(userAnswer); // Implement this function based on your logic

    // Now, make a request to OpenAI API
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
            prompt: "Generate a response based on the category: " + category,
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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
