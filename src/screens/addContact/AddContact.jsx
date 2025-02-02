import {Comment, Foreground, Green, Purple} from "../../helpers/Colors";
import {Link} from "react-router-dom";
import {useContext} from "react";
import ContextContact from "../../context/ContextContact";
import {Form, Formik, Field, ErrorMessage} from "formik";
import ContactValidation from "../../validation/contactValidation";

const AddContact = () => {

    const {groups, createContact} = useContext(ContextContact);

    const initialValues = {
        fullname: "",
        email: "",
        photo: "",
        mobile: "",
        job: "",
        group: ""
    }

    return (
        <section>
            <article className="py-3">
                <p className="h4 fw-bold text-center mb-1" style={{color: Green}}>
                    ساخت مخاطب جدید
                </p>
                <hr style={{backgroundColor: Green}}/>

            </article>
            <article className="container">
                <div className="row">

                    <div className="col">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values) => createContact(values)}
                            validationSchema={ContactValidation}>

                            <Form>

                                <div className="mb-2">
                                    <Field
                                        type="text"
                                        name="fullname"
                                        className="form-control w-75"
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
                                        type="text"
                                        name="photo"
                                        placeholder="آدرس تصویر"
                                        className="form-control w-75"
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
                                        type="number"
                                        name="mobile"
                                        placeholder="شماره موبایل"
                                        className="form-control w-75"
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
                                        type="email"
                                        name="email"
                                        placeholder="آدرس ایمیل"
                                        className="form-control w-75"
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
                                        placeholder="شغل"
                                        className="form-control w-75"
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
                                        name='group'
                                        as="select"
                                        className="form-control w-75"
                                    >
                                        <option value="">انتخاب گروه</option>
                                        {
                                            groups.length > 0 && (
                                                groups.map((group) => (
                                                    <option key={group.id} value={group.id}>{group.name}</option>
                                                ))
                                            )
                                        }
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

                                <div className="mt-4 text-end">
                                    <input
                                        type="submit"
                                        className="btn"
                                        value="ساخت مخاطب"
                                        style={{backgroundColor: Purple}}
                                    />
                                    <Link
                                        to="/contacts"
                                        style={{backgroundColor: Comment, color: Foreground}}
                                        className="btn mx-2">
                                        انصراف
                                    </Link>
                                </div>

                            </Form>

                        </Formik>


                    </div>

                    <div className="col">
                        <img src={require("../../assets/images/man-taking-note.png")} height="400px"
                             alt="create contact"/>
                    </div>
                </div>
            </article>
        </section>
    );
};

export default AddContact
