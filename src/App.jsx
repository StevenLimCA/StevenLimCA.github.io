import { Switch, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./Components/Pages/MainPage/MainPage";
import Header from "./Components/Header/Header";
import "./App.scss";
import Footer from "./Components/Footer/Footer";
import Action from "./Components/Action/Action";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/project/:id" component={MainPage} />
        </Switch>
      </div>
      <Action />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
