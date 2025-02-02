import axios from 'axios';

const SERVISES_URL = 'http://localhost:9000';

export const GetAllContacts = () => {
    const url = `${SERVISES_URL}/contacts`;
    return axios.get(url);
};


export const GetContact = (contactId) => {
    const url = `${SERVISES_URL}/contacts/${contactId}`;
    return axios.get(url);
};


export const GetAllGroups = () => {
    const url = `${SERVISES_URL}/groups`;
    return axios.get(url);
};


export const GetGroup = (groupsId) => {
    const url = `${SERVISES_URL}/groups/${groupsId}`;
    return axios.get(url);
}

export const CreateContact = (contact) => {
    const url = `${SERVISES_URL}/contacts`;
    return axios.post(url, contact);
}

export const UpdateContact = (contactId, contact) => {
    const url = `${SERVISES_URL}/contacts/${contactId}`;
    return axios.put(url, contact);
}

export const DeleteContact = (contactId) => {
    const url = `${SERVISES_URL}/contacts/${contactId}`;
    return axios.delete(url);
}
