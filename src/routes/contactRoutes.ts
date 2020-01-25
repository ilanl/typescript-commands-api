import { 
    addNewContact, 
    getContacts, 
    getContactWithID, 
    updateContact,
    deleteContact 
} from '../controllers/contactController';

export const contactRoutes = (app) => {

    app.route('/contact')
    .get(getContacts)
    .post(addNewContact);

    app.route('/contact/:contactId')
    .get(getContactWithID)
    .put(updateContact)
    .delete(deleteContact);
};
