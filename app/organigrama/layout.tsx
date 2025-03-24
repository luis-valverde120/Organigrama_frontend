import Sidebar from "@/app/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-gray-800 text-white flex-none">
        <Sidebar />
      </div>
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
  );
}