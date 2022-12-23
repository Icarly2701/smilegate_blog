import { useContext } from "react";
import { PostDispatchContext } from "../App";
import MyButton from "./MyButton";

const PostCommentItem = ({id, writer, comment}) =>{
    const {onRemoveCommit} = useContext(PostDispatchContext)

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
                    {comment}
                </div>
            </div>
            <div className="comment_Remove">
                <MyButton text={"삭제하기"} type={'Bad'} onClick = {handleRemoveCommit}/>
            </div>
            
        </div>
    );
}

export default PostCommentItem;