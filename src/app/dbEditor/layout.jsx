import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { UMLEditorProvider } from "@/components/organisms/UMLEditor/context";

function Layout({ blocksData,...props }) {
  // const [showModal, setShowModal] = useState(false);
  // const [newSchemaName, setNewSchemaName] = useState("");
  // const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(false);

  const [blocks, setBlocks] = useState([]);
  const [connections, setConnections] = useState([]);
  const [editorData, setEditorData] = useState();
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("gingerDb-editor")?.length) {
      try {
        const data = Object.values(JSON.parse(localStorage.getItem("gingerDb-editor")) || []).reduce((accum, block) => {
          return {
            ...accum,
            [block.id]: {
              ...block,
              rows: block.rows || [],
              ref: React.createRef(),
              data: block.data || {},
              type: block.type || BlockType.Table,
            },
          };
        }, {});
        setBlocks(data);
      } catch (error) {
        // TODO
      }
    }
  },[])

  
  const handleSave = async () => {
    setSaveLoading(true);
    const blocksStr = Object.values(blocks).map((block) => {
      return {
        id: block.id,
        position: block.position,
        rows: block.rows,
        data: block.data,
        type: block.type,
      };
    });
    localStorage.setItem("gingerDb-editor", JSON.stringify(blocksStr));
    setSaveLoading(false);
  };

  const showExample = ()=>{
    const data = Object.values(blocksData || []).reduce((accum, block) => {
      return {
        ...accum,
        [block.id]: {
          ...block,
          rows: block.rows || [],
          ref: React.createRef(),
          data: block.data || {},
          type: block.type || BlockType.Table,
        },
      };
    }, {});
    setBlocks(data);
  }

  const copyToClipBoard = ()=>{
    const blocksStr = Object.values(blocks).map((block) => {
      return {
        id: block.id,
        position: block.position,
        rows: block.rows,
        data: block.data,
        type: block.type,
      };
    });
    navigator.clipboard.writeText(JSON.stringify(blocksStr));
  }

  return (
    <UMLEditorProvider
      value={{
        blocks,
        setBlocks,
        connections,
        setConnections,
        editorData,
        setEditorData,
      }}
    >
      
      <div>
        <div className="fixed p-4 lg:p-6 top-[4.5rem] w-screen bg-white z-[49] dark:bg-gray-900 dark:text-white ">
          <div className="flex items-center justify-between ">
            
            <Button type="button" variant="outline" onClick={showExample}>
              Example Template
            </Button>
            <div className="flex gap-4 items-center">
              <Button type="button" variant="ghost" onClick={copyToClipBoard}>
                Copy to Clipboard
              </Button>
              <Button type="button" onClick={handleSave}>
                {saveLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </UMLEditorProvider>
  );
}

function DatabaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function NavigationOffIcon(props) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default Layout;
