import Upload from './components/Upload'
import DiagramCanvas from './components/DiagramCanvas'
import ClassTreeSidebar from './components/ClassTreeSidebar'

export default function App() {
  return (
    <div className="flex h-screen">

      <div className="flex flex-1 items-center justify-center p-4">
        <div className="flex items-start space-x-4 max-w-7xl mx-auto">
          <div className="p-4 rounded shadow h-[600px] bg-blue-50">
            <h2 className="text-xl font-bold">Class Tree</h2>
            <ClassTreeSidebar />
          </div>
          <div className="flex-1">
            <DiagramCanvas />
          </div>

          <div className="p-4 rounded shadow bg-blue-50">
            <h2 className="font-bold">Upload Your Ontology</h2>
            <Upload />
          </div>
        </div>
      </div>
    </div>
  );
}