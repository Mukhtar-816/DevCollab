import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';

const HomePage = () => {
  return (
    <div className="flex bg-zinc-950 min-h-screen w-full flex-col relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[150px] pointer-events-none translate-y-1/3" />
      
      <NavBar />
      <main className="flex-1 flex items-center justify-center relative z-10">
        <HeroSection />
      </main>
    </div>
  );
};

export default HomePage;