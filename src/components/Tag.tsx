const Tag = () => {
  return (
    <div className="mt-2 inline-flex outline-1 p-1 px-3 w-fit items-center justify-center rounded-full outline outline-pink-600/60  bg-pink-500/10 text-pink-100">
        <div className="flex gap-1">
            <div className="size-[18px] inline-flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
</svg>

            </div>
            <h5 className="text-sm font-medium">New</h5>
        </div>
        <div className="h-4 w-[1px] mx-2 bg-pink-100/10">

        </div>
        <div className="inline-flex gap-2 items-center justify-center">
            <h5 className="text-sm">Download the extension</h5>
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
</svg>

            </div>
        </div>
    </div>
  )
}

export default Tag
