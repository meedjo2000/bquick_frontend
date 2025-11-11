"use client";

import React, {useCallback, useEffect, useMemo, useState} from "react";
import BreadcrumbComponent from "@/app/(AppLayout)/layout/shared/BreadcrumbComponent";
import DialogBox from "@/app/components/dialog/DialogBox";
import {useTranslations} from "next-intl";
import {useFormik} from "formik";
import * as Yup from "yup";
import {DataTable} from "@/app/components/table/data-table";
import AlertDialogBox from "@/app/components/alert/AlertDialogBox";
import {axiosErrorHelper} from "@/utils/errors/errors";
import {AxiosError} from "axios";
import {toast} from "sonner";
import _ from "lodash";
import PersonalService from "@/services/PersonalService";
import {getPositionsColumns} from "@/app/(AppLayout)/config/position/list/columns";
import {TPosition} from "@/types/positionType";
import PositionForm from "@/app/(AppLayout)/config/position/form/PositionForm";

export default function PositionList() {
    const [open, setOpen] = useState(false);
    const [positionsData, setPositionsData] = useState<any[]>([]);
    const [openEditModal, setOpenEditModal] = useState(false);
    const onDelete = useCallback((position: TPosition) => alert(`On delete pressed with personal ${position.id}`), []);
    const [rowSelection, setRowSelection] = React.useState({});
    const [openAlert, setOpenAlert] = React.useState(false);
    const t = useTranslations();

    const positionValidationSchema = Yup.object().shape({
        position_title: Yup.string()
            .min(2, t('Validation.TOO_SHORT'))
            .required(t('Validation.REQUIRED')),
    });

    const formik = useFormik({
        initialValues: {
            id: 0,
            position_title: '',
            type: 'add',
        },
        validationSchema: positionValidationSchema,
        onSubmit: async (data) => {
            try {
                const formData = new FormData();
                _.forEach(data, function(value, key: any) {
                    if(key !== 'type') {
                        if(typeof value === 'string'){
                            formData.append(key, value);
                        }
                    }
                });

                if (data.type === "add") {
                    const response = await PersonalService.createPosition('/positions/add', formData);
                    if(response.data.status === 'success') {
                        setOpen(false);
                        toast.success(t('INFORMATION.SUCCESS_TITLE'), {
                            description: t('Position.POSITION_ADD_SUCCESS'),
                        });
                        const position = [{
                                ...response.data.data,
                        }];
                        const formattedPositions = PersonalService.reformatPositions(position ?? []);

                        setPositionsData((prevData) => [...formattedPositions, ...prevData]);
                    }
                }
                else if(data.type === "edit") {
                    const response = await PersonalService.updatePosition(`/positions/edit/${data.id}`, formData);
                    if(response.data.status === 'success') {
                        setOpenEditModal(false);
                        toast.success(t('INFORMATION.SUCCESS_TITLE'), {
                            description: t('Position.POSITION_UPDATE_SUCCESS'),
                        });
                        const updatedPosition = {
                            ...response.data.data,
                            'position_title': response.data.data.title,
                        };

                        setPositionsData((prevData) => {
                            const index = prevData.findIndex(item => item.id === updatedPosition.id);
                            if(index !== -1) {
                                const newData = [...prevData];
                                newData[index] = updatedPosition;
                                return newData;
                            }
                            return prevData;
                        });
                    }
                }
            }
            catch (error) {
                axiosErrorHelper(error, t);
            }
        },
    });

    const handleDeleteButton = () => {
        const selectedRowIds = Object.keys(rowSelection);
        if (selectedRowIds.length > 0) {
            setOpenAlert(true);
        }
        else {
            toast.error(t('Errors.ERROR_TITLE'), {
                description: t('Position.NO_ITEM_DELETE'),
            });
        }
    }

    const handleAddButton = () => {
        formik.resetForm();
        setOpen(true);
    }

    const closeAlert = () => {
        setOpenAlert(false);
    }

    const deletePositionByConfirmAction = async () => {
        try {
            const selectedRowIds = Object.keys(rowSelection);
            const PositionsIdsToDelete = positionsData.filter((item, index) => selectedRowIds.includes(index.toString())).map(item => item);
            const formData = new FormData();
            PositionsIdsToDelete.map(thingType => {
                formData.append('positionsIds[]', thingType.id.toString());
            })

            //Call API to delete selected visits
            const response = await PersonalService.deletePositions('/positions/bulk-delete', formData);
            if(response.data.status === 'success') {
                const PositionsFiltered = positionsData.filter((item, index) => !selectedRowIds.includes(index.toString()));
                setPositionsData(PositionsFiltered);
                setRowSelection({});
                setOpenAlert(false);
                toast.success(t('INFORMATION.SUCCESS_TITLE'), {
                    description: t('Position.POSITION_DELETE_SUCCESS'),
                });
            }
        }
        catch (error) {
            axiosErrorHelper(error, t);
        }
    }

    const onEditContent = useCallback((position: any) => {
        formik.resetForm();
        formik.setFieldValue('id', position.id);
        formik.setFieldValue('position_title', position.position_title);
        formik.setFieldValue('type', 'edit');
    }, [formik]);

    const onEdit = useCallback((position) => {
        onEditContent(position);
        setOpenEditModal(true);
    }, []);

    const columnsData = useMemo(() => getPositionsColumns({onEdit, onDelete, buttonDetailStatus:false, t }), [onDelete, onEdit, t]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await PersonalService.getPositions("/positions/list");
            const formattedPositions = PersonalService.reformatPositions(response.data ?? []);
            setPositionsData(formattedPositions);
        }

        fetchData().catch(error => {
            if(error instanceof AxiosError) {
                if(error.code === 'ERR_NETWORK') {
                    toast.error(t('Errors.ERROR_TITLE'), {
                        description: t('Errors.NETWORK_ERROR'),
                    });
                } else {
                    console.log(`Axios error: ${error.message}`);
                }
            }
        })
    }, [t]);

    return (
        <>
            <BreadcrumbComponent
                title={t('Position.PAGE_TITLE')}
                icon="solar:home-2-linear"
                iconLink="/"
                crumbTitle={t('Position.CONFIGURATION_TITLE')}
            />
            <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
                <DataTable
                    columns={columnsData}
                    data={positionsData}
                    handleAddButton={handleAddButton}
                    handleDeleteButton={handleDeleteButton}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                />
                <DialogBox
                    title={t('Position.POSITION_ADD')}
                    open={open}
                    setOpen={setOpen}
                    onSubmit={formik.handleSubmit}
                >
                    <PositionForm
                        formik={formik}
                    />
                </DialogBox>
                <DialogBox
                    title={t('Position.POSITION_EDIT')}
                    open={openEditModal}
                    setOpen={setOpenEditModal}
                    onSubmit={formik.handleSubmit}
                >
                    <PositionForm
                        formik={formik}
                    />
                </DialogBox>
                <AlertDialogBox
                    isOpen={openAlert}
                    onClose={closeAlert}
                    title={t('Common.CONFIRMATION')}
                    actionText={t('Common.CONFIRM')}
                    description={t('Position.POSITION_DELETE_CONFIRM')}
                    onAction={deletePositionByConfirmAction}
                />
            </div>
        </>
    )
}