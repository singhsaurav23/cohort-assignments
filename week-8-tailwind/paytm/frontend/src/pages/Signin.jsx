import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Navigate } from "react-router-dom"


function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');

    if (token) {
        // Redirect to the login page if not authenticated
        return <Navigate to="/dashboard" state={{ fromProtectedRoute: true }} />;
    }
    return children; // Render the children if authenticated
}

export default function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.fromProtectedRoute) {
            setShowPopup(true);
            // Hide the popup after 3 seconds
            setTimeout(() => setShowPopup(false), 1000);
        }
    }, [location]);

    return (
        <ProtectedRoute>
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox onChange={e => setUsername(e.target.value)} placeholder="harkirat@gmail.com" label={"Email"} />
                    <InputBox onChange={e => setPassword(e.target.value)} placeholder="123456" label={"Password"} />
                    <div className="pt-4">
                        <Button onClick={async () => {
                            try {
                                const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                    username,
                                    password
                                });
                                localStorage.setItem("token", response.data.token);
                                navigate("/dashboard");
                            } catch (error) {
                                console.error("Error signing in", error);
                                // Optionally, handle sign-in errors
                            }
                        }} label={"Sign in"} />
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
                {showPopup && (
                    <div className="fixed bottom-4 right-4 bg-red-500 text-white py-2 px-4 rounded-md shadow-lg">
                        Please sign in to access the dashboard.
                    </div>
                )}
            </div>
            </div>
        </ProtectedRoute>
    );
}
