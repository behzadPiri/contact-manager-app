import {useContext} from "react";
import {Background, Purple} from "../../../helpers/Colors";
import ContextContact from "../../../context/ContextContact";



const SearchNavbar = () => {

    const {contactQuery,contactSearch}=useContext(ContextContact)

    return (
        <div className="input-group w-75 " dir="ltr">
            <span
                className="input-group-text"
                id="basic-addon1"
                style={{backgroundColor: Purple, borderColor: Purple}}
            >
                <i className={"fa fa-search"} style={{color: Background}}/>
            </span>
            <input
                dir="rtl"
                type="text"
                // value={contactQuery.get("search")}
                onChange={(event)=>contactSearch(event.target.value)}
                className="form-control"
                aria-describedby="basic-addon1"
                aria-label="Search"
                placeholder="جستجو مخاطب"
            />
        </div>
    );
};

export default SearchNavbar
