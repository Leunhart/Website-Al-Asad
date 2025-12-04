import Sidebar from "@/src/components/admin/Sidebar";
import Navbar from "@/src/components/admin/Navbar";
import Footer from "@/src/components/admin/Footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ml-64 flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="flex-1 bg-gray-50">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
