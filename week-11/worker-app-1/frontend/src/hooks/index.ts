import axios, { AxiosResponse, AxiosError } from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";

// Define the interface for a Blog structure
interface Blog {
    title: string;
    body: string;
    id: number;
    publishDate: Date | string;
    author: {
        username: string;
    };
}

// Define the structure for potential error responses from the API
interface ErrorResponse {
    message: string;
    status: number;
    // Add any other fields you expect from the error
}

// Custom hook to fetch multiple blogs
export const useBlogs = (): { loading: boolean; blogs: Blog[] } => {
    const [loading, setLoading] = useState<boolean>(true); // Track loading state
    const [blogs, setBlogs] = useState<Blog[]>([]); // Store fetched blogs

    useEffect(() => {
        // Fetch all blogs
        axios.get<Blog[]>(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userInfo")}`
            }
        })
            .then((response: AxiosResponse<Blog[]>) => {
                setBlogs(response.data.blogs); // Update blogs state
            })
            .catch((error: AxiosError<ErrorResponse>) => {
                console.error("Error fetching blogs:", error.response?.data?.message || error.message);
            })
            .finally(() => {
                setLoading(false); // Ensure loading state is updated on success or failure
            });
    }, []);

    return {
        loading,
        blogs
    };
}

// Custom hook to fetch a single blog by ID
export const useBlog = ({ id }: { id: string }): { loading: boolean; blog?: Blog } => {
    const [loading, setLoading] = useState<boolean>(true); // Track loading state
    const [blog, setBlog] = useState<Blog | undefined>(); // Store the fetched blog

    useEffect(() => {
        // Fetch a single blog by ID
        axios.get<Blog>(`${BACKEND_URL}/api/v1/blog/article/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userInfo")}`
            }
        })
            .then((response: AxiosResponse<Blog>) => {
                setBlog(response.data.blog); // Update blog state
            })
            .catch((error: AxiosError<ErrorResponse>) => {
                console.error("Error fetching blog:", error.response?.data?.message || error.message);
            })
            .finally(() => {
                setLoading(false); // Ensure loading state is updated on success or failure
            });
    }, [id]);

    return {
        loading,
        blog
    };
}
