import React, { useMemo } from "react";
import { useUMLEditor } from "../UMLEditor/context";
import { BlockType } from "../UMLEditor/types";


const TableSelector = ({ value, onChange }) => {
  const { blocks } = useUMLEditor();

  const tableBlocks = useMemo(() => {
    return Object.values(blocks).filter(
      (block) => block.type === BlockType.Table,
    );
  }, [blocks]);

  return (
    <div className="form-group">
      <label>Relates to</label>
      <select
        className="base-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value={undefined}>Not selected</option>
        {tableBlocks.map((block) => (
          <option key={block.id} value={block.id}>
            {block.data.name || block.id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TableSelector;
