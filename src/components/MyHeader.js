const MyHeader = ({headTitle, todayDate, leftChild, rightChild}) => {
    
    return(
        <header>
            <div className="head_left_btn">
                {leftChild}
            </div>
            <div className="today_date">
                {todayDate}
            </div>
            <div className="head_title">
                {headTitle}
            </div>
            <div className="head_right_btn">
                {rightChild}
            </div>
        </header>
    );
};

export default MyHeader;