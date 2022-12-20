import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import React from "react";

const PostItem = ({ id, content, date }) => {
    const navigate = useNavigate();
    const strDate = new Date(parseInt(date)).toLocaleDateString();
    const goDetail = () => {
        navigate(`/post/${id}`);
    }
    const goEdit = () => {
        navigate(`/edit/${id}`);
    }
    return (
        <div className="PostItem">
            <div onClick={goDetail} className="info_wrapper">
                <div className="post_date">{strDate}</div>
                <div className="post_content_preview">{content.slice(0, 25)}</div>
            </div>

            <div className="btn_wrapper">
                <MyButton
                    text={'수정하기'}
                    onClick={goEdit}
                />
            </div>
        </div>
    );
}

export default React.memo(PostItem);