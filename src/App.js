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
      newState = [...state,action.data];
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
    case 'CREATECOMMENT' : {
      let newData =  [];
      newData = state.find((it) => it.id == action.data.id);
      newData.comment = action.data.comment;
      newState = state.map((it) => it.id === action.data.id ? {...newData} : it);
      break;
    }
    case 'REMOVECOMMENT' : {
      let newData = [];
      newData = state.find((it) => it.id === action.data.id);
      newData.comment = newData.comment.filter((it) => it.commentId !== action.data.commentId);
      newState = state.map((it)=>it.id === action.data.id ? {...newData} : it);
      break;
    }
    default:
      return state;
  }
  return newState;
}

export const PostStateContext = React.createContext();
export const PostDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, [])

  const dataId = useRef(0);
  const commentId = useRef(0);
  //create
  const onCreate = (content, title, date,comment) => {
    dispatch({type:"CREATE", data:{
      id : dataId.current,
      title,
      content,
      date : new Date(date).getTime(),
      comment,
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

  const onCommentCreate = (targetId, targetComment) => {
    dispatch({type:"CREATECOMMENT", data:{
      id:targetId,
      comment:targetComment}});
    commentId.current+=1;
  }

  const onCommentRemove = (targetId,commentId) => {
    dispatch({type:"REMOVECOMMENT", data:{
      id:targetId,
      commentId : commentId,
    },
    });
  }
  
  return (
    <PostStateContext.Provider value = {data}>
      <PostDispatchContext.Provider value = {{onCreate, onEdit, onRemove, onCommentCreate, onCommentRemove}}>
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
