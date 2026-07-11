import { useState } from "react";
import { Play } from "lucide-react";
import { VideoModal } from "./VideoModal";

const videos = [
  {
    id: "v1",
    title: "AI Is Your Career Partner",
    description: "Discover why AI is the ultimate collaborator, not a competitor.",
    duration: "6 Minutes",
    thumbnailUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "v2",
    title: "5 Ways Professionals Use AI Daily",
    description: "Real-world examples of AI boosting productivity across industries.",
    duration: "8 Minutes",
    thumbnailUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
];

export function VideoPreviewSection() {
  const [activeVideo, setActiveVideo] = useState<typeof videos[0] | null>(null);

  return (
    <div className="py-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Watch Before You Enroll</h2>
        <p className="mt-1 text-sm text-muted-foreground">Get a taste of the premium content waiting for you.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border bg-card flex flex-col"
            onClick={() => setActiveVideo(video)}
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={video.thumbnailUrl} 
                alt={video.title} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-3 shadow-sm">
                  <Play className="w-5 h-5 text-slate-900 fill-slate-900 ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                {video.duration}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{video.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{video.description}</p>
            </div>
          </div>
        ))}
      </div>

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
