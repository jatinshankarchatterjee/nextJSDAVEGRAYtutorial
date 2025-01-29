"use client";
import type { selectCustomerSchemaType } from "@/zod/customers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CellContext,
  createColumnHelper,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, TableOfContents } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMemo } from "react";
import { Filter } from "@/components/react-table/filter";

type Props = {
  data: selectCustomerSchemaType[];
};
export default function CustomerTable({ data }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageIndex = useMemo(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page) - 1 : 0;
  }, [searchParams.get("page")]); // eslint-disable-line

  const columnHeadersArray: Array<keyof selectCustomerSchemaType> = [
    "id",
    "name",
    "email",
    "phone",
    "address",
    "city",
    "state",
    "zip",
    "active",
    "createdAt",
    "updatedAt",
    "notes",
  ];
  const columnHelper = createColumnHelper<selectCustomerSchemaType>();

  const ActionCell = ({
    row,
  }: CellContext<selectCustomerSchemaType, unknown>) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={`/tickets/form?customerId=${row.original.id}`}
              className="flex items-center gap-2"
              prefetch={false}
            >
              New Ticket{" "}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/customers/form?customerId=${row.original.id}`}
              className="flex items-center gap-2"
              prefetch={false}
            >
              Edit Customer{" "}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  ActionCell.displayName = "ActionCell";

  const columns = [
    columnHelper.display({
      id: "actions",
      header: () => <TableOfContents />,
      cell: ActionCell,
    }),
    ...columnHeadersArray.map((columnName) => {
      return columnHelper.accessor(columnName, {
        id: columnName,
        header: columnName[0].toUpperCase() + columnName.slice(1),
      });
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: { pagination: { pageIndex, pageSize: 3 } },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <>
      <Table className="border-2 border-gray-500 mt-6">
        <TableHeader className="bg-gray-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={`bg-secondary ${
                    header.id === "actions" ? "w-12" : ""
                  }`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {header.column.getCanFilter() ? (
                    <div>
                      <Filter
                        column={header.column}
                        filteredRows={table
                          .getFilteredRowModel()
                          .rows.map((row) => row.getValue(header.column.id))}
                      />
                    </div>
                  ) : header.column.getCanSort() ? (
                    <div>
                      {header.column.getIsSorted() === "asc" ? (
                        <span>⬆️</span>
                      ) : (
                        <span>⬇️</span>
                      )}
                    </div>
                  ) : null}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              className="border-2 border-gray-500 cursor-pointer   "
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell className="border-2 border-gray-500" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-row min-w-full items-center justify-between">
        <div className="flex items-center space-x-2">
          Page: {table.getState().pagination.pageIndex + 1} of &nbsp;
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          {`${table.getFilteredRowModel().rows.length} ${
            table.getFilteredRowModel().rows.length === 1
              ? "customer"
              : "customers"
          }`}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newIndex = table.getState().pagination.pageIndex - 1;
              table.setPageIndex(newIndex);
              const params = new URLSearchParams(window.location.search);
              params.set("page", (newIndex + 1).toString());
              router.replace(`?${params.toString()},{scroll: false}`);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newIndex = table.getState().pagination.pageIndex + 1;
              table.setPageIndex(newIndex);
              const params = new URLSearchParams(window.location.search);
              params.set("page", (newIndex + 1).toString());
              router.replace(`?${params.toString()},{scroll: false}`);
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
