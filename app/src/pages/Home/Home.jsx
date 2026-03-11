import React from "react";
import { Link } from "react-router-dom";
import {
    Code2,
    Users,
    Zap,
    Shield,
    ArrowRight,
    Github,
    Terminal,
    Cpu,
    Globe,
    MessageSquare
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";

const HomePage = () => {
    const features = [
        {
            title: "Real-time Collaboration",
            description: "Code together with your team in real-time with zero latency.",
            icon: Zap,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10"
        },
        {
            title: "Secure by Design",
            description: "Enterprise-grade security for your private repositories and data.",
            icon: Shield,
            color: "text-green-500",
            bg: "bg-green-500/10"
        },
        {
            title: "Developer First",
            description: "Built by developers, for developers. Optimized for your workflow.",
            icon: Terminal,
            color: "text-primary",
            bg: "bg-primary/10"
        },
        {
            title: "Global Network",
            description: "Connect with developers from around the world and share ideas.",
            icon: Globe,
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse delay-700" />
                </div>

                <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium animate-bounce">
                        <Cpu size={14} />
                        <span>Now in Beta</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
                        Build the Future of <span className="text-primary italic">Software</span> Together
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        The all-in-one collaboration platform for modern development teams.
                        Connect, code, and deploy faster than ever before.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link to="/register">
                            <Button size="lg" className="h-14 px-8 text-lg group">
                                Start Building Free
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="h-14 px-8 text-lg">
                            <Github className="mr-2 h-5 w-5" />
                            Star on GitHub
                        </Button>
                    </div>

                    {/* Mockup Preview */}
                    <div className="pt-16 max-w-5xl mx-auto px-4 animate-slide-up">
                        <div className="rounded-2xl border border-border/50 bg-card shadow-2xl overflow-hidden aspect-video relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 pointer-events-none" />
                            <div className="h-full w-full flex items-center justify-center text-muted-foreground/20">
                                <Code2 size={120} className="group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            {/* Floating UI Elements */}
                            <div className="absolute top-10 left-10 p-4 rounded-xl bg-card/90 border border-border/50 shadow-xl backdrop-blur-md hidden md:block animate-bounce delay-300">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-green-500" />
                                    <div className="space-y-1">
                                        <div className="h-2 w-20 bg-muted rounded" />
                                        <div className="h-2 w-12 bg-muted/50 rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-accent/5">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl font-bold">Engineered for Excellence</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Everything you need to manage your engineering team in one elegant workspace.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="border-none shadow-none bg-transparent hover:translate-y-[-8px] transition-transform duration-300">
                                <CardContent className="pt-6 space-y-4 px-0">
                                    <div className={`h-12 w-12 rounded-xl ${feature.bg} flex items-center justify-center ${feature.color}`}>
                                        <feature.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-center space-y-8">
                        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Trusted by developers from</p>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="flex items-center gap-2 text-2xl font-bold">
                                <Code2 /> <span>StackDev</span>
                            </div>
                            <div className="flex items-center gap-2 text-2xl font-bold">
                                <Cpu /> <span>SysNode</span>
                            </div>
                            <div className="flex items-center gap-2 text-2xl font-bold">
                                <Globe /> <span>GlobalNet</span>
                            </div>
                            <div className="flex items-center gap-2 text-2xl font-bold">
                                <MessageSquare /> <span>TalkStream</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 border-t">
                <div className="container mx-auto px-4 text-center space-y-8">
                    <h2 className="text-4xl font-bold">Ready to start collaborating?</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Join thousands of developers who are already building the future with DevCollab.
                    </p>
                    <Link to="/register">
                        <Button size="lg" className="h-14 px-12 text-lg">
                            Get Started for Free
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 border-t bg-card/50">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
                    <div className="flex items-center gap-2 text-foreground font-bold">
                        <Code2 size={20} className="text-primary" />
                        <span>DevCollab</span>
                    </div>
                    <p>© 2026 DevCollab Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms</a>
                        <a href="#" className="hover:text-primary transition-colors">GitHub</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
