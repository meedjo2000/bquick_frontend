"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/data-table-column-header";
import React from "react";
import DataTableRowActions from "@/components/data-table-row-actions";
import {TPosition} from "@/types/positionType";

interface PositionsColumnsProps {
    buttonDetailStatus?: boolean;
    onEdit: (data: TPosition) => void;
    onDelete?: (data: TPosition) => void;
    t: (key: string) => string;
}


export const getPositionsColumns = ({ onEdit, onDelete, buttonDetailStatus, t}: PositionsColumnsProps): ColumnDef<TPosition>[] => {
    return [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
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
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "position_title",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t('Position.TITLE')} />
            ),
        },
        {
            id: "actions",
            header: () => <div className="flex items-center justify-end pr-3">Actions</div>,
            cell: ({ row }) => {
                const rowItem = row.original;
                const targetLink = `#`;
                return (
                    <DataTableRowActions
                        row={row} onEdit={onEdit}
                        onDelete={onDelete}
                        buttonDetailStatus={buttonDetailStatus}
                        targetLink={targetLink}
                    />
                )
            },
        },
    ];
}