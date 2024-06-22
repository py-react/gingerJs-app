import React, { useEffect } from "react";
import { useUMLEditor } from "../UMLEditor/context";
import { BlockType } from "../UMLEditor/types";
import { slugGenerator } from "src/libs/utils";
import EnumEditor from "@/components/atoms/EnumEditor";

const TableEditor = ({ close }) => {
  const {
    blocks,
    setBlocks,
    connections,
    setConnections,
    editorData ,
  } = useUMLEditor();

  const updateBlock = (
    data,
    blockLevelData,
  ) => {
    setBlocks((v) => {
      return {
        ...v,
        [editorData?.blockId]: {
          ...v[editorData?.blockId],
          data: { ...v[editorData?.blockId].data, ...data },
          ...blockLevelData,
        },
      };
    });
  };

  const handleNameChange = ({
    target: { value },
  }) => {
    if (!editorData?.blockId) {
      return;
    }
    const slug = slugGenerator(value);
    updateBlock({ name: value, table_name: slug, id: slug }, { id: slug });
  };

  const handleDocChange = ({
    target: { value },
  }) => {
    if (!editorData?.blockId) {
      return;
    }
    updateBlock({ docs: value });
  };

  const handleDelete = () => {
    setBlocks((v) => {
      delete v[editorData.blockId];
      return v;
    });
    close();
  };

  const block = blocks[editorData?.blockId];
  const data = block?.data;

  const handleEnumsChange = (value) => {
    updateBlock({ options: value });
  };

  return (
    <div className="dark:text-gray-950">
      <div className="flex justify-between ">
        <h3>
          {block?.type === BlockType.Table ? "Table" : "Enum"} Editor :
          <strong>{data?.name}</strong>
        </h3>
        <button className="base-button secondary" onClick={handleDelete}>
          Delete
        </button>
      </div>
      {/* {JSON.stringify(blocks[editorData?.blockId]?.data)} */}
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          id="name"
          className="base-input"
          placeholder="Enter name"
          value={data?.name || ""}
          onChange={handleNameChange}
        />
      </div>
      <strong>
        {block?.type === BlockType.Table ? "Table" : "Enum"} name :{" "}
        {data?.table_name}
      </strong>
      <div className="form-group">
        <label>Doc String</label>
        <textarea
          id="name"
          className="base-input"
          placeholder="Enter name"
          value={data?.docs || ""}
          onChange={handleDocChange}
        />
      </div>

      {block?.type === BlockType.Enum && (
        <EnumEditor
          className="flex-1 h-full max-h-500 overflow-y-auto"
          onChange={handleEnumsChange}
          value={data.options || []}
        />
      )}
    </div>
  );
};

export default TableEditor;
