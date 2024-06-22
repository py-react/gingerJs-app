import React, { useMemo } from "react";
import { useUMLEditor } from "../UMLEditor/context";
import { BlockType } from "../UMLEditor/types";

const EnumSelector  = ({ value, onChange }) => {
  const { blocks } = useUMLEditor();

  const enumBlocks = useMemo(() => {
    return Object.values(blocks).filter(
      (block) => block.type === BlockType.Enum,
    );
  }, [blocks]);

  return (
    <div className="form-group">
      <label>Enum</label>
      <select
        className="base-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value={undefined}>Not selected</option>
        {enumBlocks.map((block) => (
          <option key={block.id} value={block.id}>
            {block.data.name || block.id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EnumSelector;
