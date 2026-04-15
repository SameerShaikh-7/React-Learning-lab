import React, { useState } from 'react';
import type { employeeType } from '../utils/global';

interface TableProps {
    allEmployees: employeeType[];
    deleteEmployee: (index: number) => void;
    updateEmployee: (index: number) => void;
}

export default function Table({ allEmployees, deleteEmployee, updateEmployee }: TableProps) {
    const [search, setSearch] = useState<string>("");

    // Search filter logic 
    const filterEmployees = allEmployees.filter((emp: employeeType) =>
        emp.fName.toLowerCase().includes(search.toLowerCase()) ||
        emp.city.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full mt-12 pb-20">
            {/* Search Section */}
            <div className="relative max-w-lg mx-auto mb-10 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search by staff name or location..."
                    className="block w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl leading-5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all shadow-sm"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-[1.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-slate-50/50">
                            <tr>
                                {["Ref ID", "Staff Member", "Contact Details", "Gender", "Actions"].map((header) => (
                                    <th key={header} className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {filterEmployees.map((emp: employeeType, index: number) => (
                                <tr key={index} className="hover:bg-cyan-50/30 transition-colors group">
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className="text-xs font-mono font-bold text-slate-400">#{index + 101}</span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-800">{emp.fName} {emp.lName}</span>
                                            <span className="text-[10px] text-cyan-600 font-bold tracking-tight uppercase mt-0.5">{emp.city}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-slate-600 font-medium">{emp.email}</span>
                                            <span className="text-[11px] text-slate-400 mt-0.5">{emp.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${emp.gender === 'Male' ? 'bg-blue-50 text-blue-600' :
                                            emp.gender === 'Female' ? 'bg-pink-50 text-pink-600' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {emp.gender}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            {/* Edit Action */}
                                            <button
                                                onClick={() => updateEmployee(index)}
                                                className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-cyan-600 hover:text-white hover:shadow-lg hover:shadow-cyan-200 transition-all duration-200"
                                                title="Edit Record"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>

                                            {/* Delete Action */}
                                            <button
                                                onClick={() => deleteEmployee(index)}
                                                className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-200 transition-all duration-200"
                                                title="Remove Record"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filterEmployees.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-slate-900 font-bold">No results found</h3>
                        <p className="text-slate-400 text-sm mt-1">We couldn't find any staff matching your search criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}