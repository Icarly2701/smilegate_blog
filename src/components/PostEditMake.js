import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import {useContext, useEffect, useState, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import { PostDispatchContext } from "../App";

const PostEditMake = ({isEdit, originData}) => {
    const navigate = useNavigate();
    const [curDate, setCurDate] = useState(new Date());
    const TodayDate =`Today : ${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월 ${curDate.getDate()}일`; 
    const {onCreate, onEdit, onRemove} = useContext(PostDispatchContext);
    const contentRef = useRef();
    const titleRef = useRef();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSumbit = () => {
        if(title.length < 1 ){
            titleRef.current.focus();
            return;
        }
        if(content.length < 1 ){
            contentRef.current.focus();
            return;
        }

        if(window.confirm(isEdit ? "포스트를 수정하시겠습니까?" : "포스트를 작성하시겠습니까?"))
            if(!isEdit){
                onCreate(content, title, curDate, new Array());
            }else{
                onEdit(originData.id, title, content, curDate);
            }
            
        navigate('/', {replace:true});
    };

    const handleRemove = () => {
        if(window.confirm("정말 이 포스트를 삭제하겠습니까?")){
            onRemove(originData.id);
        }
        navigate('/', {replace:true});
    }

    useEffect(() => {
        if(isEdit){
            setCurDate(new Date());
            setContent(originData.content);
            setTitle(originData.title);
        }
    } ,[isEdit, originData])

    return(
        <div className="PostEditMake">
            <MyHeader leftChild={
                <MyButton text = {"< 뒤로가기"}
                onClick = {() => navigate(-1)}/>
                }
                headTitle = {isEdit ? "Edit Post" : "New Post!"}
                todayDate = {TodayDate}
                rightChild={
                    <MyButton text={"삭제하기"} type={"Bad"} onClick = {handleRemove}/>
                }
            />
            <div>
                <section>
                    <h4>포스트 제목</h4>
                    <div className="title_area">
                        <textarea 
                        placeholder="제목을 입력해주세요."
                        ref = {titleRef}
                        value = {title} 
                        onChange = {(e) => setTitle(e.target.value)}/>
                    </div>
                </section>
                <section>
                    <h4>포스트 내용</h4>
                    <div className="content_area">
                        <textarea 
                        placeholder="내용을 입력해주세요."
                        ref = {contentRef}
                        value = {content}
                        onChange = { (e) => setContent(e.target.value)}/>
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton text={'취소하기'} type={'Bad'}
                        onClick = {() => navigate(-1)}/>
                        <MyButton text={'POST IT'} type={'Good'}
                        onClick = {handleSumbit}/>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default PostEditMake;