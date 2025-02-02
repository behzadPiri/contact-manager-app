import {Foreground} from "../../../helpers/Colors";

const Spinner = () => {
    return (
        <>
            <img
                className="d-block mx-auto mt-5"
                src={require("../../../assets/gifs/Spinner.gif")}
                alt="لطفا منتظر بمانید..."
                style={{width: "13rem"}}
            />
            <p className="m-auto h3 mt-3 fw-bold" style={{color:Foreground}}>لطفا منتظر بمایند... </p>
        </>
    );
};

export default Spinner
