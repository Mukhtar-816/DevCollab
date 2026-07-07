import React, { useState } from 'react';
import AppLayout from '../components/AppLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import SearchInput from '../components/SearchInput';
import Pagination from '../components/Pagination';
import CustomModal from '../components/CustomModal';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import EmptyState from '../components/EmptyState';
import { 
  Plus, Grid, List, 
  FolderGit2, Calendar, Users
} from 'lucide-react';
import { toast } from 'react-toastify';

interface Project {
  id: string;
  name: string;
  desc: string;
  category: string;
  status: 'active' | 'completed' | 'planning';
  members: number;
  updated: string;
  tags: string[];
}

const ProjectList = () => {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [createOpen, setCreateOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Form state
  const [formData, setFormData] = useState({ name: '', desc: '', category: '', tags: '' });

  // Mock Projects List
  const mockProjects: Project[] = [
    { id: '1', name: 'DevCollab Client', desc: 'React v19 + Tailwind v4 + Vite client UI rebuild', category: 'Frontend', status: 'active', members: 3, updated: '2 hours ago', tags: ['React', 'TypeScript', 'Tailwind'] },
    { id: '2', name: 'GraphQL Proxy Server', desc: 'Secure proxy middleware layer for microservices routing', category: 'Backend', status: 'active', members: 5, updated: '1 day ago', tags: ['Node.js', 'GraphQL', 'Redis'] },
    { id: '3', name: 'Real-time Canvas Editor', desc: 'Collaborative whiteboarding using WebSockets and CRDTs', category: 'Fullstack', status: 'planning', members: 2, updated: '3 days ago', tags: ['React', 'WebSockets', 'Yjs'] },
    { id: '4', name: 'Analytics Dashboard API', desc: 'High-throughput analytics aggregator API supporting time-series queries', category: 'Backend', status: 'completed', members: 4, updated: '2 weeks ago', tags: ['Go', 'InfluxDB', 'Kafka'] },
    { id: '5', name: 'Native iOS / Android App', desc: 'Mobile wrapper package offering push notifications and bio-auth', category: 'Mobile', status: 'planning', members: 1, updated: '1 month ago', tags: ['React Native', 'Expo'] },
  ];

  const filteredProjects = mockProjects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.desc.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.desc) {
      toast.error('Project Name and Description are required.');
      return;
    }
    toast.success(`Success! Created project "${formData.name}" (UI placeholder).`);
    setCreateOpen(false);
    setFormData({ name: '', desc: '', category: '', tags: '' });
  };

  return (
    <AppLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-900">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-100 tracking-tight">Projects</h1>
          <p className="text-xs text-zinc-400 mt-1">Browse, filter, and orchestrate developer workspaces.</p>
        </div>
        <Button
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => setCreateOpen(true)}
          className="font-bold"
        >
          Create Project
        </Button>
      </div>

      {/* Filter and Action Controls bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-80">
          <SearchInput
            placeholder="Search projects by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Status Filters */}
          <div className="flex bg-zinc-950 border border-zinc-900 rounded-xl p-1 gap-0.5">
            {['all', 'active', 'planning', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedStatus === status ? 'bg-zinc-900 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="h-px w-4 bg-zinc-900 hidden md:block" />

          {/* Grid/List toggles */}
          <div className="flex bg-zinc-950 border border-zinc-900 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-zinc-900 text-indigo-400' : 'text-zinc-500 hover:text-zinc-300'}`}
              title="Grid View"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-zinc-900 text-indigo-400' : 'text-zinc-500 hover:text-zinc-300'}`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid or List Display */}
      {filteredProjects.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hoverable flex flex-col justify-between" padding="md">
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{project.category}</span>
                    <Badge variant={project.status === 'active' ? 'success' : project.status === 'planning' ? 'warning' : 'secondary'} size="sm">
                      {project.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-sm text-zinc-100 hover:text-indigo-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                      <FolderGit2 className="h-4 w-4 text-zinc-500" />
                      {project.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                      {project.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-[9px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded-md border border-zinc-800/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between text-zinc-500 text-[10px] font-medium">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {project.members} {project.members === 1 ? 'member' : 'members'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Updated {project.updated}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hoverable flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" padding="sm">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 bg-zinc-900 border border-zinc-850 rounded-xl hidden sm:block text-zinc-400">
                    <FolderGit2 className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-zinc-100">{project.name}</h3>
                      <Badge variant={project.status === 'active' ? 'success' : project.status === 'planning' ? 'warning' : 'secondary'} size="sm">
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-zinc-400 max-w-2xl truncate">{project.desc}</p>
                    <div className="flex gap-2.5 items-center">
                      <span className="text-[10px] font-semibold text-zinc-500 uppercase">{project.category}</span>
                      <span className="text-[10px] text-zinc-600">•</span>
                      <div className="flex gap-1">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="text-[9px] bg-zinc-900 text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-850">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto text-[10px] text-zinc-500 font-medium border-t border-zinc-900 sm:border-0 pt-3 sm:pt-0">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {project.members} members
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Updated {project.updated}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )
      ) : (
        <EmptyState
          icon={<FolderGit2 className="h-8 w-8 text-zinc-500" />}
          title="No projects match"
          description="Try broadening your search query or modifying the status filter."
          action={
            <Button variant="outline" size="sm" onClick={() => { setSearch(''); setSelectedStatus('all'); }}>
              Reset Filters
            </Button>
          }
        />
      )}

      {/* Pagination component */}
      <Pagination currentPage={page} totalPages={3} onPageChange={setPage} />

      {/* Create Project Modal */}
      <CustomModal open={createOpen} onClose={() => setCreateOpen(false)}>
        <form onSubmit={handleCreateSubmit} className="flex flex-col gap-5 text-left p-1">
          <div>
            <h3 className="text-base font-bold text-zinc-100">Create New Project</h3>
            <p className="text-xs text-zinc-500 mt-1">Initiate a collaborative workspace context</p>
          </div>

          <Input
            label="Project Name"
            placeholder="e.g. React Native Client"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />

          <Input
            label="Category"
            placeholder="e.g. Frontend, Backend, Mobile"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          />

          <Textarea
            label="Description"
            placeholder="Provide summary of project scope..."
            value={formData.desc}
            onChange={(e) => setFormData(prev => ({ ...prev, desc: e.target.value }))}
            required
          />

          <Input
            label="Tags (Comma separated)"
            placeholder="e.g. React, Next.js, Redux"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
          />

          <div className="flex justify-end gap-3 mt-2">
            <Button variant="ghost" size="sm" type="button" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Initiate Project
            </Button>
          </div>
        </form>
      </CustomModal>
    </AppLayout>
  );
};

export default ProjectList;
