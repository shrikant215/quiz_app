import React, { useRef, useState } from 'react';
// import UserDashboard from './UserDashboard'; // Import the UserDashboard component

import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../App.css';
import { data } from '../assets/Data';
import axios from 'axios';

function Quiz({loginId}) {
  

  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  const [name, setName] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [date, setDate] =useState(null)

  const [quizData, setQuizData] = useState([]);

  const [id, setId] = useState('')

  let Option1 =useRef(null);
  let Option2 =useRef(null);
  let Option3 =useRef(null);
  let Option4 =useRef(null);

  let option_array = [Option1,Option2,Option3,Option4];

  const startQuiz = () => {
    if (name.trim() !== '') {
      setQuizStarted(true);      
    }
  };

  const checkAns = (e, ans) => {
    if(lock === false){
      if(question.ans === ans){
        e.target.classList.add("correct")
        setLock(true);
        setScore(priv => priv+1)
        console.log(ans)
      }else{
        e.target.classList.add("wrong")
        setLock(true)
        option_array[question.ans-1].current.classList.add("correct")
        console.log(ans)
      }
    } 
  }
  console.log(quizData, 'quiz data')

  const next = async () => {
    if (lock === true) {
      setIndex(prevIndex => prevIndex + 1);
        setQuestion(data[index + 1]);
        setLock(false);
        option_array.forEach(option => option.current.classList.remove("wrong", "correct"));

        const currentDate = new Date();
        const date = currentDate.toLocaleDateString();
        const startTime = currentDate.toLocaleTimeString();
        setDate(date);
        setStartTime(startTime);

        if (index === data.length - 1) {
            setResult(true);
            const result = { name, score, date, startTime, loginId };
            const updatedQuizdata = [...quizData,result];
            console.log(result)
            setQuizData(updatedQuizdata);

            try {
               const response = await axios.post('http://localhost:5000/create', result, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
                console.log(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    } 
};


const reset = () => {
  setIndex(0)
  setQuestion(data[0])
  setScore(0)
  setLock(false)
  setResult(false)

console.log(quizData);
}

const quitQuiz = () => {
  setIndex(0);
  setQuestion(data[0]);
  setScore(0);
  setLock(false);
  setResult(false);

  setName('');
  setQuizStarted(false);
};




  return (
<div className="d-flex align-items-center justify-content-center vh-100" 
style={{ 
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://img.freepik.com/premium-photo/glowing-question-marks_828631-1142.jpg')`, // Set the background image with linear gradient overlay
  backgroundSize: 'cover', 
  minHeight: '100vh', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}}>
   

      <div className="card w-50 h-75 rounded-5">
        
        <div className="card-body d-flex flex-column align-items-center justify-content-center">
          
          <div className='container text-center'>
          <h2 className="card-title justify-content-md-start">Quiz Application</h2>
            <hr />
            <br/>
            <br/>
          {!quizStarted ? (
        <>

        <div className="mb-3 text-center" > {/* Use text-center class to center the content */}
          <h4 htmlFor="exampleInputName" className="form-label">Your Name</h4>
          <input
            type="text"
            placeholder='Enter Your Name'
            className="form-control w-50 mx-auto"
            style={{ background: '#c3cffb' }}
            id="exampleInputName"
            aria-describedby="NameHelp"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="button" className="btn" style={{background:'#6a5ae0', border:'blue', color:'white'}} onClick={startQuiz}>
           Start
        </button>
      
      </>
      
          ) : result?<></>: ( 
          <>
            <h4>{index+1}. {question.question}</h4>

            <div className="row m-4" style={{cursor: 'pointer'}}>
              <div className="col-md-6 mb-4" >
                <div className="border border-dark rounded p-2" ref={Option1} onClick={(e) => {checkAns(e, 1)}}>
                  {question.Option1}
                </div>
              </div>
              
              <div className="col-md-6 mb-4">
                <div className="border border-dark rounded p-2" ref={Option2} onClick={(e) => { checkAns(e, 2) }}>
                  {question.Option2}
                </div>
              </div>
              
              <div className="col-md-6 mb-4">
                <div className="border border-dark rounded p-2" ref={Option3} onClick={(e) => { checkAns(e, 3) }}>
                  {question.Option3}
                </div>
              </div>
              
              <div className="col-md-6 mb-4">
                <div className="border border-dark rounded p-2" ref={Option4} onClick={(e) => { checkAns(e, 4) }}>
                  {question.Option4}
                </div>
              </div>
            </div>

            {/* <button onClick={next} type="button" className="btn btn-info">Next</button> */}
            <div onClick={next} class="d-grid gap-2 d-md-block">
              <button class="btn btn-primary" type="button" style={{background:'', padding:'10px 20px'}}>Next</button>
            </div>
            <br/>
            <h6 class="text-center">{index+1} of {data.length} questions</h6>

            </>
          )}

            {result? (
           <>
          <div className='m-3'>
           <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Time</th>
                  <th scope="col">Date</th>
                  <th scope="col">You Scored</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td><h6>{name}</h6></td>
                  <td><h6>{startTime}</h6></td>
                  <td><h6>{date}</h6></td>
                  <td><h6>{score}/{data.length}</h6></td>
                </tr>
              </tbody>
            </table>
          </div>

           <button onClick={reset} type="button" className="btn btn-primary btn-lg">Reset</button>
         </>
          ): <></>}

          </div>
        </div>
      </div>
      <button onClick={quitQuiz} type="button" className="btn btn-warning position-absolute bottom-0 end-0 m-4">Quit</button>
    </div>
  );
}

export default Quiz;
