import React,{useContext, useEffect, useState, useRef} from 'react';
import MyButton from './MyButton';
import PostCommentItem from './PostCommentItem';
import { CommitDispatchContext, CommitStateContext } from './PostItem';

const PostComment = () => {
    const commentList = useContext(CommitStateContext);
    const {onCreateCommit} = useContext(CommitDispatchContext);
    const commentRef = useRef();
    const writerRef = useRef();
    
    const [commentData, setCommentData] = useState([]);
    const [writer, setWriter] = useState("");
    const [comment, setComment] = useState("");

    useEffect(()=>{setCommentData(commentList)}, [commentList]);

    const handleCommit = () => {
        if(writer.length < 1){
            writerRef.current.focus();
            return;
        }
        if(comment.length < 1){
            commentRef.current.focus();
            return;
        }

        if(window.confirm("댓글을 다시겠습니까?")){
            onCreateCommit(comment, writer);
            setWriter("");
            setComment("");
        }
    }

    const getProcessedCommitList = () => {
        return JSON.parse(JSON.stringify(commentData));
    }

    return(   
        <div className="PostComment"> 
            <div className="new_wrapper">
                <div className="new_comment">
                    <input className='writer'
                    placeholder={"작성자 이름"}
                    ref ={writerRef}
                    value = {writer}
                    onChange = {(e) => {setWriter(e.target.value);}}
                    />
                    <textarea className='comment'
                    ref={commentRef}
                    placeholder={"댓글을 입력해주세요"}
                    value = {comment}
                    onChange = {(e) => {setComment(e.target.value);}}
                    />
                </div>
                <div className='btn_subcomment'>
                    <MyButton text={"작성완료"} onClick = {handleCommit}/>
                </div>
            </div>
            <div className='comment_item'>
                {getProcessedCommitList().map((it) => (
                    <PostCommentItem key = {it.id} {...it} />
                ))}
            </div>
        </div>
    );
}

export default PostComment;