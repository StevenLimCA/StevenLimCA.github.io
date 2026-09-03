import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./Components/Pages/MainPage/MainPage";
import Header from "./Components/Header/Header";
import "./App.scss";
import Action from "./Components/Action/Action";

function App() {
  const [sceneMode, setSceneMode] = useState("day");
  const toggleSceneMode = () => {
    setSceneMode((currentMode) => (currentMode === "day" ? "night" : "day"));
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header sceneMode={sceneMode} toggleSceneMode={toggleSceneMode} />
        <Routes>
          <Route path="/" element={<MainPage sceneMode={sceneMode} />} />
        </Routes>
      </div>
      <Action />
    </BrowserRouter>
  );
}

export default App;
