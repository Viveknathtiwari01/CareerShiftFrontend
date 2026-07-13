import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { VideoModal } from "./VideoModal";

const videos = [
  {
    id: "v1",
    title: "AI Is Your Career Partner",
    description: "Discover why AI is the ultimate collaborator, not a competitor.",
    duration: "6 Minutes",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "v2",
    title: "5 Ways Professionals Use AI Daily",
    description: "Real-world examples of AI boosting productivity across industries.",
    duration: "8 Minutes",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

export function VideoPreviewSection() {
  const [activeVideo, setActiveVideo] = useState<(typeof videos)[0] | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">
          Watch Before You Enroll
        </h2>
        <p className="text-lg text-muted-foreground">
          Get a taste of the premium content waiting for you.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {videos.map((video) => (
          <motion.div
            key={video.id}
            variants={item}
            whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
            className="group cursor-pointer rounded-2xl overflow-hidden shadow-elevated border border-border bg-card flex flex-col relative"
            onClick={() => setActiveVideo(video)}
          >
            <div className="relative aspect-video overflow-hidden">
              <div className="absolute inset-0 bg-muted animate-pulse" />
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 relative z-10"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 opacity-80 group-hover:opacity-60 transition-opacity" />

              <div className="absolute inset-0 z-30 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-md rounded-full p-4 shadow-lg group-hover:bg-primary transition-colors duration-300">
                  <Play className="w-8 h-8 text-primary fill-primary group-hover:text-primary-foreground group-hover:fill-primary-foreground ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 z-30 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded border border-white/10">
                {video.duration}
              </div>
            </div>

            <div className="p-6 relative z-30">
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {video.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{video.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <VideoModal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        videoUrl={activeVideo?.videoUrl || ""}
        title={activeVideo?.title || ""}
        description={activeVideo?.description || ""}
      />
    </div>
  );
}
