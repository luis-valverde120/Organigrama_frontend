export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-sm space-y-4">
        <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-12 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
  );
}