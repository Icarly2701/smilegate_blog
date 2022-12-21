import React,{useReducer,useContext, useEffect, useState, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import MyButton from './MyButton';

const PostComment = () => {
    const commentRef = useRef();
    const writerRef = useRef();
    const [writer, setWriter] = useState("");
    const [comment, setComment] = useState("");
    return(   
        <div className="PostComment"> 
                <div className="new_comment">
                    <input 
                    placeholder={"작성자 이름"}
                    ref ={writerRef}
                    value = {writer}
                    onChange = {(e) => {setWriter(e.target.value);}}
                    />
                    <input 
                    ref={commentRef}
                    placeholder={"댓글을 입력해주세요"}
                    value = {comment}
                    onChange = {(e) => {setComment(e.target.value);}}
                    />
                </div>
                <div className='btn_subcomment'>
                    <MyButton text={"작성완료"}/>
                </div>

        </div>
    );
}

export default PostComment;