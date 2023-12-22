import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import Alert from "./components/Alert";

function App() {
  const [mode, setMode] = useState("light","orangered");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const closeAlert = () => {
    setAlert(null); // Clear the alert
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
      showAlert("Dark mode has been enabled.", "warning");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled.", "success");
    }
  };

  const toggleModeOrange = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "orangered";
      showAlert("Orangered mode has been enabled.", "warning");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled.", "success");
    }
  };

  return (
    <>
      <Navbar title="ReactApp" mode={mode} toggleMode={toggleMode} toggleModeOrange={toggleModeOrange} />
      <Alert alert={alert} onClose={closeAlert} />
      <div className="container my-3">
        <TextForm heading="Type something to analyze" mode={mode} showAlert={showAlert} />
      </div>
    </>
  );
}

export default App;
