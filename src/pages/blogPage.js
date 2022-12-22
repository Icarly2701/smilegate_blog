import { useNavigate, useParams } from "react-router-dom";
import {useContext, useEffect, useState} from 'react';
import {PostStateContext } from "../App";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const BlogPage = (commentList) => {
    const curDate = new Date();
    const TodayDate =`Today : ${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월 ${curDate.getDate()}일`; 
    
    const {id} = useParams();
    const [data, setData] = useState();
    const navigate = useNavigate();

    const PostList = useContext(PostStateContext);

    useEffect(() => {
        if(PostList.length >= 1){
            const targetPost = PostList.find((it) => parseInt(it.id) === parseInt(id))
            if(targetPost){
                setData(targetPost);
            }else{
                alert("없는 포스트 입니다!");
                navigate('/', {replace:true});
            }
        }
    },[id, PostList]);
    

    if(!data){
        return <div className = "BlogPage">로딩중</div>;
    }else {
        return (
        <div className= "BlogPage">
            <MyHeader headTitle={data.title.slice(0,10)}
            leftChild = {<MyButton text ={"뒤로가기"} onClick = {() => navigate(-1)}/>}
            rightChild = {<MyButton text = {"수정하기"} onClick = {() => navigate(`/edit/${data.id}`)} />}
            todayDate = {TodayDate}
            />
            <section>
                <h4>POST</h4>
                <div className="this_post">
                    <p>{data.content}</p>
                </div>
            </section>
        </div>
        );
    }

};

export default BlogPage;