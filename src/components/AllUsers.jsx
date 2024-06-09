import useAxiosSecure from "../hook/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users');
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

export default AllUsers;
