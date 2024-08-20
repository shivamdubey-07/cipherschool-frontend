import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../DataProvider/Context";
import "./QuestionCmp.css";

import Cookies from "js-cookie";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

function QuestionCmp() {
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const navigate=useNavigate()
  
  const { sharedData, setSharedData, checkedQuestions, setCheckedQuestions } = useContext(DataContext);

  useEffect(() => {
    const testid = Cookies.get("testid");

    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fetchQuestions', {
          params: { testid },
          withCredentials: true
        });
        setQuestions(response.data);
        setSelectedOptions(Array(response.data.length).fill(null));
       
      } catch (error) {
        console.error('Error fetching questions:', error.response ? error.response.data : error.message);
      }
    };

    fetchQuestions();
  }, []); 

  useEffect(() => {
    if (sharedData !== undefined) {
      setIdx(sharedData);
    }
  }, [sharedData]);

  const handleOptionChange = (optionIndex,option) => {
    const updatedSelectedOptions = [...selectedOptions];
    const previousOption = selectedOptions[idx];

    updatedSelectedOptions[idx] = optionIndex;
    setSelectedOptions(updatedSelectedOptions);

    setCheckedQuestions((prevCheckedQuestions) => {
      const newCheckedQuestions = new Set(prevCheckedQuestions);
      newCheckedQuestions.add(idx);
      return newCheckedQuestions;
    });

  


  };

  const handleReset = () => {
    const previousOption = selectedOptions[idx];

    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[idx] = null;
    setSelectedOptions(updatedSelectedOptions);

    setCheckedQuestions((prevCheckedQuestions) => {
      const newCheckedQuestions = new Set(prevCheckedQuestions);
      newCheckedQuestions.delete(idx);
      return newCheckedQuestions;
    });

 
  };

  const handleNext = () => {
    if (idx < questions.length - 1) {
      setIdx(idx + 1);
    }
  };

  const handlePrevious = () => {
    if (idx > 0) {
      setIdx(idx - 1);
    }
  };

  const handleSubmit = async () => {
    const testid = Cookies.get("testid");
  
    const selections = questions.map((question, index) => ({
      questionId: question._id,
      option: selectedOptions[index],
    }));
  
    const submissionData = {
      testId: testid,
     
      selections,
      endedAt: new Date(),
    };
  
    try {
      await axios.post('http://localhost:5000/api/submit', submissionData,{
        withCredentials: true
      });
     alert("Submission successful");
     navigate("/")
    } catch (error) {
      alert('Error submitting answers:', error.response ? error.response.data : error.message);
    }

  
  
  };

  return (
    <div className="question-container">
      {questions.length > 0 ? (
        <>
          <h3 className="question-text">Question {idx + 1}.</h3>
          <h3 className="question-text"> {questions[idx].question}</h3>

          <div className="options">
            {questions[idx].options.map((option, optionIndex) => (
              <div className="option" key={optionIndex}>
                <label>
                  <input
                    type="radio"
                    name={`question-${idx}`}
                    value={optionIndex}
                    checked={selectedOptions[idx] === optionIndex}
                    onChange={() => handleOptionChange(optionIndex,option)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>

          <div className="btn-container">
            <Button variant="outlined" onClick={handlePrevious} disabled={idx === 0}>
              Previous
            </Button>
            <Button variant="outlined" onClick={handleNext} disabled={idx === questions.length - 1}>
              Next
            </Button>

            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
          </div>
          

        </>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}

export default QuestionCmp;
