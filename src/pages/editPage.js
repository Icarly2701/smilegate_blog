import { useNavigate, useParams } from "react-router-dom";
import {useContext, useEffect, useState} from 'react';
import {PostStateContext } from "../App";
import PostEditMake from "../components/PostEditMake";
const EditPage = () => {

    const [originData, setOriginData] = useState();
    const navigate = useNavigate();
    const {id} = useParams();

    const PostList = useContext(PostStateContext);
    
    useEffect(() => {
        if(PostList.length >= 1){
            const targetPost = PostList.find((it) => parseInt(it.id) === parseInt(id))
        
            if(targetPost){
                setOriginData(targetPost);
            }else{
                navigate('/', {replace:true});
            }
        }


    },[id, PostList]);

    return (
        <div className="editPage">
            {originData && <PostEditMake isEdit={true} originData = {originData} />}
        </div>
    );
};

export default EditPage;