import React,{useContext, useState,useRef} from 'react';
import { PostDispatchContext} from '../App';
import MyButton from './MyButton';
import PostCommentItem from './PostCommentItem';

const PostComment = ({commentOrigin, targetId}) => {
    const {onCommentCreate} = useContext(PostDispatchContext);
    const commentId = useRef(0);
    const commentRef = useRef();
    const writerRef = useRef();

    const [writer, setWriter] = useState("");
    const [comment, setComment] = useState("");

    const getProcessedCommentList = () => {
        const copyList = JSON.parse(JSON.stringify(commentOrigin));
        return copyList;
    }

    let copyList = getProcessedCommentList();
    
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
            copyList.push({commentId:commentId.current ,writer: writer, comment: comment} );
            onCommentCreate(targetId,copyList);
            setWriter("");
            setComment("");
            commentId.current+=1;
        }
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
                {   
                    copyList.map((it) => (
                        <PostCommentItem key={it.commentId}{...it} targetId = {targetId}/>
                    ))
                }
            </div>
        </div>
    );
}

export default PostComment;