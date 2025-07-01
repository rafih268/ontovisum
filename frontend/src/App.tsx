import Upload from './components/Upload'
import DiagramCanvas from './components/DiagramCanvas'
import ClassTreeSidebar from './components/ClassTreeSidebar'

export default function App() {
  return (
    <div className="flex h-screen">
      <ClassTreeSidebar />
      <main className="flex-1 flex flex-col">
        <Upload />
        <DiagramCanvas />
      </main>
    </div>
  );
}