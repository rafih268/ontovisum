import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DiagramBuilder from './components/DiagramBuilder';

export default function App() {
  return (
    <div className="bg-gray-50">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <DiagramBuilder />
      </div>
      <Footer />
    </div>
  );
}