import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import {useContext, useEffect, useState} from 'react';
import PostList from "../components/PostList";
import { DiaryDispatchContext, DiaryStateContext } from "../App";

const MainPage = () =>{

    const postList = useContext(DiaryStateContext);
    
    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const TodayDate =`Today : ${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월 ${curDate.getDate()}일`; 
   
    useEffect(()=> {
        setData(postList);
    }, [PostList])
    
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