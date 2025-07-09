import Navbar from './components/Navbar';
import Upload from './components/Upload'
import DiagramCanvas from './components/DiagramCanvas'
import ClassTreeSidebar from './components/ClassTreeSidebar'

export default function App() {
  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 items-start justify-center p-4 space-x-4 max-w-7xl mx-auto">
        <div className="p-4 rounded shadow h-[600px] bg-blue-50">
          <h2 className="text-xl font-bold">Class Tree</h2>
          <ClassTreeSidebar />
        </div>
        <div className="flex-1">
          <DiagramCanvas />
        </div>

        <div className="p-4 rounded shadow bg-blue-50">
          <h2 className="text-xl font-bold">Upload Your Ontology</h2>
          <Upload />
        </div>
      </div>
    </div>
  );
}