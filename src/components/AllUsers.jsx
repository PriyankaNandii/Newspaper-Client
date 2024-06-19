import useAxiosSecure from "../hook/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            });  
    
            return data;
        }
    });
    

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res => {
            if (res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    title: 'Success!',
                    text: 'User role updated successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool',
                });
                refetch(); 
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Error!',
                text: 'Could not update user role',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        });
    }

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (isError) {
        toast.error('Failed to fetch users');
        return <div className="flex justify-center items-center min-h-screen">Failed to load users</div>;
    }

    return (
        <div>
            <div className="overflow-x-auto lg::px-20 px-5 mt-20 ">
                <table className="table ">
                    <thead>
                        <tr>
                            <th>Profile Picture</th>
                            <th>Name</th>
                            <th>Email</th>
                            
                           
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                            <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img 
                                                    src={user.image || 'fallback-image-url'} 
                                                    alt={user.name}
                                                    onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url'; }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.name}
                                    <br/>
                                    {/* <span className="badge badge-ghost badge-sm">{user.role}</span> */}
                                </td>
                                <td>{user.email}</td>
                               
                                <td>
                                {
                                        user.role === 'admin' ? 
                                        <button className="badge badge-ghost badge-md px-2 py-4">Admin</button> : 
                                        <button onClick={() => handleMakeAdmin(user)} className="badge badge-ghost badge-md px-2 py-4">Make Admin</button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers


// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../hook/useAxiosSecure";
// import { FaTrashAlt, FaUsers } from "react-icons/fa";
// import Swal from "sweetalert2";


// const AllUsers = () => {
//     const axiosSecure = useAxiosSecure();
//     const { data: users = [], refetch } = useQuery({
//         queryKey: ['users'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/users');
//             return res.data;
//         }
//     })

//     const handleMakeAdmin = user =>{
//         axiosSecure.patch(`/users/admin/${user._id}`)
//         .then(res =>{
//             console.log(res.data)
//             if(res.data.modifiedCount > 0){
//                 refetch();
//                 Swal.fire({
//                     position: "top-end",
//                     icon: "success",
//                     title: `${user.name} is an Admin Now!`,
//                     showConfirmButton: false,
//                     timer: 1500
//                   });
//             }
//         })
//     }

//     const handleDeleteUser = user => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!"
//         }).then((result) => {
//             if (result.isConfirmed) {

//                 axiosSecure.delete(`/users/${user._id}`)
//                     .then(res => {
//                         if (res.data.deletedCount > 0) {
//                             refetch();
//                             Swal.fire({
//                                 title: "Deleted!",
//                                 text: "Your file has been deleted.",
//                                 icon: "success"
//                             });
//                         }
//                     })
//             }
//         });
//     }

//     return (
//         <div>
//             <div className="flex justify-evenly my-4">
//                 <h2 className="text-3xl">All Users</h2>
//                 <h2 className="text-3xl">Total Users: {users.length}</h2>
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra w-full">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th></th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Role</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             users.map((user, index) => <tr key={user._id}>
//                                 <th>{index + 1}</th>
//                                 <td>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td>
//                                     { user.role === 'admin' ? 'Admin' : <button
//                                         onClick={() => handleMakeAdmin(user)}
//                                         className="btn btn-lg bg-orange-500">
//                                         <FaUsers className="text-white 
//                                         text-2xl"></FaUsers>
//                                     </button>}
//                                 </td>
//                                 <td>
//                                     <button
//                                         onClick={() => handleDeleteUser(user)}
//                                         className="btn btn-ghost btn-lg">
//                                         <FaTrashAlt className="text-red-600"></FaTrashAlt>
//                                     </button>
//                                 </td>
//                             </tr>)
//                         }

//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AllUsers;