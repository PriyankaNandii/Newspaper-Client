import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { useEffect } from 'react';

const Dashboard = () => {
    const location = useLocation();
    // console.log(location);
   
    useEffect(() =>{
       if (location.pathname === '/'){
           document.title = `NewsWisp - dashboard`
       }else{
           document.title= `NewsWisp|dashboard| ${location.pathname.replace("/", "- ")}`
       }if (location.state){
           document.title = location.state
       }
       
    },[location.pathname, location.state])
    return (
        <div className='relative min-h-screen md:flex font-pt'>
            <Sidebar />
            <div className='flex-1 md:ml-64'>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
