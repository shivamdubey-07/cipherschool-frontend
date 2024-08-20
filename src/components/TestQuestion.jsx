import { useContext,useEffect,useState } from 'react';
import './TestQuestion.css';
import { DataContext } from '../DataProvider/Context';
import Cookies from "js-cookie";
import axios from 'axios';

function TestQuestion({ mcqQuestions }) {
  const { setSharedData, checkedQuestions } = useContext(DataContext);
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    const testid = Cookies.get("testid");

    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fetchQuestions', {
          params: { testid },
          withCredentials: true
        });
        setQuestions(response.data);
        console.log("questionher",questions)
      
       
      } catch (error) {
        console.error('Error fetching questions:', error.response ? error.response.data : error.message);
      }
    };

    fetchQuestions();
  }, []); 

  if (!checkedQuestions) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="q-box">
      <div className="sideline"></div>
      <div className="q-nav">
        <div className='q-text'>Questions</div>
        <div className='question-below-line'></div>
        <div className='q-num-box'>
          {questions.map((question, index) => (
            <div
              key={index}
              className={`q-num ${checkedQuestions.has(index) ? 'checked' : ''}`}
              onClick={() => setSharedData(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestQuestion;
