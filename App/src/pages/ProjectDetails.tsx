import React, { useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import Breadcrumb from '../components/Breadcrumb';
import Card from '../components/Card';
import Tabs from '../components/Tabs';
import Avatar from '../components/Avatar';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import { FolderGit2, Users, Settings, Plus, Calendar, Activity } from 'lucide-react';
import { toast } from 'react-toastify';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { deleteProject, getProjectById, updateProject } from '../redux/slices/projectSlide/project.actions';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../components/Dropdown';
import { normalizeError } from '../utils/getErrorMessage';

interface Member {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

const ProjectDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const params = useParams();
  const { id } = params;
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const { project, loading, error } = useSelector(state => state.project || []);

  // Local form state for settings
  const [form, setForm] = useState({
    title: "",
    description: "",
    visibility: ""
  });

  useEffect(() => {
    if (id) {
      dispatch(getProjectById({ id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title ?? "",
        description: project.description ?? "",
        visibility: project.visibility ?? ""
      });
    }
  }, [project]);

  // Workspace Members State (Placeholder)
  const [members] = useState<Member[]>([]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FolderGit2 className="h-4 w-4" /> },
    { id: 'members', label: 'Members', icon: <Users className="h-4 w-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
  ];

  const breadcrumbs = [
    { label: 'Projects', to: '/projects' },
    { label: project?.title || 'Loading Project...' },
  ];

  if (loading) {
    return (
      <AppLayout>
        <div className="p-6 text-zinc-400">Loading project...</div>
      </AppLayout>
    );
  }

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      try {
        await dispatch(updateProject({ data: { id, ...form } })).unwrap();
        toast.success('Project details updated successfully.');
      } catch (error) {
        let er = normalizeError(error);
        toast.error(er.error);
      }
    }

  };

  const handleDeleteProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      try {
        await dispatch(deleteProject({ id })).unwrap();
        Navigate(-1);
        toast.success('Project Deleted Successfully');
      } catch (error) {
        let er = normalizeError(error);
        toast.error(er.error);
      }
    }
  }

  return (
    <AppLayout>
      <div className="space-y-2 pb-4 border-b border-zinc-900">
        <Breadcrumb items={breadcrumbs} />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-100 tracking-tight flex items-center gap-2 min-h-[32px]">
              <FolderGit2 className="h-6 w-6 text-indigo-400" />
              {project?.title || 'Untitled Project'}
            </h1>
            <p className="text-xs text-zinc-400 mt-1">{project?.description || 'No description provided.'}</p>
          </div>
        </div>
      </div>

      <Card padding="none" className="overflow-hidden bg-zinc-900/30">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="px-4" />

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-zinc-100">{project?.title}</h2>
                </div>
                <div className="space-y-2 border-t border-zinc-900/80 pt-4">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Project Description</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">{project?.description}</p>
                </div>
                {/* {project?.tags && project.tags.length > 0 && (
                  <div className="space-y-3 border-t border-zinc-900/80 pt-4">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Project Tags</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )} */}
              </div>

              <div className="space-y-4 bg-zinc-950/40 p-4 border border-zinc-900 rounded-xl self-start">
                <h4 className="text-xs font-bold text-zinc-300">Workspace Status</h4>
                <div className="space-y-4 text-[11px] text-zinc-400">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="flex items-center gap-1.5">
                      <Activity className="h-3.5 w-3.5 text-zinc-500" /> Project Status
                    </span>
                    <Badge variant={project?.status === 'Completed' ? 'success' : 'primary'} size="sm">
                      {project?.status || 'Active'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-zinc-500" /> Created Date
                    </span>
                    <span className="text-zinc-200 font-medium">
                      {project?.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Project Type:</span>
                    <span className="text-zinc-200 font-semibold">{project?.visibility || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Members:</span>
                    <span className="text-zinc-200 font-semibold">{project?.memberCount || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <form onSubmit={handleUpdateSettings} className="space-y-6 max-w-lg">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-zinc-300">General Information</h4>
                  <Input
                    label="Project Name"
                    value={form.title}
                    onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  />
                  <p className='text-xs text-neutral-400 font-semibold'>Project visibility</p>
                  <Dropdown items={[{
                    label: "public", onClick() {
                      setForm(prev => ({ ...prev, visibility: 'public' }))
                    },
                  }, {
                    label: "private", onClick() {
                      setForm(prev => ({ ...prev, visibility: 'private' }))
                    },
                  }]} align='left' trigger={<div className='border-zinc-800 border bg-zinc-900 pl-3 p-2 rounded-xl'><p>{form?.visibility}</p></div>} />

                  <Textarea
                    label="Project Description"
                    value={form.description}
                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  />

                  <Button size="sm" type="submit">Save Project Details</Button>
                </div>
              </form>

              <div className='space-y-2 py-5'>
                <p className='text-sm text-neutral-400 font-semibold'>Delete your project</p>
                <Button onClick={handleDeleteProject} className='bg-red-900 hover:bg-red-800 border-red-900 focus:ring-[0px]'>Delete Project</Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </AppLayout>
  );
};

export default ProjectDetails;