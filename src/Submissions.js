import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Submissions.css';

function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('https://backend-takeuforward.vercel.app/submissions');
        setSubmissions(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="submissions-container">
      <h1>All Submissions</h1>
      <table className="submissions-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Language</th>
            <th>Standard Input</th>
            <th>Source Code</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td>{submission.username}</td>
              <td>{submission.language}</td>
              <td>{submission.stdin}</td>
              <td>{submission.source_code.slice(0, 100)}...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Submissions;