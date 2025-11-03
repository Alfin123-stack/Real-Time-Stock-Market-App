"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface AuthFieldProps {
  label: string;
  type?: "text" | "email" | "password" | "select";
  value: string;
  placeholder?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
  options?: [string, string][]; // hanya dipakai untuk select
  required?: boolean;
}

export default function AuthField({
  label,
  type = "text",
  value,
  placeholder,
  autoComplete,
  onChange,
  options = [],
  required = true,
}: AuthFieldProps) {
  return (
    <div>
      <label className="text-sm text-gray-400 mb-1 block">{label}</label>

      {type === "select" ? (
        <Select onValueChange={onChange} value={value}>
          <SelectTrigger className="bg-[#121212] w-full border border-[#222] text-gray-300 focus:ring-2 focus:ring-orange-500">
            <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent className="bg-[#121212] text-gray-200 border border-[#222]">
            {options.map(([val, name]) => (
              <SelectItem key={val} value={val}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="bg-[#121212] border border-[#222] focus:ring-2 focus:ring-orange-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      )}
    </div>
  );
}
