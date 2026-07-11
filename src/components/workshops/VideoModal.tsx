import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  description: string;
}

export function VideoModal({ isOpen, onClose, videoUrl, title, description }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Lock scroll
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-4xl px-4 focus:outline-none"
            tabIndex={-1}
          >
            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex justify-between items-center p-4 border-b border-slate-800">
                <div>
                  <h3 id="modal-title" className="text-lg font-semibold text-white">{title}</h3>
                  <p className="text-sm text-slate-400">{description}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative aspect-video bg-black">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  controls
                  controlsList="nodownload"
                  className="w-full h-full"
                  playsInline
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
