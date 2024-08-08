import localforage from "localforage";
import {matchSorter} from "match-sorter";
import sortBy from "sort-by";

function set(contacts) {
    return localforage.setItem("contacts", contacts);
  }

export async function createContact(){
    await fakeNetwork();
    let id = Math.random().toString(36).substring(2,9);
    let contact = {id, createdAt: Date.now()};
    let contacts = await getContacts();
    contacts.unshift(contact);
    await set(contacts);
    return contact;
}

export async function getContacts(query) {

    await fakeNetwork('getContacts:${query}');
    let contacts = await localforage.getItem("contacts");
    if(!contacts) contacts = [];
    if(query){
        contacts = matchSorter(contacts, query, {keys: ["first", "last"]});
    }
    return contacts.sort(sortBy("last", "createdAt"));
}

export async function updateContact(id, updates){
    await fakeNetwork();
    let contacts = await localforage.getItem("contacts");
    let contact = contacts.find(contact => contact.id === id); 
    if (!contact) throw new Error("No contact found for", id);
    Object.assign(contact, updates);
    await set(contacts);
    return contact;
} //burada kaldım

let fakeCache = {}

async function fakeNetwork(key){

    if(!key){
        fakeCache = {}
    }
    if (fakeCache[key]){ 
        return;
    }
    fakeCache[key] = true;
    return new Promise(res =>
         {setTimeout(res, Math.random() * 800)})
}

