export const ProfileCardLoader = () => {
  return (
    <div className="rounded-lg p-4 bg-gray-200 animate-pulse max-w-sm mx-auto mt-4 w-full">
      <div className="flex space-x-4 py-6">
        <div className="rounded-full bg-gray-300 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
