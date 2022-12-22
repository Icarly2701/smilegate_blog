import { useContext } from "react";
import MyButton from "./MyButton";
import { CommitDispatchContext } from "./PostItem";

const PostCommentItem = ({id, writer, comment}) =>{
    const {onRemoveCommit} = useContext(CommitDispatchContext)

    const handleRemoveCommit = () => {
        if(window.confirm("댓글을 삭제하겠습니까?")){
            onRemoveCommit(id);
        }
    }

    return(
        <div className="PostCommentItem">
            <div className="info_comment">
                <div className="comment_writer">
                    {writer}
                </div>
                <div className="comment_content">
                    {comment.slice(0,25)}
                </div>
            </div>
            <div className="comment_Remove">
                <MyButton text={"삭제하기"} type={'Bad'} onClick = {handleRemoveCommit}/>
            </div>
            
        </div>
    );
}

export default PostCommentItem;