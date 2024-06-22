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
import AllArticlesAdmin from '../components/AllArticlesAdmin';
import MyArticles from '../components/MyArticles';
import MyProfile from '../pages/MyProfile';
import PrivateRoute from '../components/PrivateRoute';
import AdminRoute from './AdminRoute';
import AllArticlesRoute from '../pages/AllArticlesRoute';
import PremiumArticles from '../pages/PremiumArticles';
import ErrorPage from '../pages/ErrorPage';
import Subscription from '../components/Subscription';
import SubscriptionsDetails from '../pages/SubscriptionsDetails';



const router = createBrowserRouter([
   {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage />,
      children:[
         {
            path: "/",
            element: <Home />,
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
        element: <PrivateRoute>
          <AddArticle />
        </PrivateRoute>,
      },
      {
        path: "/article/:id",
        element: <PrivateRoute>
          <ArticlesDetailsPage />
        </PrivateRoute>,
      },
      {
        path: "/myarticles",
        element: <PrivateRoute>
          <MyArticles/>
        </PrivateRoute>,
      },
      {
        path: "/my-profile",
        element: <PrivateRoute>
          <MyProfile />
        </PrivateRoute>,
      },
      {
        path: "/all-articles",
        element: <AllArticlesRoute />,
      },
      {
        path: "/subscriptions",
        element: <SubscriptionsDetails />,
      },
      {
        path: "/premium-articles",
        element: <PrivateRoute>
          <PremiumArticles />
        </PrivateRoute>,
      },

      ],
 },

      {
        path: "/dashboard",
        element: <PrivateRoute>
        <AdminRoute>
        <Dashboard />
        </AdminRoute>
        </PrivateRoute>,
        children:[
          {
            path: "/dashboard",
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
              path: "/dashboard/all-articles-admin",
              element: <AllArticlesAdmin />,   
            },
          
        ]
      },

])

export default router