import { useState, useRef, useContext, useEffect } from 'react';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';

import { DataContext } from '../DataProvider/Context'; 
function Start() {
  const [error, setError] = useState(null);
  const [testName, setTestName] = useState('');
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [startClicked, setStartClicked] = useState(false);
  const [nextbtnClicked, setNextbtnClicked] = useState(false);
  const navigate = useNavigate();

//  
  const handleStartTest = async () => {
    setError(null);

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const videoTracks = newStream.getVideoTracks();
      const audioTracks = newStream.getAudioTracks();

      if (videoTracks.length > 0 && audioTracks.length > 0) {
        setStartClicked(true);
        setStream(newStream);

        if (videoRef.current) {
          videoRef.current.srcObject = newStream; // Display the camera feed
        }
      } else {
        setError('Camera and microphone permissions are required.');
      }
    } catch (error) {
      alert("Please grant camera and microphone permissions");
    }
  };
 
  const handleNext = async () => {
    if (!testName) {
      setError('Please enter a test name.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/exam?name=${testName}`,{
        withCredentials: true
      });
     

    Cookies.set('testid', response.data.testid);
   

      navigate('/test');
    } catch (error) {
      console.error('Error fetching tests:', error.response ? error.response.data : error.message);
      setError('Error fetching tests. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100vw", height: '100vh', backgroundColor: 'white' }}>
      {!startClicked &&
        <div>
          <input
            type='text'
            name='testname'
            placeholder='Enter test name'
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
          />
          <Button variant="contained" size="large" onClick={handleStartTest}>
            Start test
          </Button>
        </div>
      }
      {error && <Alert severity="error">{error}</Alert>}
      {!error && !nextbtnClicked &&
        <div style={{ display: `${stream ? 'flex' : 'none'}`, flexDirection: 'column' }}>
          <video ref={videoRef} autoPlay playsInline style={{ marginTop: '20px', maxWidth: '100%', maxHeight: '300px' }} />
          <Button variant="contained" size="large" onClick={handleNext}>Next</Button>
        </div>
      }
    </div>
  );
}

export default Start;
