"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/data-table-column-header";
import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import DataTableRowActions from "@/components/data-table-row-actions";
import {TShipping} from "@/types/shippingType";

interface ShippingColumnsProps {
    buttonDetailStatus?: boolean;
    onEdit: (data: TShipping) => void;
    onDelete?: (data: TShipping) => void;
    t: (key: string) => string;
}

/*export const columns: ColumnDef<Personal>[] = [
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
        accessorKey: "avatar",
        header: "Avatar",
        cell: ({ row }) => (
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        ),
    },
    {
        accessorKey: "first_name",
        header: "Nom",
    },
    {
        accessorKey: "last_name",
        header: "Prenom",
    },
    {
        accessorKey: "phone",
        header: "Numero",
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: "job_name",
        header: "Fonction",
    },
    {
        accessorKey: "gender",
        header: "Sexe",
    },
    /!*{
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },*!/
    {
        id: "actions",
        header: () => <div className="flex items-center justify-end pr-3">Actions</div>,
        cell: ({ row }) => {
            const rowItem = row.original;
            /!*onClick={() => navigator.clipboard.writeText(payment.id)}*!/
            console.log(JSON.stringify(rowItem));
            return (
                <div className="flex items-center justify-end pr-3">
                    <Link href="#">
                        <span className="bg-icon-table ml-1">
                            <Eye size={18} className="text-gray-400" />
                        </span>
                    </Link>

                    <Link href="#" onClick={() => alert(rowItem.id)}>
                        <span className="bg-icon-table ml-1">
                            <Pencil className="text-gray-400" size={18} />
                        </span>
                    </Link>
                </div>
            )
        },
    },
];*/


export const getShippingColumns = ({ onEdit, onDelete, buttonDetailStatus=true, t}: ShippingColumnsProps): ColumnDef<TShipping>[] => {

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
            accessorKey: "last_name",
            //header: `${t('Personal.TABLE_HEADER_LAST_NAME')}`,
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t('Personal.TABLE_HEADER_LAST_NAME')} />
            ),
        },
        {
            accessorKey: "first_name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t('Personal.TABLE_HEADER_FIRST_NAME')} />
            ),
        },
        {
            accessorKey: "phone_number",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t('Personal.TABLE_HEADER_PHONE')} />
            ),
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t('Personal.TABLE_HEADER_EMAIL')} />
            ),
        },
        {
            accessorKey: "position_title",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t('Personal.POSITION_LABEL')} />
            ),
        },
        {
            accessorKey: "gender",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t('Personal.GENDER_LABEL')} />
            ),
            cell: ({ row }) => (
                <span className="capitalize">{row.original.gender}</span>
            ),
        },
        {
            id: "actions",
            header: () => <span className="flex items-center justify-end pr-3 text-sm">{t('Table.HEADER_ACTIONS')}</span>,
            cell: ({ row }) => {
                const rowItem = row.original;
                const itemId = rowItem && (rowItem as any).id;
                const targetLink = `/personal/list/details/${itemId}`;
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