"use client";

import {getPersonalColumns} from "./columns"

import BreadcrumbComponent from "@/app/(AppLayout)/layout/shared/BreadcrumbComponent";
import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
import DialogBox from "@/app/components/dialog/DialogBox";
import PersonalService from "@/services/PersonalService";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {dropZoneFilePreview} from "@/lib/utils";
import PersonalForm from "@/app/(AppLayout)/personal/forms/PersonalForm";
import {TPersonal, TPersonalFormatted, TPersonalFormData} from "@/types/personalType";
import {format} from "date-fns";
import _ from "lodash";
import {AxiosError, AxiosResponse} from "axios";
import {toast} from "sonner";
import {TPosition} from "@/types/positionType";
import AlertDialogBox from "@/app/components/alert/AlertDialogBox";
import {useTranslations} from 'next-intl';
import {axiosErrorHelper} from "@/utils/errors/errors";
import {DataTable} from "@/app/components/table/data-table";


export default function PersonalList() {
    const [open, setOpen] = React.useState(false);
    const [openPopover, setOpenPopover] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [employeeData, setEmployeeData] = useState<TPersonalFormatted[]>([]);
    const [positionsData, setPositionsData] = useState<TPosition[]>([]);
    const [file, setFile] = useState<File| null>(null);
    const [fileDataURL, setFileDataURL] = useState<string|null>(null);
    const [rowSelection, setRowSelection] = React.useState({});
    const t = useTranslations();

    const validationSchema = Yup.object().shape({
        last_name: Yup.string()
            .min(2, t('Validation.TOO_SHORT'))
            .required(t('Validation.REQUIRED')),
        first_name: Yup.string()
            .min(2, t('Validation.TOO_SHORT'))
            .required(t('Validation.REQUIRED')),
        email: Yup.string()
            .email(t('Validation.INVALID_EMAIL'))
            .required(t('Validation.REQUIRED')),
        gender: Yup.string().required(t('Validation.REQUIRED')),
        position_id: Yup.string().required(t('Validation.REQUIRED')),
    });

    const formik = useFormik({
        initialValues: {
            id: 0,
            last_name: '',
            first_name: '',
            gender: '',
            email: '',
            phone_number: '',
            position_id: '',
            type: 'add'
        },
        validationSchema: validationSchema,
        onSubmit: async (data: TPersonalFormData) => {
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
                    const response = await PersonalService.createEmployee("/employees/add", formData);
                    if(response.data.status === 'success') {
                        const newEmployee = getEmployeeFormattedList(response, setOpen, data.type);
                        setEmployeeData((prevData) => [newEmployee, ...prevData]);
                    }
                }
                else if(data.type === "edit") {
                    const response = await PersonalService.updateEmployee(`/employees/edit/${data.id}`, formData);
                    if(response.data.status === 'success') {
                        const updateEmployee = getEmployeeFormattedList(response, setOpenEdit, data.type);
                        setEmployeeData((prevData) => {
                            const index = prevData.findIndex(emp => emp.id === updateEmployee.id);
                            if(index !== -1) {
                                const newData = [...prevData];
                                newData[index] = updateEmployee;
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

    const getEmployeeFormattedList = (response: AxiosResponse, setOpenModal: (open: boolean) => void, type: string) => {
        setOpenModal(false);
        toast.success(t('INFORMATION.SUCCESS_TITLE'), {
            description: t(type === 'add' ? 'Personal.EMPLOYEE_ADD_SUCCESS' : 'Personal.EMPLOYEE_UPDATE_SUCCESS'),
        });
        const data = response.data.data;
        const positionFound = positionsData.find(position => position.id === parseInt(data.position_id));
        const employeeToFormat = {
            ...data,
            position_title: positionFound?.title
        }
        return PersonalService.formatEmployeeForList(employeeToFormat);
    }

    const [openEdit, setOpenEdit] = React.useState(false);
    const onDelete = useCallback((personal: TPersonal) => {
        console.log(personal);
    }, []);
    const onEdit = useCallback((personal: TPersonal) => {
        setOpenEdit(true);
        setFileDataURL(null);
        if(personal.photo !== null) {
            setFileDataURL(personal.photo);
        }
        formik.setFieldValue('id', personal.id);
        formik.setFieldValue('type', 'edit');
        formik.setFieldValue('last_name', personal.last_name);
        formik.setFieldValue('first_name', personal.first_name);
        formik.setFieldValue('email', personal.email);
        formik.setFieldValue('phone_number', personal.phone_number ? personal.phone_number : '');
        formik.setFieldValue('gender', personal.gender);
        setDate(personal.birth_date ? new Date(personal.birth_date) : undefined);
        formik.setFieldValue('position_id', personal.position_id ? personal.position_id : '');

    }, [formik]);

    const columnsData = useMemo(() => getPersonalColumns({onEdit, onDelete, t}), [onDelete, onEdit, t]);

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

    const deleteEmployeesByConfirmAction = async () => {
        try {
            const selectedRowIds = Object.keys(rowSelection); //EmployeeIds to delete
            const employeeIdsToDelete = employeeData.filter((item, index) => selectedRowIds.includes(index.toString())).map(item => item);
            const formData = new FormData();
            employeeIdsToDelete.map(employee => {
                formData.append('employeeIds[]', employee.id.toString());
                formData.append('employeePhotos[]', employee.photo_original);
            })

            //Call API to delete employees
            const response = await PersonalService.deleteEmployees("/employees/bulk-delete", formData);
            if(response.data.status === 'success') {
                const employeeFiltered = employeeData.filter((item, index) => !selectedRowIds.includes(index.toString()));
                setEmployeeData(employeeFiltered);
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
            const response = await PersonalService.getEmployees("/employees/list");
            setEmployeeData(response?.data ?? []);
            const positions = await PersonalService.getPositions("/positions/list");
            setPositionsData(positions?.data ?? []);
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
                title={t('Personal.PAGE_TITLE')}
                icon="solar:home-2-linear"
                iconLink="/"
                crumbTitle={t('Personal.BREADCRUMB_TITLE')}
            />
            <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
                <DataTable
                    columns={columnsData}
                    data={employeeData}
                    handleAddButton={handleAddButton}
                    handleDeleteButton={handleDeleteButton}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                />
            </div>
            <DialogBox
                title={t('Personal.EMPLOYEE_ADD_MODAL_TITLE')}
                open={open} setOpen={setOpen}
                onSubmit={formik.handleSubmit}
            >
                <PersonalForm
                    formik={formik}
                    open={openPopover}
                    setOpen={setOpenPopover}
                    data={positionsData}
                    fileDataURL={fileDataURL}
                    handleFileChange={handleFileChange}
                    date={date}
                    setDate={setDate}
                />
            </DialogBox>

            <DialogBox
                title={t('Personal.EMPLOYEE_EDIT_MODAL_TITLE')}
                open={openEdit}
                setOpen={setOpenEdit}
                onSubmit={formik.handleSubmit}
            >
                <PersonalForm
                    formik={formik}
                    open={openPopover}
                    setOpen={setOpenPopover}
                    data={positionsData}
                    fileDataURL={fileDataURL}
                    handleFileChange={handleFileChange}
                    date={date}
                    setDate={setDate}
                />
            </DialogBox>
            <AlertDialogBox
                isOpen={openAlert}
                onClose={closeAlert}
                title={t('Common.CONFIRMATION')}
                actionText={t('Common.CONFIRM')}
                description={t('Personal.EMPLOYEE_DELETE_CONFIRM')}
                onAction={deleteEmployeesByConfirmAction}
            />
        </>
    )
}