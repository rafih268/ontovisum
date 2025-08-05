import Navbar from './components/Navbar';
import Upload from './components/Upload'
import DiagramCanvas from './components/DiagramCanvas'
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-gray-50">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1 items-start justify-center p-4 space-x-4 max-w-7xl mx-auto mt-15">
          <div className="flex-1">
            <DiagramCanvas />
          </div>
  
          <div className="p-4 rounded shadow bg-blue-50 h-fit">
            <h2 className="text-xl font-bold">Upload Your Ontology</h2>
            <Upload />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}