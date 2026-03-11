import React from "react";
import {
    Users,
    Code,
    GitPullRequest,
    MessageSquare,
    TrendingUp,
    Clock,
    Plus,
    ArrowUpRight,
    MoreVertical
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";

const DashboardPage = () => {
    const stats = [
        { name: "Total Projects", value: "12", icon: Code, trend: "+2", color: "text-blue-500" },
        { name: "Collaborators", value: "48", icon: Users, trend: "+12", color: "text-purple-500" },
        { name: "Open PRs", value: "8", icon: GitPullRequest, trend: "-1", color: "text-green-500" },
        { name: "Messages", value: "128", icon: MessageSquare, trend: "+24", color: "text-orange-500" },
    ];

    const recentProjects = [
        { name: "DevCollab UI", status: "Active", collaborators: 4, stack: ["React", "Tailwind"], lastUpdate: "2h ago" },
        { name: "API Gateway", status: "Staging", collaborators: 2, stack: ["Node.js", "Redis"], lastUpdate: "5h ago" },
        { name: "Mobile App", status: "Archived", collaborators: 6, stack: ["React Native"], lastUpdate: "3d ago" },
        { name: "Data Pipeline", status: "Active", collaborators: 3, stack: ["Python", "AWS"], lastUpdate: "1d ago" },
    ];

    return (
        <div className="container mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back! Here's what's happening with your projects.</p>
                </div>
                <Button className="w-full md:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="hover:border-primary/50 transition-colors group">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color} group-hover:scale-110 transition-transform`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                <span className={stat.trend.startsWith("+") ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                                    {stat.trend}
                                </span>{" "}
                                from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-7">
                {/* Recent Projects Table */}
                <Card className="md:col-span-4 overflow-hidden border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Recent Projects</CardTitle>
                            <CardDescription>Stay updated on your active collaborations.</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm">View All</Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-accent/5 text-muted-foreground uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold">Project Name</th>
                                        <th className="px-6 py-3 font-semibold">Status</th>
                                        <th className="px-6 py-3 font-semibold">Stack</th>
                                        <th className="px-6 py-3 font-semibold text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {recentProjects.map((project, index) => (
                                        <tr key={index} className="hover:bg-accent/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium">{project.name}</div>
                                                <div className="text-xs text-muted-foreground flex items-center mt-1">
                                                    <Clock className="mr-1 h-3 w-3" /> {project.lastUpdate}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${project.status === "Active" ? "bg-green-500/10 text-green-500" :
                                                        project.status === "Staging" ? "bg-blue-500/10 text-blue-500" :
                                                            "bg-zinc-500/10 text-zinc-500"
                                                    }`}>
                                                    {project.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-1 flex-wrap">
                                                    {project.stack.map((tag, i) => (
                                                        <span key={i} className="text-[10px] bg-accent/20 px-1.5 py-0.5 rounded border border-border/30">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Activity Feed / Notifications */}
                <Card className="md:col-span-3 border-border/50">
                    <CardHeader>
                        <CardTitle>Activity Feed</CardTitle>
                        <CardDescription>Recent actions across your network.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex gap-4 items-start group">
                                <div className="h-2 w-2 rounded-full bg-primary mt-2 group-hover:scale-150 transition-transform" />
                                <div className="space-y-1">
                                    <p className="text-sm">
                                        <span className="font-semibold">Alex Chen</span> invited you to collaborate on{" "}
                                        <span className="text-primary font-medium hover:underline cursor-pointer">Shadow Protocol</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground flex items-center">
                                        <Clock className="mr-1 h-3 w-3" /> {i * 15}m ago
                                    </p>
                                </div>
                                <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        ))}
                        <Button className="w-full mt-4" variant="outline">Load More Activity</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
