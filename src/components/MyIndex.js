import MyButton from "./MyButton";
import {useState, useRef} from "react";

const MyIndex = () => {

    const [content, setContent] = useState("");
    const contentRef = useRef();
    const categoryName = [
        "기본", "오이야"
    ];

    const addCategory = (Cont) => {
        categoryName.push(Cont);
        console.log(categoryName[2]);
    };

    return(
        <div className="MyIndex">
            <div className="mainIndex">
                목차
            </div>
            <select className= "Category">
                {categoryName.map((e) => (
                    <option value = {e}>
                        {e}
                    </option>
                ))}
            </select>
            <p />
            <textarea placeholder="새로운 카테고리" ref = {contentRef} value= {content}
            onChange= {(e) => setContent(e.target.value)}/>
            <MyButton type={"Good"} text = {"+"} onClick = {addCategory(content)}/>
        </div>
    );
}

export default MyIndex;