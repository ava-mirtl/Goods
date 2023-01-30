import { useSelector } from 'react-redux';
import Main from './pages/Main';
import Card from './pages/Card';
import Error from './pages/Error';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const error = useSelector(state => state.error);
  return (
    <Router> <div className="App">
     {error
           &&<Error />}
          <Routes> 
          <Route path="/card" element={<Card />}/>
           <Route path="/" element={<Main />}/>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
