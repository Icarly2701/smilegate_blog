import './App.css';
import { BrowserRouter ,Routes, Route} from 'react-router-dom';

import blogPage from './pages/blogPage';
import editPage from './pages/editPage';
import mainPage from './pages/mainPage';
import makeNew from './pages/makeNew';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <Routes>
          <Route path = '/' element = {<mainPage/>} />
          <Route path = '/new' element = {<makeNew/>} />
          <Route path = '/edit' element = {<editPage/>} />
          <Route path = '/post/:id' element = {<blogPage/>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
