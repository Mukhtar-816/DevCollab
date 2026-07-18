import { Badge, Calendar, Users } from "lucide-react";

const TaskRow = ({ task }: { task: any }) => {
  const getPriorityVariant = (prio: string) => {
    switch (prio?.toLowerCase()) {
      case 'high': return 'danger';
      case 'medium': return 'primary';
      default: return 'ghost';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-500';
      case 'in-progress': return 'bg-indigo-500';
      default: return 'bg-zinc-500';
    }
  };

  return (
    <div className="bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800 p-5 rounded-xl transition-all duration-150 flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
      <div className="space-y-2 min-w-0 flex-1">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className={`h-2 w-2 rounded-full ${getStatusColor(task.status)}`} />
          <h4 className="text-sm font-semibold text-zinc-100 truncate" title={task.title}>
            {task.title}
          </h4>
          <h1 className="p-1 bg-zinc-950 rounded-md text-xs px-3 text-zinc-300">
            {task.priority}
          </h1>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
          {task.description}
        </p>
      </div>

      <div className="flex items-center gap-4 text-xs text-zinc-500 shrink-0 border-t md:border-t-0 border-zinc-900 pt-3 md:pt-0">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-zinc-600" />
          <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-zinc-950 px-2.5 py-1 rounded-md border border-zinc-900 text-zinc-400 text-[11px]">
          <Users className="h-3 w-3 text-zinc-600" />
          <span>{task.assigneesId?.length || 0} Assigned</span>
        </div>
      </div>
    </div>
  );
};

export default TaskRow;