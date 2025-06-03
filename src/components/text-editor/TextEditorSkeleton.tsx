const TextEditorSkeleton = () => {
  return (
    <div>
      <div className="px-4 py-2 border-b flex gap-4">
        <div className="skeleton w-20 h-7" />
        <div className="skeleton w-8 h-7" />
        <div className="skeleton w-8 h-7" />
        <div className="skeleton w-8 h-7" />
        <div className="skeleton w-8 h-7" />
        <div className="skeleton w-8 h-7 hidden md:block" />
        <div className="skeleton w-8 h-7 hidden md:block" />
      </div>
      <div className="text-3xl font-bold p-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="skeleton h-4 w-32 md:w-64"></div>
            <div className="skeleton h-4 w-12 md:w-24"></div>
            <div className="skeleton h-4 w-8 md:w-16"></div>
            <div className="skeleton h-4 w-4"></div>
            <div className="skeleton h-4 w-4"></div>
          </div>
          <div className="flex gap-2">
            <div className="skeleton h-2 w-32 md:w-56"></div>
            <div className="skeleton h-2 w-16 md:w-32"></div>
            <div className="skeleton h-2 w-8 md:w-16"></div>
            <div className="skeleton h-2 w-2"></div>
            <div className="skeleton h-2 w-2"></div>
          </div>
          <div className="flex gap-2">
            <div className="skeleton h-2 w-24 md:w-40"></div>
            <div className="skeleton h-2 w-8 md:w-16"></div>
            <div className="skeleton h-2 w-8 md:w-16"></div>
            <div className="skeleton h-2 w-2"></div>
          </div>
          <div className="skeleton h-2 w-32 md:w-52 opacity-70"></div>
          <div className="skeleton h-2 w-28 md:w-48 opacity-60"></div>
          <div className="skeleton h-2 w-24 md:w-40 opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default TextEditorSkeleton;
