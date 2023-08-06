// import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import UserPost from './components/userpost';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
   <>
      <Router>
        <div className="App">

          <Routes>
            <Route key="Home" path='/' exact element={<Home></Home>} />
            <Route path='/userpost' exact element={<UserPost></UserPost>}></Route>
            <Route></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
