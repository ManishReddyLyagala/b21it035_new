import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import GetProducts from './GetProducts';
import Home from './Home';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      
      <Route path="/" element={<GetProducts/>}/>
    </Routes>
    </BrowserRouter>
     
    </>
  );
}

export default App;