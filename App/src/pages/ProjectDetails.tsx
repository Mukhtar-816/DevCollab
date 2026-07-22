import React, { useEffect, useState } from 'react';
import { FolderGit2, Users, Settings, Activity, Calendar, PackageCheck, UserIcon, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Components & Utilities
import Breadcrumb from '../components/Breadcrumb';
import Card from '../components/Card';
import Tabs from '../components/Tabs';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Dropdown from '../components/Dropdown';
import NotFound from './NotFound';
import TaskRow from '../components/TaskRow';
import { normalizeError } from '../utils/getErrorMessage';

// Extracted Sub-Components
import RenderInviteModal from '../components/modals/RenderInviteModal';
import RenderTaskModal, { type TaskFormState } from '../components/modals/RenderTaskModal';
import RenderTaskDetailModal from '../components/modals/RenderTaskDetailModal';

// Redux Actions
import { deleteProject, getProjectById, updateProject } from '../redux/slices/projectSlide/project.actions';
import { getProjectMembers } from '../redux/slices/memberSlice/member.actions';
import { getProjectInvitations, inviteMemberByMail } from '../redux/slices/invitationSlice/invitation.actions';
import { createTask, deleteTask, getProjectTasks, getTaskDetails, updateTask } from '../redux/slices/taskSlice/task.actions';
import { deleteComment, getTaskComments, postComment, updateComment } from '../redux/slices/commentSlice/comment.actions';

const ProjectDetails = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  // Redux Store Selectors
  const { project, loading: projectLoading } = useSelector((state: any) => state.project || {});
  const { members, loading: memberLoading } = useSelector((state: any) => state.projectMembers || {});
  const { projectInvitations, loading: invitationLoading } = useSelector((state: any) => state.invitations || {});
  const { tasks, task: reduxTask, loading: taskLoading } = useSelector((state: any) => state.projectTasks || {});
  const { comments, loading: commentLoading } = useSelector((state: any) => state.projectTaskComments || {});
  const { user } = useSelector((state: any) => state.user || {});

  // UI Navigation & Filtering State
  const [activeTab, setActiveTab] = useState('overview');
  const [taskFilter, setTaskFilter] = useState('all');

  // Modal Open/Close Toggle States
  const [addInviteModalOpen, setAddInviteModalOpen] = useState(false);
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [taskDetailModalOpen, setTaskDetailModalOpen] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);

  // Form States
  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'Guest'
  });
  const [form, setForm] = useState({ title: '', description: '', visibility: '' });

  const [taskForm, setTaskForm] = useState<TaskFormState>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'to-do',
    dueDate: '',
    assigneesId: [],
  });

  const [editingTaskForm, setEditingTaskForm] = useState<TaskFormState>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'to-do',
    dueDate: '',
    assigneesId: [],
  });

  // Sync edit form data directly from Redux state when viewing task details
  useEffect(() => {
    if (reduxTask && taskDetailModalOpen) {
      const formattedDate = reduxTask.dueDate ? new Date(reduxTask.dueDate).toISOString().split('T')[0] : '';
      const mappedAssigneeIds = reduxTask.assigneesId?.map((a: any) => (typeof a === 'object' ? a._id : a)) || [];

      setEditingTaskForm({
        title: reduxTask.title || '',
        description: reduxTask.description || '',
        priority: reduxTask.priority || 'medium',
        status: reduxTask.status || 'to-do',
        dueDate: formattedDate,
        assigneesId: mappedAssigneeIds,
      });
    }
  }, [reduxTask, taskDetailModalOpen]);

  // Fetch tab-specific data on change
  useEffect(() => {
    if (id) {
      if (activeTab === 'overview' || activeTab === 'settings') {
        dispatch(getProjectById({ id }));
      } else if (activeTab === 'tasks') {
        dispatch(getProjectTasks({ id }));
        if (!members || members.length === 0) {
          dispatch(getProjectMembers({ id }));
        }
      } else {
        dispatch(getProjectMembers({ id }));
        dispatch(getProjectInvitations({ id }));
      }
    }
  }, [dispatch, id, activeTab]);

  useEffect(() => {
    if (id && addTaskModalOpen && (!members || members.length === 0)) {
      dispatch(getProjectMembers({ id }));
    }
  }, [dispatch, id, addTaskModalOpen, members]);

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title ?? '',
        description: project.description ?? '',
        visibility: project.visibility ?? '',
      });
    }
  }, [project]);

  if (!projectLoading && (!project || Object.entries(project).length === 0)) return <NotFound />;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FolderGit2 className="h-4 w-4" /> },
    { id: 'members', label: 'Members', icon: <Users className="h-4 w-4" /> },
    { id: 'tasks', label: 'Tasks', icon: <PackageCheck className="h-4 w-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
  ];

  const breadcrumbs = [
    { label: 'Projects', to: '/projects' },
    { label: project?.title || 'Loading Project...' },
  ];

  if (projectLoading && !project) {
    return (
      <div className="flex-1 min-h-screen bg-zinc-950 p-6 md:p-10 text-zinc-400 flex items-center justify-center gap-2">
        <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
        <span>Loading project...</span>
      </div>
    );
  }

  // Project Actions
  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      try {
        await dispatch(updateProject({ data: { id, ...form } })).unwrap();
        toast.success('Project details updated successfully.');
      } catch (error) {
        toast.error(normalizeError(error).error);
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
        toast.error(normalizeError(error).error);
      }
    }
  };

  // Member Actions
  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inviteForm);
    if (!inviteForm?.email || !inviteForm?.role) return;
    try {
      await dispatch(inviteMemberByMail({ email: inviteForm.email, role: inviteForm?.role, id })).unwrap();
      toast.success('Invitation Sent Successfully');
      setAddInviteModalOpen(false);
      setInviteForm({ email: "", role: 'Guest' })
    } catch (error) {
      setInviteForm({ email: "", role: 'Guest' })
      let er = normalizeError(error)
      toast.error(er.error);
    }
  };

  const handleToggleAssignee = (userId: string) => {
    setTaskForm((p) => {
      const exists = p.assigneesId.includes(userId);
      const updated = exists ? p.assigneesId.filter((item) => item !== userId) : [...p.assigneesId, userId];
      return { ...p, assigneesId: updated };
    });
  };

  const handleToggleEditAssignee = (userId: string) => {
    setEditingTaskForm((p) => {
      const exists = p.assigneesId.includes(userId);
      const updated = exists ? p.assigneesId.filter((item) => item !== userId) : [...p.assigneesId, userId];
      return { ...p, assigneesId: updated };
    });
  };

  // Task Actions
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskForm.title.trim() || !taskForm.description.trim()) {
      toast.error('Please fill in all mandatory fields.');
      return;
    }
    if (taskForm.assigneesId.length === 0) {
      toast.error('Please select at least one assignee.');
      return;
    }

    try {
      await dispatch(createTask({ id: project?._id, taskData: taskForm })).unwrap();
      toast.success('Task Created Successfully');
      setAddTaskModalOpen(false);
      setTaskForm({ title: '', description: '', priority: 'medium', status: 'to-do', dueDate: '', assigneesId: [] });
    } catch (error) {
      toast.error(normalizeError(error).error);
    }
  };

  const handleOpenTaskDetail = async (t: any) => {
    setIsEditingTask(false);
    setTaskDetailModalOpen(true);

    try {
      await dispatch(getTaskDetails({ projectId: id, taskId: t?._id })).unwrap();
      dispatch(getTaskComments({ projectId: id, taskId: t?._id }));
    } catch (error) {
      setTaskDetailModalOpen(false);
      toast.error(normalizeError(error).error);
    }
  };

  const handleUpdateTaskDetails = async () => {
    if (!editingTaskForm.title.trim() || !editingTaskForm.description.trim()) {
      toast.error('Title and Description parameters cannot be empty.');
      return;
    }
    if (editingTaskForm.assigneesId.length === 0) {
      toast.error('Please select at least one assignee.');
      return;
    }

    try {
      await dispatch(updateTask({ projectId: id, taskId: reduxTask?._id, data: editingTaskForm })).unwrap();
      toast.success('Successfully Updated Task');
      setIsEditingTask(false);
      setTaskDetailModalOpen(false);
    } catch (error) {
      toast.error(normalizeError(error).error);
    }
  };

  const handleDeleteTaskDetails = async () => {
    const confirmDelete = window.confirm('Are you sure you want to permanently remove this task?');
    if (!confirmDelete) return;

    try {
      await dispatch(deleteTask({ projectId: id, taskId: reduxTask?._id })).unwrap();
      toast.success('Task Deleted Successfully');
      setTaskDetailModalOpen(false);
    } catch (error) {
      toast.error(normalizeError(error).error);
    }
  };

  // Comment Actions
  const handleCommentSubmit = async (
    e: React.FormEvent,
    newCommentText: string,
    setNewCommentText: (val: string) => void
  ) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    try {
      await dispatch(postComment({ projectId: id, taskId: reduxTask?._id, commentBody: newCommentText })).unwrap();
      toast.success('Comment Posted Successfully');
      setNewCommentText('');
    } catch (error) {
      toast.error(normalizeError(error).error);
    }
  };

  const handleUpdateComment = async (
    commentId: string,
    editingCommentText: string
  ) => {
    if (!editingCommentText?.trim()) return;
    try {
      await dispatch(updateComment({ projectId: id, commentId, commentBody: editingCommentText })).unwrap();
      toast.success("Comment Updated Successfully");
    } catch (error) {
      let er = normalizeError(error);
      toast.error(er.error);
    }
  };

  const handleDeleteComment = async (
    commentId: string,
  ) => {
    if (!commentId?.trim()) return;
    try {
      await dispatch(deleteComment({ projectId: id, commentId })).unwrap();
      toast.success("Comment Deleted Successfully");
    } catch (error) {
      let er = normalizeError(error);
      toast.error(er.error);
    }
  };



  return (
    <div className="flex-1 min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-10 lg:p-12 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full space-y-8">
        <RenderInviteModal
          isOpen={addInviteModalOpen}
          onClose={() => setAddInviteModalOpen(false)}
          inviteForm={inviteForm}
          setInviteForm={setInviteForm}
          onSubmit={handleSendInvite}
          loading={invitationLoading}
        />

        <RenderTaskModal
          isOpen={addTaskModalOpen}
          onClose={() => setAddTaskModalOpen(false)}
          form={taskForm}
          setForm={setTaskForm}
          members={members || []}
          onToggleAssignee={handleToggleAssignee}
          onSubmit={handleCreateTask}
          loading={taskLoading}
        />

        <RenderTaskDetailModal
          currentUser={user}
          isOpen={taskDetailModalOpen}
          onClose={() => {
            setTaskDetailModalOpen(false);
            setIsEditingTask(false);
          }}
          activeTask={reduxTask}
          isEditingTask={isEditingTask}
          setIsEditingTask={setIsEditingTask}
          editingTaskForm={editingTaskForm}
          setEditingTaskForm={setEditingTaskForm}
          members={members || []}
          comments={comments}
          onToggleEditAssignee={handleToggleEditAssignee}
          onUpdate={handleUpdateTaskDetails}
          onDelete={handleDeleteTaskDetails}
          onCommentSubmit={handleCommentSubmit}
          onUpdateComment={handleUpdateComment}
          onDeleteComment={handleDeleteComment}
          taskLoading={taskLoading}
          commentLoading={commentLoading}
        />

        <div className="space-y-3 pb-6 border-b border-zinc-900">
          <Breadcrumb items={breadcrumbs} />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-zinc-100 tracking-tight flex items-center gap-2.5 min-h-[40px]">
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
              <div className="flex flex-col gap-8">
                {(memberLoading || invitationLoading) && (
                  <div className="flex items-center gap-2 text-zinc-400 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
                    <span>Loading members & invitations...</span>
                  </div>
                )}

                <div className="space-y-4">
                  <p className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Active Members</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {members?.map((item: any, index: number) => (
                      <div key={index} className="flex flex-row rounded-xl border border-zinc-900 bg-zinc-950/50 p-4 gap-4 items-center shadow-lg transition-all duration-200 hover:border-zinc-800 w-full">
                        <UserIcon size={40} className="bg-zinc-900 text-zinc-400 p-2.5 rounded-xl border border-zinc-800 shrink-0" />
                        <div className="text-zinc-200 text-xs space-y-0.5 min-w-0 flex-1">
                          <p className="font-semibold truncate text-zinc-100" title={item?.email}>{item?.email}</p>
                          <p className="text-zinc-500 capitalize">{item?.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Invitations Sent</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {projectInvitations?.map((item: any, index: number) => (
                      <div key={index} className="flex flex-row rounded-xl border border-zinc-900 bg-zinc-950/50 p-4 gap-4 items-center shadow-lg transition-all duration-200 hover:border-zinc-800 w-full">
                        <UserIcon size={40} className="bg-zinc-900 text-zinc-400 p-2.5 rounded-xl border border-zinc-800 shrink-0" />
                        <div className="text-zinc-200 text-xs space-y-0.5 min-w-0 flex-1">
                          <p className="font-semibold truncate text-zinc-100" title={item?.invitedEmail}>{item?.invitedEmail}</p>
                          <p className="text-zinc-500 capitalize">{item?.role || 'Guest'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Button onClick={() => setAddInviteModalOpen(true)}>Add Member</Button>
                </div>
              </div>
            )}

            {activeTab === 'tasks' && (
              <div className="w-full space-y-6">
                <div className="flex flex-row items-center justify-between ">
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

                <div className="space-y-3 w-full">
                  {taskLoading && (!tasks || tasks.length === 0) ? (
                    <div className="flex items-center justify-center p-8 gap-2 text-xs text-zinc-400">
                      <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
                      <span>Loading tasks...</span>
                    </div>
                  ) : (() => {
                    const allTasks = tasks || [];
                    const filtered = taskFilter === 'all' ? allTasks : allTasks.filter((t: any) => t.status === taskFilter);

                    if (filtered.length === 0) {
                      return (
                        <div className="border border-dashed border-zinc-900 rounded-xl p-8 text-center text-xs text-zinc-500">
                          No tasks found matching this filter criteria.
                        </div>
                      );
                    }

                    return filtered.map((task: any) => (
                      <div key={task._id} onClick={() => handleOpenTaskDetail(task)} className="cursor-pointer transition-transform duration-150 active:scale-[0.99]">
                        <TaskRow task={task} />
                      </div>
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
                    <Input label="Project Name" value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} />
                    <div className="space-y-1.5">
                      <p className="text-xs text-zinc-400 font-semibold">Project visibility</p>
                      <Dropdown
                        items={[
                          { label: 'public', onClick() { setForm((prev) => ({ ...prev, visibility: 'public' })); } },
                          { label: 'private', onClick() { setForm((prev) => ({ ...prev, visibility: 'private' })); } },
                        ]}
                        align="left"
                        trigger={
                          <div className="border-zinc-800 border bg-zinc-900 pl-3 p-2.5 rounded-xl cursor-pointer hover:border-zinc-700 transition-colors w-full max-w-xs">
                            <p className="text-sm text-zinc-200 capitalize">{form?.visibility || 'Select visibility'}</p>
                          </div>
                        }
                      />
                    </div>

                    <Textarea label="Project Description" value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} />

                    <Button size="sm" type="submit" disabled={projectLoading}>
                      {projectLoading ? 'Saving...' : 'Save Project Details'}
                    </Button>
                  </div>
                </form>

                <div className="space-y-2 mt-10 pt-6 border-t border-zinc-900 w-full max-w-2xl">
                  <p className="text-sm text-red-400 font-bold uppercase tracking-wider">Danger Zone</p>
                  <p className="text-xs text-zinc-500">Permanently delete this project workspace and all data associated with it.</p>
                  <Button
                    onClick={handleDeleteProject}
                    disabled={projectLoading}
                    className="bg-red-950/40 hover:bg-red-900 text-red-200 border-red-900/50 hover:border-red-800 focus:ring-0 mt-2"
                  >
                    {projectLoading ? 'Deleting...' : 'Delete Project'}
                  </Button>
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