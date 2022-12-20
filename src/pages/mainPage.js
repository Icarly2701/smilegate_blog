import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton"
import {useState} from 'react';
import MyIndex from "../components/MyIndex";
import PostList from "../components/PostList";

const MainPage = () =>{
    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const curDate1 = new Date();
    return(
    <div className="mainPage">
        <MyHeader  headTitle = {"스마일게이트"}
            todayDate = {`Today : ${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`} 
            rightChild = {<MyButton text = "관리자" type = "default"/>}
        />
        <PostList postList = {data}/>

    </div>
    );
}

export default MainPage;