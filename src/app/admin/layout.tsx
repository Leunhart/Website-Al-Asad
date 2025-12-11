import ResponsiveSidebar from "@/src/components/admin/ResponsiveSidebar";
import Navbar from "@/src/components/admin/Navbar";
import Footer from "@/src/components/admin/Footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Responsive Sidebar */}
      <ResponsiveSidebar />

      <div className="flex flex-col flex-1 md:ml-64">
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
