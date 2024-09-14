import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Dashboard() {
    const [showPopup, setShowPopup] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem('token');
        // Show popup message
       // setShowPopup(true);
        // Redirect to the sign-in page after 1 second (for the popup to be visible)
       // setTimeout(() => {
            navigate('/signin');
        //}, 1000);
    };

    useEffect(() => {
        if (location.state?.fromProtectedRoute) {
            setShowPopup(true);
            // Hide the popup after 3 seconds
            setTimeout(() => setShowPopup(false), 3000);
        }
    }, [location]);

    return (
        <div>
            <Appbar />
            <button
                onClick={handleLogout}
                className="p-2 m-4 bg-red-500 text-white rounded"
            >
                Logout
            </button>
            <div className="m-8">
                <Balance />
                <Users />
            </div>
            {showPopup && (
                <div className="fixed bottom-4 right-4 bg-red-500 text-white py-2 px-4 rounded-md shadow-lg">
                    Already Signed In
                </div>
            )}
        </div>
    );
}

