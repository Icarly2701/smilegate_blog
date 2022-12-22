import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import React, {useReducer, useState, useRef} from "react";
import PostComment from "./PostComment";

const reducer = (state, action) => {
    let newState = [];
    switch(action.type){
        case 'INITCOMMIT' : {
            return action.data;
        }
        case 'CREATECOMMIT' : {
            newState = [action.data, ...state];
            break;
        }
        case 'REMOVECOMMIT' : {
            newState = state.filter((it) => it.id !== action.targetId);
            break;
        }
        default:
            return state;
    }
    return newState;
}

export const CommitStateContext = React.createContext();
export const CommitDispatchContext = React.createContext();

const PostItem = ({ id, content, date, title }) => {

    const commitID = useRef(0);
    const [commentData, dispatch] = useReducer(reducer, []);
    const [heart, setHeart] = useState(0);
    const strDate = new Date(parseInt(date)).toLocaleDateString();
    const navigate = useNavigate();

    const onCreateCommit = (comment, writer) => {
        dispatch({type:"CREATECOMMIT", data : {
            id: commitID.current,
            writer,
            comment,
            },
        });
        commitID.current += 1;
    }

    const onRemoveCommit = (targetId) => {
        dispatch({type:"REMOVECOMMIT", targetId});
    }

    return(
        <CommitStateContext.Provider value = {commentData}>
        <CommitDispatchContext.Provider value = {{onCreateCommit, onRemoveCommit}}>
        <div className="PostItem">
            <div className="info_wrapper">
                <div className="info_up">
                    <div className="info_title">{title}</div>
                    <div className="info_date">{strDate}</div>
                </div>
                <div className="info_down">
                    <div className = "info_content" onClick={() => navigate(`/post/${id}`, {commentData})}>{content.slice(0,25)}</div>
                    
                    <div className ="love" onClick={() => setHeart(heart+1)}>♥</div>
                        <p>좋아요:  {heart}</p>
                    <div className="btn_wrapper">
                        <MyButton text = {"수정하기"} onClick = {() => navigate(`/edit/${id}`)}/>
                    </div>
                </div>
            </div>
            
            <div className="PostCom">
                <PostComment />
            </div>
        </div>
        </CommitDispatchContext.Provider>
        </CommitStateContext.Provider>
    );
}

export default React.memo(PostItem);