import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type RowSelectionState,
  type VisibilityState,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown, ChevronLeft, ChevronRight, Check, AlertTriangle, Columns, RefreshCw } from 'lucide-react';
import type { Transaction, TransactionStatus } from '../types';
import { StatusBadge } from './StatusBadge';
import { Button } from '@/shared/components/Button/button';
import { Checkbox } from '@/shared/components/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/shared/components/dropdown-menu';

interface TransactionsTableProps {
  transactions: Transaction[];
  onUpdateStatus: (id: string, status: TransactionStatus) => void;
  onBulkUpdateStatus: (ids: string[], status: TransactionStatus) => void;
  onReconcile?: (transaction: Transaction) => void;
}

const columnHelper = createColumnHelper<Transaction>();

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export function TransactionsTable({
  transactions,
  onUpdateStatus,
  onBulkUpdateStatus,
  onReconcile,
}: TransactionsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ? true :
              table.getIsSomePageRowsSelected() ? 'indeterminate' : false
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        size: 40,
      }),
      columnHelper.accessor('date', {
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 font-medium"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: (info) => (
          <span className="text-sm">
            {format(new Date(info.getValue()), 'MMM d, yyyy')}
          </span>
        ),
        size: 120,
      }),
      columnHelper.accessor('reference', {
        header: 'Reference',
        cell: (info) => (
          <span className="font-mono text-sm">{info.getValue()}</span>
        ),
        size: 140,
      }),
      columnHelper.accessor('amount', {
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 font-medium"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: (info) => (
          <span className="font-medium tabular-nums">
            {formatCurrency(info.getValue(), info.row.original.currency)}
          </span>
        ),
        size: 130,
      }),
      columnHelper.accessor('currency', {
        header: 'Currency',
        cell: (info) => (
          <span className="text-sm text-muted-foreground">{info.getValue()}</span>
        ),
        size: 80,
      }),
      columnHelper.accessor('source', {
        header: 'Source',
        cell: (info) => <span className="text-sm">{info.getValue()}</span>,
        size: 140,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => <StatusBadge status={info.getValue()} />,
        size: 120,
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onReconcile && row.original.status !== 'reconciled' && (
                <DropdownMenuItem
                  onClick={() => onReconcile(row.original)}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reconcile
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onUpdateStatus(row.original.id, 'reconciled')}
              >
                <Check className="mr-2 h-4 w-4" />
                Mark Reconciled
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onUpdateStatus(row.original.id, 'inconsistent')}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Mark Inconsistent
              </DropdownMenuItem>
            </DropdownMenuContent>

          </DropdownMenu>
        ),
        size: 100,
      }),
    ],
    [onUpdateStatus, onReconcile]
  );

  const table = useReactTable({
    data: transactions,
    columns,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
  });

  const selectedRowIds = Object.keys(rowSelection)
    .filter((key) => rowSelection[key])
    .map((index) => transactions[parseInt(index)]?.id)
    .filter(Boolean);

  return (
    <div className="flex flex-col">
      {/* Toolbar with Column Visibility */}
      <div className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
        <div className="flex items-center gap-3">
          {selectedRowIds.length > 0 && (
            <>
              <span className="text-sm text-muted-foreground">
                {selectedRowIds.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onBulkUpdateStatus(selectedRowIds, 'reconciled');
                  setRowSelection({});
                }}
              >
                <Check className="mr-2 h-4 w-4" />
                Mark Reconciled
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onBulkUpdateStatus(selectedRowIds, 'inconsistent');
                  setRowSelection({});
                }}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Mark Inconsistent
              </Button>
            </>
          )}
        </div>
        
        {/* Column Visibility Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Columns className="mr-2 h-4 w-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px] bg-popover">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const columnLabels: Record<string, string> = {
                  date: 'Date',
                  reference: 'Reference',
                  amount: 'Amount',
                  currency: 'Currency',
                  source: 'Source',
                  status: 'Status',
                  actions: 'Actions',
                };
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {columnLabels[column.id] || column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-table-header sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-b border-table-border px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-card">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-table-border transition-colors hover:bg-table-row-hover"
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-border bg-card px-6 py-4">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
