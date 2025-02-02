import {useContext, useEffect, useState} from 'react';
import {Spinner} from "../../ui";
import {Comment, CurrentLine, Orange, Purple} from "../../helpers/Colors";
import {Link, useNavigate, useParams} from "react-router-dom";
import {GetContact, UpdateContact} from "../../services/contacts";
import ContextContact from "../../context/ContextContact";
import {Formik, Form, ErrorMessage, Field} from "formik";
import ContactValidation from "../../validation/contactValidation";
import {toast} from "react-toastify";


const EditContact = () => {

    const {loading, setLoading, groups, contacts, setContacts, setFilteredContacts} = useContext(ContextContact)

    const {contactId} = useParams();
    const navigate = useNavigate();

    const [contact, setContact] = useState({});

    useEffect(() => {

        const fetchData = async () => {
            try {
                const {data: contactsData} = await GetContact(contactId);
                setContact(contactsData)

            } catch (e) {
                console.log("error", e.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])


    const submitForm = async (values) => {
        setLoading(true)
        const allContacts = [...contacts]

        try {
            const {data, status} = await UpdateContact(contactId, values);

            const findIndexContact = allContacts.findIndex(contact => contact.id === parseInt(contactId));
            allContacts[findIndexContact] = {...data};
            setContacts(allContacts);
            setFilteredContacts(allContacts)
            toast.info("مخاطب با موفقیت ویرایش گردید.")
            if (status === 200) {
                navigate("/contacts")
            } else {
                setContacts(contacts)
                setFilteredContacts(contacts)
            }

        } catch (e) {
            console.log("error", e.message);
            setContacts(contacts)
            setFilteredContacts(contacts)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {loading ? (
                <Spinner/>
            ) : (
                <>
                    <section className="p-3">
                        <div className="container">
                            <div className="row my-2">
                                <div className="col text-center">
                                    <p className="h4 fw-bold" style={{color: Orange}}>
                                        ویرایش مخاطب
                                    </p>
                                </div>
                            </div>
                            <hr style={{backgroundColor: Orange}}/>
                            <div
                                className="row p-2 w-75 mx-auto align-items-center"
                                style={{backgroundColor: CurrentLine, borderRadius: "1em"}}
                            >
                                <div className="col-md-8">
                                    <Formik
                                        enableReinitialize
                                        initialValues={contact}
                                        onSubmit={(values) => submitForm(values)}
                                        validationSchema={ContactValidation}
                                    >
                                        <Form>

                                            <div className="mb-2">
                                                <Field
                                                    type="text"
                                                    name="fullname"
                                                    className="form-control"
                                                    placeholder="نام و نام خانوادگی"
                                                />
                                                <ErrorMessage
                                                    name="fullname"
                                                    render={
                                                        error =>
                                                            <p className="text-end text-danger w-75 mt-2"
                                                               style={{fontSize: 12}}>{error}</p>
                                                    }
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    name="photo"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="آدرس تصویر"
                                                />
                                                <ErrorMessage
                                                    name="photo"
                                                    render={
                                                        error =>
                                                            <p className="text-end text-danger w-75 mt-2"
                                                               style={{fontSize: 12}}>{error}</p>
                                                    }
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    name="mobile"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="شماره موبایل"
                                                />
                                                <ErrorMessage
                                                    name="mobile"
                                                    render={
                                                        error =>
                                                            <p className="text-end text-danger w-75 mt-2"
                                                               style={{fontSize: 12}}>{error}</p>
                                                    }
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    name="email"
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="آدرس ایمیل"
                                                />
                                                <ErrorMessage
                                                    name="email"
                                                    render={
                                                        error =>
                                                            <p className="text-end text-danger w-75 mt-2"
                                                               style={{fontSize: 12}}>{error}</p>
                                                    }
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    name="job"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="شغل"
                                                />
                                                <ErrorMessage
                                                    name="job"
                                                    render={
                                                        error =>
                                                            <p className="text-end text-danger w-75 mt-2"
                                                               style={{fontSize: 12}}>{error}</p>
                                                    }
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    as="select"
                                                    name="group"
                                                    className="form-control"
                                                >
                                                    <option value="">انتخاب گروه</option>
                                                    {groups.length > 0 &&
                                                        groups.map((group) => (
                                                            <option key={group.id} value={group.id}>
                                                                {group.name}
                                                            </option>
                                                        ))}
                                                </Field>
                                                <ErrorMessage
                                                    name="group"
                                                    render={
                                                        error =>
                                                            <p className="text-end text-danger w-75 mt-2"
                                                               style={{fontSize: 12}}>{error}</p>
                                                    }
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    type="submit"
                                                    className="btn"
                                                    style={{backgroundColor: Purple}}
                                                    value="ویرایش مخاطب"
                                                />
                                                <Link
                                                    to={"/contacts"}
                                                    className="btn mx-2"
                                                    style={{backgroundColor: Comment}}
                                                >
                                                    انصراف
                                                </Link>
                                            </div>
                                        </Form>
                                    </Formik>


                                </div>
                                <div className="col-md-4">
                                    <img
                                        alt={contact.fullname}
                                        src={contact.photo}
                                        className="img-fluid rounded"
                                        style={{border: `1px solid ${Purple}`}}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-1">
                            <img
                                alt={"edit_photo"}
                                src={require("../../assets/images/man-taking-note.png")}
                                height="300px"
                                style={{opacity: "60%"}}
                            />
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default EditContact
