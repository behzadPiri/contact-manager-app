import {createContext} from 'react'

const ContextContact = createContext({
    loading: false,
    setLoading: () => {
    },
    contact: {},
    setContact: () => {
    },
    contacts: [],
    setContacts: () => {
    },
    filteredContacts: [],
    setFilteredContacts: () => {
    },
    groups: [],
    contactQuery: {},
    onContactChange: () => {
    },
    deleteContact: () => {
    },
    createContact: () => {
    },
    contactSearch: () => {
    },
})

export default ContextContact
