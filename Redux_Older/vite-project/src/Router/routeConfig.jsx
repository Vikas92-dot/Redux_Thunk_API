import {createBrowserRouter} from 'react-router-dom';
import Login from '../Pages/auth/Login';
import Register from '../Pages/auth/Register';
import VerifyEmail from '../Pages/auth/VerifyEmail';
import UserList from '../Pages/User/UserList';
import UserDetails from '../Pages/User/UserDetails';
import EditUser from '../Pages/User/EditUser';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from '../Pages/auth/ForgotPassword';
import ResetPassword from '../Pages/auth/ResetPassword';


const router = createBrowserRouter([
    {
        path:"*",
        element: <Login/>
    },
    {
        path:'/',
        element: <Login/>
    },
    {
        path:'/register',
        element: <Register/>
    },
    {
        path:'/email-verification/:email',
        element:<VerifyEmail/>
    },
    {
        path:'/dashboard',
        element: <PrivateRoute><UserList/></PrivateRoute>
    },
    {
        path:'/user-details/:id',
        element: <PrivateRoute><UserDetails/></PrivateRoute>
    },
    {
        path:'/edit-user/:id',
        element: <PrivateRoute><EditUser/></PrivateRoute>
    },
    {
        path:'/forgot-password',
        element: <ForgotPassword/>
    },
    {
        path:"/auth/reset-password/:id/:token",
        element:<ResetPassword/>
    }
])
export default router;