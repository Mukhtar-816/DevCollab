import React from 'react';
import Button from '../Button';
import CustomInput from '../CustomInput';
import Dropdown from '../Dropdown';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  inviteForm: string;
  setInviteForm: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const RenderInviteModal: React.FC<InviteModalProps> = ({
  isOpen,
  onClose,
  inviteForm,
  setInviteForm,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const ROLE_OPTIONS = [
    { label: 'Developer', onClick: () => setInviteForm(prev => ({ ...prev, role: 'Developer' })) },
    { label: 'Admin', onClick: () => setInviteForm(prev => ({ ...prev, role: 'Admin' })) },
    { label: 'Tester', onClick: () => setInviteForm(prev => ({ ...prev, role: 'Tester' })) },
  ];

  return (
    <div className="fixed inset-0 bg-neutral-950/80 items-center justify-center h-full w-full flex z-50 backdrop-blur-sm">
      <form
        onSubmit={onSubmit}
        className="flex flex-col p-10 bg-zinc-950 gap-5 border border-zinc-900 rounded-xl items-center w-full max-w-md mx-4 shadow-2xl"
      >
        <h3 className="text-lg font-semibold text-zinc-100 self-start">Invite Member</h3>

        <CustomInput
          title="Email"
          value={inviteForm?.email|| ''}
          onChange={(e) => setInviteForm(prev => ({...prev, email : e.target.value}))}
          placeholder="colleague@example.com"
        />

        <div className="w-full flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-400">Role</label>
          <Dropdown
            align="left"
            items={ROLE_OPTIONS}
            trigger={
              <div className="pointer-events-none w-full">
                <CustomInput
                  value={inviteForm?.role != "" ? inviteForm?.role : ROLE_OPTIONS[0].label}
                  readOnly
                  placeholder="Select Role"
                />
              </div>
            }
          />
        </div>

        <div className="flex gap-3 w-full justify-end mt-2">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Send Invite</Button>
        </div>
      </form>
    </div>
  );
};

export default RenderInviteModal;