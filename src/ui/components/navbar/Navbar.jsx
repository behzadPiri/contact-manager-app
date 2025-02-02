import {useLocation} from "react-router-dom";
import {SearchNavbar} from "../../index";
import {Background, Purple} from "../../../helpers/Colors";

const Navbar = () => {

    const location = useLocation();

    return (
        <nav className="navbar navbar-dark navbar-expand-sm shadow-lg" style={{backgroundColor: Background}}>
            <div className="container">
                <div className="row w-100 py-2">
                    <div className="col ">
                        <div className="navbar-brand">
                            <i className="fa fa-id-badge" style={{color: Purple}}/>
                            <span>{" "} وب اپلیکیشن مدیریت {" "}</span>
                            <span style={{color: Purple}}>مخاطبین</span>
                        </div>
                    </div>
                    {
                        location.pathname === "/contacts" && (
                            <div className="col">
                                <SearchNavbar/>
                            </div>
                        )
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar
