const MyButton = ({text, type, onClick}) => {
    const btnType = ['Good', 'Bad'].includes(type)?type : 'default';
    console.log(btnType);
    return(
        <button className={['MyButton', `MyButton_${btnType}`].join(" ")}
        onClick = {onClick}>
            {text}
        </button>
    );
};

MyButton.defaultProps = {
    type: "default",
}

export default MyButton;