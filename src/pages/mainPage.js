import MyHeader from "../components/MyHeader";
import {useContext, useEffect, useState} from 'react';
import PostList from "../components/PostList";
import {PostStateContext } from "../App";

const MainPage = () =>{

    const postList = useContext(PostStateContext);
    const [data, setData] = useState([]);
    const curDate = new Date();
    const TodayDate =`Today : ${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월 ${curDate.getDate()}일`; 
   
    useEffect(()=> {
        setData(postList);
    }, [postList])
    
    return(
        <div className="mainPage">
            <MyHeader  headTitle = {"작은블로그"}
                todayDate = {TodayDate}
            />
            <PostList postList={data}/>
        </div>
    );
}

export default MainPage;