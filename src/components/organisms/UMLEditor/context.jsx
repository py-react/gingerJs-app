import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const UMLEditorContext = createContext(
  undefined,
);

export const UMLEditorProvider = ({ children, value }) => {
  const [valueData, setValueData] = useState(value)
  useEffect(()=>{
    setValueData(value)
  },[value])
  return (
    <UMLEditorContext.Provider value={valueData}>
      {children}
    </UMLEditorContext.Provider>
  );
};

export const useUMLEditor = () => {
  const context = useContext(UMLEditorContext);
  if (context === undefined) {
    throw new Error("useUMLEditor must be used within a UMLEditorProvider");
  }
  return context;
};
