import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, clearError } from "@/features/auth/authSlice"
import { toast } from "sonner"
import { Helmet } from "react-helmet"
import { Loader } from "lucide-react"

export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        if (error) {
            dispatch(clearError());
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login attempt with:", formData);

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        if (formData.email === "" || formData.password === "") {
            toast.error("Please fill in all fields");
            return;
        }

        // Password validation
        if (formData.password.length < 4) {
            toast.error("Password must be at least 4 characters long");
            return;
        }

        try {
            console.log("Attempting to login with credentials...");
            const result = await dispatch(loginUser(formData)).unwrap();
            toast.success("Login successful");
            console.log("Login successful:", result);
            navigate('/jobs');
        } catch (err) {
            console.error("Login failed:", err);
            // Handle different types of error messages
            const errorMessage = err?.message || err?.error || "Login failed. Please try again.";
            toast.error(errorMessage);
        }
    };


    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const token  = params.get("token");
      if (token) {
        // 1) save it
        localStorage.setItem("jwt", token);
        // 2) clean URL & redirect
        window.history.replaceState({}, "", "/jobs");
        navigate("/jobs");
      }
    }, [navigate]);

    return (
        <>
            <Helmet>
                <title>Login | Skill Match</title>
                <meta
                    name="description"
                    content="Log in to your Skill Match account to explore part-time tech jobs and apply instantly."
                />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            </Helmet>
            
            <div className="flex justify-center items-center">
                <Card className="w-full max-w-lg m-10">
                    <CardHeader>
                        <div>
                            <CardTitle className="text-2xl font-bold">SKILL MATCH</CardTitle>
                            <CardDescription>
                                Login to your account
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a
                                            href="#"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {error && (
                                    <div className="text-red-500 text-sm">
                                        {typeof error === 'string' ? error : 'An error occurred during login'}
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-center">
                                <Button variant="link" className="w-full">
                                    Don't have an account?
                                    <Link to="/auth/register">Register</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button
                            type="submit"
                            className="w-full"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ?
                                <div className="flex justify-center items-center gap-2">
                                    <Loader className="animate-spin"/>
                                    Logging in...
                                </div>
                                : 'Login'}
                        </Button>
                        <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
                            Login with Google
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>

    )
}
