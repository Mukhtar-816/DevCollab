import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, LogIn, Github, Chrome } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/Card";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice/auth.Actions";
import { useApp } from "../../context/AppContext";

const LoginPage = () => {

    const { setIsAuthenticated } = useApp();
    const dispatch = useDispatch();
    const { setLoading } = useApp();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        const { email, password } = formData;

        if (!email || !password) {
            return toast.error("Missing Required Feilds");
        };

        try {
            await dispatch(login({
                email,
                password
            })).unwrap();

            setIsAuthenticated(true);

            toast.success("Logged In Successfully");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] p-4 overflow-hidden bg-background">
            {/* Background blobs */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

            <Card className="w-full max-w-md relative z-10 backdrop-blur-md bg-card/80 border-border shadow-2xl animate-in fade-in zoom-in-95 duration-500">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold tracking-tight text-center">Welcome back</CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    name="email" // Key for the state
                                    value={formData.email} // Controlled component
                                    onChange={handleFormChange}
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    name="password" // Key for the state
                                    value={formData.password}
                                    onChange={handleFormChange}
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button variant="link" size="sm" className="px-0 font-normal">
                                    Forgot password?
                                </Button>
                            </div>
                        </div>

                        <Button type="submit" className="w-full group transition-all">
                            <LogIn className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            Sign In
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full">
                            <Github className="mr-2 h-4 w-4" />
                            Github
                        </Button>
                        <Button variant="outline" className="w-full">
                            <Chrome className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col items-center space-y-2 pb-8">
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-primary hover:underline font-medium">
                            Create an account
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;