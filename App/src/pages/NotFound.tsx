import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-950 min-h-screen flex w-full justify-center items-center relative overflow-hidden px-4 select-none text-zinc-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center space-y-6 max-w-sm">
        <div className="space-y-2">
          <span className="font-extrabold text-[80px] leading-none tracking-tighter bg-gradient-to-r from-indigo-500 via-violet-400 to-indigo-600 bg-clip-text text-transparent select-all">
            404
          </span>
          <h2 className="text-lg font-bold text-zinc-100 mt-2">Page not found</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            The page you are looking for does not exist or has been relocated to another workspace context.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Button
            size="sm"
            leftIcon={<Home className="h-4 w-4" />}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
