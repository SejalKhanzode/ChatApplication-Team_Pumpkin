import logo from './logo.svg';
import './App.css';
import { Outlet , Routes, Route} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/HomePage"
import MessageWindow from "./components/MessagePage"

function App() {
  return (
   <div className='m-5'> 
      <Routes>
        <Route  path="/" element={<Register/>}/>
        <Route  path="/login" element={<Login/>}/>
        <Route  path="/chat" element={<Home/>}>
          <Route path=":userId" element={<MessageWindow />} />
        </Route>
      </Routes>
   </div>
  );
}

export default App;
