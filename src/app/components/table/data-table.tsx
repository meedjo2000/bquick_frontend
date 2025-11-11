"use client";

import React from "react";
import {
    ColumnDef,
    SortingState,
    VisibilityState,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {DataTablePagination} from "@/components/data-table-pagination";
import {DataTableViewOptions} from "@/components/data-table-view-options";
import {cn} from "@/lib/utils";
import { Rows2, Rows3, Rows4, Search, SearchX } from "lucide-react";
import {Button} from "@/components/ui/button";
import DataTableHeaderActions from "@/app/components/DataTableHeaderActions";
import {useTranslations} from "next-intl";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    rowSelection: Record<string, boolean>;
    setRowSelection: any;
    handleAddButton?: () => void;
    handleDeleteButton?: () => void;
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             rowSelection,
                                             setRowSelection,
                                             handleAddButton,
                                             handleDeleteButton
                                         } : DataTableProps<TData, TValue>) {
    const [density, setDensity] = React.useState<string>('flexible');
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [globalFilter, setGlobalFilter] =  React.useState([]);
    const [globalFilterInput, setGlobalFilterInput] =  React.useState<boolean>(false);
    const t = useTranslations();

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            globalFilter,
            columnVisibility,
            rowSelection,
        },
    });

    const handleGlobalFilterInput = () => {
        setGlobalFilterInput(!globalFilterInput);
    }

    const handleTableDensity = () => {
        if(density === 'flexible') setDensity('compact');
        else if(density === 'compact') setDensity('standard');
        else setDensity('flexible');
    }

    return (
        <div>
            <div className="flex py-4">
                <div className="flex-1 inline-flex">
                    <DataTableHeaderActions handleAddButton={handleAddButton} handleDeleteButton={handleDeleteButton} />
                </div>
                <div className="flex-row w-max inline-flex items-center justify-end">
                    {globalFilterInput && (
                        <div className="ml-3">
                            <Input
                                placeholder={t('Table.SEARCH_PLACEHOLDER')}
                                value={globalFilter ?? ''}
                                onChange={(e) => table.setGlobalFilter(String(e.target.value))}
                                className="max-w-sm"
                            />
                        </div>
                    )}
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-3 hidden h-9 lg:flex"
                        title={t('Common.SEARCH')}
                        onClick={() => handleGlobalFilterInput()}
                    >
                        {globalFilterInput ? <SearchX /> : <Search />}
                    </Button>
                    <DataTableViewOptions table={table}/>
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-3 hidden h-9 lg:flex"
                        title={t('Table.DENSITY_TOOLTIP_TEXT')}
                        onClick={handleTableDensity}
                    >
                        {density === 'flexible' && <Rows2 />}
                        {density === 'compact' && <Rows4 />}
                        {density === 'standard' && <Rows3 />}
                    </Button>
                </div>
            </div>
            <div className="rounded-md grid w-full [&>div]:max-h-[400px] [&>div]:border [&>div]:rounded">
                <Table
                    className={cn({
                        "[&_td]:py-px [&_th]:py-px": density === "compact",
                        "[&_td]:py-1 [&_th]:py-1": density === "standard",
                        "[&_td]:py-2 [&_th]:py-1": density === "flexible",
                    })}
                >
                    <TableHeader className="py-4">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="[&>*]:whitespace-nowrap sticky top-0 bg-background after:content-[''] after:inset-x-0 after:h-px after:bg-border after:absolute after:bottom-0 z-40"
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="overflow-hidden">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="odd:bg-muted/50"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {t('Table.NO_RECORDS_FOUND')}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="py-4">
                <DataTablePagination table={table} />
            </div>
        </div>
    )
}