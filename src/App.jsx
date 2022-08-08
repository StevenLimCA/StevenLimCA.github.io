import Header from "./Components/Header/Header";
import "./App.scss";
import MainContent from "./Components/MainContent/MainContent";
import Footer from "./Components/Footer/Footer";
import Hero from "./Components/Hero/Hero";
import ProjectPage from "./Components/Pages/ProjectPage/ProjectPage";
import Carousel from "./Components/Carousel/Carousel";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <MainContent />
      <ProjectPage />
      <Footer />
    </div>
  );
}

export default App;
