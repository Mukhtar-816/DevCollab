import React, { useEffect, useCallback } from 'react';
import AppLayout from '../components/AppLayout';
import Card from '../components/Card';
import { Calendar, CodeIcon, IdCardIcon } from 'lucide-react';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { normalizeError } from '../utils/getErrorMessage';
import { toast } from 'react-toastify';
import { acceptInvitation, getUserInvitations, rejectInvitation } from '../redux/slices/invitationSlice/invitation.actions';

// 1. Extracted types for solid TypeScript support
interface InvitationType {
  projectId: string;
  invitedEmail: string;
  createdAt: string;
  token: string;
}

interface InvitationCardProps {
  invitation: InvitationType;
  onClickJoin: () => void;
  onClickReject: () => void;
  loading: boolean;
}

// 2. Used React.memo to prevent unnecessary re-renders of list items
const InvitationCard = React.memo(({ invitation, onClickJoin, onClickReject, loading }: InvitationCardProps) => {
  return (
    <Card className='flex flex-col sm:flex-row justify-between gap-2 my-4'>
      <div className='space-y-2'>
        <span className='flex flex-row gap-2 items-center'>
          <CodeIcon size={20} className='text-zinc-400' />
          <p className='text-sm text-zinc-400'>Project ID - {invitation?.projectId}</p>
        </span>
        <span className='flex flex-row gap-2 items-center'>
          <IdCardIcon size={20} className='text-zinc-400' />
          <p className='text-md text-zinc-300'>Invited Member - {invitation?.invitedEmail}</p>
        </span>
      </div>
      <div className='flex flex-col justify-between items-end gap-2'>
        <span className='flex flex-row gap-2 items-center'>
          <Calendar size={15} className='text-zinc-400' />
          <p className='text-xs text-zinc-400'>Time - {invitation?.createdAt}</p>
        </span>
        <span className='flex flex-row gap-2 mt-5'>
          <Button disabled={loading} isLoading={loading} onClick={onClickJoin}>
            Join
          </Button>
          <Button disabled={loading} isLoading={loading} onClick={onClickReject} variant='secondary'>
            Reject
          </Button>
        </span>
      </div>
    </Card>
  );
});

InvitationCard.displayName = 'InvitationCard';

const Invitation = () => {
  const dispatch = useDispatch<any>();
  
  // 3. Fixed fallback selector logic to grab state accurately
  const { userInvitations = [], loading, success } = useSelector((state: any) => state.invitations || {});

  // 4. Wrapped functions in useCallback so references stay stable across renders
  const getInvitations = useCallback(async () => {
    try {
      await dispatch(getUserInvitations()).unwrap();
    } catch (error) {
      const err = normalizeError(error);
      toast.error(err.error);
    }
  }, [dispatch]);

  useEffect(() => {
    getInvitations();
  }, [dispatch]);

  const handleJoin = useCallback(async (currentInvitation: InvitationType) => {
    if (!currentInvitation?.projectId || !currentInvitation?.token) return;
    try {
      await dispatch(acceptInvitation({ projectId: currentInvitation.projectId, token: currentInvitation.token })).unwrap();
      toast.success("Successfully joined the project!");
    } catch (error) {
      const err = normalizeError(error);
      toast.error(err.error);
    }
  }, [dispatch]);

  const handleReject = useCallback(async (currentInvitation: InvitationType) => {
    if (!currentInvitation?.projectId || !currentInvitation?.token) return;
    try {
      await dispatch(rejectInvitation({ projectId: currentInvitation.projectId, token: currentInvitation.token })).unwrap();
      toast.success("Invitation rejected.");
    } catch (error) {
      const err = normalizeError(error);
      toast.error(err.error);
    }
  }, [dispatch]);

  return (
    <AppLayout>
      <div className='flex flex-col'>
        <div>
          <h1 className='text-zinc-300 font-bold text-2xl'>Invitations To Join</h1>
        </div>

        {/* 5. Fixed conditional check and empty list message */}
        {userInvitations.length > 0 ? (
          userInvitations.map((invite: InvitationType) => (
            <InvitationCard 
              loading={loading} 
              invitation={invite} 
              key={invite.token || invite.projectId} // 6. Used domain IDs over array indexes for keys
              onClickJoin={() => handleJoin(invite)} 
              onClickReject={() => handleReject(invite)} 
            />
          ))
        ) : (
          !loading && <p className='text-zinc-500 text-sm mt-4'>You have no pending invitations.</p>
        )}
      </div>
    </AppLayout>
  );
};

export default Invitation;