import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './app/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>

    <BrowserRouter>
      <App />
      <ToastContainer
        autoClose={3000}
        hideProgressBar={true}
        theme="dark"
      />
    </BrowserRouter>
  </Provider>



)
