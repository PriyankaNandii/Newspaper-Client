// import { PropTypes } from 'prop-types';
// import { Navigate } from 'react-router-dom';
// import useRole from "../hook/useRole";

// const AdminRoute = ({ children }) => {
//     const { role, isLoading } = useRole();

//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <span className="loading loading-spinner loading-lg"></span>
//             </div>
//         );
//     }


//     if (role === 'admin') {
//         return children;
//     }

//     return <Navigate to="/login" state={{ from: '/admin' }} replace />;
// };

// AdminRoute.propTypes = {
//     children: PropTypes.element, 
// };

// export default AdminRoute;


import { Navigate } from 'react-router-dom'

import useRole from '../hook/useRole'
import PropTypes from 'prop-types'
const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <div className="flex justify-center items-center h-screen">
    <span className="loading loading-spinner loading-lg"></span>
  </div>
  if (role === 'admin') return children
  return  <Navigate to="/login" state={{ from: '/admin' }} replace />
}

export default AdminRoute

AdminRoute.propTypes = {
  children: PropTypes.element,
}