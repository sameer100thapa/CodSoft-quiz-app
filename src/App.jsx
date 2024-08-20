import React from 'react';
import Quiz from "./components/Quiz/Quiz"
import { useAuth0 } from "@auth0/auth0-react";
import "./index.css";

function App() {
  const {user, loginWithRedirect, isAuthenticated, logout} = useAuth0();

  console.log("Current User", user);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div className='title'>
          {
            isAuthenticated ? (
              <>
                
                <button className='logout-button' onClick={(e) => logout()}>Logout</button>
                <Quiz />
              </>
            ) : (
              <div className="messenger-container">
              <div className="sender">
                <h1>
                Hi there!
                Do you actually think you are smart enough? Why not find out yourself?</h1>
              </div>
              <div className="receiver">
                <button className='login-button' onClick={(e) => loginWithRedirect()}>Sure</button>
              </div>
            </div>
            )
          }
          </div>
        </header>

      </div>
    </>
  );
};

export default App;