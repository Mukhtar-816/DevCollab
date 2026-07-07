import React from 'react';
import Input from './Input';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ title, name, value, onChange, className = '', ...props }) => {
  const formattedTitle = title 
    ? title.replace(/^[a-z]/, (char) => char.toUpperCase()) 
    : '';

  return (
    <div className="w-full">
      <Input
        label={formattedTitle}
        name={name || title}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${formattedTitle.toLowerCase()}`}
        className={className}
        {...props}
      />
    </div>
  );
};

export default CustomInput;
