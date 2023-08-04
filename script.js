const URL = "https://code-converter-openai.onrender.com";

fetch(`${URL}`).then((res)=>{return res.json()}).then((data)=>{console.log(data);}). catch((err)=>{console.log(err);});

async function convertCode() {
    const code = document.getElementById('code').value;
    const language = document.getElementById('language').value;
  
    try {
      const response = await fetch(`${URL}/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });
  
      const data = await response.json();
    //   console.log(data);
      displayResult(data.message);
    }
    catch (error) {
      console.error('Error converting code:', error);
      displayError('Error converting code.');
    }
  }
  
  async function debugCode() {
    const code = document.getElementById('code').value;
  
    try {
      const response = await fetch(`${URL}/debug`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
  
      const data = await response.json();
      displayResult(data.message);
    } catch (error) {
      console.error('Error debugging code:', error);
      displayError('Error debugging code.');
    }
  }
  
  async function checkQuality() {
    const code = document.getElementById('code').value;
  
    try {
      const response = await fetch(`${URL}/quality`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
  
      const data = await response.json();
    //   console.log(data);
      displayResult(data.message);
    } catch (error) {
      console.error('Error checking code quality:', error);
      displayError('Error checking code quality.');
    }
  }
  
  function displayResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = result;
  }
  
  function displayError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = `Error: ${message}`;
  }
  