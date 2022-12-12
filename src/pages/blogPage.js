import { useParams } from "react-router-dom";

const blogPage = () => {
    const {id} = useParams();

    return (
    
        <div className="blogPage">
            <h1>blogPage</h1>
        </div>
    );
};

export default blogPage;