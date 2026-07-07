import React from 'react';
import CustomModal from './CustomModal';
import Button from './Button';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
  isLoading?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDanger = false,
  isLoading = false,
}) => {
  return (
    <CustomModal open={isOpen} onClose={onClose}>
      <div className="p-4 max-w-sm w-full bg-zinc-950 text-left">
        <h3 className="text-base font-bold text-zinc-100 mb-2">{title}</h3>
        <p className="text-xs text-zinc-400 leading-relaxed mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={isDanger ? 'danger' : 'primary'}
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default ConfirmationDialog;
