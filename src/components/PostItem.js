import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import React from "react";


const PostItem = ({ id, content, date, title }) => {
    
    const strDate = new Date(parseInt(date)).toLocaleDateString();
    const navigate = useNavigate();
    return(
        <div className="PostItem">
            <div className="info_wrapper">
                <div className="info_up">
                    <div className="info_title">{title}</div>
                    <div className="info_date">{strDate}</div>
                </div>
                <div className="info_down">
                    <div className = "info_content" onClick={() => navigate(`/post/${id}`)}>{content.slice(0,25)}</div>
                    <div className="btn_wrapper"><MyButton text = {"수정하기"} onClick = {() => navigate(`/edit/${id}`)}/></div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(PostItem);