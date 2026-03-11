import React from "react";
import {
    User,
    Mail,
    MapPin,
    Globe,
    Github,
    Twitter,
    Linkedin,
    Edit2,
    Camera,
    Briefcase,
    History,
    Shield,
    Bell
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";

const ProfilePage = () => {
    const profileItems = [
        { label: "Personal Info", icon: User, active: true },
        { label: "Account Security", icon: Shield, active: false },
        { label: "Notifications", icon: Bell, active: false },
        { label: "Activity Logs", icon: History, active: false },
    ];

    return (
        <div className="container mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative">
                {/* Cover Photo Placeholder */}
                <div className="h-48 w-full bg-gradient-to-r from-primary/30 to-accent/30 rounded-xl border border-border/50" />

                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-end px-8 -mt-16 gap-6">
                    <div className="relative">
                        <div className="h-32 w-32 rounded-2xl bg-card border-4 border-background flex items-center justify-center shadow-xl overflow-hidden group">
                            <User className="h-16 w-16 text-muted-foreground group-hover:scale-110 transition-transform" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                <Camera className="text-white h-8 w-8" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 pb-4 text-center md:text-left">
                        <h1 className="text-3xl font-bold tracking-tight">John Doe</h1>
                        <p className="text-muted-foreground flex items-center justify-center md:justify-start">
                            <span className="font-medium text-primary">Full Stack Developer</span>
                            <span className="mx-2">•</span>
                            <MapPin className="h-3 w-3 mr-1" /> San Francisco, CA
                        </p>
                    </div>
                    <div className="pb-4">
                        <Button className="w-full md:w-auto">
                            <Edit2 className="h-4 w-4 mr-2" />
                            Edit Profile
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-4">
                {/* Sidebar Nav */}
                <div className="md:col-span-1 space-y-2">
                    {profileItems.map((item, index) => (
                        <button
                            key={index}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${item.active
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-accent/10 text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Profile Content */}
                <div className="md:col-span-3 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>About Me</CardTitle>
                            <CardDescription>Share a bit about yourself with the DevCollab community.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                Passionate software engineer with 5+ years of experience in building scalable web applications.
                                I love working with React, Node.js, and contributing to open-source projects.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase">Email</p>
                                    <p className="text-sm font-medium flex items-center gap-2">
                                        <Mail className="h-3 w-3 text-primary" /> john.doe@example.com
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase">Website</p>
                                    <p className="text-sm font-medium flex items-center gap-2">
                                        <Globe className="h-3 w-3 text-primary" /> https://johndoe.dev
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Skills & Experience</CardTitle>
                            <CardDescription>Your technical expertise and professional background.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-wrap gap-2">
                                {["React", "TypeScript", "Node.js", "GraphQL", "TailwindCSS", "Next.js", "Docker", "Kubernetes"].map((skill) => (
                                    <span key={skill} className="px-3 py-1 rounded-full bg-accent/20 border border-border/50 text-xs font-medium text-foreground/80">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="space-y-4 pt-4 border-t">
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Briefcase className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold">Senior Frontend Engineer</h4>
                                        <p className="text-xs text-muted-foreground">TechFlow Systems • 2021 — Present</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <Briefcase className="h-5 w-5 text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold">Full Stack Developer</h4>
                                        <p className="text-xs text-muted-foreground">Innovate Labs • 2018 — 2021</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Connect</CardTitle>
                            <CardDescription>Your social presence across the web.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Button variant="outline" className="justify-start gap-2 h-12">
                                    <Github className="h-4 w-4" /> Github
                                </Button>
                                <Button variant="outline" className="justify-start gap-2 h-12">
                                    <Linkedin className="h-4 w-4" /> LinkedIn
                                </Button>
                                <Button variant="outline" className="justify-start gap-2 h-12">
                                    <Twitter className="h-4 w-4" /> Twitter
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
