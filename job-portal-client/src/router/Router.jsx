import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/signIn/SignIn";
import JobDetails from "../pages/jobDetails/JobDetails";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../pages/jobApply/JobApply";
import MyApplications from "../pages/myApplications/MyApplications";
import AddJob from "../pages/addJob/AddJob";
import MyPostedJobs from "../pages/myPostedJobs/MyPostedJobs";
import ViewApplications from "../pages/viewApplications/ViewApplications";


const router = createBrowserRouter([
  {
    path: "/",
    element:<MainLayout></MainLayout> ,
    errorElement:<h2>Route not found</h2>,
    children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/jobs/:id',
            element:<PrivateRoute><JobDetails></JobDetails></PrivateRoute>,
            loader:({params})=>fetch(`https://jobportal-1-2ka1.onrender.com/jobs/${params.id}`)
        },
        {
           path:'/jobApply/:id',
           element:<PrivateRoute><JobApply></JobApply></PrivateRoute>
        },
        {
          path:'/myApplications',
          element:<PrivateRoute><MyApplications></MyApplications></PrivateRoute>
        },
        {
             path:'/addJob',
             element:<PrivateRoute><AddJob></AddJob></PrivateRoute>
        },
        {
             path:'/myPostedJobs',
             element:<PrivateRoute><MyPostedJobs></MyPostedJobs></PrivateRoute>
        },
        {
             path:'/viewApplications/:job_id',
             element:<PrivateRoute><ViewApplications></ViewApplications></PrivateRoute>,
             loader:({params }) => fetch(`https://jobportal-1-2ka1.onrender.com/job-applications/jobs/${params.job_id}`)
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
            path:'/signIn',
            element:<SignIn></SignIn>
        }
    ]
  },
]);
export default router;