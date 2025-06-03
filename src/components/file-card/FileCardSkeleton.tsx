const FileCardSkeleton = () => {
  return (
    <div
      className={`flex items-center gap-4 shadow border-t border-gray-100 rounded-lg py-3 px-3`}
    >
      <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
      <div className="flex-1 grid">
        <div className="flex flex-col gap-2">
          <div className="skeleton h-2 w-32"></div>
          <div className="skeleton h-1 w-20"></div>
        </div>
      </div>
      <div>
        <div className="md:flex gap-2 hidden">
          <div className="skeleton h-10 w-24 rounded-md"></div>
          <div className="skeleton h-10 w-24 rounded-md"></div>
        </div>
        <div className="md:hidden"></div>
      </div>
    </div>
  );
};

export default FileCardSkeleton;
