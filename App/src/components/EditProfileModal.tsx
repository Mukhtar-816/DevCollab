import React, { useState } from 'react';
import CustomInput from '../components/CustomInput';
import Button from '../components/Button';
import { Camera } from 'lucide-react';

interface EditProfileModalProps {
  formData: Record<string, any>;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onSave: () => void;
  loading: boolean;
}

const EditProfileModal = ({
  formData,
  setFormData,
  onSave,
  loading
}: EditProfileModalProps) => {
  const [preview, setPreview] = useState(formData?.avatar);

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setFormData((prev: any) => ({
      ...prev,
      avatar: file, // file for multer upload
    }));
  };

  const fields = Object.entries(formData).filter(([key]) => key !== 'avatar');

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg text-zinc-100 p-2 selection:bg-indigo-500/30 selection:text-indigo-200">
      <div className="text-center">
        <h2 className="text-lg font-bold text-zinc-100">Edit Profile Details</h2>
        <p className="text-xs text-zinc-500 mt-1">Update your professional identity on DevCollab</p>
      </div>

      {/* Avatar Image Selection */}
      <div className="relative group">
        <div className="h-24 w-24 rounded-full border-2 border-zinc-800 bg-zinc-900 overflow-hidden shadow-lg relative">
          <img
            className="h-full w-full object-cover"
            src={
              typeof preview === 'string' && preview
                ? preview
                : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150'
            }
            alt="profile avatar preview"
          />
        </div>
        <label className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col items-center justify-center cursor-pointer text-[10px] font-semibold text-zinc-300 gap-1">
          <Camera className="h-4 w-4" />
          <span>Upload</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleSelectImage}
          />
        </label>
      </div>

      {/* Text Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {fields.map(([key, value]) => (
          <CustomInput
            key={key}
            title={key}
            value={value as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(key, e.target.value)
            }
            disabled={loading}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <Button
        onClick={onSave}
        isLoading={loading}
        className="w-full mt-4 font-semibold"
      >
        Save Profile Updates
      </Button>
    </div>
  );
};

export default EditProfileModal;