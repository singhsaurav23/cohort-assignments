import {
    BrowserRouter,
    Route,
    Routes,
    Navigate
} from "react-router-dom";
import { Suspense, lazy } from "react";

const Signup = lazy(() => import("./pages/Signup"));
const Signin = lazy(() => import("./pages/Signin"));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const SendMoney = lazy(() => import("./pages/SendMoney"));

function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen text-center">
            <div className="p-6 border border-gray-300 rounded bg-gray-100">
                <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
                <p className="text-lg">The page you are looking for does not exist.</p>
            </div>
        </div>
    );
}

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/signin" state={{ fromProtectedRoute: true }} />;
    }
    return children;
}

function Loading() {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={
                    <Suspense fallback={<Loading />}>
                        <Signup />
                    </Suspense>}
                />
                <Route path="/signin" element={
                    <Suspense fallback={<Loading />}>
                        <Signin />
                    </Suspense>}
                />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Suspense fallback={<Loading />}>
                            <Dashboard />
                        </Suspense>
                    </ProtectedRoute>
                } />
                <Route path="/send" element={
                    <ProtectedRoute>
                        <Suspense fallback={<Loading />}>
                            <SendMoney />
                        </Suspense>
                    </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
