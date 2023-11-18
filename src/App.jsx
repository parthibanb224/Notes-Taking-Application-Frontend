import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Authendication/Login';
import Signup from './pages/Authendication/Signup';
import Forgot from './pages/Authendication/Forgot';
import ApplicationLayout from './pages/Application/ApplicationLayout';
import ResetPassword from './pages/Authendication/ResetPassword';
import Dashboard from './pages/Application/pages/Dasboard';
import MyAccount from './pages/Application/pages/MyAccount';
import { useUser } from './context/Users.context';
import Documentation from './pages/Application/pages/Documentation';
import MyCalendar from './pages/Application/pages/MyCalendar';
import Todos from './pages/Application/pages/Todos'
import Contacts from './pages/Application/pages/Contacts';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';

function App() {

  const { isLoggedin, setIsLoggedin, setSigninUser } = useUser();
  useEffect(() => {
    let token = sessionStorage.getItem("Authorization");
    if (token) {
      var decoded = jwtDecode(token);
      setSigninUser(decoded.name);
      setIsLoggedin(true);
    }
  }, [])

  return (
    <div>
      <Routes>
        {!isLoggedin ? (
          <>
            <Route path='/' Component={Login}></Route>
            <Route path='/signup' Component={Signup}></Route>
            <Route path='/forgot' Component={Forgot}></Route>
            <Route path='/ResetPassword/:token' Component={ResetPassword}></Route>
          </>
        )
          :
          (
            <Route path='/ApplicationLayout' Component={ApplicationLayout}>
              <Route path='dashboard' Component={Dashboard}></Route>
              <Route path='myAccount' Component={MyAccount}></Route>
              <Route path='documentation' Component={Documentation}></Route>
              <Route path='myCalendar' Component={MyCalendar}></Route>
              <Route path='todos' Component={Todos}></Route>
              <Route path='contacts' Component={Contacts}></Route>
            </Route>
          )
        }
      </Routes>
    </div>
  );
}

export default App;
