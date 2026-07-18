import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Card from '../components/Card';
import Tabs from '../components/Tabs';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import { FolderGit2, Users, Settings, Calendar, Activity, UserIcon, PackageCheck } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProject, getProjectById, updateProject } from '../redux/slices/projectSlide/project.actions';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../components/Dropdown';
import { normalizeError } from '../utils/getErrorMessage';
import { getProjectMembers } from '../redux/slices/memberSlice/member.actions';
import { getProjectInvitations, inviteMemberByMail } from '../redux/slices/invitationSlice/invitation.actions';
import CustomInput from '../components/CustomInput';
import NotFound from './NotFound';
import TaskRow from '../components/TaskRow';
import { createTask, getProjectTasks } from '../redux/slices/taskSlice/task.actions';

const ProjectDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [addInviteModalOpen, setAddInviteModalOpen] = useState(false);
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'to-do',
    dueDate: '',
    assigneesId: [] as string[] // Track chosen member IDs here
  });
  const [email, setEmail] = useState("");
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [taskFilter, setTaskFilter] = useState('all');

  const { project, loading } = useSelector((state: any) => state.project || {});
  const { members, loading: memberLoading } = useSelector((state: any) => state.projectMembers || []);
  const { projectInvitations } = useSelector((state: any) => state.invitations || []);
  const { tasks } = useSelector((state: any) => state.projectTasks || []);

  const [form, setForm] = useState({
    title: "",
    description: "",
    visibility: ""
  });

  useEffect(() => {
    if (id) {
      if (activeTab === 'overview' || activeTab === 'settings') {
        dispatch(getProjectById({ id }));
      } else if (activeTab === 'tasks') {
        dispatch(getProjectTasks({ id }));
      }
      else {
        dispatch(getProjectMembers({ id }));
        dispatch(getProjectInvitations({ id }));
      }
    }
  }, [dispatch, id, activeTab]);

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title ?? "",
        description: project.description ?? "",
        visibility: project.visibility ?? ""
      });
    }
  }, [project]);

  if (!loading && (!project || Object.entries(project).length === 0)) return <NotFound />;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FolderGit2 className="h-4 w-4" /> },
    { id: 'members', label: 'Members', icon: <Users className="h-4 w-4" /> },
    { id: 'tasks', label: 'Tasks', icon: <PackageCheck className='h-4 w-4' /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
  ];

  const breadcrumbs = [
    { label: 'Projects', to: '/projects' },
    { label: project?.title || 'Loading Project...' },
  ];

  if (loading) {
    return (
      <div className="flex-1 min-h-screen bg-zinc-950 p-6 md:p-10 text-zinc-400">
        <div className="w-full">Loading project...</div>
      </div>
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
        navigate(-1);
        toast.success('Project Deleted Successfully');
      } catch (error) {
        let er = normalizeError(error);
        toast.error(er.error);
      }
    }
  };

  const handleSendInvite = async () => {
    if (!email) return;
    setAddInviteModalOpen(false);
    try {
      await dispatch(inviteMemberByMail({ email, id })).unwrap();
      toast.success("Invitation Sent Successfully");
    } catch (error) {
      setEmail("");
      let er = normalizeError(error);
      toast.error(er.error);
    }
  };

  const handleToggleAssignee = (userId: string) => {
    setTaskForm(p => {
      const exists = p.assigneesId.includes(userId);
      const updated = exists
        ? p.assigneesId.filter(id => id !== userId)
        : [...p.assigneesId, userId];
      return { ...p, assigneesId: updated };
    });
  };

  const handleCreateTask = async () => {
    if (!taskForm.title.trim() || !taskForm.description.trim()) return;
    if (taskForm.assigneesId.length === 0) {
      alert("Please select at least one assignee.");
      return;
    }

    try {
      await dispatch(createTask({ id: project?._id, taskData: taskForm })).unwrap();
      toast.success("Task Created Successfully");
    } catch (error) {
      let err = normalizeError(error);
      toast.error(err.error);
    }

    setAddTaskModalOpen(false);
    setTaskForm({ title: '', description: '', priority: 'medium', status: 'to-do', dueDate: '', assigneesId: [] });
  };

  const RenderInviteModal = () => {
    return (
      <div className='fixed inset-0 bg-neutral-950/80 items-center justify-center h-full w-full flex z-50 backdrop-blur-sm'>
        <div className='flex flex-col p-10 bg-zinc-950 gap-5 border border-zinc-900 rounded-xl items-center w-full max-w-md mx-4 shadow-2xl'>
          <CustomInput title='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className="flex gap-3 w-full justify-end">
            <Button variant="ghost" onClick={() => setAddInviteModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSendInvite}>Send Invite</Button>
          </div>
        </div>
      </div>
    );
  };

  interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    form: typeof taskForm;
    setForm: React.Dispatch<React.SetStateAction<typeof taskForm>>;
    members: any[];
    onToggleAssignee: (id: string) => void;
    onSubmit: () => void;
  }

  const RenderTaskModal = ({
    isOpen,
    onClose,
    form,
    setForm,
    members,
    onToggleAssignee,
    onSubmit
  }: TaskModalProps) => {
    if (!isOpen) return null;

    return (
      <div className='fixed inset-0 bg-neutral-950/80 items-center justify-center h-full w-full flex z-50 backdrop-blur-sm'>
        <div className='flex flex-col p-8 bg-zinc-950 gap-4 border border-zinc-900 rounded-xl w-full max-w-md mx-4 shadow-2xl text-zinc-200'>
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">Create New Task</h3>

          <CustomInput
            title='Title *'
            value={form.title}
            onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))}
          />

          <Textarea
            label="Description *"
            value={form.description}
            onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
          />

          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400 font-semibold">Assign Team Members *</label>
            <div className="max-h-24 overflow-y-auto border border-zinc-900 bg-zinc-900/30 rounded-xl p-2 space-y-1 custom-scrollbar">
              {members?.map((member: any) => {
                const isSelected = form.assigneesId.includes(member._id);
                return (
                  <div
                    key={member._id}
                    onClick={() => onToggleAssignee(member._id)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${isSelected ? 'bg-zinc-800 text-zinc-100' : 'hover:bg-zinc-900/60 text-zinc-400'
                      }`}
                  >
                    <span>{member.name || member.email}</span>
                    <div className={`h-3 w-3 rounded border flex items-center justify-center ${isSelected ? 'border-zinc-400 bg-zinc-100 text-zinc-950' : 'border-zinc-700'
                      }`}>
                      {isSelected && "✓"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-semibold">Priority</label>
              <Dropdown
                items={[
                  { label: "Low", onClick: () => setForm(p => ({ ...p, priority: 'low' })) },
                  { label: "Medium", onClick: () => setForm(p => ({ ...p, priority: 'medium' })) },
                  { label: "High", onClick: () => setForm(p => ({ ...p, priority: 'high' })) }
                ]}
                align='left'
                trigger={
                  <div className='border-zinc-800 border bg-zinc-900 px-3 py-2 rounded-xl text-xs text-zinc-200 capitalize cursor-pointer'>
                    {form.priority}
                  </div>
                }
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-semibold">Due Date</label>
              <input
                type="date"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700 h-[38px]"
                value={form.dueDate}
                onChange={(e) => setForm(p => ({ ...p, dueDate: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex gap-3 w-full justify-end pt-2 border-t border-zinc-900 mt-2">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit}>Create</Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    // Replaced max-w-6xl with w-full, bumped font scaling across responsive screens (text-2xl to lg:text-3xl)
    <div className="flex-1 min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-10 lg:p-12 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full space-y-8">

        {addInviteModalOpen && <RenderInviteModal />}
        {addTaskModalOpen &&
          <RenderTaskModal
            isOpen={addTaskModalOpen}
            onClose={() => setAddTaskModalOpen(false)}
            form={taskForm}
            setForm={setTaskForm}
            members={members || []}
            onToggleAssignee={handleToggleAssignee}
            onSubmit={handleCreateTask}
          />}


        <div className="space-y-3 pb-6 border-b border-zinc-900">
          <Breadcrumb items={breadcrumbs} />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className=" text-xl md:text-2xl lg:text-3xl font-extrabold text-zinc-100 tracking-tight flex items-center gap-2.5 min-h-[40px]">
                <FolderGit2 className="h-7 w-7 lg:h-8 lg:w-8 text-indigo-400" />
                {project?.title || 'Untitled Project'}
              </h1>
              <p className="text-sm text-zinc-400 mt-1">{project?.description || 'No description provided.'}</p>
            </div>
          </div>
        </div>

        <Card padding="none" className="overflow-hidden bg-zinc-900/30 border border-zinc-900 w-full">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="px-6 border-b border-zinc-900" />

          <div className="p-6 md:p-8">
            {activeTab === 'overview' && (
              // Rebalanced split ratio from 2:1 to an ultra-wide split grid layout
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-zinc-100">{project?.title}</h2>
                  </div>
                  <div className="space-y-3 border-t border-zinc-900/80 pt-5">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Project Description</h3>
                    <p className="text-sm text-zinc-300 leading-relaxed max-w-full">{project?.description}</p>
                  </div>
                </div>

                <div className="space-y-5 bg-zinc-950/40 p-6 border border-zinc-900 rounded-xl lg:col-span-1 w-full h-fit">
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Workspace Status</h4>
                  <div className="space-y-4 text-xs text-zinc-400">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                      <span className="flex items-center gap-1.5">
                        <Activity className="h-4 w-4 text-zinc-500" /> Project Status
                      </span>
                      <Badge variant={project?.status === 'Completed' ? 'success' : 'primary'} size="sm">
                        {project?.status || 'Active'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-zinc-500" /> Created Date
                      </span>
                      <span className="text-zinc-200 font-medium">
                        {project?.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-900 pb-3">
                      <span>Project Type:</span>
                      <span className="text-zinc-200 font-semibold capitalize">{project?.visibility || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Members:</span>
                      <span className="text-zinc-200 font-semibold">{project?.memberCount || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div className='flex flex-col gap-8'>
                {memberLoading && <div className="text-zinc-400 text-sm">Loading members...</div>}

                <div className='space-y-4'>
                  <p className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Active Members</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {members?.map((item: any, index: number) => (
                      <div key={index} className='flex flex-row rounded-xl border border-zinc-900 bg-zinc-950/50 p-4 gap-4 items-center shadow-lg transition-all duration-200 hover:border-zinc-800 w-full'>
                        <UserIcon size={40} className='bg-zinc-900 text-zinc-400 p-2.5 rounded-xl border border-zinc-800 shrink-0' />
                        <div className='text-zinc-200 text-xs space-y-0.5 min-w-0 flex-1'>
                          <p className='font-semibold truncate text-zinc-100' title={item?.email}>{item?.email}</p>
                          <p className='text-zinc-500 capitalize'>{item?.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='space-y-4'>
                  <p className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Invitations Sent</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {projectInvitations?.map((item: any, index: number) => (
                      <div key={index} className='flex flex-row rounded-xl border border-zinc-900 bg-zinc-950/50 p-4 gap-4 items-center shadow-lg transition-all duration-200 hover:border-zinc-800 w-full'>
                        <UserIcon size={40} className='bg-zinc-900 text-zinc-400 p-2.5 rounded-xl border border-zinc-800 shrink-0' />
                        <div className='text-zinc-200 text-xs space-y-0.5 min-w-0 flex-1'>
                          <p className='font-semibold truncate text-zinc-100' title={item?.invitedEmail}>{item?.invitedEmail}</p>
                          <p className='text-zinc-500 capitalize'>{item?.role || 'Guest'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Button onClick={() => setAddInviteModalOpen(true)}>
                    Add Member
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'tasks' && (
              <div className="w-full space-y-6">
                {/* Filter Buttons */}
                <div className='flex flex-row items-center justify-between '>
                  <div className="flex items-center gap-1.5 border-b border-zinc-900 pb-3 overflow-x-auto">
                    {[
                      { label: 'All Tasks', value: 'all' },
                      { label: 'To Do', value: 'to-do' },
                      { label: 'In Progress', value: 'in-progress' },
                      { label: 'Completed', value: 'completed' },
                    ].map((tab) => (
                      <button
                        key={tab.value}
                        type="button"
                        onClick={() => setTaskFilter(tab.value)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${taskFilter === tab.value
                          ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 border border-transparent'
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  <Button onClick={() => setAddTaskModalOpen(true)}>Create Task</Button>

                </div>

                {/* Filtered Task Rows */}
                <div className="space-y-3 w-full">
                  {(() => {
                    const allTasks = tasks || [];
                    const filtered = taskFilter === 'all'
                      ? allTasks
                      : allTasks.filter((t: any) => t.status === taskFilter);

                    if (filtered.length === 0) {
                      return (
                        <div className="border border-dashed border-zinc-900 rounded-xl p-8 text-center text-xs text-zinc-500">
                          No tasks found matching this filter criteria.
                        </div>
                      );
                    }

                    return filtered.map((task: any) => (
                      <TaskRow key={task._id} task={task} />
                    ));
                  })()}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="w-full">
                <form onSubmit={handleUpdateSettings} className="space-y-6 w-full max-w-2xl">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">General Information</h4>
                    <Input
                      label="Project Name"
                      value={form.title}
                      onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                    />
                    <div className="space-y-1.5">
                      <p className='text-xs text-zinc-400 font-semibold'>Project visibility</p>
                      <Dropdown items={[{
                        label: "public", onClick() {
                          setForm(prev => ({ ...prev, visibility: 'public' }))
                        },
                      }, {
                        label: "private", onClick() {
                          setForm(prev => ({ ...prev, visibility: 'private' }))
                        },
                      }]} align='left' trigger={
                        <div className='border-zinc-800 border bg-zinc-900 pl-3 p-2.5 rounded-xl cursor-pointer hover:border-zinc-700 transition-colors w-full max-w-xs'>
                          <p className="text-sm text-zinc-200 capitalize">{form?.visibility || 'Select visibility'}</p>
                        </div>
                      } />
                    </div>

                    <Textarea
                      label="Project Description"
                      value={form.description}
                      onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                    />

                    <Button size="sm" type="submit">Save Project Details</Button>
                  </div>
                </form>

                <div className='space-y-2 mt-10 pt-6 border-t border-zinc-900 w-full max-w-2xl'>
                  <p className='text-sm text-red-400 font-bold uppercase tracking-wider'>Danger Zone</p>
                  <p className='text-xs text-zinc-500'>Permanently delete this project workspace and all data associated with it.</p>
                  <Button onClick={handleDeleteProject} className='bg-red-950/40 hover:bg-red-900 text-red-200 border-red-900/50 hover:border-red-800 focus:ring-0 mt-2'>Delete Project</Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetails;