import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
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
