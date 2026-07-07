import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-[999] bg-zinc-950/85 backdrop-blur-md'>
      <div className='flex flex-col items-center gap-3.5'>
        <Loader2 className='animate-spin text-indigo-500 h-10 w-10' />
        <span className="text-xs font-semibold text-zinc-400 select-none tracking-wider uppercase">Loading DevCollab...</span>
      </div>
    </div>
  )
}

export default Loading
