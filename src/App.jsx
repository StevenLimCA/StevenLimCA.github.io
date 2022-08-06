import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import "./App.scss";
import MainContent from "./Components/MainContent/MainContent";
import Footer from "./Components/Footer/Footer";
import Hero from "./Components/Hero/Hero";
import ProjectPage from "./Components/Pages/ProjectPage/ProjectPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Hero />
      <MainContent />
      <ProjectPage />
      <Footer />
    </div>
  );
}

export default App;
