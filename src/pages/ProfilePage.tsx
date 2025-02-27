"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

// Import shadcn sheet components
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const initialData: Farmer[] = [
  {
    id: "1",
    name: "John Doe",
    address: "123 Main St, New York, NY",
    phone: "+1 555-1234",
    birthdate: "1985-06-15",
    farmlocation: "Lot 45, Onion Valley",
  },
  {
    id: "2",
    name: "Jane Smith",
    address: "456 Elm St, Chicago, IL",
    phone: "+1 555-5678",
    birthdate: "1992-09-22",
    farmlocation: "Plot A, Greenfield Farm",
  },
];

export type Farmer = {
  id: string;
  name: string;
  address: string;
  phone: string;
  birthdate: string;
  farmlocation: string;
};

function UserDialog({ farmer, onSave }: { farmer?: Farmer; onSave: (user: Farmer) => void }) {
  const [user, setUser] = React.useState<Farmer>(
    farmer || { id: "", name: "", address: "", phone: "", birthdate: "", farmlocation: "" }
  );
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleSave = () => {
    setIsDialogOpen(true);
  };

  const confirmSave = () => {
    onSave(user);
    toast.success(farmer ? "User updated successfully!" : "New user added successfully!");
    setIsDialogOpen(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={farmer ? "outline" : "default"}>
          {farmer ? "Edit" : "Add New User"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{farmer ? "Edit User" : "Add New User"}</DialogTitle>
          <DialogDescription>
            {farmer ? "Modify user details and save changes." : "Enter new user details and click save."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {["name", "address", "phone", "birthdate", "farmlocation"].map((field) => (
            <div key={field} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={field} className="text-right capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </Label>
              <Input
                id={field}
                type={field === "birthdate" ? "date" : "text"}
                value={user[field as keyof Farmer]}
                onChange={(e) => setUser({ ...user, [field]: e.target.value })}
                className="col-span-3"
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>

      {/* Confirmation Dialog */}
      {isDialogOpen && (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>Are you sure you want to save changes?</AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmSave}>Confirm</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </Dialog>
  );
}

function UserSheet({ farmer }: { farmer: Farmer }) {
  // Dummy historical data for demonstration purposes
  const historicalData = [
    { id: "1", storedDate: "2023-01-01", retrievalDate: "2023-01-15", numberOfBags: 10, paymentTotal: "$500" },
    { id: "2", storedDate: "2023-02-05", retrievalDate: "2023-02-20", numberOfBags: 5, paymentTotal: "$250" },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="cursor-pointer text-blue-600 hover:underline">
          {farmer.name}
        </span>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[800px]">
        <SheetHeader>
          <SheetTitle>User Details</SheetTitle>
          <SheetDescription>View details of the user</SheetDescription>
        </SheetHeader>

        {/* User Details Card */}
        <div className="p-6 bg-white shadow-lg rounded-md mb-4">
          <h2 className="text-2xl font-bold mb-2">{farmer.name}</h2>
          <p>
            <strong>Address:</strong> {farmer.address}
          </p>
          <p>
            <strong>Number:</strong> {farmer.phone}
          </p>
          <p>
            <strong>Birthdate:</strong> {farmer.birthdate}
          </p>
          <p>
            <strong>Farm Location:</strong> {farmer.farmlocation}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-300 my-4"></div>

        {/* Historical Data Table */}
        <div>
          <h3 className="text-lg font-medium mb-2">Historical Data</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stored Date
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Retrieval Date
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Number of Bags
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {historicalData.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {item.storedDate}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {item.retrievalDate}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {item.numberOfBags}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {item.paymentTotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* <SheetFooter>
          <SheetClose asChild>
            <Button>Close</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}

function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [farmers, setFarmers] = React.useState<Farmer[]>(initialData);

  const table = useReactTable({
    data: farmers,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const cellValue = row.getValue(columnId) as string;
      return cellValue.toLowerCase().includes(filterValue.toLowerCase());
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search by name..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <UserDialog
          onSave={(newUser) =>
            setFarmers([...farmers, { ...newUser, id: (farmers.length + 1).toString() }])
          }
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="cursor-pointer hover:text-gray-500 transition-colors px-4 py-2"
                    onClick={() =>
                      header.column.toggleSorting(header.column.getIsSorted() === "asc")
                    }
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() ? (
                      <ArrowUpDown className="inline ml-1 h-4 w-4" />
                    ) : null}
                  </th>
                ))}
                <th className="px-4 py-2">Actions</th>
              </tr>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2">
                      {cell.column.id === "name" ? (
                        <UserSheet farmer={row.original} />
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-2">
                    <UserDialog
                      farmer={row.original}
                      onSave={(updatedUser) =>
                        setFarmers(farmers.map((f) => (f.id === updatedUser.id ? updatedUser : f)))
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="h-24 text-center">
                  No results.
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export const columns: ColumnDef<Farmer>[] = [
  { accessorKey: "name", header: "Name", cell: ({ row }) => <UserSheet farmer={row.original} /> },
  { accessorKey: "address", header: "Address", cell: ({ row }) => <div>{row.getValue("address")}</div> },
  { accessorKey: "phone", header: "Phone", cell: ({ row }) => <div>{row.getValue("phone")}</div> },
  { accessorKey: "birthdate", header: "Birthdate", cell: ({ row }) => <div>{row.getValue("birthdate")}</div> },
  { accessorKey: "farmlocation", header: "Farm Location", cell: ({ row }) => <div>{row.getValue("farmlocation")}</div> },
];

export default DataTableDemo;
