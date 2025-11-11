"use client";

import React, {use, useEffect} from "react";
import BreadcrumbComponent from "@/app/(AppLayout)/layout/shared/BreadcrumbComponent";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {Icon} from "@iconify/react";
import Link from "next/link";
import PersonalService from "@/services/PersonalService";
import {TPersonal} from "@/types/personalType";
import {useTranslations} from "next-intl";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale'
import {toast} from "sonner";

const PersonalDetails = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const [personal, setPersonal] = React.useState<TPersonal|null>(null);
    const t = useTranslations();
    //const dateFormatee = format(maDate, 'dd MMMM yyyy', { locale: fr });

    useEffect(() => {
        const fetchPersonalDetails = async () => {
            const response = await PersonalService.getAnEmployee(`/employees/list/${id}`);
            const data = response.data;
            setPersonal(data);
        }
        fetchPersonalDetails().catch((error: unknown) => {
            if(error instanceof Error) {
                if (error.message === 'Network Error') {
                    toast.error(t('Errors.ERROR_TITLE'), {
                        description: `${t('Errors.ERROR_MESSAGE_NETWORK')}`,
                    });
                }
                else {
                    toast.error(t('Errors.ERROR_TITLE'), {
                        description: `${error.message}`,
                    });
                    console.error(error.message);
                }
            }
        });
    }, [id]);

    return (
        <>
            <BreadcrumbComponent
                title={"Employé"}
                icon="solar:users-group-two-rounded-linear"
                iconLink="/personal/list"
                crumbTitle={"Informations sur l'employé"}
            />
            <div className="my-6">
                <div className="pb-6 pl-1 flex">
                    <Link href="/personal/list" className="flex gap-2">
                        <Icon icon="solar:arrow-left-linear" height={20}/>
                        {t('Personal.EMPLOYEE_LIST')}
                    </Link>
                </div>
                <Card className="shadow-sm border-0">
                    <CardContent className="pt-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={`${personal?.photo}`} alt={t('Personal.PICTURE')} />
                                <AvatarFallback>
                                    {personal?.first_name && personal?.last_name ? `${personal?.first_name.slice(0, 1)}${personal?.last_name.slice(0, 1)}` : 'PH'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="py-4">
                                <h5 className="text-lg sm:mb-1">{personal?.first_name} {personal?.last_name}</h5>
                                <div className="flex gap-14">
                                    <div className="flex text-sm text-ld gap-2">
                                        <Icon icon="solar:bag-4-linear" height={18}/>
                                        <span>{personal?.position_title}</span>
                                    </div>
                                    {personal?.birth_date && (
                                        <div className="flex text-sm text-ld gap-2">
                                            <Icon icon="solar:calendar-mark-linear" height={18}/>
                                            <span>{personal?.birth_date && format(personal?.birth_date, 'dd MMMM yyyy', { locale: fr })}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="md:flex my-6">
                <div className="flex-1 md:pr-3">
                    <Card className="py-3 shadow-sm border-0">
                        <CardContent>
                            <div>
                                <h6 className="text-sm mb-2 opacity-30 uppercase">{t('Personal.EMPLOYEE_INFORMATION')}</h6>
                                <div className="flex py-2 gap-3 items-center">
                                    <Icon icon="solar:user-id-linear" height={20}/>
                                    <span className="text-sm font-semibold opacity-80">{t('Personal.EMPLOYEE_FIRST_LAST_NAME')}: </span>
                                    <span className="text-base opacity-60">{personal?.first_name} {personal?.last_name}</span>
                                </div>
                                {/*<div className="flex py-2 gap-3 items-center">
                                    <Icon icon="solar:check-square-linear" height={20}/>
                                    <span className="text-sm font-semibold opacity-80">Status: </span>
                                    <span className="text-base opacity-60">Active</span>
                                </div>*/}
                                <div className="flex py-2 gap-3 items-center">
                                    <Icon icon="solar:bag-4-linear" height={20}/>
                                    <span className="text-sm font-semibold opacity-80">{t('Personal.POSITION_LABEL')}: </span>
                                    <span className="text-base opacity-60">{personal?.position_title}</span>
                                </div>
                                <div className="flex py-2 gap-3 items-center">
                                    <Icon icon="solar:user-linear" height={20}/>
                                    <span className="text-sm font-semibold opacity-80">{t('Personal.GENDER_LABEL')}: </span>
                                    <span className="text-base opacity-60">{personal?.gender.toString() === 'femme' ? t('Personal.GENDER_OPTION_WOMAN') : t('Personal.GENDER_OPTION_MAN')}</span>
                                </div>
                                <div className="flex py-2 gap-3 items-center">
                                    <Icon icon="solar:letter-linear" height={20}/>
                                    <span className="text-sm font-semibold opacity-80">{t('Personal.EMAIL_LABEL')}: </span>
                                    <span className="text-base opacity-60">{personal?.email}</span>
                                </div>
                                <div className="flex py-2 gap-3 items-center">
                                    <Icon icon="solar:phone-linear" height={20}/>
                                    <span className="text-sm font-semibold opacity-80">{t('Personal.PHONE_LABEL')}: </span>
                                    <span className="text-base opacity-60">{personal?.phone_number}</span>
                                </div>
                                <div className="flex py-2 gap-3 items-center">
                                    <Icon icon="solar:calendar-mark-linear" height={20}/>
                                    <span className="text-sm font-semibold opacity-80">{t('Personal.BIRTHDATE_LABEL')}: </span>
                                    <span className="text-base opacity-60">{personal?.birth_date && format(personal?.birth_date, 'dd MMMM yyyy', { locale: fr })}</span>
                                </div>
                                {personal?.hire_date && (
                                    <div className="flex py-2 gap-3 items-center">
                                        <Icon icon="solar:calendar-mark-linear" height={20}/>
                                        <span className="text-sm font-semibold opacity-80">{t('Personal.HIRE_DATE_LABEL')}: </span>
                                        <span className="text-base opacity-60">
                                            {personal?.hire_date && format(personal?.hire_date, 'dd MMMM yyyy', { locale: fr })}
                                        </span>
                                    </div>
                                )}
                            </div>

                        </CardContent>
                    </Card>
                </div>

                <div className="flex-1 md:pl-3">
                    <Card className="py-3 shadow-sm border-0">
                        <CardContent>
                            <div>
                                <h6 className="text-sm mb-2 opacity-30 uppercase">{t('Personal.VISITORS')}</h6>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="py-2">
                                            <h5 className="text-sm sm:mb-0">James Johnson</h5>
                                            <div className="flex gap-14">
                                                <div className="flex text-base gap-2 items-center">
                                                    <Icon icon="solar:calendar-mark-linear" height={14}/>
                                                    <span className="text-sm">April 21</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="py-2">
                                            <h5 className="text-sm sm:mb-0">James Johnson</h5>
                                            <div className="flex gap-14">
                                                <div className="flex text-base gap-2 items-center">
                                                    <Icon icon="solar:calendar-mark-linear" height={14}/>
                                                    <span className="text-sm">April 21</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="py-2">
                                            <h5 className="text-sm sm:mb-0">James Johnson</h5>
                                            <div className="flex gap-14">
                                                <div className="flex text-base gap-2 items-center">
                                                    <Icon icon="solar:calendar-mark-linear" height={14}/>
                                                    <span className="text-sm">April 21</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="py-2">
                                            <h5 className="text-sm sm:mb-0">James Johnson</h5>
                                            <div className="flex gap-14">
                                                <div className="flex text-base gap-2 items-center">
                                                    <Icon icon="solar:calendar-mark-linear" height={14}/>
                                                    <span className="text-sm">April 21</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </div>

            </div>
            {/*<div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
                <div>
                    <Card className="py-3">
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                    </Card>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <h5 className="text-base sm:mb-1">James Johnson</h5>
                                <div className="text-sm text-ld opacity-90 line-clamp-1">online</div>
                            </div>
                        </div>
                        <div className="flex items-center md:gap-2 gap-1">
                        </div>
                    </div>
                </div>
            </div>*/}
        </>
    );
};

export default PersonalDetails;
