import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';


function App() {
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('');
  const [stdin, setStdin] = useState('');
  const [sourceCode, setSourceCode] = useState('');

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
        body: JSON.stringify({ username, language, stdin, sourceCode }),
      });

      if (response.ok) {
        console.log('Data submitted successfully');
      } else {
        console.error('Error submitting data:', response.status);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="App">
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
      <Link to="/submissions" className="view-submissions-button">
        View All Submissions
      </Link>
    </div>
  );
}

export default App;