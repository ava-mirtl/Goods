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
     <Main/>
     <Routes>
           <Route path="/card" element={<Card />}/>
           <Route path="/home" element={<Main />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
