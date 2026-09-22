"use client";

import { useState, useEffect } from "react";
import { Camera, Mail, Phone, ChevronLeft, Plus, ToggleLeft, ToggleRight, ChevronDown } from "lucide-react";
import {
  BookingType,
  platformIntents,
  serviceTypes,
  editingStyleOptions,
  packageTiers,
} from "../utils/type";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface FormErrors {
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  platformIntent?: string;
  serviceType?: string;
  editingStyles?: string;
}

export default function AddBooking() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [errorForm, setErrorForm] = useState<FormErrors>({});

  const [formData, setFormData] = useState<BookingType>(() => ({
    id: Math.floor(Math.random() * 100000),
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    platformIntent: "",
    serviceType: "",
    editingStyles: [] as string[],
    keepOriginal: true,
    specialNotes: "",
    packageTier: "",
  }));

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStyleToggle = (style: string) => {
    setFormData((prev) => ({
      ...prev,
      editingStyles: prev.editingStyles.includes(style)
        ? prev.editingStyles.filter((s) => s !== style)
        : [...prev.editingStyles, style],
    }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({ ...prev, keepOriginal: !prev.keepOriginal }));
  };

  const validation = (): boolean => {
    const errors: FormErrors = {};
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;


    if (!formData.clientName.trim()) {
      errors.clientName = "Name is required...";
    } else if (formData.clientName.trim().length < 3) {
      errors.clientName = "Name must be at least 3 characters long...";
    }
    

    if (!formData.clientEmail.trim()) {
      errors.clientEmail = "Email is required...";
    } else if (!emailRegex.test(formData.clientEmail)) {
      errors.clientEmail = "Enter a valid email address...";
    }

  
    if (!formData.clientPhone.trim()) {
      errors.clientPhone = "Phone is required...";
    } else if (!phoneRegex.test(formData.clientPhone.trim())) {
      errors.clientPhone = "Enter a valid 10-digit phone number...";
    }

    if (!formData.platformIntent) errors.platformIntent = "Platform is required...";
    if (!formData.serviceType) errors.serviceType = "Service type is required...";
    if (formData.editingStyles.length === 0) errors.editingStyles = "Select at least one style...";

    setErrorForm(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validation()) {
      toast.error("Please correctly fill all required session details!");
      return;
    }

    const existing: BookingType[] = JSON.parse(localStorage.getItem("proshots_bookings") || "[]");
    const updated = [...existing, formData];
    localStorage.setItem("proshots_bookings", JSON.stringify(updated));

    toast.success("Session booked successfully!");
    router.push("/viewBookings");
  };

  if (!isMounted) return null;

  const inputClass =
    "w-full px-5 py-4 rounded-2xl text-sm font-medium outline-none transition-all duration-200 [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:text-[#e0e0e0] [&:-webkit-autofill]:transition-colors [&:-webkit-autofill]:duration-[50000s]";
  
  const inputStyle = (hasError?: string) => ({
    background: "rgba(255,255,255,0.04)",
    border: hasError ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.08)",
    color: "#e0e0e0",
  });
  
  const labelClass = "block text-[10px] font-semibold uppercase tracking-[0.25em] mb-2";
  const errorClass = "text-[10px] font-semibold uppercase mt-1.5";

  return (
    <div className="min-h-screen px-4 pt-32 pb-24" style={{ background: "#0a0a0a" }}>
      <div className="max-w-3xl mx-auto">

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest mb-10 transition-all"
          style={{ color: "#555" }}
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="mb-14">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.4em] mb-3"
            style={{ color: "#d4af37" }}
          >
            New Booking
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold italic leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#ffffff" }}
          >
            Book Your{" "}
            <span style={{ color: "rgba(255,255,255,0.2)" }}>Session.</span>
          </h1>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-10 rounded-[2.5rem] p-10 md:p-14"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
          autoComplete="off"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} style={{ color: "#555" }}>Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="e.g. Sameer Patel"
                  className={inputClass}
                  style={inputStyle(errorForm.clientName)}
                  autoComplete="off"
                />
                <Camera className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#333" }} />
              </div>
              {errorForm.clientName && (
                <p className={errorClass} style={{ color: "#ef4444" }}>{errorForm.clientName}</p>
              )}
            </div>

            <div>
              <label className={labelClass} style={{ color: "#555" }}>Email Address</label>
              <div className="relative">
                <input
                  type="text"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  placeholder="sameer@email.com"
                  className={inputClass}
                  style={inputStyle(errorForm.clientEmail)}
                  autoComplete="off"
                />
                <Mail className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#333" }} />
              </div>
              {errorForm.clientEmail && (
                <p className={errorClass} style={{ color: "#ef4444" }}>{errorForm.clientEmail}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} style={{ color: "#555" }}>Phone Number</label>
              <div className="relative">
                <input
                  type="tel"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className={inputClass}
                  style={inputStyle(errorForm.clientPhone)}
                  autoComplete="off"
                />
                <Phone className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#333" }} />
              </div>
              {errorForm.clientPhone && (
                <p className={errorClass} style={{ color: "#ef4444" }}>{errorForm.clientPhone}</p>
              )}
            </div>

            <div>
              <label className={labelClass} style={{ color: "#555" }}>Platform Intent</label>
              <div className="relative">
                <select
                  name="platformIntent"
                  value={formData.platformIntent}
                  onChange={handleChange}
                  className={`${inputClass} pr-12 cursor-pointer`}
                  style={{ ...inputStyle(errorForm.platformIntent), appearance: "none" as const, colorScheme: "dark" }}
                >
                  <option value="" className="bg-[#0a0a0a] text-[#e0e0e0]">Where will it be used?</option>
                  {platformIntents.map((p, i) => (
                    <option key={i} value={p} className="bg-[#0a0a0a] text-[#e0e0e0]">{p}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "#555" }} />
              </div>
              {errorForm.platformIntent && (
                <p className={errorClass} style={{ color: "#ef4444" }}>{errorForm.platformIntent}</p>
              )}
            </div>
          </div>

          <div>
            <label className={labelClass} style={{ color: "#555" }}>Package Tier</label>
            <div className="relative">
              <select
                name="packageTier"
                value={formData.packageTier}
                onChange={handleChange}
                className={`${inputClass} pr-12 cursor-pointer`}
                style={{ ...inputStyle(), appearance: "none" as const, colorScheme: "dark" }}
              >
                <option value="" className="bg-[#0a0a0a] text-[#e0e0e0]">Select a package</option>
                {packageTiers.map((t, i) => (
                  <option key={i} value={t} className="bg-[#0a0a0a] text-[#e0e0e0]">{t}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "#555" }} />
            </div>
          </div>

          <div>
            <label className={labelClass} style={{ color: "#555" }}>Service Type</label>
            <div className="flex flex-wrap gap-6 mt-2">
              {serviceTypes.map((s, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="serviceType"
                    value={s}
                    checked={formData.serviceType === s}
                    onChange={handleChange}
                    className="w-4 h-4"
                    style={{ accentColor: "#d4af37" }}
                  />
                  <span
                    className="text-sm font-medium transition-colors"
                    style={{ color: formData.serviceType === s ? "#ffffff" : "#555" }}
                  >
                    {s}
                  </span>
                </label>
              ))}
            </div>
            {errorForm.serviceType && (
              <p className={errorClass} style={{ color: "#ef4444" }}>{errorForm.serviceType}</p>
            )}
          </div>

          <div>
            <label className={labelClass} style={{ color: "#555" }}>Editing Style</label>
            <div className="flex flex-wrap gap-3 mt-2">
              {editingStyleOptions.map((style, i) => {
                const selected = formData.editingStyles.includes(style);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleStyleToggle(style)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200"
                    style={{
                      background: selected ? "linear-gradient(135deg, #d4af37, #b8962e)" : "rgba(255,255,255,0.04)",
                      border: selected ? "1px solid #d4af37" : "1px solid rgba(255,255,255,0.08)",
                      color: selected ? "#0a0a0a" : "#555",
                    }}
                  >
                    {style}
                  </button>
                );
              })}
            </div>
            {errorForm.editingStyles && (
              <p className={errorClass} style={{ color: "#ef4444" }}>{errorForm.editingStyles}</p>
            )}
          </div>

          <div
            className="flex items-center justify-between p-5 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div>
              <p className="text-sm font-medium" style={{ color: "#e0e0e0" }}>
                Preserve Natural Details
              </p>
              <p className="text-xs mt-1" style={{ color: "#555" }}>
                No heavy AI filters — keep your authentic look.
              </p>
            </div>
            <button
              type="button"
              onClick={handleToggle}
              className="transition-all duration-200"
              style={{ color: formData.keepOriginal ? "#d4af37" : "#333" }}
            >
              {formData.keepOriginal ? (
                <ToggleRight className="w-10 h-10" />
              ) : (
                <ToggleLeft className="w-10 h-10" />
              )}
            </button>
          </div>

          <div>
            <label className={labelClass} style={{ color: "#555" }}>Special Instructions</label>
            <textarea
              name="specialNotes"
              rows={4}
              value={formData.specialNotes}
              onChange={handleChange}
              placeholder="Any specific requirements, references, or notes..."
              className={`${inputClass} resize-none`}
              style={inputStyle()}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.01] active:scale-95"
              style={{
                background: "linear-gradient(135deg, #d4af37, #b8962e)",
                color: "#0a0a0a",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                boxShadow: "0 12px 40px rgba(212,175,55,0.2)",
              }}
            >
              <Plus className="w-4 h-4" /> Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}