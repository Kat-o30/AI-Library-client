import React, { useState } from 'react';
import axios from 'axios';
import config from '../../../config/config.js'; 
const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [summary, setSummary] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadStatus('');
    setSummary('');
    setAnswer('');
    document.querySelector('.file-input').value = ''; 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadStatus('Uploading...');
      const response = await axios.post(config.API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus('Upload successful!');

      
      console.log('Uploaded file data:', response.data);

  
      setSummary('This is a summary of the uploaded PDF.');
    } catch (error) {
      setUploadStatus('Error uploading the file.');
      console.error('Error uploading the file:', error);
    }
  };

  const handleQuestionSubmit = (event) => {
    event.preventDefault();
    if (!question) return;

  
    setAnswer('This is a simulated answer to your question.');
  };

  return (
    <div className="upload-container">
      <h1 className="title">Upload Your PDF</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="file-input-container">
          <input
            type="file"
            onChange={handleChange}
            accept="application/pdf"
            className="file-input"
          />
          {file && (
            <button
              type="button"
              onClick={handleRemoveFile}
              className="remove-file-button"
            >
              ×
            </button>
          )}
        </div>
        <button type="submit" className="upload-button" disabled={!file}>
          Upload
        </button>
      </form>
      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
      {summary && (
        <div className="summary-container">
          <h2 className="summary-title">Summary</h2>
          <p className="summary-text">{summary}</p>
          <form onSubmit={handleQuestionSubmit} className="question-form">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about the PDF"
              className="question-input"
            />
            <button type="submit" className="ask-button">Ask</button>
          </form>
        </div>
      )}
      {answer && (
        <div className="answer-container">
          <h2 className="answer-title">Answer</h2>
          <p className="answer-text">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
