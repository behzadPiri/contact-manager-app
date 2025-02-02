import {useEffect, useState} from 'react'
import {Navigate, Route, Routes, useNavigate, useSearchParams} from "react-router-dom";
import './App.css';
import {CreateContact, DeleteContact, GetAllContacts, GetAllGroups,} from "./services/contacts";
import {confirmAlert} from "react-confirm-alert"
import {Comment, CurrentLine, Foreground, Purple, Yellow} from "./helpers/Colors";
import ContextContact from "./context/ContextContact";
import {Navbar} from "./ui";
import {AddContact, Contacts, EditContact, ViewContact} from "./screens";
import debounce from "lodash/debounce";
import {toast, ToastContainer, } from "react-toastify";

const App = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true)
    const [contacts, setContacts] = useState([]);
    const [groups, setGroups] = useState([]);
    const [contactQuery, setContactQuery] = useSearchParams();
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [contact, setContact] = useState({});


    useEffect(() => {

        const fetchData = async () => {
            try {
                const {data: contactsData} = await GetAllContacts()
                const {data: groupsData} = await GetAllGroups()
                setGroups(groupsData);
                setFilteredContacts(contactsData)
                setContacts(contactsData);
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false)
            }

        }
        fetchData();
    }, [])


    const createContact = async (values) => {
        setLoading(true)
        try {
            const {status, data} = await CreateContact(values)
            if (status === 201) {
                toast.success("مخاطب جدید ایجاد گردید")
                const allContacts = [...contacts, data]
                setContacts(allContacts);
                setFilteredContacts(allContacts);
                navigate("/contacts")
            }
        } catch (err) {
            console.log("error", err)
        } finally {
            setLoading(false)
        }
    }


    const onContactChange = (event) => {
        setContact({...contact, [event.target.name]: event.target.value})
    }


    const confirmDelete = (contactId, fullName) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className="p-4" style={{backgroundColor: CurrentLine, border: `1px solid ${Purple}`}}>
                        <h1 style={{color: Yellow}}>حذف مخاطب</h1>
                        <p style={{color: Foreground}}>
                            آیا از حذف مخاطب {fullName} مطمئن هستید؟
                        </p>
                        <button
                            className="btn mx-2"
                            style={{backgroundColor: Purple}}
                            onClick={() => {
                                removeContact(contactId)
                                onClose()
                            }}>
                            مطمئن هستم
                        </button>
                        <button className="btn" style={{backgroundColor: Comment}} onClick={onClose}>
                            انصراف
                        </button>
                    </div>
                )
            }
        })
    }


    const removeContact = async (contactId) => {
        setLoading(true)
        const allContacts = [...contacts]
        const filterContacts = contacts?.filter(contact => contact?.id !== parseInt(contactId));
        setContacts(filterContacts);
        setFilteredContacts(filterContacts);
        toast.success("مخاطب با موفقیت حذف کردید.")
        try {
            const {status} = await DeleteContact(contactId);
            if (status !== 200) {

                setContacts(allContacts);
                setFilteredContacts(allContacts);
            }
        } catch (err) {
            console.log("error", err.message)
            setContacts(allContacts);
            setFilteredContacts(allContacts);
        } finally {
            setLoading(false)
        }
    }


    const searchContact = debounce(query => {

        setContactQuery({query})
        if (!query) {
            setContactQuery("")
            setFilteredContacts([...contacts]);
        }
        setFilteredContacts(contacts.filter(
            contact => contact.fullname.toLowerCase().includes(query.toLowerCase())
        ))
    }, 2000)


    return (

        <ContextContact.Provider value={{
            loading,
            setLoading,
            contact,
            setContact,
            contacts,
            groups,
            filteredContacts,
            deleteContact: confirmDelete,
            setContacts,
            setFilteredContacts,
            contactQuery,
            createContact,
            onContactChange,
            contactSearch: searchContact,
        }}>

            <div className="App">

                <Navbar/>
                <ToastContainer
                    rtl
                    theme="light"
                    position="top-right"
                    toastStyle={{fontFamily: "Vazir"}}

                />
                <Routes>
                    <Route path="/" element={<Navigate to={"contacts"}/>}/>
                    <Route path={`/contacts`} element={<Contacts/>}/>
                    <Route path="/contacts/add" element={<AddContact/>}/>
                    <Route path="/contacts/:contactId" element={<ViewContact/>}/>
                    <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>
                </Routes>
            </div>

        </ContextContact.Provider>


    );
}

export default App;
