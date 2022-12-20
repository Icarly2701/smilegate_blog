import './App.css';
import { BrowserRouter ,Routes, Route} from 'react-router-dom';

import BlogPage from './pages/BlogPage';
import EditPage from './pages/EditPage';
import MainPage from './pages/MainPage';
import MakeNew from './pages/MakeNew';
import React, { useReducer, useRef } from 'react';

const reducer = (state, action) => {
  let newState = [];
  switch(action.type){
    case 'INIT' : {
      return action.data;
    }
    case 'CREATE' : {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE' : {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT' : {
      newState = state.map((it)=>it.id === action.data.id ? {...action.data} : it);
      break;
    }
    default:
      return state;
  }
  return newState;
}

export const PostStateContext = React.createContext();
export const PostDispatchContext = React.createContext();

const dummyData = [

  {
    id:1,
    content:"안녕하세요구르트",
    title:"첫번째",
    date: 1671516203560
  },
  {
    id:2,
    content:"안녕하세요구르트기로",
    title:"두번째",
    date: 1671516203562
  },
  {
    id:3,
    content:"안녕하세요구르트가로",
    title:"세번째",
    date: 1671516203564
  },
  {
    id:4,
    content:"안녕하세요구르트개로",
    title:"네번째",
    date: 1671516203566
  },{
    id:5,
    content:"안녕하세요구르트개로개로",
    title:"다섯번째",
    date: 1671516203568
  },
]


function App() {
  const [data, dispatch] = useReducer(reducer, dummyData)

  const dataId = useRef(0);
  //create
  const onCreate = (content, title, date) => {
    dispatch({type:"CREATE", data:{
      id : dataId.current,
      title,
      content,
      date : new Date(date).getTime(),
      },
    });
    dataId.current += 1;
  };
  
  //remove
  const onRemove = (targetId) => {
    dispatch({type:"REMOVE", targetId});
  };

  //edit
  const onEdit = (targetId, title, content, date) => {
    dispatch({type: "EDIT", data:{
      id: targetId,
      title,
      content,
      date: new Date(date).getTime(),
      },
    });
  };

  return (
    <PostStateContext.Provider value = {data}>
      <PostDispatchContext.Provider value = {{onCreate, onEdit, onRemove}}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path = '/' element = {<MainPage/>} />
              <Route path = '/new' element = {<MakeNew/>} />
              <Route path = '/edit/:id' element = {<EditPage/>} />
              <Route path = '/post/:id' element = {<BlogPage/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </PostDispatchContext.Provider>
    </PostStateContext.Provider>
  );
}

export default App;
