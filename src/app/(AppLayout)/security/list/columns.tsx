"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/data-table-column-header";
import React from "react";
import DataTableRowActions from "@/components/data-table-row-actions";
import {TForgetThing} from "@/types/forgetThing";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


interface SecurityColumnsProps {
    buttonDetailStatus?: boolean;
    onEdit: (data: TForgetThing) => void;
    onDelete?: (data: TForgetThing) => void;
    t: (key: string) => string;
}


export const getUsersColumns = ({ onEdit, onDelete, buttonDetailStatus, t}: SecurityColumnsProps): ColumnDef<TForgetThing>[] => {
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
                    aria-label={t('Table.SELECT_ALL_ROWS')}
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label={t('Table.SELECT_ROW')}
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t('Thing.TABLE_HEADER_THING_LABEL')} />
            ),
        },
        {
            accessorKey: "thing_type_title",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t('Thing.TABLE_HEADER_THING_TYPE')} />
            ),
        },
        {
            accessorKey: "owner_first_last_name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t('Thing.TABLE_VISITOR_FIRST_LAST_NAME')} />
            ),
        },
        {
            accessorKey: "phone_number",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t('Thing.TABLE_HEADER_PHONE_NUMBER')} />
            ),
        },
        {
            accessorKey: "forget_date",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t('Thing.TABLE_THING_REGISTER_DATE')} />
            ),
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t('Thing.TABLE_THING_STATUS')} />
            ),
            cell: ({ row }) => {
                return (
                    <div>
                        {row.original.status ? (
                            <span className="inline-flex items-center rounded-full bg-green-200 px-2.5 py-2 text-xs font-medium text-green-800">
                                {t('Thing.STATUS_RETURNED')}
                            </span>
                        ) : (
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-2 text-xs font-medium text-yellow-800">
                                {t('Thing.STATUS_NOT_RETURNED')}
                            </span>
                        )}
                    </div>
                )
            },
        },
        {
            accessorKey: "editor",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t('Common.TABLE_HEADER_EDITOR')} />
            ),
        },
        {
            id: "actions",
            header: () => <div className="flex items-center justify-end pr-3">Actions</div>,
            cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} buttonDetailStatus={buttonDetailStatus} />,
        },
    ];
}