import { useEffect, useState } from "react";
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

  useEffect(() => {
    document.body.dataset.sceneMode = sceneMode;
  }, [sceneMode]);

  return (
    <BrowserRouter>
      <div className={`App App--${sceneMode}`}>
        <Header sceneMode={sceneMode} toggleSceneMode={toggleSceneMode} />
        <Routes>
          <Route path="/" element={<MainPage sceneMode={sceneMode} />} />
        </Routes>
        <Action />
      </div>
    </BrowserRouter>
  );
}

export default App;
