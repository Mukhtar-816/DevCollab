import { X } from 'lucide-react'

import { motion, AnimatePresence } from 'framer-motion';

const CustomModal = ({ children, open, onClose }: any) => {
    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="bg-zinc-950 border border-zinc-800/80 min-h-[160px] max-h-[90vh] p-6 shadow-2xl rounded-2xl relative w-full max-w-lg mx-4 text-zinc-100 overflow-y-auto"
                    >
                        <button 
                            onClick={onClose} 
                            className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
                        >
                            <X className="h-4 w-4 cursor-pointer" />
                        </button>
                        <div className="mt-2">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default CustomModal