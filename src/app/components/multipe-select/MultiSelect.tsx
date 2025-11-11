"use client";

import * as React from "react";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import MultiSelectedItem from "@/app/components/multipe-select/MultiSelectedItem";
import {TData} from "@/types/personalType";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useTranslations} from "next-intl";

//type TData = Record<"id" | "last_name" | "first_name" | "photo", string>;
interface MultiSelectProps {
    data: TData[];
    placeholder?: string;
    selected: TData[];
    setSelected: React.Dispatch<React.SetStateAction<TData[]>>;
    handleUnselect: (item: TData) => void;
}
export function MultiSelect({ data, placeholder, selected, setSelected, handleUnselect}: MultiSelectProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const t = useTranslations();

    /*const handleUnselect = React.useCallback((item: TData) => {
        setSelected((prev) => prev.filter((s) => s.id !== item.id));
    }, [setSelected]);*/

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;
            if (input) {
                if (e.key === "Delete" || e.key === "Backspace") {
                    if (input.value === "") {
                        setSelected((prev) => {
                            const newSelected = [...prev];
                            newSelected.pop();
                            return newSelected;
                        });
                    }
                }
                // This is not a default behaviour of the <input /> field
                if (e.key === "Escape") {
                    input.blur();
                }
            }
        },
        [setSelected],
    );

    const selectables = data.filter(
        (item) => !selected.includes(item),
    );

    return (
        <Command
            onKeyDown={handleKeyDown}
            className="overflow-visible bg-transparent"
            id="multi_select"
        >
            <div className="group rounded-sm shadow-sm border border-input text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-1">
                <div className="flex flex-wrap gap-1">
                    {selected.map((item) => (
                        <MultiSelectedItem
                            key={item.id}
                            item={item}
                            handleUnselect={handleUnselect}
                        />
                    ))}
                    {/* Avoid having the "Search" Icon */}
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder={placeholder}
                        className="text-input-dialog text-sm h-5 border-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
            </div>
            <div className="relative mt-2">
                <CommandList>
                    {open && selectables.length > 0 ? (
                        <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                            <CommandGroup className="h-52 overflow-auto">
                                {selectables.map((item) => {
                                    return (
                                        <CommandItem
                                            key={item.id}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            //onSelect={(value: string) => {
                                            onSelect={() => {
                                                setInputValue("");
                                                setSelected((prev) => [...prev, item]);
                                            }}
                                            className={"cursor-pointer"}
                                        >
                                            <div>
                                                <Avatar className="inline-block h-7 w-7 mr-2 object-cover align-middle">
                                                    <AvatarImage src={item.photo ? item.photo : ''} alt={t('Personal.PICTURE')} />
                                                    <AvatarFallback className="text-sm font-light">
                                                        {item.first_name && item.last_name ? `${item.first_name.slice(0, 1)}${item.last_name.slice(0, 1)}` : 'PH'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                {item.first_name} {item.last_name}
                                            </div>
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </div>
                    ) : null}
                </CommandList>
            </div>
        </Command>
    );
}