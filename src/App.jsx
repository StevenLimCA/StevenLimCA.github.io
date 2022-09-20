import { Switch, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./Components/Pages/MainPage/MainPage";
import Header from "./Components/Header/Header";
import "./App.scss";
import Action from "./Components/Action/Action";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={MainPage} />
        </Switch>
      </div>
      <Action />
    </BrowserRouter>
  );
}

export default App;
