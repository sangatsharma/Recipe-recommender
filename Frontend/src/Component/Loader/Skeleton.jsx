const Skeleton = () => {
  return (
    <div className="flex flex-col  w-[80%] min-h-screen animate-pulse rounded-xl p-4 gap-4">
      <div className="flex flex-col gap-2">
        <div className="bg-neutral-400/50 w-full h-10 animate-pulse rounded-md"></div>
        <div className="bg-neutral-400/50 w-4/5 h-10 animate-pulse rounded-md"></div>
        <div className="bg-neutral-400/50 w-full h-10 animate-pulse rounded-md"></div>
        <div className="bg-neutral-400/50 w-2/4 h-10 animate-pulse rounded-md"></div>
      </div>
      <div className="bg-neutral-400/50 w-full h-64 animate-pulse rounded-md"></div>
    </div>
  );
};
export default Skeleton;
