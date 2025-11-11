import { Row } from "@tanstack/react-table";
import Link from "next/link";
import {Eye, Pencil} from "lucide-react";
import React from "react";
import {useTranslations} from "next-intl";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
    buttonDetailStatus?: boolean;
    onEdit: (value: TData) => void;
    onDelete?: (value: TData) => void;
    targetLink?: string;
}

const DataTableRowActions = <TData,>({row, onEdit, buttonDetailStatus, targetLink} : DataTableRowActionsProps<TData>) => {
    const rowItem = row.original;
    const t = useTranslations();
    return (
        <div className="flex items-center justify-end pr-3">
            {buttonDetailStatus && (
                <Link href={targetLink ? targetLink : '#'} title={t('Table.ROW_ACTION_VIEW')}>
                    <span className="bg-icon-table ml-1">
                        <Eye size={18} className="text-gray-400" />
                    </span>
                </Link>
            )}

            <Link href="#" onClick={() => onEdit(rowItem)} title={t('Table.ROW_ACTION_EDIT')}>
                <span className="bg-icon-table ml-1">
                    <Pencil className="text-gray-400" size={18} />
                </span>
            </Link>
        </div>
    )
}

export default DataTableRowActions;