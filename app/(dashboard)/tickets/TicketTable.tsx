"use client";
import type { TicketSearchResultsType } from "@/lib/queries/getTicketSearchResults";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createColumnHelper,
  flexRender,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  getFacetedUniqueValues,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CircleCheckIcon,
  CircleXIcon,
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Filter } from "@/components/react-table/filter";
import usePolling from "@/hooks/usePolling";
type Props = {
  data: TicketSearchResultsType;
};

type RowType = TicketSearchResultsType[0];

export default function TicketTable({ data }: Props) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "ticketDate",
      desc: false,
    },
  ]);

  const router = useRouter();
  const searchParams = useSearchParams();

  usePolling(5000, searchParams.get("searchText"));

  const pageIndex = useMemo(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page) - 1 : 0;
  }, [searchParams.get("page")]); // eslint-disable-line

  const columnHeadersArray: Array<keyof RowType> = [
    "id",
    "ticketDate",
    "title",
    "name",
    "email",
    "phone",
    "description",
    "assigned_to",
    "status",
  ];

  const columnWidths = {
    id: 50,
    ticketDate: 100,
    title: 200,
    name: 100,
    email: 150,
    phone: 100,
    description: 200,
    assigned_to: 150,
    status: 50,
  };

  const columnHelper = createColumnHelper<RowType>();

  const columns = columnHeadersArray.map((columnName) => {
    return columnHelper.accessor(
      (row) => {
        const value = row[columnName];

        if (columnName === "ticketDate" && value instanceof Date) {
          return value.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        }

        if (columnName === "status") {
          return value ? "Open" : "Closed";
        }
        return value;
      },
      {
        id: columnName,
        size: columnWidths[
          (columnName as keyof typeof columnWidths) ?? undefined
        ],
        header: ({ column }) => {
          return (
            <Button
              variant={"ghost"}
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              {columnName[0].toUpperCase() + columnName.slice(1)}
              {column.getIsSorted() === "asc" && <ArrowUp />}
              {column.getIsSorted() === "desc" && <ArrowDown />}
              {column.getIsSorted() !== "asc" &&
                column.getIsSorted() !== "desc" && <ArrowUpDown />}
            </Button>
          );
        },
        cell: ({ getValue }) => {
          const value = getValue();
          if (columnName === "status" && value === "Closed") {
            return (
              <div className="flex justify-center space-x-2">
                <CircleCheckIcon className="text-green-500" />
              </div>
            );
          } else if (columnName === "status" && value === "Open") {
            return (
              <div className="flex justify-center space-x-2">
                <CircleXIcon className="text-red-500" />
              </div>
            );
          }
          return value;
        },
      }
    );
  });

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, pagination: { pageIndex, pageSize: 4 } },

    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
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
                  className="border-2 border-gray-500 text-center"
                  style={{ width: header.getSize() }}
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
                      <button onClick={header.column.getToggleSortingHandler()}>
                        Sort
                      </button>
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
              className="border-2 border-gray-500 cursor-pointer"
              key={row.id}
              onClick={() =>
                router.push(`/tickets/form?ticketId=${row.original.id}`)
              }
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  className="border-2 border-gray-500 text-center"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <div className="flex flex-row items-center justify-between">
          <div>
            Page&nbsp;{table.getState().pagination.pageIndex + 1}
            &nbsp;of&nbsp;&nbsp;
            {table.getPageCount()}
          </div>
          <div>
            {`${table.getFilteredRowModel().rows.length} ${
              table.getFilteredRowModel().rows.length === 1
                ? "ticket"
                : "tickets"
            }`}
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2 py-4">
          <Button
            variant={"ghost"}
            className="border-2 border-gray-500 px-4 py-2 rounded-sm"
            onClick={() => router.refresh()}
          >
            Refresh
          </Button>
          <Button
            variant={"ghost"}
            className="border-2 border-gray-500 px-4 py-2 rounded-sm"
            onClick={() => {
              table.resetSorting();
              table.resetColumnFilters();
            }}
          >
            Reset
          </Button>
          <Button
            variant={"ghost"}
            className="border-2 border-gray-500 px-4 py-2 rounded-sm"
            onClick={() => {
              const newIndex = table.getState().pagination.pageIndex - 1;
              table.setPageIndex(newIndex);
              const params = new URLSearchParams(window.location.search);
              params.set("page", (newIndex + 1).toString());
              router.replace(`?${params.toString()},{scroll: false}`);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeft className=" mr-2 h-4 w-4  " />
          </Button>
          <Button
            variant={"ghost"}
            className="border-2 border-gray-500 px-4 py-2 rounded-sm"
            onClick={() => {
              const newIndex = table.getState().pagination.pageIndex + 1;
              table.setPageIndex(newIndex);
              const params = new URLSearchParams(window.location.search);
              params.set("page", (newIndex + 1).toString());
              router.replace(`?${params.toString()},{scroll: false}`);
            }}
            disabled={!table.getCanNextPage()}
          >
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
