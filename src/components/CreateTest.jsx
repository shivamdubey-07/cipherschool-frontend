import React, { useState } from 'react';
import axios from 'axios';

const CreateTest = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('This is new test');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: '', marks: 1 }
  ]);
  const [error, setError] = useState('');

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '', marks: 1 }]);
  };

  const handleInputChange = (index, field, value) => {
    const newQuestions = [...questions];  
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const testData = {
      title,
      description,
      questions
    };

    try {
      const response = await axios.post('http://localhost:5000/api/tests', testData,{
        withCredentials: true
      });
      alert('Test created successfully');
      console.log('Test created successfully:', response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
        alert(error.response.data.message);
      } else {
        console.error('Error creating test:', error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <div className="create-test">
      <h2>Create a New Test</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <h3>Questions</h3>
        {questions.map((q, index) => (
          <div key={index} className="question-block">
            <label>Question {index + 1}</label>
            <input
              type="text"
              value={q.question}
              onChange={(e) => handleInputChange(index, 'question', e.target.value)}
              required
            />
            <div className="options">
              {q.options.map((opt, i) => (
                <div key={i} className="option-item">
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(index, i, e.target.value)}
                    required
                  />
                  <label>
                    <input
                      type="radio"
                      name={`correct-answer-${index}`}
                      checked={q.correctAnswer === opt}
                      onChange={() => handleInputChange(index, 'correctAnswer', opt)}
                    />
                    Correct
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button type="button" onClick={handleAddQuestion}>
          Add Another Question
        </button>

        <button type="submit">Create Test</button>
      </form>
    </div>
  );
};

export default CreateTest;
