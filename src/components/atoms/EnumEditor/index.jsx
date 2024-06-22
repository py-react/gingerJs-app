import React, { useState, useEffect, ChangeEvent } from "react";
import { deleteIcon } from "@/components/svgIcons";
import { slugGenerator } from "src/libs/utils";


const EnumEditor = ({
  value = [],
  onChange,
  className = "",
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue("");
  }, [value]);

  const handleInputChange = (e ) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e ) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newOption = { label: inputValue, value: slugGenerator(inputValue) };
      onChange?.([...value, newOption]);
      setInputValue("");
    }
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = value.filter((_, i) => i !== index);
    onChange?.(updatedOptions);
  };

  const handleOptionEdit = (index, editedLabel) => {
    const updatedOptions = value.map((option, i) =>
      i === index
        ? { ...option, label: editedLabel, value: slugGenerator(editedLabel) }
        : option,
    );

    // Remove the option if the edited label is empty
    if (editedLabel.trim() === "") {
      updatedOptions.splice(index, 1);
      onChange?.(updatedOptions);
    } else {
      onChange?.(updatedOptions);
    }
  };

  return (
    <div className="form-group">
      <label>Options</label>
      <input
        className="base-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter text and press Enter"
      />
      <ul className={className}>
        {value.map((option, index) => (
          <li key={index} className="flex justify-between p-[20px] border border-solid border-gray-300">
            <span
              contentEditable
              onBlur={(e) =>
                handleOptionEdit(index, e.currentTarget.textContent || "")
              }
            >
              {option.label}
            </span>
            <button onClick={() => handleDeleteOption(index)}>
              {deleteIcon}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnumEditor;
