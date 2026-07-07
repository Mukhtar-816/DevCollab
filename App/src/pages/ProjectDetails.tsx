import React, { useState } from 'react';
import AppLayout from '../components/AppLayout';
import Breadcrumb from '../components/Breadcrumb';
import Card from '../components/Card';
import Tabs from '../components/Tabs';
import Avatar from '../components/Avatar';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import { 
  FolderGit2, Users, CheckSquare, FileText, MessageSquare, 
  Settings, Plus, FileUp, Send, Trash2
} from 'lucide-react';
import { toast } from 'react-toastify';

const ProjectDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [message, setMessage] = useState('');
  
  // Tabs Configuration
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FolderGit2 className="h-4 w-4" /> },
    { id: 'members', label: 'Members', icon: <Users className="h-4 w-4" /> },
    { id: 'tasks', label: 'Tasks', icon: <CheckSquare className="h-4 w-4" /> },
    { id: 'files', label: 'Files', icon: <FileText className="h-4 w-4" /> },
    { id: 'chat', label: 'Chat Feed', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
  ];

  const breadcrumbs = [
    { label: 'Projects', to: '/projects' },
    { label: 'DevCollab Client' },
  ];

  // Mock Members list
  const members = [
    { name: 'Alex Johnson', email: 'alex@devcollab.com', role: 'Maintainer', avatar: '' },
    { name: 'Sarah Connor', email: 'sarah@devcollab.com', role: 'Collaborator', avatar: '' },
    { name: 'David Miller', email: 'david@devcollab.com', role: 'Collaborator', avatar: '' },
  ];

  // Mock Tasks
  const tasks = [
    { id: 'T-1', title: 'Implement JWT refresh token validation flow', status: 'active', priority: 'high' },
    { id: 'T-2', title: 'Refactor navbar to wrap custom Dropdown list', status: 'review', priority: 'medium' },
    { id: 'T-3', title: 'Write layout tests for mobile responsiveness', status: 'completed', priority: 'low' },
  ];

  // Mock Files
  const files = [
    { name: 'package.json', size: '1.2 KB', updated: '2 hours ago' },
    { name: 'MainNavigation.tsx', size: '3.4 KB', updated: 'Yesterday' },
    { name: 'auth.slice.tsx', size: '5.8 KB', updated: '3 days ago' },
  ];

  // Mock Chat Feed
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Sarah Connor', text: 'Hey guys, I updated the layout container in index.css.', time: '10:45 AM' },
    { sender: 'Alex Johnson', text: 'Awesome, will review the layout parameters shortly.', time: '10:47 AM' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatMessages(prev => [
      ...prev,
      { sender: 'You (UI Placeholder)', text: message, time: 'Just now' }
    ]);
    setMessage('');
    toast.success('Message sent! (UI state only)');
  };

  return (
    <AppLayout>
      {/* Breadcrumbs and Title */}
      <div className="space-y-2 pb-4 border-b border-zinc-900">
        <Breadcrumb items={breadcrumbs} />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-100 tracking-tight flex items-center gap-2">
              <FolderGit2 className="h-6 w-6 text-indigo-400" />
              DevCollab Client
            </h1>
            <p className="text-xs text-zinc-400 mt-1">React v19 + Tailwind v4 + Vite client UI rebuild.</p>
          </div>
          <div className="flex -space-x-1.5 bg-zinc-900/40 p-1.5 rounded-xl border border-zinc-800/80">
            {members.map((member, i) => (
              <Avatar key={i} name={member.name} size="sm" className="border border-zinc-950" />
            ))}
          </div>
        </div>
      </div>

      {/* Tabs list navigation */}
      <Card padding="none" className="overflow-hidden bg-zinc-900/30">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="px-4" />

        <div className="p-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-5">
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Project Summary</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    This repository contains the visual components and frontend pages for DevCollab. We are reconstructing our interface using Tailwind CSS v4 and Framer Motion, while isolating business logic for the backend.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Project Tags</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {['React', 'Vite', 'Tailwind CSS', 'Redux Toolkit', 'TypeScript'].map((tag, i) => (
                      <span key={i} className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4 bg-zinc-950/40 p-4 border border-zinc-900 rounded-xl self-start">
                <h4 className="text-xs font-bold text-zinc-300">Workspace Status</h4>
                <div className="space-y-3.5 text-[11px] text-zinc-400">
                  <div className="flex justify-between">
                    <span>Repository Type:</span>
                    <span className="text-zinc-200 font-semibold">Public</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Task Completion:</span>
                    <span className="text-zinc-200 font-semibold">33% (1/3)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Members:</span>
                    <span className="text-zinc-200 font-semibold">3 Developers</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MEMBERS */}
          {activeTab === 'members' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Active Workspace Members</h4>
                <Button size="sm" leftIcon={<Plus className="h-4.5 w-4.5" />}>Invite Member</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map((member, i) => (
                  <div key={i} className="flex items-center gap-3 p-3.5 bg-zinc-900/40 border border-zinc-900 rounded-xl">
                    <Avatar name={member.name} size="md" />
                    <div>
                      <p className="text-xs font-bold text-zinc-200">{member.name}</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">{member.email}</p>
                      <Badge variant={member.role === 'Maintainer' ? 'primary' : 'secondary'} size="sm" className="mt-1.5">
                        {member.role}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TASKS */}
          {activeTab === 'tasks' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Task Backlog</h4>
                <Button size="sm" leftIcon={<Plus className="h-4.5 w-4.5" />}>New Task</Button>
              </div>
              <div className="divide-y divide-zinc-900 border border-zinc-900 rounded-xl bg-zinc-950/20 overflow-hidden">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 hover:bg-zinc-900/20 transition-colors">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-zinc-200">{task.title}</p>
                      <span className="text-[10px] text-zinc-500 font-medium">ID: {task.id}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={task.priority === 'high' ? 'danger' : 'warning'} size="sm">
                        {task.priority}
                      </Badge>
                      <Badge variant={task.status === 'completed' ? 'success' : 'primary'} size="sm">
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FILES */}
          {activeTab === 'files' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Attached Assets</h4>
                <Button size="sm" variant="outline" leftIcon={<FileUp className="h-4.5 w-4.5" />}>Upload File</Button>
              </div>
              <div className="divide-y divide-zinc-900 border border-zinc-900 rounded-xl bg-zinc-950/20 overflow-hidden">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 hover:bg-zinc-900/20 transition-colors">
                    <div>
                      <p className="text-xs font-semibold text-zinc-200 hover:text-indigo-400 cursor-pointer">{file.name}</p>
                      <span className="text-[10px] text-zinc-500 mt-1 block font-medium">Uploaded {file.updated} • {file.size}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-rose-400">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CHAT */}
          {activeTab === 'chat' && (
            <div className="space-y-4 flex flex-col h-[350px]">
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {chatMessages.map((msg, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-indigo-400">{msg.sender}</span>
                      <span className="text-[9px] text-zinc-600">{msg.time}</span>
                    </div>
                    <div className="p-3 bg-zinc-900/60 border border-zinc-900 rounded-xl max-w-lg">
                      <p className="text-xs text-zinc-300 leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-zinc-900 pt-3">
                <Input
                  placeholder="Type project memo..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-grow rounded-xl"
                />
                <Button type="submit" leftIcon={<Send className="h-4 w-4" />}>Send</Button>
              </form>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-lg">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-zinc-300">General Information</h4>
                <Input label="Project Name" defaultValue="DevCollab Client" />
                <Textarea label="Project Description" defaultValue="React v19 + Tailwind v4 + Vite client UI rebuild." />
                <Button size="sm">Save Project Details</Button>
              </div>

              <div className="border-t border-zinc-900 pt-6 space-y-3">
                <h4 className="text-xs font-bold text-rose-400">Danger Zone</h4>
                <p className="text-[11px] text-zinc-500">Deletes all tasks, files, and project archives permanently.</p>
                <Button variant="danger" size="sm">Delete Project</Button>
              </div>
            </div>
          )}

        </div>
      </Card>
    </AppLayout>
  );
};

export default ProjectDetails;
