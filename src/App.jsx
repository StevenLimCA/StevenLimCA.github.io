import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import "./App.scss";
import MainContent from "./Components/MainContent/MainContent";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <MainContent />
    </div>
  );
}

export default App;
