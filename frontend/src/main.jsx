import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContext from './context/UserContext.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <UserContext>
    <BrowserRouter>
      <App />
      <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={true}      
        theme="dark"
      />
    </BrowserRouter>,
  </UserContext>

)
