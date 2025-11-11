import React from 'react';
import {Plus, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";

interface DataTableHeaderFormProps {
    handleAddButton?: () => void;
    //handleEditButton?: () => void;
    handleDeleteButton?: () => void;
}
const DataTableHeaderActions = ({ handleAddButton, handleDeleteButton }: DataTableHeaderFormProps) => {
    return (
        <>
            <Button
                variant="outline"
                size="lg"
                className="mr-3 h-9 lg:flex bg-primary text-white hover:bg-primaryemphasis hover:text-white rounded-lg border-0"
                title="Ajouter"
                onClick={handleAddButton}
            >
                <Plus />
                Ajouter
            </Button>

            <Button
                variant="outline"
                size="lg"
                className="mr-3 h-9 lg:flex bg-red-600 text-white hover:bg-red-700 hover:text-white rounded-lg border-0"
                title="Supprimer"
                onClick={handleDeleteButton}
            >
                <Trash2 />
                Supprimer
            </Button>
        </>
    );
};

export default DataTableHeaderActions;