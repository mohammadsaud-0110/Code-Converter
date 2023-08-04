const express = require('express');
const cors = require('cors');
const app = express();
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const port = process.env.PORT || 3400;

// Set up OpenAI API key

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Code Converter!');
});

// Code converting route
app.post('/convert', async (req, res) => {
  try {
    const codeInput = req.body.code;
    const targetLanguage = req.body.language;

    // const response = await openai.completions.create({
    //   engine: 'gpt3.5-turbo', // Use the gpt3.5-turbo engine for code conversion
    //   prompt: `convert ${codeInput} this code into ${targetLanguage} code`,
    //   maxTokens: 200, // Adjust the token limit as needed
    // });

    // const convertedCode = response.data.choices[0].text;
    // res.json({ convertedCode });
    //
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `convert ${codeInput} this code into ${targetLanguage} code`,
        max_tokens: 700,
      });
    //   console.log(response.data.choices[0].text);
    res.send({ message: response.data.choices[0].text });

  }
  catch (error) {
    // console.error('Error converting code:', error);
    res.status(500).json({ error: 'Something went wrong while converting the code.' });
  }
});

// Code debugging route
app.post('/debug', async (req, res) => {
  try {
    const codeInput = req.body.code;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Please debug this code ${codeInput}, and tell where the error was`,
        max_tokens: 1000,
      });
      return res.send({ message: response.data.choices[0].text });
  }
  catch (error) {
    // console.error('Error debugging code:', error);
    res.status(500).json({ error: 'Something went wrong while debugging the code.' });
  }
});

// Code quality checking route
app.post('/quality', async (req, res) => {
  try {
    const codeInput = req.body.code;
    
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Please check the quality of this following code: ${codeInput}, give feedback and new better quality code`,
        max_tokens: 1000,
      });
  
      return res.send({ message: response.data.choices[0].text });
  }
  catch (error) {
    // console.error('Error checking code quality:', error);
    res.status(500).json({ error: 'Something went wrong while checking the code quality.' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
