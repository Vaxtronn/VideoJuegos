import './App.css';
import {Route} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Form from './components/Form/Form';
import Landing from "./components/Landing/Landing.jsx";
import Home from "./components/Home/Home.jsx"
import VideoGameDetail from './components/VideoGameDetail/VideoGameDetail';

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Landing />
      </Route> 
      <Route path="/videogames" component={Navbar} />
      <Route path="/videogames/post" component={Form} />
      <Route exact path="/videogames" component={Home} />
      <Route exact path="/videogames/:id">
        <VideoGameDetail />
      </Route>
    </div>
  );
}

export default App;
