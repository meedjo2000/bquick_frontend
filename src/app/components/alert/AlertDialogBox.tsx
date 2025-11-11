import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {useTranslations} from 'next-intl';

function AlertDialogBox({isOpen, onClose, title, description, actionText, onAction}: {
    isOpen: boolean,
    onClose: () => void,
    title: string,
    description: string,
    actionText: string,
    onAction: () => void
}) {
    const t = useTranslations();

    return (
        <>
            <AlertDialog open={isOpen} onOpenChange={onClose}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={onClose}>{t('Common.CANCEL')}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {onAction(); onClose();}}>{actionText}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default AlertDialogBox;