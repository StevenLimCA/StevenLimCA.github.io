import Header from "./Components/Header/Header";
import "./App.scss";
import MainContent from "./Components/MainContent/MainContent";
import Hero from "./Components/Hero/Hero";
import ProjectPage from "./Components/Pages/ProjectPage/ProjectPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <MainContent />
      <ProjectPage />
    </div>
  );
}

export default App;
