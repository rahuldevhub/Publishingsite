import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landingpage from './Page/Landingpage';
import Footer from './Components/footer/Footer';
import Whywe from './Page/Whywe';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import Pplbehind from './Page/Pplbehind';
import Packages from './Page/Packages';
import Header from './Components/header/Header';

import Newdetailpage from './Components/newrealese/Newdetailpage';

import Bloglistview from './Components/blog/blogListview/Bloglistview';
import BlogSingleview from './Components/blog/blogsingleview/BlogSingleview';
import Scriblylistview from './Components/scribly/scriblylistview/Scriblylistview';
import Scriblysingleview from './Components/scribly/scriblysingleview/Scriblysingleview';
import Selfpublishing from './Components/blog/ourblogs/Selfpublishing';
import Insideritera from './Components/blog/ourblogs/Insideritera';
import Ourbooks from './Components/blog/ourblogs/Ourbooks';
import Poemwriteups from './Components/scribly/ourwriteups/Poemwriteups';
import Storywriteups from './Components/scribly/ourwriteups/Storywriteups';
import Articlewriteups from './Components/scribly/ourwriteups/Articlewriteups';
import Notfound from './Page/Notfound';
import Careerlistview from './Components/careers/careersListview/Careerlistview';
import Careersingleview from './Components/careers/careersingleview/Careersingleview';



function App() {
  return (
    <div>
<Header/>
<BrowserRouter>
<Routes>

<Route path='*' element={<Notfound/>}></Route>


<Route path='/' element={<Landingpage/>}></Route>
<Route path='/aboutus' element={<Whywe/>}></Route>
<Route path='/people-behind-ritera' element={<Pplbehind/>}></Route>
<Route path='/packages' element={<Packages/>}></Route>


<Route path='/books/:slug' element = {<Newdetailpage/>} ></Route>



<Route path='/blog' element = {<Bloglistview/>} ></Route>
<Route path='/blog-category/self-publishing' element = {<Selfpublishing/>} ></Route>
<Route path='/blog-category/our-books' element = {<Ourbooks/>} ></Route>
<Route path='/blog-category/inside-ritera' element = {<Insideritera/>} ></Route>


<Route path='/blog/:slug' element = {<BlogSingleview/>} ></Route>


<Route path='/litspace' element = {<Scriblylistview/>} ></Route>
<Route path='/litspace-category/poem' element = {<Poemwriteups/>} ></Route>
<Route path='/litspace-category/short-story' element = {<Storywriteups/>} ></Route>
<Route path='/litspace-category/article' element = {<Articlewriteups/>} ></Route>

<Route path='/litspace/:slug' element = {<Scriblysingleview/>} ></Route>

<Route path='/careers' element = {<Careerlistview/>} ></Route>

<Route path='/careers/:slug' element = {<Careersingleview/>} ></Route>



      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
