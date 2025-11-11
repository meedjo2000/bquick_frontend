import {AxiosError} from "axios";
import {toast} from "sonner";

export const axiosErrorHelper = (error: any, t: any) => {
    if(error instanceof AxiosError) {
        //setOpen(false);
        if(error?.response?.data){
            const errorData = error.response.data;
            toast.error(t('Errors.ERROR_TITLE'), {
                description: errorData.message,
            });
        }
        else {
            toast.error(t('Errors.ERROR_TITLE'), {
                description: t('Errors.BAD_REQUEST'),
            });
        }
        console.log(JSON.stringify(error?.response?.data) ?? 'Error' );
    }
}