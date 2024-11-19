import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HOC from './HOC.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


createRoot(document.getElementById('root')).render(
  <HOC>
    <App />
  </HOC>,
)
