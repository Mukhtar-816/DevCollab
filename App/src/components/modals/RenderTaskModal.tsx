import React from 'react';
import Button from '../Button';
import CustomInput from '../CustomInput';
import Textarea from '../Textarea';
import Dropdown from '../Dropdown';

export interface TaskFormState {
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
  assigneesId: string[];
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: TaskFormState;
  setForm: React.Dispatch<React.SetStateAction<TaskFormState>>;
  members: any[];
  onToggleAssignee: (id: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const RenderTaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  form,
  setForm,
  members,
  onToggleAssignee,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-950/80 items-center justify-center h-full w-full flex z-50 backdrop-blur-sm">
      <form
        onSubmit={onSubmit}
        className="flex flex-col p-8 bg-zinc-950 gap-4 border border-zinc-900 rounded-xl w-full max-w-md mx-4 shadow-2xl text-zinc-200"
      >
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
          Create New Task
        </h3>

        <CustomInput
          title="Title *"
          value={form.title}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
        />

        <Textarea
          label="Description *"
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
        />

        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400 font-semibold">
            Assign Team Members *
          </label>
          <div className="max-h-24 overflow-y-auto border border-zinc-900 bg-zinc-900/30 rounded-xl p-2 space-y-1 custom-scrollbar">
            {members?.map((member: any) => {
              const isSelected = form.assigneesId.includes(member._id);
              return (
                <div
                  key={member._id}
                  onClick={() => onToggleAssignee(member._id)}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-zinc-800 text-zinc-100'
                      : 'hover:bg-zinc-900/60 text-zinc-400'
                  }`}
                >
                  <span>{member.name || member.email}</span>
                  <div
                    className={`h-3 w-3 rounded border flex items-center justify-center ${
                      isSelected
                        ? 'border-zinc-400 bg-zinc-100 text-zinc-950'
                        : 'border-zinc-700'
                    }`}
                  >
                    {isSelected && '✓'}
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
                { label: 'Low', onClick: () => setForm((p) => ({ ...p, priority: 'low' })) },
                { label: 'Medium', onClick: () => setForm((p) => ({ ...p, priority: 'medium' })) },
                { label: 'High', onClick: () => setForm((p) => ({ ...p, priority: 'high' })) },
              ]}
              align="left"
              trigger={
                <div className="border-zinc-800 border bg-zinc-900 px-3 py-2 rounded-xl text-xs text-zinc-200 capitalize cursor-pointer">
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
              onChange={(e) => setForm((p) => ({ ...p, dueDate: e.target.value }))}
            />
          </div>
        </div>

        <div className="flex gap-3 w-full justify-end pt-2 border-t border-zinc-900 mt-2">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
};

export default RenderTaskModal;