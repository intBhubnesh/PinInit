import Link from 'next/link';
import services from '@/services/config';

interface PinProps  {
  $id ?: string;
  title ?: string;
  board ?: string;
  pin ?: any;
}

const PinCard: React.FC<PinProps> = ({ $id, title, board, pin }) => {
  // Ensure services.getFilePreview returns a valid object with `src`.
  const preview = services.getFilePreview(pin);

  return (
    <Link href={`/home/pin/${$id}`} className='group'>
      <div className="relative inline-flex">
        <div className="w-full rounded-xl overflow-clip">
          {preview !== false ?  (
            <img
              src={preview}
              alt={`Preview of ${title}`}
              className="w-full h-auto object-cover"
            />
          ) : (
            <div className="bg-gray-200 w-full h-40 flex items-center justify-center">
              <span className="text-gray-500  text-base">No Image Available</span>
            </div>
          )}
        </div>
        <div className="p-4 absolute bottom-0 right-0 w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-4 duration-500 transition ease-in-out transform-gpu flex items-center justify-between">
          <div className="inline-flex gap-2 items-center justify-center">
            <div className="size-8 text-sm font-medium rounded-full bg-zinc-950 inline-flex items-center justify-center">
                {board?.[0]?.toUpperCase() || "?"}
            </div>
            <h3 className="text-base">{title}</h3>
          </div>
          <div className="inline-flex items-center justify-center bg-pink-500 text-white rounded-md p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PinCard;
