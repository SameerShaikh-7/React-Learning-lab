import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import type { employeeType } from '../utils/global';

interface FormProps {
    allEmployees: employeeType[];
    setAllEmployees: React.Dispatch<React.SetStateAction<employeeType[]>>;
    editEmployee: employeeType | undefined;
    editIndex: number | null;
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function Form({
    allEmployees,
    setAllEmployees,
    editEmployee,
    editIndex,
    setEditIndex
}: FormProps) {
    const [fName, setFName] = useState<string>("");
    const [lName, setLName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    useEffect(() => {
        if (editIndex !== null && editEmployee) {
            const timer = setTimeout(() => {
                if (fName !== editEmployee.fName) {
                    setFName(editEmployee.fName);
                    setLName(editEmployee.lName);
                    setEmail(editEmployee.email);
                    setPhone(editEmployee.phone);
                    setGender(editEmployee.gender);
                    setCity(editEmployee.city);
                    setAddress(editEmployee.address || "");
                }
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [editIndex, editEmployee]); 

    const employeeFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newEmployee: employeeType = {
            fName,
            lName,
            email,
            phone,
            gender,
            city,
            address,
            skills: editEmployee?.skills || [] 
        };

        if (editIndex !== null) {
            const updated = [...allEmployees];
            updated[editIndex] = newEmployee;
            setAllEmployees(updated);
            setEditIndex(null);
            toast.info("Medical record updated successfully");
        } else {
            setAllEmployees([...allEmployees, newEmployee]);
            toast.success("New staff added to medical database");
        }

        // Reset Form
        setFName(""); setLName(""); setEmail(""); setPhone(""); setGender(""); setCity(""); setAddress("");
    };

    const inputStyle = `w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none text-slate-700 font-medium border-slate-100 bg-white/70 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 placeholder-slate-400 shadow-sm`;

    return (
        <div className="w-full max-w-4xl mx-auto py-8">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-4 bg-cyan-50 rounded-3xl shadow-inner mb-6 border border-cyan-100">
                    <svg className="w-12 h-12 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                    Medical <span className="text-cyan-600">Staff Portal</span>
                </h1>
                <p className="mt-2 text-slate-500 font-medium">Manage and register healthcare professionals</p>
            </div>

            <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100">
                <div className="bg-slate-900 px-8 py-5">
                    <h2 className="text-white font-bold tracking-widest uppercase text-[11px]">
                        {editIndex !== null ? "📝 Modify Staff Record" : "➕ Register Healthcare Professional"}
                    </h2>
                </div>

                <form className="p-10 space-y-8" onSubmit={employeeFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-600 uppercase ml-1">First Name</label>
                            <input type="text" value={fName} onChange={(e) => setFName(e.target.value)} className={inputStyle} placeholder="eg.suraj" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-600 uppercase ml-1">Last Name</label>
                            <input type="text" value={lName} onChange={(e) => setLName(e.target.value)} className={inputStyle} placeholder="eg.patel" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-600 uppercase ml-1">Work Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputStyle} placeholder="doctor@hospital.com" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-600 uppercase ml-1">Contact Number</label>
                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputStyle} placeholder="+91 XXXXXXXXXX" required />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-widest ml-1">Staff Gender</label>
                        <div className="flex gap-4">
                            {["Male", "Female", "Other"].map((g) => (
                                <label key={g} className="flex-1 cursor-pointer group">
                                    <input type="radio" name="gender" value={g} checked={gender === g} onChange={(e) => setGender(e.target.value)} className="sr-only peer" required />
                                    <div className="py-3.5 text-center rounded-xl border-2 border-slate-50 bg-slate-50 text-slate-500 font-bold text-sm transition-all peer-checked:bg-cyan-600 peer-checked:text-white peer-checked:border-cyan-600 peer-checked:shadow-md peer-checked:shadow-cyan-200 group-hover:border-slate-200">
                                        {g}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-600 uppercase ml-1">Department Location</label>
                            <select value={city} onChange={(e) => setCity(e.target.value)} className={inputStyle} required>
                                <option value="">Select Location</option>
                                {["Surat", "Pune", "Bengaluru", "Mumbai"].map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-600 uppercase ml-1">Residential Address</label>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className={inputStyle} placeholder="Street, Building, Suite" required />
                        </div>
                    </div>

                    <button type="submit" className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest shadow-xl transition-all hover:-translate-y-0.5 active:scale-[0.98] ${editIndex !== null ? "bg-amber-500 text-white shadow-amber-200 hover:bg-amber-600" : "bg-cyan-600 text-white shadow-cyan-200 hover:bg-cyan-700"}`}>
                        {editIndex !== null ? "Update Medical Record" : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}