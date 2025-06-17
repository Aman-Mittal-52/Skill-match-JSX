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
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, clearError } from "@/features/auth/authSlice"
import { toast } from "sonner"

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login attempt with:", formData);
        
        if(formData.email === "" || formData.password === ""){
            toast.error("Please fill in all fields");
            return;
        }
        try {
            const result = await dispatch(loginUser(formData)).unwrap();
            toast.success("Login successful");
            console.log("Login successful:", result);
            navigate('/dashboard');
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
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
                                    {error}
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
                        <div className="flex justify-center items-center animation-svg">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='mr-2'><rect width="24" height="24" rx="6" fill="#000"/><path d="M8 16L16 8L24 16L16 24L8 16Z" fill="#fff"/></svg>
                            Logging in...
                        </div>
                        : 'Login'}
                    </Button>
                    <Button variant="outline" className="w-full">
                        Login with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
