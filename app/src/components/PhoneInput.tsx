
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const formatPhoneNumber = (input: string): string => {
    // Remove all non-numeric characters
    const numbers = input.replace(/\D/g, "");
    
    // Format the phone number
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    onChange(formattedNumber);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="phone" className="text-sm font-medium">
        Número de Telefone
      </Label>
      <Input
        id="phone"
        type="tel"
        placeholder="(00) 00000-0000"
        value={value}
        onChange={handleChange}
        className="w-full"
      />
    </div>
  );
};

export default PhoneInput;
