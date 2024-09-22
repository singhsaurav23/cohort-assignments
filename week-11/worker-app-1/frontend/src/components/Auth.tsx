import { SigninType, SignupType } from '@srv_s29/medium-common';
import { ChangeEvent, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';

export const Auth = ({ type }: { type: "signup" | "signin" }) => {

    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<typeof type extends "signup" ? SignupType : SigninType>(
        type === "signup" ? { email: "", password: "", username: "" } : { email: "", password: "" }
    );

    const sendRequest = async () => {

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, postInputs);
            const data = response.data;
            console.log(response.statusText);
            localStorage.setItem("userToken", data.jwt);
            navigate("/blogs");
        }
        catch (error) {
            alert("Invalid credentials")
        }

    }

        return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-500 flex justify-center pt-1">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>
                    <div className="pt-8">
                        <div>
                            {type === "signup" ? <LabelledInput label="UserName" placeholder="Saurav Singh..." onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setPostInputs({
                                    ...postInputs,
                                    username: e.target.value
                                })
                            }} /> : null}
                        </div>
                        <div className="pt-2">
                            <LabelledInput label="Email" placeholder="singhsaurav@gmail.com" required={true} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setPostInputs({
                                    ...postInputs,
                                    email: e.target.value
                                })
                            }} />
                        </div>
                        <div className="pt-2">
                            <LabelledInput label="Password" type={"password"} required={ true } placeholder="123456" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setPostInputs({
                                    ...postInputs,
                                    password: e.target.value
                                })
                            }} />
                        </div>
                        
                    <button onClick={sendRequest} type="button" className="mt-7 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
                </div>
            </div>
        </div>
    </div>
}
interface LabelledInputType {

    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    required?: boolean;
}

// Function to determine the appropriate autocomplete value based on the label
function getAutocompleteType(label: string): string {
    const lowerCaseLabel = label.toLowerCase();
    switch (lowerCaseLabel) {
        case 'email':
            return 'email';
        case 'username':
        case 'name':
            return 'username';
        case 'password':
            return 'current-password'; // Or "new-password" for sign-up forms
        default:
            return 'off'; // Default to "off" if not a standard autocomplete type
    }
}

function LabelledInput({ label, placeholder, onChange, type, required }: LabelledInputType) {
    // State to manage hover behavior for showing the tooltip
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative flex flex-col">
            <div
                className="flex items-center space-x-1"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                {/* Label with required asterisk */}
                <label
                    htmlFor={label}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {label} {required && <span className="text-black-600 ml-1">*</span>}
                </label>
                <div className="pb-1.5">
                    {/* Tooltip displayed on hover */}
                    {required && isHovered && (
                        <div className="ml-2 px-1 py-1 bg-gray-800 text-white text-xs rounded shadow-xs">
                            Required
                        </div>
                    )}
                </div>
               
            </div>

            {/* Input field */}
            <input
                onChange={onChange}
                type={type || 'text'}
                id={label}
                autoComplete={getAutocompleteType(label)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
                required={required || false}/>
        </div>
    );
}