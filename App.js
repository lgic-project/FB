import './App.css';
import Nav from './components/Nav'
import Footer from './components/footer'
import SignUp from './components/SignUp'
import Pcomponent from "./components/Pcomponent";
import Login from "./components/login";

import { BrowserRouter, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>

        <Route element={<Pcomponent/>}>
        <Route path="/"element={<h1>Food Category</h1>}/>
        <Route path="/add"element={<h1>Want something to eat</h1>}/>
        <Route path="/update"element={<h1>Change food or Add something to eat </h1>}/>
        <Route path="/logout"element={<h1>Thank You, Visit Soon!!</h1>}/>
        <Route path="/profile"element={<h1>Profile</h1>}/>
        </Route>
        <Route path='/signup'element={<SignUp/>}/>
        <Route path='/login'element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
