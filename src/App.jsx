import './reset.css'
import './App.scss'
import { Routes, Route, Link} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Contact from './pages/Contact';
import TotalChart from './pages/TotalChart';
import Category from './pages/Category';

function App() {

  return (
    <>
      <div className="App">
        <div className='nav row row-cols-2 align-items-center justify-content-sm-between'>
          <div className='logo row align-items-center'>
            <Link to="/">BueaLine</Link>
          </div>
          <div className='wrap'>
            <FontAwesomeIcon icon={faBars} size='2x'/>
            <div className='menu row flex-column'>
              <Link to="/category">작업 카테고리</Link>
              <Link to="/contact">주소록</Link> 
              <Link to="/totalchart">통계 차트</Link>
            </div>      
          </div>
        </div>
        <div className='content'>
          <Routes>
            <Route path="/contact" element={<Contact />} />
            <Route path="/totalchart" element={<TotalChart />} />
            <Route path="/category" element={<Category />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App;
