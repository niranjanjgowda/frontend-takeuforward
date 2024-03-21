import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('');
  const [stdin, setStdin] = useState('');
  const [sourceCode, setSourceCode] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const react_url = process.env.REACT_APP_SUBMIT_URL;

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);

    let boilerplate = '';
    switch (selectedLanguage) {
      case 'C++':
        boilerplate = '#include <iostream>\n\nint main() {\n  // Your code here\n\n  return 0;\n}';
        break;
      case 'Java':
        boilerplate = 'public class Main {\n  public static void main(String[] args) {\n    // Your code here\n  }\n}';
        break;
      case 'JavaScript':
        boilerplate = '// Your code here';
        break;
      case 'Python':
        boilerplate = '# Your code here';
        break;
      default:
        boilerplate = '';
        break;
    }

    setSourceCode(boilerplate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(react_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, language, stdin, sourceCode, questionNumber: selectedQuestion }),
      });

      if (response.ok) {
        console.log('Data submitted successfully', response.data);
        setSelectedQuestion(null);
      } else {
        console.error('Error submitting data:', response.status);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const questions = [
    {
      id: 1,
      title: 'Print "Hello world"',
      description: 'No input is required. The output should be "Hello world" without quotes.',
    },
    /*
    {
      id: 2,
      title: 'Program to Add 2 number',
      description: 'Write a program to add two numbers. The input will be two numbers and the output should be the sum of the two numbers.',
    },
    {
      id: 3,
      title: 'Print reverse of a number',
      description: '123 => 321',
    },*/
  ];

  return (
    <div className="App">
      {!selectedQuestion ? (
        <div>
          <h1>TakeUforward</h1>
          <p>click on the question to start</p>
          <div className="question-cards">
            {questions.map((question) => (
              <div key={question.id} className="question-card" onClick={() => setSelectedQuestion(question.id)}>
                <h3>{question.title}</h3>
                <p>{question.description}</p>
              </div>
            ))}
          </div>
          <Link to="/submissions" className="view-submissions-button">
            View All Submissions
          </Link>
        </div>
      ) : (
        <div className='submit-container'>
          <div className='btn-container'>
            <button onClick={() => setSelectedQuestion(null)}> &lt; Questions</button>
            <h1>Take u forward</h1>
            <Link to="/submissions" className="view-submissions-button">
              View All Submissions
            </Link>
          </div>
          <h3>{questions[selectedQuestion - 1].title}</h3>
          <p>{questions[selectedQuestion - 1].description}</p>
          <div className="form-container">
            <div className="left-section">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="language">Preferred Code Language:</label>
                  <select
                    id="language"
                    value={language}
                    onChange={handleLanguageChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select a language</option>
                    <option value="C++">C++</option>
                    <option value="Java">Java</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="stdin">Standard Input:</label>
                  <textarea
                    id="stdin"
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                    className="form-input"
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            </div>
            <div className="right-section">
              <div className="form-group">
                <label htmlFor="sourceCode">Source Code:</label>
                <textarea
                  id="sourceCode"
                  value={sourceCode}
                  onChange={(e) => setSourceCode(e.target.value)}
                  className="form-input source-code-input"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;