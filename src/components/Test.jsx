import  { useRef, useEffect, useState } from 'react';
import mcqQuestions from '../paper'; // Adjust the path if needed
import "./Test.css";
import TestQuestion from './TestQuestion';
import QuestionCmp from './QuestionCmp';
import { useContext,createContext } from 'react';
import { DataContext, DataProvider } from '../DataProvider/Context';


function Test() {
    const videoRef = useRef(null);
    const StateProvider=createContext();
    const [sharedData, setSharedData] = useState(0);
    const [questions,setQuestions]=useState([{}])
  

    useEffect(() => {



    }, []);
    useEffect(() => {
        const initializeMedia = async () => {
            try {
                const newStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                const videoTracks = newStream.getVideoTracks();
                const audioTracks = newStream.getAudioTracks();

                console.log('video', videoTracks, 'audio', audioTracks);

                if (videoTracks.length > 0 && audioTracks.length > 0) {
                    if (videoRef.current) {
                        videoRef.current.srcObject = newStream; // Display the camera feed
                    }
                } else {
                    alert("Camera and microphone permissions are required.");
                }
            } catch (error) {
                alert("Error accessing camera and microphone: " + error.message);
                console.error(error);
            }
        };

        initializeMedia();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <DataProvider  value={{ sharedData, setSharedData }}>
        <div className='infotest'>
            <div>
               <h3>1. Attempt each question</h3>
                <h3> 2. Each question is worth 1 mark </h3>
                <h3>3. 0.25 marks will be deducted for each wrong answer</h3>
            </div>
            
                <video className='videotest' ref={videoRef} autoPlay playsInline  />
           

            </div>
            <div className='maintest'>
            <div className='mainleft'>

            <QuestionCmp mcqQuestions={mcqQuestions} />
            
          
            </div>

            <div className='mainright'>
            
            <div className='questionBox'>
           
            
           
                <TestQuestion mcqQuestions={mcqQuestions}/>
                
           


            </div>
            
            </div>
            </div>
        </DataProvider>
    );
}

export default Test;
