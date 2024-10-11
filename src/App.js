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
import Poems from './Page/literaryHub/Poems';
import Articles from './Page/literaryHub/Articles';
import ShortStories from './Page/literaryHub/ShortStories';



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

<Route path='/literayhub-poems' element={<Poems/>}></Route>
<Route path='/literayhub-articles' element={<Articles/>}></Route>
<Route path='/literayhub-short-stories' element={<ShortStories/>}></Route>



      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
