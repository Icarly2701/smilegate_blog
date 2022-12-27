import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import React, {useEffect,useState} from "react";
import PostComment from "./PostComment";

const PostItem = ({id, title, content, date, comment}) => {

    const [heart, setHeart] = useState(0);
    const [commentData, setData] = useState([]);
    const strDate = new Date(parseInt(date)).toLocaleDateString();
    const navigate = useNavigate();
    const moveBlog = () => {
        navigate(`/post/${id}`);
    }

    useEffect(()=> {
        setData(comment);
    }, [comment])
    
    return(
        <div className="PostItem">
                <div className="info_wrapper">
                    <div className="info_up">
                        <div className="info_title">{title}</div>
                        <div className="info_date">{strDate}</div>
                    </div>
                    <div className="info_down">
                        <div className = "info_content" onClick={moveBlog}>{content}</div>
                        <div className="btn_wrapper"> 
                            <div className ="love" onClick={() => setHeart(heart+1)}>♥</div>
                            <p>좋아요:  {heart}</p>
                            <div className="btn_edit">
                                <MyButton text = {"수정하기"} onClick = {() => navigate(`/edit/${id}`)}/>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className="PostCom">
                    <PostComment commentOrigin = {commentData} targetId = {id}/>
                </div>
            </div>
    );
}

export default React.memo(PostItem);