import Navbar from '../components/layout/Navbar';

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar isApp={false} />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
