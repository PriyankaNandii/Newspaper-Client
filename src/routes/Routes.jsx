import {createBrowserRouter} from 'react-router-dom'
import Root from "../layouts/Root";
import Login from '../pages/Login';
import Home from '../components/Home';
import Register from '../pages/Register';
import AddArticle from '../pages/AddArticle';
import ArticlesDetailsPage from '../pages/ArticlesDetailsPage';
import Dashboard from '../layouts/DashboardLayout/Dashboard';
import AddPublisher from '../components/AddPublisher';
import Statistics from '../components/Statistics';
import AllUsers from '../components/AllUsers';
import AllArticlesReq from '../components/AllArticlesReq';
// import Login from '../pages/Login';
// import Home from '../components/Home';
// import Register from './../components/Register';
// import ErrorPage from '../pages/ErrorPage';
// import PostDetails from '../pages/PostDetails';
// import AddPost from '../pages/AddPost';
// import ManageMyPostPage from '../pages/ManageMyPostPage';
// import Update from '../pages/Update';
// import PrivateRoute from '../components/PrivateRoute';
// import PostReq from '../pages/PostReq';
// import AllPosts from '../pages/AllPosts';



const router = createBrowserRouter([
   {
      path: "/",
      element: <Root></Root>,
    //   errorElement: <ErrorPage />,
      children:[
         {
            path: "/",
            element: <Home />,
            // loader: () => fetch(`${import.meta.env.VITE_API_URL}/needpost`)
          },
     
        {
          path: "/login",
          element: <Login />,
        },
        {
         path: "/register",
         element: <Register />,
       },
       {
        path: "/addarticle",
        element: <AddArticle />,
      },
      {
        path: "/article/:id",
        element: <ArticlesDetailsPage />,
      },

      ],
 },

      {
        path: "/dashboard",
        element:<Dashboard></Dashboard>,
        children:[
          {
            path: " /dashboard/statistics",
            element: <Statistics />,
           
          },
           {
              path: "/dashboard/add-publisher",
              element: <AddPublisher />,   
            },
            {
              path: "/dashboard/all-users",
              element: <AllUsers />,   
            },
            {
              path: "/dashboard/all-articles",
              element: <AllArticlesReq />,   
            },
          
        ]
      },

])

export default router