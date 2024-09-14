import { useRouter } from "next/router"
import type { Video } from "../videos"
import { Line } from "./Line"

export function VideoCard({ video }: { video: Video }) {
    const router = useRouter();
    return <div className="p-3 cursor-pointer" onClick={() => {
        router.push("/video/1")
    }}>
        <div className="rounded-xl overflow-hidden">
            <div>
                <img src={video.thumbImage} />
                <Line progress={10} />
            </div>
        </div>
            <div className="text-white-800 text-2xl font-medium">
                    { video.title}
            </div>
                <div className="text-gray-400 text-xl font-normal">
                    {video.author }
                </div>
                <div className="flex">
                
                    <div className="text-gray-400 text-xl font-normal pr-2">
                    {video.views} 
                    </div>
                    <div className="text-gray-400 text-xl font-normal">
                        | {video.timestamp}
                    </div>
                </div>
        </div>

}

