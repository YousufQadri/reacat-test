import React from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import Ques from "./questions.json";

function App() {
  console.log(Ques);
  return (
    <div className="App">
      <h1>Quiz App</h1>
      <Quiz ques={Ques} />
    </div>
  );
}

export default App;
