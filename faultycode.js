app.post('/analyze', async (req, res) => {
    const userAnswer = req.body.answer;
    const category = determineCategory(userAnswer);

    // OpenAI API request
    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
          model: "gpt-3.5-turbo",
          prompt: `Write a response in a [Tone: Encouraging] for a person with [Category: ${category}]. The user's answer was: [${userAnswer}]`,
          max_tokens: 150,
          temperature: 0.7  // You can adjust the temperature as needed
      }, {
          headers: {
              'Authorization': `Bearer ${OPENAI_API_KEY}`
          }
      });

        res.json({ response: response.data.choices[0].text });

      } catch (error) {
          // Enhanced error logging
          console.error('Server Error:', error);
          // Send back a detailed error message to the client
          res.status(500).json({ error: 'Error processing the request', details: error.message });
      }

});
