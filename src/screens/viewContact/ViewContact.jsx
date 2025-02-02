import {useEffect, useState,useContext} from 'react'
import {Spinner} from "../../ui";
import {Link, useParams} from "react-router-dom";
import {GetContact, GetGroup} from "../../services/contacts";
import {CurrentLine, Cyan, Purple} from "../../helpers/Colors";
import ContextContact from "../../context/ContextContact";

const ViewContact = () => {

    const {contactId} = useParams()
    const {loading,setLoading} = useContext(ContextContact);
    const [contact, setContact] = useState({});
    const [group, setGroup] = useState({});


    const fetchData = async () => {
        try {
            const {data: contactData} = await GetContact(contactId);
            const {data: groupData} = await GetGroup(contactData?.group);
            setContact(contactData);
            setGroup(groupData);

        } catch (e) {
            console.log("error", e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    },[])


    return (
        <>
            {
                loading ? <Spinner/> :
                    <>
                        <section className="view-contact-intro pt-3">
                            <article className="container">
                                <div className="row my-3 text-center">
                                    <p className="h4 fw-bold " style={{color: Cyan}}>
                                        اطلاعات مخاطب
                                    </p>
                                </div>
                            </article>
                        </section>

                        <hr style={{backgroundColor: Cyan}}/>

                        {
                            Object.keys(contact).length > 0 && (
                                <section className="view-contact mt-e">
                                    <div
                                        className="container p-2"
                                        style={{borderRadius: "1em", backgroundColor: CurrentLine}}
                                    >
                                        <div className="row align-items-center">
                                            <div className="col-md-3">
                                                <img
                                                    src={contact.photo}
                                                    alt=""
                                                    className="img-fluid rounded"
                                                    style={{border: `1px solid ${Purple}`}}
                                                />
                                            </div>
                                            <div className="col-md-9">
                                                <ul className="list-group">
                                                    <li className="list-group-item list-group-item-dark">
                                                        نام و نام خانوادگی :{" "}
                                                        <span className="fw-bold">{contact.fullname}</span>
                                                    </li>
                                                    <li className="list-group-item list-group-item-dark">
                                                        شماره موبایل :{" "}
                                                        <span className="fw-bold">{contact.mobile}</span>
                                                    </li>
                                                    <li className="list-group-item list-group-item-dark">
                                                        ایمیل : <span className="fw-bold">{contact.email}</span>
                                                    </li>
                                                    <li className="list-group-item list-group-item-dark">
                                                        شغل : <span className="fw-bold">{contact.job}</span>
                                                    </li>
                                                    <li className="list-group-item list-group-item-dark">
                                                        گروه : <span className="fw-bold">{group.name}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="row my-2">
                                            <div className="d-grid gap-2 col-6 mx-auto">
                                                <Link
                                                    to={"/contacts"}
                                                    className="btn"
                                                    style={{backgroundColor: Purple}}
                                                >
                                                    برگشت به صفحه اصلی
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )
                        }
                    </>
            }
        </>
    );
};

export default ViewContact
