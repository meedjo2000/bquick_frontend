import {Badge} from "@/components/ui/badge";
import {X} from "lucide-react";
import * as React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useTranslations} from "next-intl";

function MultiSelectedItem({ item, handleUnselect }: any) {
    const t = useTranslations();
    return (
        <Badge variant="secondary">
            <div>
                <Avatar className="inline-block h-7 w-7 mr-2 object-cover align-middle">
                    <AvatarImage src={item.photo ? item.photo : ''} alt={t('Personal.PICTURE')} />
                    <AvatarFallback className="text-sm font-light">
                        {item.first_name && item.last_name ? `${item.first_name.slice(0, 1)}${item.last_name.slice(0, 1)}` : 'PH'}
                    </AvatarFallback>
                </Avatar>
            </div>
            {item.first_name} {item.last_name}
            <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-1 focus:ring-ring focus:ring-offset-1 h-8"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleUnselect(item);
                    }
                }}
                onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                onClick={() => handleUnselect(item)}
            >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
        </Badge>
    );
}

export default MultiSelectedItem;