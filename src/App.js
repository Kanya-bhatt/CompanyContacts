import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomeForm from './screens/HomeForm'
import HomePage from './screens/HomePage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<HomeForm/>} ></Route>
        <Route path = '/show' element = {<HomePage/>} ></Route>

      </Routes>
    
    
    </BrowserRouter>
  );
}

export default App;
