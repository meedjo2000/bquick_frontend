"use client";

import {getShippingColumns} from "./columns"

import BreadcrumbComponent from "@/app/(AppLayout)/layout/shared/BreadcrumbComponent";
import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
import DialogBox from "@/app/components/dialog/DialogBox";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {dropZoneFilePreview} from "@/lib/utils";
import {format} from "date-fns";
import _ from "lodash";
import {AxiosError, AxiosResponse} from "axios";
import {toast} from "sonner";
import AlertDialogBox from "@/app/components/alert/AlertDialogBox";
import {useTranslations} from 'next-intl';
import {axiosErrorHelper} from "@/utils/errors/errors";
import {DataTable} from "@/app/components/table/data-table";
import {TShipping} from "@/types/shippingType";
import ShippingService from "@/services/ShippingService";


export default function ShippingList() {
    const [open, setOpen] = React.useState(false);
    const [openPopover, setOpenPopover] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [shippingData, setShippingData] = useState<any[]>([]);
    const [file, setFile] = useState<File| null>(null);
    const [fileDataURL, setFileDataURL] = useState<string|null>(null);
    const [rowSelection, setRowSelection] = React.useState({});
    const t = useTranslations();

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(2, t('Validation.TOO_SHORT'))
            .required(t('Validation.REQUIRED')),
    });

    const formik = useFormik({
        initialValues: {
            id: 0,
            title: '',
            type: 'add'
        },
        validationSchema: validationSchema,
        onSubmit: async (data: TShipping) => {
            try {
                const formData = new FormData();
                _.forEach(data, function(value, key) {
                    if(key !== 'type') {
                        if(typeof value === 'string'){
                            formData.append(key, value);
                        }
                    }
                });
                if(date !== undefined) {
                    formData.append("birth_date", format(date, 'yyyy-MM-dd HH:mm:ss.SSS'));
                }

                if (file) {
                    formData.append("photo", file);
                }

                if(data.type === "add") {
                    const response = await ShippingService.createShipping("/shipping/add", formData);
                    if(response.data.status === 'success') {
                        const newShipping = getShippingFormattedList(response, setOpen, data.type);
                        setShippingData((prevData) => [newShipping, ...prevData]);
                    }
                }
                else if(data.type === "edit") {
                    const response = await ShippingService.updateShipping(`/shipping/edit/${data.id}`, formData);
                    if(response.data.status === 'success') {
                        const updateShipping = getShippingFormattedList(response, setOpenEdit, data.type);
                        setShippingData((prevData) => {
                            const index = prevData.findIndex(shipping => shipping.id === updateShipping.id);
                            if(index !== -1) {
                                const newData = [...prevData];
                                newData[index] = updateShipping;
                                return newData;
                            }
                            return prevData;
                        });
                    }
                }
            }
            catch (error: unknown) {
                axiosErrorHelper(error, t);
            }
        },
    });

    const getShippingFormattedList = (response: AxiosResponse, setOpenModal: (open: boolean) => void, type: string) => {
        setOpenModal(false);
        toast.success(t('INFORMATION.SUCCESS_TITLE'), {
            description: t(type === 'add' ? 'Shipping.SHIPPING_ADD_SUCCESS' : 'Shipping.SHIPPING_UPDATE_SUCCESS'),
        });
        const data = response.data.data;
        //const positionFound = positionsData.find(position => position.id === parseInt(data.position_id));
        /*const employeeToFormat = {
            ...data,
            position_title: positionFound?.title
        }*/
        //return PersonalService.formatEmployeeForList(employeeToFormat);
        return response.data.data;
    }

    const [openEdit, setOpenEdit] = React.useState(false);
    const onDelete = useCallback((personal: TShipping) => {
        console.log(personal);
    }, []);
    const onEdit = useCallback((article: TShipping) => {
        setOpenEdit(true);
        setFileDataURL(null);
        formik.setFieldValue('id', article.id);
        formik.setFieldValue('type', 'edit');
        formik.setFieldValue('title', article.title);
    }, [formik]);

    const columnsData = useMemo(() => getShippingColumns({onEdit, onDelete, t}), [onDelete, onEdit, t]);

    const handleAddButton = () => {
        formik.resetForm();
        setFile(null);
        setFileDataURL(null);
        setDate(undefined);
        setOpen(open => !open);
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setFile(file);
        }
    }

    const handleDeleteButton = async () => {
        const selectedRowIds = Object.keys(rowSelection);
        if (selectedRowIds.length > 0) {
            setOpenAlert(true);
        }
        else {
            toast.error(t('Errors.ERROR_TITLE'), {
                description: t('Personal.NO_ITEM_DELETE'),
            });
        }
    }

    const closeAlert = () => {
        setOpenAlert(false);
    }

    const deleteShippingByConfirmAction = async () => {
        try {
            const selectedRowIds = Object.keys(rowSelection); //EmployeeIds to delete
            const shippingIdsToDelete = shippingData.filter((item, index) => selectedRowIds.includes(index.toString())).map(item => item);
            const formData = new FormData();
            shippingIdsToDelete.map(shipping => {
                formData.append('shippingIds[]', shipping.id.toString());
            })

            //Call API to delete employees
            const response = await ShippingService.deleteShipping("/shipping/bulk-delete", formData);
            if(response.data.status === 'success') {
                const shippingFiltered = shippingData.filter((item, index) => !selectedRowIds.includes(index.toString()));
                setShippingData(shippingFiltered);
                setRowSelection({});
                toast.success(t('INFORMATION.SUCCESS_TITLE'), {
                    description: t('Personal.EMPLOYEE_DELETE_SUCCESS'),
                });
            }
        }
        catch (error: unknown) {
            if(error instanceof AxiosError) {
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
                    console.log(JSON.stringify(error));
                }
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await ShippingService.getShipping("/shipping/list");
            setShippingData(response?.data ?? []);
        }
        fetchData().catch(error => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        dropZoneFilePreview(file, setFileDataURL);
    }, [file]);

    return (
        <>
            <BreadcrumbComponent
                title={t('Shipping.PAGE_TITLE')}
                icon="solar:home-2-linear"
                iconLink="/"
                crumbTitle={t('Shipping.BREADCRUMB_TITLE')}
            />
            <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
                <DataTable
                    columns={columnsData}
                    data={shippingData}
                    handleAddButton={handleAddButton}
                    handleDeleteButton={handleDeleteButton}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                />
            </div>
            <DialogBox
                title={t('Shipping.SHIPPING_ADD_MODAL_TITLE')}
                open={open} setOpen={setOpen}
                onSubmit={formik.handleSubmit}
            >
                {/*<PersonalForm
                    formik={formik}
                    open={openPopover}
                    setOpen={setOpenPopover}
                    data={positionsData}
                    fileDataURL={fileDataURL}
                    handleFileChange={handleFileChange}
                    date={date}
                    setDate={setDate}
                />*/}
            </DialogBox>

            <DialogBox
                title={t('Shipping.SHIPPING_EDIT_MODAL_TITLE')}
                open={openEdit}
                setOpen={setOpenEdit}
                onSubmit={formik.handleSubmit}
            >
               {/* <PersonalForm
                    formik={formik}
                    open={openPopover}
                    setOpen={setOpenPopover}
                    data={positionsData}
                    fileDataURL={fileDataURL}
                    handleFileChange={handleFileChange}
                    date={date}
                    setDate={setDate}
                />*/}
            </DialogBox>
            <AlertDialogBox
                isOpen={openAlert}
                onClose={closeAlert}
                title={t('Common.CONFIRMATION')}
                actionText={t('Common.CONFIRM')}
                description={t('Personal.EMPLOYEE_DELETE_CONFIRM')}
                onAction={deleteShippingByConfirmAction}
            />
        </>
    )
}