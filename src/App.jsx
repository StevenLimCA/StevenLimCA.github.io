import { Switch, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./Components/Pages/MainPage/MainPage";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/project/:id" component={MainPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
