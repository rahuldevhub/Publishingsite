
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Aboutpage from './pages/Aboutpage';
import Allservice from './pages/Allservice';
import Landingpage from './pages/Landingpage';

import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import Contactpage from './pages/Contactpage';

function App() {
  return (
   <div>

<BrowserRouter>
<Routes>

<Route path='/' element={<Landingpage/>}></Route>
<Route path='/aboutus' element={<Aboutpage/>}></Route>
<Route path='/allservice' element={<Allservice/>}></Route>
<Route path='/contact' element={<Contactpage/>}></Route>


</Routes>
</BrowserRouter>
    








 
   </div>
  );
}

export default App;
