const PostCommentItem = ({id, writer, comment}) =>{
    
    
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
        </div>
    );
}

export default PostCommentItem;