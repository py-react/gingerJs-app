import React from "react";
import { ColumnType } from "./types";
import {
  CharFieldIcon,
  BooleanFieldIcon,
  DateFieldIcon,
  ForeignKeyIcon,
  PositiveIntegerFieldIcon,
  ManyToManyFieldIcon,
  TextFieldIcon,
} from "@/components/svgIcons"; // Import the icons for each column type

const CustomSelect = ({ value, onChange }) => {
  const options = Object.values(ColumnType).filter((v) => v !== ColumnType.PK); // Get all enum values as options
  const handleOptionClick = (option) => {
    onChange(option);
  };

  return (
    <div className="flex flex-wrap gap-10">
      {options.map((option) => (
        <div
          key={option}
          className={`flex items-center justify-center w-1/3 md:w-1/4 lg:w-1/5 p-4 rounded bg-gray-100 cursor-pointer transition duration-300 flex-col ${
            option === value ? "bg-blue-500 text-white flex items-center justify-center w-1/3 md:w-1/4 lg:w-1/5 p-4 rounded cursor-pointer flex-col" : ""
          }`}
          onClick={() => handleOptionClick(option)}
        >
          {getOptionIcon(option)} {/* Render the icon based on the option */}
          <span>{option}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomSelect;

// Helper function to get the icon for each column type
const getOptionIcon = (option) => {
  switch (option) {
    case ColumnType.String:
      return CharFieldIcon;
    case ColumnType.Boolean:
      return BooleanFieldIcon;
    case ColumnType.DateField:
      return DateFieldIcon;
    case ColumnType.ForeignKey:
      return ForeignKeyIcon;
    case ColumnType.PositiveIntegerField:
      return PositiveIntegerFieldIcon;
    case ColumnType.ManyToManyField:
      return ManyToManyFieldIcon;
    case ColumnType.TextField:
      return TextFieldIcon;
    default:
      return null;
  }
};
