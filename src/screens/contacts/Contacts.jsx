import {useContext} from "react";
import {CurrentLine, Orange, Pink} from "../../helpers/Colors";
import {Contact, Spinner} from "../../ui";
import {Link} from "react-router-dom";
import ContextContact from "../../context/ContextContact";

const Contacts = () => {

    const {loading, deleteContact, filteredContacts} = useContext(ContextContact);
    return (
        <>
            <section className="container mt-3">
                <article className='grid'>
                    <div className="row">
                        <div className="col">
                            <p className="h3">
                                <Link className="btn mx-2" style={{backgroundColor: Pink}} to={"/contacts/add"}>
                                    اضافه کردن مخاطب جدید
                                    <i className="fa fa-user-plus mx-2"/>
                                </Link>
                            </p>
                        </div>
                    </div>
                </article>
            </section>


            {
                loading ? <Spinner/> : (
                    <section className="container">
                        <article className='row'>
                            {
                                filteredContacts.length > 0 ? (
                                    filteredContacts.map(contact => (
                                        <Contact
                                            key={contact.id}
                                            contact={contact}
                                            deleteContact={() => deleteContact(contact.id, contact.fullname)}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-5 mt-3 rounded"
                                         style={{backgroundColor: CurrentLine}}>
                                        <img className="w-25" src={require("../../assets/gifs/no-found.gif")}
                                             alt="مخاطب یافت نشد"/>
                                        <p className="h3 mt-3" style={{color: Orange}}>مخاطبی یافت نشد...</p>
                                    </div>
                                )
                            }

                        </article>
                    </section>
                )
            }

        </>
    );
};

export default Contacts
