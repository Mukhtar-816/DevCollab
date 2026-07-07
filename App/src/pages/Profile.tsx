import React, { useEffect, useState, useRef } from 'react'
import AppLayout from '../components/AppLayout'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import CustomInput from '../components/CustomInput'
import { updateUserProfile } from '../redux/slices/userSlice/user.actions'
import { toast } from 'react-toastify'
import { normalizeError } from '../utils/getErrorMessage'


const Profile = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { profile, user, loading } = useSelector((state: any) => state?.user || {});
  const profileData = { ...profile, ...user };

  const [userProfile, setUserProfile] = useState({
    name: profileData?.name || '',
    email: profileData?.email || '',
    avatar: profileData?.avatar || '',
    skills: profileData?.skills || '',
    bio: profileData?.bio || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setUserProfile({
      name: profileData?.name || '',
      email: profileData?.email || '',
      avatar: profileData?.avatar || '',
      skills: profileData?.skills || '',
      bio: profileData?.bio || '',
    }); 
  }, [profile?.avatar, profileData?.name, profileData?.email, profileData?.bio, profileData?.skills]);

  const handleInputChange = (field: string, value: string) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  // Triggers the hidden file selector
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Processes image file selection & creates a local preview URL
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setUserProfile((prev) => ({ ...prev, avatar: file }));
    }
  };

  let isChanged = () => {
     let isChanged = false;
    Object.entries(userProfile).forEach(([key,value]:any) => {
      if (profileData[key] != userProfile[key]) {
        isChanged = true;
      }
    })

    return isChanged;
  }

  // Submit / Save handler
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!isChanged()) {
      toast.warn("no Change");
      setIsSubmitting(false);
      return;
    };
    
    try {
      dispatch(updateUserProfile({data:userProfile})).unwrap();
      toast.success("profile updated successfully")
    } catch (error) {
      let er = normalizeError(error);
      toast.error(er.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputConfig = [
    { key: 'name', title: 'Full Name', editable: true },
    { key: 'email', title: 'Email Address', editable: false },
    { key: 'bio', title: 'Bio', editable: true },
    { key: 'skills', title: 'Skills', editable: true, hint: 'Separate your key stacks with commas (e.g., React, Node, TypeScript, Tailwind)' },
  ];

  return (
    <AppLayout>
      <Card>
        <form onSubmit={handleSaveProfile} className='w-full max-w-2xl mx-auto p-4 space-y-8'>
          
          {/* Header Title Section */}
          <div>
            <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>Account Profile</h2>
            <p className='text-sm text-gray-500'>Update your public info and tech stack tags.</p>
          </div>

          {/* Form Content Grid split for cleaner UX layout */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-start'>
            
            {/* Left Column: Interactive Avatar Selection */}
            <div className='flex flex-col items-center gap-3 md:col-span-1'>
              <div 
                onClick={handleAvatarClick}
                className='group relative h-36 w-36 rounded-full cursor-pointer overflow-hidden border-4 border-gray-100 shadow-md hover:border-blue-500 transition-all duration-300'
              >
                <img 
                  src={userProfile?.avatar || 'https://via.placeholder.com/150'} 
                  className='h-full w-full object-cover transition-transform group-hover:scale-105' 
                  alt='User Avatar' 
                />
                <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                  <span className='text-xs font-medium text-white text-center px-2'>Change Photo</span>
                </div>
              </div>
              <input 
                type='file' 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept='image/*' 
                className='hidden' 
              />
              <button 
                type='button' 
                onClick={handleAvatarClick} 
                className='text-xs text-blue-600 font-semibold hover:underline'
              >
                Upload image
              </button>
            </div>

            {/* Right Column: Inputs mapping */}
            <div className='flex flex-col gap-5 md:col-span-2 w-full'>
              {inputConfig.map((input) => (
                <div key={input.key} className='w-full space-y-1.5'>
                  <CustomInput
                    title={input.title}
                    contentEditable={input.editable}
                    value={userProfile[input.key as keyof typeof userProfile] || ''}
                    onChange={(e: any) => handleInputChange(input.key, e.target.value)}
                  />
                  {/* Dynamic Help Text/Hints */}
                  {input.hint && (
                    <p className='text-xs text-gray-400 font-normal pl-1'>
                      {input.hint}
                    </p>
                  )}
                </div>
              ))}
            </div>

          </div>

          {/* Save/Update Action Bar */}
          <div className='flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800'>
            <button
              type='submit'
              disabled={isSubmitting || loading}
              className={`px-6 py-2.5 rounded-lg font-medium text-sm text-white transition-all duration-200 
                ${isSubmitting || loading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-md hover:shadow-lg'
                }`}
            >
              {isSubmitting || loading ? 'Saving changes...' : 'Save Profile'}
            </button>
          </div>

        </form>
      </Card>
    </AppLayout>
  )
}

export default Profile