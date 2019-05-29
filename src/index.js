import React from "react";
import ReactDOM from "react-dom";
import CardContainer from "./cardContainer";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <CardContainer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
