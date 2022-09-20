import './App.css';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LandinPage from './Components/LandingPage';
import Home from './Components/Home';
import Form from './Components/Form';
import Description from './Components/Description';
import ErrorPage from './Components/ErrorPage';

function App() {
  return (
    
    <BrowserRouter>
    <Switch>
      <Route exact path={"/"} component={LandinPage}/>
      <Route exact path={"/home"} component={Home}/>
      <Route exact path={"/form"} component={Form}/>
      <Route exact path={"/dogs/:id"} component={Description}/>
      <Route path={"*"} component={ErrorPage}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
