import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent, DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import {useTranslations} from "next-intl";

function DialogBox({
                              open=true,
                              setOpen, title="",
                              children,
                              onSubmit
} : {
    open: boolean,
    setOpen: (a: boolean) => void,
    title: string,
    onSubmit?: (data: any) => void,
    children:React.ReactNode
}) {
    const t = useTranslations();
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form autoComplete="off">
                <DialogContent className="sm:max-w-[425px] md:max-w-[750px]">
                    <DialogHeader>
                        <DialogTitle className="text-center">{title}</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    { children }
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" onClick={() => setOpen(false)}>{t('Common.CANCEL')}</Button>
                        </DialogClose>
                        <Button type="button" onClick={onSubmit}>{t('Common.SAVE')}</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default DialogBox;