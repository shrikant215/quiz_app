// import "./App.css";
import "./Appp.css";
import Quiz from "./Components/Quiz";
import UserDashboard from "./Components/UserDashboard";
import AllScoresTable from "./Components/AllScoresTable";
import { BrowserRouter as Router, Route, Link, Routes, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // const [QuizData, setQuizdata] = useState();
  const [ isLogin, setIsLogin] = useState(localStorage.getItem("userId"));
    const [loginId, setLoginId] = useState('');

  // const navigate = useNavigate()

  const login = (booleanData) => {
     console.log("booleanData",booleanData)
     setIsLogin(booleanData);

  }
  const getLoginId = (LoginId) => {
    setLoginId(LoginId);
    console.log('loginIddddddddddd',LoginId)
  };

  const logouthandler = () => {
    localStorage.clear();
    setIsLogin(false);
    // navigate('/');

  }
  return (
    <Router>
      <div>
        <nav
          className="navbar navbar-expand-lg shadow nav-responcive"
          style={{ background: "#54E8F0" }}
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
            <span >Quiz Application</span>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="navvv nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                {isLogin && (
                  <>
                   <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/about"
                  >
                    Quiz
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/table"
                  >
                    Table
                  </Link>
                </li>
                <li>
                  <button style={{marginLeft:'71rem'}} className="btnn" onClick={logouthandler} type="button"><span>Logout</span></button>
                </li>
                  </>
                )}
               
              </ul>
            </div>
          </div>
        </nav>

        <Routes>

      {isLogin ? (
        <>
          <Route path="/about" element={<Quiz loginId={loginId} />} />
          <Route path="/table" element={<AllScoresTable loginId={loginId} />} />
        </> 
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}


      {isLogin ? (
        <>
        <Route path="*" element={<Navigate to="/about" />} />
        </> 
      ) : (
        <Route path="/" element={<UserDashboard login={login} getLoginId={getLoginId} />} />
      )}



    </Routes>
      </div>
    </Router>
  );
}

export default App;
