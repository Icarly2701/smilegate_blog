import './App.css';
import { BrowserRouter ,Routes, Route} from 'react-router-dom';

import BlogPage from './pages/BlogPage';
import EditPage from './pages/EditPage';
import MainPage from './pages/MainPage';
import MakeNew from './pages/MakeNew';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path = '/' element = {<MainPage/>} />
          <Route path = '/new' element = {<MakeNew/>} />
          <Route path = '/edit' element = {<EditPage/>} />
          <Route path = '/post/:id' element = {<BlogPage/>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
