export default function Header() {
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome, Student!</h1>
        <p className="text-sm text-gray-500">Find and book available seats in your campus library or lab.</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-700 font-medium">
          📅 {today}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">
            S
          </div>
          <span className="font-medium text-gray-700">Student</span>
        </div>
      </div>
    </header>
  );
}