import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home.js';
import Coins from './components/Coins.js';
import Exchanges from './components/Exchanges.js';
import CoinDetails from './components/CoinDetails.js';
import Footer from './components/Footer.js';

function App() {
  return (
    <>
    <Router>
      <Header/>
    <Routes>
    <Route exact path='/' element={<Home/>} />
    <Route exact path='/coins' element={<Coins/>} />
    <Route exact path='/exchanges' element={<Exchanges/>} />
    <Route exact path='/coin/:id' element={<CoinDetails/>} />

    </Routes>
    <Footer/>
    </Router>
    </>

  );
}

export default App;
