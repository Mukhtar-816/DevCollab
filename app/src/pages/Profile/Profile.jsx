import React, { useState, useEffect } from "react";
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
    Bell,
    Cross
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";
import { IoCloseSharp } from "react-icons/io5";
import { Input } from "../../components/ui/Input";


const ProfilePage = () => {
    // Accessing user from Redux
    const { user } = useSelector((state) => state.user);

    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [editProfileModal, setEditProfileModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        skills: [],
        github: "",
        linkedin: "",
        portfolio: ""
    });

    useEffect(() => {
        if (user && editProfileModal) {
            setFormData({
                name: user.name || "",
                bio: user.bio || "",
                skills: user.skills || [],
                github: user.socials?.github || "",
                linkedin: user.socials?.linkedin || "",
                portfolio: user.socials?.portfolio || ""
            });
        }
    }, [user, editProfileModal]);

    const handleChangeInput = (e) => {
        if (!e) return;
        const { name, value } = e.target;
        if (name === 'skills') {
            setFormData(prev => ({ ...prev, [name]: value.split(',').map(s => s.trim()) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // TODO: Integrate backend API call here
        // For now, just close the modal
        setTimeout(() => {
            setIsSubmitting(false);
            setEditProfileModal(false);
            // Optionally update local state or Redux if needed
        }, 1000);
    };

    const profileItems = [
        { label: "Personal Info", icon: User, active: true },
        { label: "Account Security", icon: Shield, active: false },
        { label: "Notifications", icon: Bell, active: false },
        { label: "Activity Logs", icon: History, active: false },
    ];

    // Cleanup object URL to prevent memory leaks
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleImagePick = (e) => {
        const image = e.target.files[0];
        if (image) {
            setSelectedImage(image);
            // Use local 'image' variable directly to avoid async state lag
            const objectUrl = URL.createObjectURL(image);
            setPreview(objectUrl);
        }
    };


    // const updateProfile = (e) => {
    //     if ()
    // }

    return (
        <>
            <div className={`fixed top-0 right-0 z-50 h-full bg-card/90 backdrop-blur-2xl border-l border-primary/20 shadow-2xl transition-all duration-500 ease-in-out transform ${editProfileModal ? "translate-x-0" : "translate-x-full"} w-full sm:w-[450px] md:w-[500px] lg:w-[600px] flex flex-col`}>

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/50">
                    <h2 className="text-xl font-bold tracking-tight">Edit Profile</h2>
                    <IoCloseSharp size={30} className="cursor-pointer hover:text-primary transition-colors" onClick={() => setEditProfileModal(false)} />
                </div>

                {/* Scrollable Form Body */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Avatar Section */}
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <div className="h-32 w-32 md:h-40 md:w-40 rounded-2xl bg-muted border-4 border-background flex items-center justify-center shadow-xl overflow-hidden relative">
                                    {preview || user?.profilePic ? (
                                        <img src={preview || user?.profilePic} className="h-full w-full object-cover" alt="Profile" />
                                    ) : (
                                        <User className="h-16 w-16 text-muted-foreground/50" />
                                    )}
                                    <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                                        <Camera className="text-white h-6 w-6 mb-1" />
                                        <span className="text-[10px] text-white font-bold uppercase tracking-wider">Change</span>
                                        <input type="file" className="hidden" onChange={handleImagePick} accept="image/*" />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Fields Section */}
                        <div className="space-y-5">
                            <Input label="Email" value={user?.email} disabled className="bg-muted/50 cursor-not-allowed" />

                            <Input label="Name" name="name" value={formData.name} onChange={handleChangeInput} placeholder="Your display name" />

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Bio</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChangeInput}
                                    className="w-full bg-background border border-border/50 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all min-h-[100px] outline-none"
                                    placeholder="Tell the community about your journey..."
                                />
                            </div>

                            <Input
                                label="Skills"
                                name="skills"
                                value={formData.skills.join(', ')}
                                onChange={handleChangeInput}
                                placeholder="React, Node.js, Tailwind..."
                            />

                            <div className="pt-4 border-t border-border/50">
                                <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-4">Social Presence</p>
                                <div className="space-y-4">
                                    <Input icon={<Github size={16} />} name="github" value={formData.github} onChange={handleChangeInput} placeholder="GitHub URL" />
                                    <Input icon={<Linkedin size={16} />} name="linkedin" value={formData.linkedin} onChange={handleChangeInput} placeholder="LinkedIn URL" />
                                    <Input icon={<Globe size={16} />} name="portfolio" value={formData.portfolio} onChange={handleChangeInput} placeholder="Portfolio URL" />
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions (Sticky-like inside the container) */}
                        <div className="flex gap-4 pt-10 pb-5">
                            <Button type="button" variant="ghost" onClick={() => setEditProfileModal(false)} className="flex-1">
                                Cancel
                            </Button>
                            <Button onClick={() => handleSubmit} type="submit" disabled={isSubmitting} className="flex-1 shadow-lg shadow-primary/20">
                                {isSubmitting ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="container mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="relative">
                    {/* Cover Photo Placeholder */}
                    <div className="h-48 w-full bg-gradient-to-r from-primary/30 to-accent/30 rounded-xl border border-border/50" />

                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row items-end px-8 -mt-16 gap-6">
                        <div className="relative group">
                            <div className="h-32 w-32 rounded-2xl bg-card border-4 border-background flex items-center justify-center shadow-xl overflow-hidden relative">
                                {preview || user?.profilePic ? (
                                    <img
                                        src={preview || user?.profilePic}
                                        className="h-full w-full object-cover"
                                        alt="Profile"
                                    />
                                ) : (
                                    <User className="h-12 w-12 text-muted-foreground" />
                                )}

                                {/* Camera Overlay - Only visible on hover */}
                                <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                                    <Camera className="text-white h-8 w-8 mb-1" />
                                    <span className="text-[10px] text-white font-medium uppercase tracking-wider">Change</span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={handleImagePick}
                                        accept="image/*"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="flex-1 pb-4 text-center md:text-left">
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">
                                {user?.name || "Developer Name"}
                            </h1>
                            <p className="text-muted-foreground flex items-center justify-center md:justify-start">
                                <span className="font-medium text-primary">{user?.role || "Full Stack Developer"}</span>
                                <span className="mx-2 text-border">•</span>
                                <MapPin className="h-3 w-3 mr-1" /> {user?.email || "Remote / Earth"}
                            </p>
                        </div>

                        <div className="pb-4">
                            <Button onClick={() => setEditProfileModal(!editProfileModal)} className="w-full md:w-auto shadow-lg hover:shadow-primary/20 transition-all">
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
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${item.active
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
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
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>About Me</CardTitle>
                                <CardDescription>Share your journey with the DevCollab community.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {user?.bio || "No bio added yet. Tell us about your stack and what you're building!"}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</p>
                                        <p className="text-sm font-medium flex items-center gap-2">
                                            <Mail className="h-3 w-3 text-primary" /> {user?.email || "Connect your email"}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Portfolio</p>
                                        {user?.socials?.portfolio ? (
                                            <a href={user.socials.portfolio} target="_blank" rel="noopener noreferrer" className="text-sm font-medium flex items-center gap-2 hover:text-primary transition-colors">
                                                <Globe className="h-3 w-3 text-primary" /> {user.socials.portfolio}
                                            </a>
                                        ) : (
                                            <p className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                                                <Globe className="h-3 w-3" /> Add your portfolio
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>Skills & Experience</CardTitle>
                                <CardDescription>Your technical expertise and professional background.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-wrap gap-2">
                                    {(user?.skills || ["React", "Node.js", "MongoDB", "Express", "TailwindCSS"]).map((skill) => (
                                        <span key={skill} className="px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-[11px] font-semibold text-primary uppercase">
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <div className="space-y-4 pt-4 border-t border-border/50">
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <Briefcase className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold">Active Contributor</h4>
                                            <p className="text-xs text-muted-foreground">DevCollab Community • 2026 — Present</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>Connect</CardTitle>
                                <CardDescription>Social links and repositories.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {user?.socials?.github ? (
                                        <a href={user.socials.github} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" className="justify-start gap-2 h-11 hover:bg-github/10 w-full">
                                                <Github className="h-4 w-4" /> Github
                                            </Button>
                                        </a>
                                    ) : (
                                        <Button variant="outline" disabled className="justify-start gap-2 h-11 w-full">
                                            <Github className="h-4 w-4" /> Github
                                        </Button>
                                    )}
                                    {user?.socials?.linkedin ? (
                                        <a href={user.socials.linkedin} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" className="justify-start gap-2 h-11 hover:bg-blue-600/10 w-full">
                                                <Linkedin className="h-4 w-4" /> LinkedIn
                                            </Button>
                                        </a>
                                    ) : (
                                        <Button variant="outline" disabled className="justify-start gap-2 h-11 w-full">
                                            <Linkedin className="h-4 w-4" /> LinkedIn
                                        </Button>
                                    )}
                                    {user?.socials?.twitter ? (
                                        <a href={user.socials.twitter} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" className="justify-start gap-2 h-11 hover:bg-sky-400/10 w-full">
                                                <Twitter className="h-4 w-4" /> Twitter
                                            </Button>
                                        </a>
                                    ) : (
                                        <Button variant="outline" disabled className="justify-start gap-2 h-11 w-full">
                                            <Twitter className="h-4 w-4" /> Twitter
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;