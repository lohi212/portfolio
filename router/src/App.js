import React from "react";
import { useHistory } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

function App() {
  const history = useHistory();

  function handleNavigate() {
    history.push('/page2');
  }
  return (
    <div className="App">
      {/* <button onClick={handleNavigate}>Navigate</button> */}
      <h3>Home page!</h3>
    </div>
  );
}

export default App;
