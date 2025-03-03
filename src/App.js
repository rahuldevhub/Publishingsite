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
// import Poems from './Page/literaryHub/Poems';
// import Articles from './Page/literaryHub/Articles';
// import ShortStories from './Page/literaryHub/ShortStories';
import LiteraryhubSubmission from './Page/LiteraryhubSubmission';
// import Poem1 from './Components/literaryhubdata/poemdata/Poem1';
import SinglePoemView from './Page/literaryhubcontent/SinglePoemView';
import { Poemlistview } from './Page/literaryHub/Poemlistview';
import { Articleslistview } from './Page/literaryHub/Articleslistview';
import SingleArticleView from './Page/literaryhubcontent/SingleArticleView';
import Shortstorieslistview from './Page/literaryHub/Shortstorieslistview';
import SingleStoryView from './Page/literaryhubcontent/SingleStoryView';



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

<Route path='/literaryhub-poems' element={<Poemlistview/>}></Route>
<Route path='/literaryhub-poems/:slug' element={<SinglePoemView/>}></Route>

<Route path='/literayhub-articles' element={<Articleslistview/>}></Route>
<Route path='/literayhub-articles/:slug' element={<SingleArticleView/>}></Route>

<Route path='/literayhub-short-stories' element={<Shortstorieslistview/>}></Route>
<Route path='/literayhub-short-stories/:slug' element={<SingleStoryView/>}></Route>


<Route path='/literayhub-submission' element={<LiteraryhubSubmission/>}></Route>






      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
