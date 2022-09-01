import Header from "./Components/Header/Header";
import "./App.scss";
import MainContent from "./Components/MainContent/MainContent";
import Background from "./Components/Background/Background";

function App() {
  return (
    <div className="App">
      <Header />
      <Background />
      <MainContent />
    </div>
  );
}

export default App;
