"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Barcode } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import React from "react";
import {useTranslations} from "next-intl";
import {TABLE_HEADERS_FR} from "../../messages/table/tableHeaders";

export function DataTableViewOptions<TData>({ table, }: { table: Table<TData> }) {
    const t = useTranslations();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="ml-3 hidden h-9 lg:flex"
                    aria-label={t('Table.SHOW_HIDE_COLUMNS_TOOLTIP_TEXT')}
                    title={t('Table.SHOW_HIDE_COLUMNS_TOOLTIP_TEXT')}
                >
                    <Barcode />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[150px]">
                <DropdownMenuLabel>{t('Table.SHOW_HIDE_COLUMNS_TITLE')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                    .getAllColumns()
                    .filter(
                        (column) =>
                            typeof column.accessorFn !== "undefined" && column.getCanHide()
                    )
                    .map((column) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(value)}
                            >
                                {TABLE_HEADERS_FR.map(header => header.accessorKey === column.id ? header.value : null)}
                            </DropdownMenuCheckboxItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
