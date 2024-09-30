import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landingpage from './Page/Landingpage';
import Footer from './Components/footer/Footer';
import Whywe from './Page/Whywe';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import Pplbehind from './Page/Pplbehind';
import Customized from './Page/Customized';
import Packages from './Page/Packages';
import Header from './Components/header/Header';



function App() {
  return (
    <div>
<Header/>
<BrowserRouter>
<Routes>

<Route path='/' element={<Landingpage/>}></Route>
<Route path='/aboutus' element={<Whywe/>}></Route>
<Route path='/people-behind-ritera' element={<Pplbehind/>}></Route>
<Route path='/customize-package' element={<Customized/>}></Route>
<Route path='/packages' element={<Packages/>}></Route>



      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
