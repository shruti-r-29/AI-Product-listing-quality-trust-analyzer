import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar isApp={true} />
      <Sidebar />
      <main className="md:pl-56 pt-16 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
