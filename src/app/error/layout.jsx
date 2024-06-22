import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

// function Layout({...props}) {
//     useEffect(() => {
//         console.log(props)
//     },[props])

//   return (
//     <>
//         <div className={`p-8 ${props.isDev==="true"?"m-10":""}`}>
//             <Outlet />
//         </div>
//     </>
//   )
// }
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function Layout() {
  const [showModal, setShowModal] = useState(false)
  const [newSchemaName, setNewSchemaName] = useState("")
  const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(false)
  const schemas = [
    { name: "users", columns: 12 },
    { name: "products", columns: 24 },
    { name: "orders", columns: 18 },
    { name: "inventory", columns: 15 },
    { name: "analytics", columns: 20 },
  ]
  const handleCreateSchema = () => {
    console.log("Creating new schema:", newSchemaName)
    setShowModal(false)
    setNewSchemaName("")
  }
  return (
    <div className='flex gap-4'>
      <div>
        {/* <div className="flex h-screen">
          <div
            className={`bg-gray-100 p-6 dark:bg-gray-800 transition-all duration-300 ${
              isSideNavCollapsed ? "w-16" : "w-64"
            }`}
          >
            <div className="mb-6 flex items-center justify-between">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsSideNavCollapsed(!isSideNavCollapsed)}
                className="lg:hidden"
              >
                <NavigationOffIcon className="h-6 w-6" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
              <h2
                className={`text-lg font-semibold transition-all duration-300 ${
                  isSideNavCollapsed ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              >
                Schemas
              </h2>
              <Button
                size="sm"
                onClick={() => setShowModal(true)}
                className={`transition-all duration-300 ${
                  isSideNavCollapsed ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Schema
              </Button>
            </div>
            <nav className={`space-y-2 transition-all duration-300 ${isSideNavCollapsed ? "overflow-hidden" : ""}`}>
              {schemas.map((schema) => (
                <div
                  key={schema.name}
                  className={`flex items-center justify-between rounded-md bg-white px-4 py-3 shadow-sm transition-colors hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-800 ${
                    isSideNavCollapsed ? "justify-center px-2" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <DatabaseIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <div
                      className={`transition-all duration-300 ${
                        isSideNavCollapsed ? "opacity-0 scale-0" : "opacity-100 scale-100"
                      }`}
                    >
                      <h3 className="font-medium">{schema.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{schema.columns} columns</p>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className={`transition-all duration-300 ${
                      isSideNavCollapsed ? "opacity-0 scale-0" : "opacity-100 scale-100"
                    }`}
                  >
                    <FilePenIcon className="h-4 w-4" />
                    <span className="sr-only">Edit {schema.name} schema</span>
                  </Button>
                </div>
              ))}
            </nav>
          </div>
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Schema</DialogTitle>
                <DialogDescription>Enter a name for the new schema.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newSchemaName}
                    onChange={(e) => setNewSchemaName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateSchema}>Create Schema</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div> */}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
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
  )
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
  )
}


function NavigationOffIcon(props) {
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
      <path d="M8.43 8.43 3 11l8 2 2 8 2.57-5.43" />
      <path d="M17.39 11.73 22 2l-9.73 4.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  )
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
  )
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
  )
}