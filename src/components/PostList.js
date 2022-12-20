import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된 순" },
];

const ControlMenu =React.memo(({ value, onChange, optionList }) => {
    return (
        <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
            {optionList.map((it, idx) => (
                <option key={idx} value={it.value}>
                    {it.name}
                </option>
            ))}
        </select>
    );
});

const PostList = ({postList}) =>{
    const navigate = useNavigate();
    const [sortType, setSortType] = useState('latest');
    
    const getProcessedDiaryList = () => {

        const compare = (a, b) => {
            if (sortType === 'latest') {
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        }

        const copyList = JSON.parse(JSON.stringify(postList));
        const filteredList = filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it));
        const sortedList = filteredList.sort(compare);
        return sortedList;
    };

    return(
        <div className="PostList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu 
                        value = {sortType}
                        onChange = {setSortType}
                        optionList = {sortOptionList}
                    />
                </div>
                <div className="righ_col">
                    <MyButton type = {'Good'}
                    text = {'New Post'}
                    onClick = {() => navigate("/new")}
                    />
                </div>
            </div>
            {getProcessedDiaryList().map((it) => (
                <PostItem key = {it.id} {...id}/>
            ))}
        </div>
    );
}

export default PostList;