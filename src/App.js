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

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, [])

  const dataId = useRef(0);
  
  //create
  const onCreate = (content, title, img) => {
    dispatch({type:"CREATE", data:{
      id : dataId.current,
      title,
      content,
      img,
      },
    });
    dataId.current += 1;
  };
  
  //remove
  const onRemove = (targetId) => {
    dispatch({type:"REMOVE", targetId});
  };

  //edit
  const onEdit = (targetId, title, content, img) => {
    dispatch({type: "EDIT", data:{
      id: targetId,
      title,
      content,
      img
      },
    });
  };

  return (
    <DiaryStateContext.Provider value = {data}>
      <DiaryDispatchContext.Provider value = {{onCreate, onEdit, onRemove}}>
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
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
