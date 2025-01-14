import services from "@/services/config"
import Link from "next/link"

interface PostCardProps {
    $id ?: string; // Use lowercase `string` for TypeScript types
    source ?: any;
    featuredImage ?: any;
  }

  const PostCard: React.FC<PostCardProps> = ({ $id, source, featuredImage }) => {

    return (
        <Link
            href={`/post/${$id}`}
        >
            <div>
                <img src={services.getFilePreview(featuredImage)} alt={source} />
            </div>
            <div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                </div>
                <div>
                    <div>
                        <div>
                            <h2>{source[0]}</h2>
                        </div>
                        <h3>{source}</h3>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard
