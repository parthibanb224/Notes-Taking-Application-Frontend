import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';

const UserContext = createContext({
    user: [],
    setUser: () => Promise,
    input: [],
    setInput: () => Promise,
    handleSignup: () => null,
    handleLogin: () => null,
    handleMail: () => null,
    loaded: "",
    setLoaded: () => Promise,
    signinUser: "",
    setSigninUser: () => Promise,
    handleLogout: () => null,
    isLoggedin: Boolean,
    setIsLoggedin: () => Promise,
    open: Boolean,
    setOpen: () => Promise,
    handleUpdateUser: () => null,
    events: [],
    setEvents: () => Promise,
    editEvent: null,
    setEditEvent: () => Promise,
    addEvent: () => null,
    handleCalendarEdit: () => null,
    handleCalendarDelete: () => null,
    handleCalendarCancelEdit: () => null,
    handleCalendarSaveEdit: () => null,
    todos: [],
    setTodos: () => Promise,
    todosDuplicate: [],
    setTododsDuplicate: () => Promise,
    todo: {},
    setTodo: () => Promise,
    mode: "",
    setMode: () => Promise,
    filter: "",
    setFilter: () => Promise,
    handleTodo: () => null,
    handleUpdateTodo: () => null,
    handleDeleteTodo: () => null,
    setSelectedPhoto: () => Promise,
    selectedPhoto: null,
    addContact: () => null,
    contacts: [],
    setContacts: () => Promise,
    handleContactsEdit: () => null,
    handleContactsDelete: () => null,
    handleContactsSaveEdit: () => null,
    handleContactsCancelEdit: () => null,
    editContact: null,
    setEditContact: () => Promise,
    holidayBE: [],
    setHolidayBE: () => Promise,
    notifications: [],
    setNotifications: () => Promise,
})

export const useUser = () => useContext(UserContext);

export default function UsersContextProvider({ children }) {

    const [user, setUser] = useState([]);
    const [input, setInput] = useState(null);
    const [loaded, setLoaded] = useState("");
    const [signinUser, setSigninUser] = useState("");
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [open, setOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const [editEvent, setEditEvent] = useState(null);
    const [todos, setTodos] = useState([]);
    const [todosDuplicate, setTododsDuplicate] = useState([]);
    const [todo, setTodo] = useState({ title: "", description: "", status: "Not Completed" });
    const [mode, setMode] = useState("create");
    const [filter, setFilter] = useState("all");
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [editContact, setEditContact] = useState(null);
    const [holidayBE, setHolidayBE] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/users/${signinUser}` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/users/${signinUser}`;
        axios.get(URL)
            .then(res => {
                // console.log(res.data.result);
                setUser(res.data.result);
            })
            .catch(err => {
                console.log(err);
            })
    }, [signinUser])

    const navigat = useNavigate();
    const handleSignup = (event) => {
        event.preventDefault();
        const SIGNUP_URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/signup/createUser` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/signup/createUser`;
        axios.post(SIGNUP_URL, input)
            .then(res => {
                navigat('/')
            })
            .catch(err => {
                alert("Something Went Wrong")
                console.log("Account Created Failed", err);
            })
    };

    const handleLogin = (event) => {
        event.preventDefault();
        const axiosConfig = {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, private',
            },
        };
        const LOGIN_URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/login` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/login`;
        axios.post(LOGIN_URL, input, axiosConfig)
            .then(res => {
                if (res.data.success) {
                    if (res.data.message === "Login Successful!!") {
                        sessionStorage.setItem("Authorization", res.data.token);
                        var decoded = jwtDecode(res.data.token);
                        // sessionStorage.setItem("Token", JSON.stringify(decoded))
                        setSigninUser(decoded.name);
                        setIsLoggedin(true);
                        navigat('/ApplicationLayout/dashboard', { replace: true });
                    }
                    else {
                        alert("Password is wrong, Try Again!!");
                    }
                }
                else {
                    alert("Account Does not Exists, Please create your account to continue!!");
                }
            })
            .catch(err => {
                alert("Something Went Wrong");
                console.log(err);
            })
    }


    const handleMail = (event) => {
        event.preventDefault();
        // toast("Email Sending.....",{autoClose: 2000,pauseOnHover: false});
        setLoaded("true");
        const FORGOT_URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/forgot` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/forgot`;
        axios.put(FORGOT_URL, input)
            .then(response => {
                if (response.data.success) {
                    setLoaded("false");
                    toast("Email Sending Successfully");
                    // alert(`${response.data.message} => Go to Mail`)
                }
            })
            .catch(err => {
                setLoaded("false");
                toast("Enter Valid Email");
            })
    }

    const handleLogout = async (event) => {
        const axiosConfigs = {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, private',
            },
        };
        const LOGOUT_URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/login/logout` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/login/logout`;
        await axios.post(LOGOUT_URL, axiosConfigs)
            .then(res => {
                if (res.data === "Logged out successfully") {
                    setIsLoggedin(false);
                    sessionStorage.removeItem('Authorization');
                    navigat('/', { replace: true });
                }
            })
            .catch(err => console.log(err))
    }

    const handleUpdateUser = (event) => {
        event.preventDefault();
        setUser({ ...user, ...input })
        const URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/updateUser/${signinUser}` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/updateUser/${signinUser}`;
        axios.patch(URL, input)
            .then(response => {
                if (response.data.success) {
                    toast("Updated Successfully", { className: "update-toast-message" });
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        const URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/calendarEvent/${signinUser}` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/calendarEvent/${signinUser}`;
        axios.get(URL)
            .then(res => {
                setEvents(res.data.result);
            })
            .catch(err => {
                console.log(err)
            })
    }, [signinUser])

    const addEvent = (newEvent) => {
        const URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/calendarEvent/add/${signinUser}` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/calendarEvent/add/${signinUser}`;
        axios.post(URL, newEvent)
            .then(res => {

            })
            .catch(err => {
                console.log(err)
            })
        setEvents([...events, newEvent]);
    };

    const handleCalendarEdit = (event) => {
        setEditEvent(event);
    };

    const handleCalendarDelete = (event) => {
        const URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/calendarEvent/delete/${signinUser}/${event.title}` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/calendarEvent/delete/${signinUser}/${event.title}`;
        axios.delete(URL)
            .then(res => {
                const updatedEvents = events.filter((e) => e !== event);
                setEvents(updatedEvents);
            })
            .catch(err => {
                console.log(err);
            })
    };

    const handleCalendarSaveEdit = (editedEvent) => {
        const URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/calendarEvent/edit/${signinUser}/${editEvent.title}` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/calendarEvent/edit/${signinUser}/${editEvent.title}`;
        axios.patch(URL, editedEvent)
            .then(res => {

            })
            .catch(err => {
                console.log(err)
            })
        const updatedEvents = events.map((e) =>
            e === editEvent ? { ...editedEvent } : e
        );
        setEvents(updatedEvents);
        setEditEvent(null);
    };

    const handleCalendarCancelEdit = () => {
        setEditEvent(null);
    };

    useEffect(() => {
        const URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/todo/${signinUser}` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/todo/${signinUser}`;
        axios.get(URL)
            .then(res => {
                setTodos(res.data.result);
            })
            .catch(err => {
                console.log(err)
            })
    }, [signinUser])

    function handleTodo(event) {
        event.preventDefault();
        const todosCopy = [...todos];
        todosCopy.push(todo);
        setTodos(todosCopy);
        setTododsDuplicate(todosCopy);
        const URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/todo/add/${signinUser}` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/todo/add/${signinUser}`;
        axios.post(URL, todo)
            .then(res => {
                setTodo({});
            })
            .catch(err => {
                console.log(err)
            })
    }

    function handleUpdateTodo(event) {
        event.preventDefault();
        if (mode === "edit") {
            let todosCopy = [...todos];
            let matchedData = todosCopy.filter((d) => d.title !== todo.title);
            matchedData.push(todo);
            setTodos(matchedData);
            setTododsDuplicate(matchedData);
            setMode("create");
            setTodo({});
            const URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/todo/edit/${signinUser}/${todo.title}` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/todo/edit/${signinUser}/${todo.title}`;
            axios.patch(URL, todo)
                .then(res => {

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    function handleDeleteTodo(title = "") {
        let todosCopy = [...todos];
        let matchedData = todosCopy.filter((d) => d.title !== title);
        setTodos(matchedData);
        const URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/todo/delete/${signinUser}/${title}` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/todo/delete/${signinUser}/${title}`;
        axios.delete(URL)
            .then(res => {

            })
            .catch(err => {
                console.log(err);
            })
    }


    useEffect(() => {
        const URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/contacts/${signinUser}` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/contacts/${signinUser}`;
        axios.get(URL)
            .then(res => {
                setContacts(res.data.result);
            })
            .catch(err => {
                console.log(err)
            })
    }, [signinUser])

    const addContact = (newContact) => {
        const URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/contacts/add/${signinUser}` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/contacts/add/${signinUser}`;
        axios.post(URL, newContact)
            .then(res => {
            })
            .catch(err => {
                console.log("AddContact Error", err)
            })
        setContacts([...contacts, newContact]);
    };

    const handleContactsEdit = (contact) => {
        setEditContact(contact);
    };

    const handleContactsDelete = (contact) => {
        const URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/contacts/delete/${signinUser}/${contact.name}` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/contacts/delete/${signinUser}/${contact.name}`;
        axios.delete(URL)
            .then(res => {
                const updatedContacts = contacts.filter((e) => e !== contact);
                setContacts(updatedContacts);
            })
            .catch(err => {
                console.log(err);
            })
    };

    const handleContactsSaveEdit = (editedContact) => {
        const URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/contacts/edit/${signinUser}/${editedContact.name}` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/contacts/edit/${signinUser}/${editedContact.name}`;
        axios.patch(URL, editedContact)
            .then(res => {
                const updatedEvents = contacts.map((e) =>
                    e === editContact ? { ...editedContact } : e
                );
                setContacts(updatedEvents);
                setEditContact(null);
            })
            .catch(err => {
                console.log(err)
            })
    };

    const handleContactsCancelEdit = () => {
        setEditContact(null);
    };


    useEffect(() => {
        const URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/festival/get` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/festival/get`;
        axios.get(URL)
            .then(res => {
                setHolidayBE(res.data.result);
            })
            .catch(err => {
                console.log(err)
            })
    }, [signinUser])

    useEffect(() => {
        const date = new Date();
        let currentDay = String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
        let currentYear = date.getFullYear();
        let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

        let matchedDate = events.filter(e => e.date === currentDate);
        setNotifications(matchedDate)
    }, [events])



    const value = {
        user,
        setUser,
        input,
        setInput,
        handleSignup,
        handleLogin,
        handleMail,
        loaded,
        signinUser,
        setSigninUser,
        isLoggedin,
        handleLogout,
        setIsLoggedin,
        open,
        setOpen,
        handleUpdateUser,
        events,
        setEvents,
        editEvent,
        setEditEvent,
        addEvent,
        handleCalendarEdit,
        handleCalendarDelete,
        handleCalendarCancelEdit,
        handleCalendarSaveEdit,
        todo,
        todos,
        mode,
        filter,
        setFilter,
        setMode,
        setTodo,
        setTodos,
        handleTodo,
        handleUpdateTodo,
        handleDeleteTodo,
        selectedPhoto,
        setSelectedPhoto,
        addContact,
        contacts,
        setContacts,
        handleContactsCancelEdit,
        handleContactsDelete,
        handleContactsEdit,
        handleContactsSaveEdit,
        editContact,
        setEditContact,
        holidayBE,
        setHolidayBE,
        todosDuplicate,
        setTododsDuplicate,
        notifications,
        setNotifications,
    }

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}
