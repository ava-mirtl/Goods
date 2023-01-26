import './App.css';
import Main from './pages/Main';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router> <div className="App">
     <Main/>
    </div></Router>
  );
}

export default App;
