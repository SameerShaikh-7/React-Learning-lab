import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Form from "./components/Form";
import Table from "./components/Table";
import { useState, useEffect } from "react";
import type { employeeType } from "./utils/global";

export default function App() {
  const [allEmployees, setAllEmployees] = useState<employeeType[]>(
    JSON.parse(localStorage.getItem("employees") || "[]")
  );
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editEmployee, setEditEmployee] = useState<employeeType>();

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(allEmployees));
  }, [allEmployees]);

  const deleteEmployee = (index: number) => {
    setAllEmployees((allEmp) => allEmp.filter((_, i) => i !== index));
    toast.success("Record deleted successfully", { theme: "light" });
  };

  const updateEmployee = (index: number) => {
    setEditIndex(index);
    setEditEmployee(allEmployees[index]);
  };

  return (
    <div className="min-h-screen relative font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      {/* Medical Themed Background */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://i.pinimg.com/736x/33/02/01/3302016ec595d7a3eb181403c60b9b10.jpg')` }}
      >
        <div className="absolute inset-0 bg-[#e0f2f1]/80 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
        <Form
          allEmployees={allEmployees}
          setAllEmployees={setAllEmployees}
          editEmployee={editEmployee}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
        />
        <Table
          allEmployees={allEmployees}
          deleteEmployee={deleteEmployee}
          updateEmployee={updateEmployee}
        />
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}