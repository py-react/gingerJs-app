import Draggable from "react-draggable";
import Legend from "@/components/atoms/Legend";
import { calculatePath } from "@/libs/canvas.utils";
import {
  pencilIcon,
  triangleIcon,
  rectangleIcon,
  circleIcon,
  hexagonIcon,
} from "@/components/svgIcons";
import { BlockType, EditorTypeEnum, MarkerType } from "./types";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Aside from "@/components/organisms/Aside";
import { NEW_BLOCK_ID_PREFIX } from "./constants";

const UMLEditor = ({
  setBlocks,
  blocks,
  setConnections,
  connections,
  legendConfigs,
  RowEditor,
  BlockEditor,
  setEditorData,
  HeadingRenderer = ({ blockData }) => {
    return blockData.id;
  },
  RowRenderer = ({ rowData }) => {
    return rowData.id;
  },
  updateConnections,
  createNewBlock,
  EnumRowRenderer = ({ blockData }) => {
    return blockData.id;
  },
}) => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [editorType, setEditorType] = useState();
  const [contextMenu, setContextMenu] = useState(null);
  const contextMenuRef = useRef(null);

  const toggleSlider = (type, blockId, rowIndex) => {
    setIsSliderOpen((isOpen) => !isOpen);
    setEditorType(type);
    setEditorData({ rowIndex, blockId });
  };

  const closeSlider = () => {
    setIsSliderOpen(false);

    setBlocks((v) => {
      const keysToDelete = [];
      const updatedBlocks = Object.keys(v).reduce((accum, key) => {
        if (v[key].id !== key) {
          accum[v[key].id] = v[key];
          keysToDelete.push(key);
        } else {
          accum[key] = v[key];
        }
        return accum;
      }, {});

      keysToDelete.forEach((k) => {
        delete updatedBlocks[k];
      });
      return updatedBlocks;
    });

    updateConnections();
  };

  const svgRef = React.createRef();
  const [paths, setPaths] = useState([]);

  const handleDrag = useCallback(() => {
    const newPaths = connections.map(
      ({ block1Id, fromRow, block2Id, toRow }) => {
        const rect1 = blocks[block1Id]?.ref.current?.getBoundingClientRect();
        const rect2 = blocks[block2Id]?.ref.current?.getBoundingClientRect();
        const { d, midX, midY } = calculatePath(
          rect1,
          rect2,
          fromRow,
          toRow,
          blocks[block1Id]?.rows.length || 0,
          blocks[block2Id]?.rows.length || 0
        );
        return { path: d, midX, midY };
      }
    );

    setPaths(newPaths);
  }, [blocks, connections]);

  useEffect(() => {
    handleDrag();
  }, [connections, handleDrag]);

  const handleBlockDrag = (id, e, data) => {
    setBlocks((prevBlocks) => ({
      ...prevBlocks,
      [id]: {
        ...prevBlocks[id],
        position: { top: data.y, left: data.x },
      },
    }));
    handleDrag(); // Update paths after dragging
  };

  const handleAddBlock = (type) => {
    if (!contextMenu) {
      return;
    }

    setBlocks((v) => {
      const id = `${NEW_BLOCK_ID_PREFIX}-${type}`;
      return {
        ...v,
        [id]: createNewBlock(type, contextMenu.x, contextMenu.y, id),
      };
    });
    closeContextMenu();
  };

  const addNewRow = (id) => {
    setBlocks((prevBlocks) => ({
      ...prevBlocks,
      [id]: {
        ...prevBlocks[id],
        rows: [...prevBlocks[id].rows, { id: "new-row", data: {} }],
      },
    }));
    handleDrag(); // Update paths after dragging
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX + window.scrollX,
      y: e.clientY + window.scrollY,
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        closeContextMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white">
      <div className="canvas-container" onContextMenu={handleContextMenu}>
        {Object.values(blocks||[]).map((block) => (
          <Draggable
            key={block.id}
            onDrag={(e, data) => handleBlockDrag(block.id, e, data)}
            handle=".handle"
            position={{ x: block.position.left, y: block.position.top }}
          >
            <div className="card block-card" ref={block.ref}>
              {/* Header row */}
              <div
                className={`${
                  block.type === BlockType.Enum
                    ? "options-header"
                    : "table-header"
                } block-header handle`}
              >
                <HeadingRenderer blockData={block} />
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSlider(EditorTypeEnum.BLOCK, block.id);
                  }}
                >
                  {pencilIcon("inverted")}
                </span>
              </div>
              {/* Render dynamic number of rows */}
              {block.rows?.map((row, index) => (
                <div
                  onClick={() =>
                    toggleSlider(EditorTypeEnum.ROW, block.id, index)
                  }
                  key={index}
                  className={`
                    bg-white
                    text-gray-950
                    hover:bg-gray-700
                    hover:text-white
                    border-t-gray-950
                    px-[20px]
                    py-[10px]
                    `
                  }
                >
                  <RowRenderer rowData={row} />
                </div>
              ))}
              {block.type === BlockType.Table && (
                <div
                  onClick={() => {
                    addNewRow(block.id);
                  }}
                  className={`
                    bg-white
                    text-gray-950
                    hover:bg-gray-700
                    hover:text-white
                    border-t-gray-950
                    px-[20px]
                    py-[10px]
                    `
                  }
                >
                  Add new row
                </div>
              )}
              {block.type === BlockType.Enum && (
                <div
                  onClick={() => toggleSlider(EditorTypeEnum.BLOCK, block.id)}
                  className="row-content"
                >
                  <EnumRowRenderer blockData={block} />
                </div>
              )}
            </div>
          </Draggable>
        ))}
        {/* Render connections */}
        <svg ref={svgRef} className="svg-container">
          {paths.map(({ path, midX, midY }, index) => (
            <g key={index}>
              <path d={path} stroke="black" fill="transparent" />
              {connections[index]?.marker && (
                <g transform={`translate(${midX - 13}, ${midY})`}>
                  {(() => {
                    const marker = connections[index].marker;
                    if (!marker) {
                      return null;
                    }
                    const color = legendConfigs[marker]?.color || "#000";

                    switch (connections[index].marker) {
                      case MarkerType.Triangle:
                        return triangleIcon(color);
                      case MarkerType.Rectangle:
                        return rectangleIcon(color);
                      case MarkerType.Circle:
                        return circleIcon(color);
                      case MarkerType.Hexagon:
                        return hexagonIcon(color);
                      default:
                        return null;
                    }
                  })()}
                  {connections[index].label && (
                    <text
                      x="10"
                      y="-10"
                      fontSize="15"
                      textAnchor="middle"
                      fill="black"
                    >
                      {connections[index].label}
                    </text>
                  )}
                </g>
              )}
            </g>
          ))}
        </svg>
        {contextMenu && (
          <div
            ref={contextMenuRef}
            className="context-menu absolute border z-[48] flex flex-col bg-white dark:bg-gray-950 dark:text-white"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <button className="bg-white dark:bg-gray-950 dark:hover:bg-white/90 dark:hover:text-gray-950 hover:bg-white/90" onClick={() => handleAddBlock(BlockType.Table)}>
              Add Block
            </button>
            <button className="bg-white dark:bg-gray-950 dark:hover:bg-white/90 dark:hover:text-gray-950 hover:bg-white/90" onClick={() => handleAddBlock(BlockType.Enum)}>
              Add Options
            </button>
          </div>
        )}
      </div>
      <Aside isOpen={isSliderOpen} onClose={closeSlider}>
        {editorType === EditorTypeEnum.ROW && <RowEditor close={closeSlider} />}
        {editorType === EditorTypeEnum.BLOCK && (
          <BlockEditor close={closeSlider} />
        )}
      </Aside>
      <Legend items={legendConfigs} />
    </div>
  );
};

export default UMLEditor;
