import ColumnEditor from "@/components/organisms/ColumnEditor";
import { ColumnType } from "@/components/organisms/ColumnEditor/types";
import TableEditor from "@/components/organisms/TableEditor";
import UMLEditor from "@/components/organisms/UMLEditor";
import Header from "@/components/atoms/Header";

import {
  UMLEditorProvider,
  useUMLEditor,
} from "@/components/organisms/UMLEditor/context";
import {
  MarkerType,
  BlockType,
} from "@/components/organisms/UMLEditor/types";
import { enumIcon, tableIcon } from "@/components/svgIcons";
import React, { useEffect, useState } from "react";

const legendConfigs = {
  [MarkerType.Rectangle]: {
    label: "Many To Many",
    color: "#4793AF",
  },
  [MarkerType.Hexagon]: {
    label: "Foreign Key",
    color: "#5E1675",
  },
  [MarkerType.Triangle]: {
    label: "One to One",
    color: "#799351",
  },
};

const Editor = ({id}) => {
  return (
      <UMLEditorWrapper id={id} />
  );
};

const UMLEditorWrapper = ({id}) => {
  const { blocks, setBlocks, connections, setConnections, setEditorData } = useUMLEditor();

  const updateConnections = () => {
    const connections = [];
    Object.keys(blocks||[]).forEach((key) => {
      const block = blocks[key];
      block.rows?.forEach((row, index) => {
        if (row.data.type === ColumnType.ForeignKey) {
          const block1Id = row.data.target;
          const block2Id = block.id;
          const toRow = index;
          const fromRow = 0;

          connections.push({
            block1Id,
            block2Id,
            fromRow,
            toRow,
            marker: MarkerType.Hexagon,
            label: `column : ${row.data.field_name}_id`,
          });
        } else if (row.data.type === ColumnType.ManyToManyField) {
          const block1Id = row.data.target;
          const block2Id = block.id;
          const toRow = index;
          const fromRow = 0;

          connections.push({
            block1Id,
            block2Id,
            fromRow,
            toRow,
            marker: MarkerType.Rectangle,
            label: `Via table ${block.id}_${row.data.target}`,
          });
        } else if (row.data.type === ColumnType.OneToOneField) {
          const block1Id = row.data.target;
          const block2Id = block.id;
          const toRow = index;
          const fromRow = 0;

          connections.push({
            block1Id,
            block2Id,
            fromRow,
            toRow,
            marker: MarkerType.Triangle,
            label: `Uniquly via ${row.data.field_name}_id`,
          });
        }
      });
    });
    setConnections(connections);
  };

  useEffect(() => {
    updateConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  const createNewBlock = (
    type,
    x,
    y,
    id,
  ) => {
    const rows = []
    if (type === BlockType.Table) {
      rows.push(
        {
          id: "pk",
          data: {
            type: "BigAutoField",
            name: "pk",
            field_name: "pk",
          },
        }
      )
    }
    const newBlock = {
      id,
      rows: [...rows],
      ref: React.createRef(),
      position: { top: y, left: x },
      data: {
      },
      type: type,
    };
    return newBlock;
  };

  return (
    <UMLEditor
      setBlocks={setBlocks}
      setConnections={setConnections}
      blocks={blocks}
      RowRenderer={({ rowData }) => {
        let hasError = false;
        if (
          (rowData.data.type === ColumnType.ForeignKey ||
            rowData.data.type === ColumnType.ManyToManyField ||
            rowData.data.type === ColumnType.OneToOneField) &&
          !blocks[rowData.data.target]
        ) {
          hasError = true;
        }

        return (
          <div
            className="column-repr"
            onClick={(e) => {
              if (rowData.data.type === ColumnType.PK) {
                e.stopPropagation();
                e.preventDefault();
              }
            }}
          >
            <strong className={hasError ? "text-error" : ""}>
              {rowData.data.field_name}
            </strong>
            {!rowData.data.field_name && !rowData.data.type && (
              <span className="text-primary">New Row - Click to define</span>
            )}
            <small>{rowData.data.type || ""}</small>
          </div>
        );
      }}
      HeadingRenderer={({ blockData }) => (
        <>
          {blockData.type === BlockType.Table && (
            <>
              {tableIcon}
              <strong>{(blockData.data.name || "") + " : Table"}</strong>
            </>
          )}
          {blockData.type === BlockType.Enum && (
            <>
              {enumIcon}
              <strong>{(blockData.data.name || "") + " : Enums"}</strong>
            </>
          )}
        </>
      )}
      EnumRowRenderer={({ blockData }) => {
        const usedIn  = [];
        Object.values(blocks).forEach((block) => {
          block.rows?.forEach((row) => {
            if (
              row.data.type === ColumnType.String &&
              row.data.options_target === blockData.id
            ) {
              usedIn.push(block.id);
            }
          });
        });

        return (
          <div className="enum-row-renderer-container">
            <span>
              Total of {(blockData.data.options || []).length} Choices
            </span>
            <span>
              Used in{" "}
              {usedIn.map((u, index) => {
                return (
                  <>
                    <strong>{u}</strong>
                    {index < usedIn.length - 1 && ", "}
                  </>
                );
              })}
            </span>
          </div>
        );
      }}
      connections={connections}
      legendConfigs={legendConfigs}
      RowEditor={ColumnEditor}
      BlockEditor={TableEditor}
      setEditorData={setEditorData}
      updateConnections={updateConnections}
      createNewBlock={createNewBlock}
    />
  );
};

export default Editor;
