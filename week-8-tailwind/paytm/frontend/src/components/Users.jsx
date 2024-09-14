import { useEffect, useState, useRef, useCallback, memo } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const debounceTimeout = useRef(null);

    // Fetch users whenever filter changes
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/v1/user/bulk?filter=${filter}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setUsers(response.data.user);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [filter]);

    // Memoize debouncedSearch to avoid re-creation on each render
    const debouncedSearch = useCallback((filter) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            setFilter(filter);
        }, 350);
    }, []);

    return (
        <>
            <div className="font-bold mt-6 text-lg">Users</div>
            <div className="my-2">
                <input
                    onChange={(e) => debouncedSearch(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            <div>
                {users.map((user) => (
                    <MemoizedUser key={user.username} user={user} />
                ))}
            </div>
        </>
    );
};

// Memoize the User component to prevent re-renders unless the user prop changes
const MemoizedUser = memo(({ user }) => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <Button
                    onClick={() => {
                        navigate(`/send?id=${user._id}&name=${user.firstName}`);
                    }}
                    label={"Send Money"}
                />
            </div>
        </div>
    );
});

export default Users;
