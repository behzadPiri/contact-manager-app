import {CurrentLine, Cyan, Orange, Purple, Red} from "../../../helpers/Colors";
import {Link} from "react-router-dom";

const Contact = ({contact, deleteContact}) => {
    return (
        <div className="col-md-6">
            <div className="card my-2" style={{backgroundColor: CurrentLine}}>
                <div className="card-body">
                    <div className="row align-items-center justify-content-around d-flex">
                        <div className="col-md-4 col-sm-4">
                            <img src={contact.photo} alt={contact.fullname} className="img-fluid rounded "
                                 style={{border: `1px solid ${Purple}`, width: 200, height: 200}}/>
                        </div>
                        <div className="col-md-7 col-sm-7">
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-dark">
                                    نام و نام خانوادگی:{" "}
                                    <span className="fw-bold">{contact?.fullname}</span>
                                </li>
                                <li className="list-group-item list-group-item-dark">
                                    شماره موبایل:{" "}
                                    <span className="fw-bold">{contact.mobile}</span>
                                </li>
                                <li className="list-group-item list-group-item-dark">
                                    آدرس ایمیل:{" "}
                                    <span className="fw-bold">{contact.email}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-1 col-sm-1 flex-column align-items-center d-flex">
                            <Link to={`/contacts/${contact.id}`} className="btn my-1" style={{backgroundColor: Orange}}>
                                <i className="fa fa-eye "/>
                            </Link>
                            <Link to={`/contacts/edit/${contact.id}`} className="btn my-1"
                                  style={{backgroundColor: Cyan}}>
                                <i className="fa fa-pencil "/>
                            </Link>
                            <button onClick={deleteContact} className="btn my-1" style={{backgroundColor: Red}}>
                                <i className="fa fa-trash "/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact
