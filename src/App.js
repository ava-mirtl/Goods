import './App.css';
import Main from './pages/Main';
import Card from './pages/Card';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router> <div className="App">
     <Routes>
           <Route path="/card" element={<Card />}/>
           <Route path="/" element={<Main />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
