import React, { useEffect, useState } from 'react'
import { useUser } from '../../../context/Users.context';

export default function Contacts() {

    const { addContact, contacts, handleContactsEdit, handleContactsDelete, editContact,handleContactsSaveEdit,handleContactsCancelEdit } = useUser();
    const [editedContact, setEditedContact] = useState({ ...editContact });

    // Update local state when the event prop changes
    useEffect(() => {
        setEditedContact({ ...editContact });
    }, [editContact]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedContact({ ...editedContact, [name]: value });
    };

    const handleSave = () => {
        handleContactsSaveEdit(editedContact);
        handleContactsCancelEdit();
    };

    const [contact, setContact] = useState({
        name: '',
        email: '',
        number: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        addContact(contact);
        setContact({
            name: '',
            email: '',
            address: '',
            number: '',
        });
    };
    return (
        <div>
            <h1 className='text-center text-3xl font-bold mt-2 mb-2'>Contacts</h1>
            <div className='grid grid-cols-3 gap-5 p-4'>
                <div className='col-span-3 sm:col-span-1'>
                    <div className="bg-gray-100 p-4 rounded shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-center">Add Contacts</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <label className="block text-gray-700">Name :</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={contact.name}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700">Email :</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={contact.email}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700">Number :</label>
                                <input
                                    type="text"
                                    name="number"
                                    value={contact.number}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700">Address :</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={contact.address}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div className='text-center'>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                                >
                                    Add contact
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className='col-span-3 sm:col-span-2'>
                    <div className="bg-gray-100 p-4 rounded shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-center">Contacts List</h2>
                        <ul className="mt-4">
                            {contacts.map((contact, index) => (
                                <li key={index} className="flex items-center justify-between border-b p-2">
                                    <div>{contact.name} - {contact.email} - {contact.number}</div>
                                    <div>
                                    <button onClick={() => handleContactsEdit(contact)} className="bg-indigo-500 text-white ps-3 pe-3 p-2 me-3 rounded hover:bg-red-700">
                                        Edit
                                    </button>
                                    <button onClick={() => handleContactsDelete(contact)} className="bg-red-500 text-white p-2 rounded hover:bg-red-700">
                                        Delete
                                    </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {editContact && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
                        <div className="bg-gray-100 p-4 rounded shadow-md w-96">
                            <h2 className="text-xl font-semibold mb-4">Edit Contact</h2>
                            <form onSubmit={handleSave}>
                                <div className="mb-2">
                                    <label className="block text-gray-700">Name :</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editedContact.name}
                                        onChange={handleEditChange}
                                        className="w-full border p-2 rounded"
                                        disabled
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-gray-700">Email :</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editedContact.email}
                                        onChange={handleEditChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-gray-700">Number :</label>
                                    <input
                                        type="text"
                                        name="number"
                                        value={editedContact.number}
                                        onChange={handleEditChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-gray-700">Address :</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={editedContact.address}
                                        onChange={handleEditChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                                <div className='text-center'>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white p-2 rounded hover:bg-green-700 mr-2"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={handleContactsCancelEdit}
                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                                >
                                    Cancel
                                </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
