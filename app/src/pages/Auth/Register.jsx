import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, UserPlus, Github, Chrome, ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/Card";
import { useDispatch } from "react-redux";
import { register } from "../../redux/authSlice/auth.Actions";
import { toast } from "react-toastify";
import { useApp } from "../../context/AppContext";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setLoading } = useApp();

    // 1. Single State Object
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // 2. Universal Change Handler
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent page reload

        const { username, email, password, confirmPassword } = formData;

        // Validation
        if (!username || !email || !password || !confirmPassword) {
            return toast.error("Please fill in all fields");
        }

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        setLoading(true);

        try {
            // Using unwrap() to handle the result directly
            await dispatch(register({ username, email, password })).unwrap();

            toast.success("OTP sent to your email!");
            navigate("/verify", { state: { email } });

        } catch (err) {
            toast.error(err || "Registration failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] p-4 overflow-hidden bg-background">
            {/* Background blobs */}
            <div className="absolute top-1/4 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl opacity-50" />

            <Card className="w-full max-w-md relative z-10 backdrop-blur-md bg-card/80 border-border shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold tracking-tight text-center">Create account</CardTitle>
                    <CardDescription className="text-center">
                        Join DevCollab and start building together
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline">
                            <Github className="mr-2 h-4 w-4" /> Github
                        </Button>
                        <Button variant="outline">
                            <Chrome className="mr-2 h-4 w-4" /> Google
                        </Button>
                    </div>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="pl-10"
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="name@example.com"
                                className="pl-10"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                type="password"
                                placeholder="Create Password"
                                className="pl-10"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                type="password"
                                placeholder="Confirm Password"
                                className="pl-10"
                            />
                        </div>

                        <Button type="submit" className="w-full group font-bold">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Sign Up
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col items-center space-y-4 text-center text-sm text-muted-foreground pb-8">
                    <p className="px-6">
                        By clicking continue, you agree to our{" "}
                        <Link to="#" className="text-primary hover:underline">Terms</Link> and{" "}
                        <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>.
                    </p>
                    <p>
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary hover:underline font-bold">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default RegisterPage;