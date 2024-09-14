import { VIDEOS } from "@/videos"
import { VideoCard } from "./VideoCard"

export const VideoGrid = () => {
    return <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {VIDEOS.map(video => <div>
            <VideoCard video={video }></VideoCard>
            </div>
        )}

    </div>
}