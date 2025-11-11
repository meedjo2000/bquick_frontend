import React, {ChangeEvent} from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ChevronDownIcon, Pencil} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {fr} from "react-day-picker/locale";
import {Select} from "flowbite-react";
import {TPosition} from "@/types/positionType";
import {useTranslations} from "next-intl";

interface PersonalAddFormProps {
    formik: any;
    open: boolean;
    setOpen: (open: boolean) => void;
    data: TPosition[];
    fileDataURL: string|null,
    handleFileChange: (a: ChangeEvent<HTMLInputElement>) => void;
    type?: string,
    date?: Date|undefined,
    setDate?: (date: Date|undefined) => void
}
function PersonalForm ({formik, open, setOpen, data, fileDataURL, handleFileChange, date, setDate}: PersonalAddFormProps) {
    //const [date, setDate] = React.useState<Date | undefined>(undefined);
    const t = useTranslations();
    return (
        <div className="grid gap-4 my-2">
            <div className="grid gap-4 my-2">
                <div className="grid justify-center">
                    <div className="inline-flex">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={fileDataURL ? fileDataURL : ''} alt={t('Personal.PICTURE')} />
                            <AvatarFallback>
                                {formik.values.first_name && formik.values.last_name ? `${formik.values.first_name.slice(0, 1)}${formik.values.last_name.slice(0, 1)}` : 'PH'}
                            </AvatarFallback>
                        </Avatar>
                        <label htmlFor="file-upload">
                            <span className="bg-icon-table -ml-4 mt-6 bg-primary hover:bg-primaryemphasis">
                                <Pencil className="text-white" size={18} />
                            </span>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                hidden={true}
                                onChange={(a) => handleFileChange(a)}
                            />
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-1">
                    <div>
                        <Label htmlFor="last_name" className="text-label-dialog">{t('Personal.LAST_NAME_LABEL')}*</Label>
                        <Input
                            id="last_name"
                            name="last_name"
                            className="text-input-dialog"
                            placeholder={t('Personal.LAST_NAME_PLACEHOLDER')}
                            onChange={formik.handleChange}
                            value={formik.values.last_name}
                            autoComplete="off"
                            required
                        />
                        <span className="text-red-600">
                            {formik.errors.last_name ? <div>{formik.errors.last_name}</div> : null}
                        </span>
                    </div>
                    <div>
                        <Label htmlFor="first_name" className="text-label-dialog">{t('Personal.FIRST_NAME_LABEL')}*</Label>
                        <Input
                            id="first_name"
                            name="first_name"
                            className="text-input-dialog"
                            placeholder={t('Personal.FIRST_NAME_PLACEHOLDER')}
                            onChange={formik.handleChange}
                            value={formik.values.first_name}
                        />
                        <span className="text-red-600">
                            {formik.errors.first_name ? <div>{formik.errors.first_name}</div> : null}
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="email" className="text-label-dialog">{t('Personal.EMAIL_LABEL')}*</Label>
                        <Input
                            id="email"
                            name="email" className="text-input-dialog"
                            placeholder={t('Personal.EMAIL_PLACEHOLDER')}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <span className="text-red-600">
                                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            </span>
                    </div>
                    <div>
                        <Label htmlFor="phone_number" className="text-label-dialog">{t('Personal.PHONE_LABEL')}</Label>
                        <Input
                            id="phone_number"
                            name="phone_number"
                            className="text-input-dialog"
                            placeholder={t('Personal.PHONE_PLACEHOLDER')}
                            onChange={formik.handleChange}
                            value={formik.values.phone_number}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="birthday" className="text-label-dialog">{t('Personal.BIRTHDATE_LABEL')}</Label>
                        <div>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="date"
                                        className="w-full justify-between font-normal h-11"
                                    >
                                        {date ? date.toLocaleDateString() : t('Personal.BIRTHDATE_LABEL')}
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                    <Calendar
                                        mode={"single"}
                                        selected={date}
                                        captionLayout="dropdown"
                                        locale={fr}
                                        weekStartsOn={1}
                                        onSelect={(date) => {
                                            if (setDate) {
                                                setDate(date)
                                            }
                                            setOpen(false)
                                        }}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="gender" className="text-label-dialog">{t('Personal.GENDER_LABEL')}*</Label>
                        <Select
                            name="gender"
                            id="gender"
                            className="text-input-dialog mb-2"
                            value={formik.values.gender}
                            onChange={(e) =>
                                formik.setFieldValue("gender", e.target.value)
                            }
                        >
                            <option value="">{t('Personal.GENDER_PLACEHOLDER')}</option>
                            <option value={t('Personal.GENDER_OPTION_VALUE_MAN')}>{t('Personal.GENDER_OPTION_MAN')}</option>
                            <option value={t('Personal.GENDER_OPTION_VALUE_WOMAN')}>{t('Personal.GENDER_OPTION_WOMAN')}</option>
                        </Select>
                        <span className="text-red-600">
                            {formik.errors.gender ? <div>{formik.errors.gender}</div> : null}
                        </span>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <Label htmlFor="position_id" className="text-label-dialog">{t('Personal.POSITION_LABEL')}*</Label>
                        <Select
                            name="position_id"
                            id="position_id"
                            className="text-input-dialog mb-2"
                            value={formik.values.position_id}
                            onChange={(e) => {
                                    formik.setFieldValue("position_id", e.target.value);
                                    if(e.target.value === "0") {
                                        formik.setFieldValue("position_id", '');
                                    }
                                }
                            }
                        >
                            <option value="0">{t('Personal.POSITION_PLACEHOLDER')}</option>
                            {data.length > 0 && data.map((position: TPosition) =>
                                <option value={position.id} key={position.id}>{position.title}</option>
                            )}
                        </Select>
                        <span className="text-red-600">
                            {formik.errors.position_id ? <div>{formik.errors.position_id}</div> : null}
                        </span>
                    </div>
                </div>
                <Input name="type" type="hidden" value={formik.values.type} />
                <Input name="id" type="hidden" value={formik.values.id} />
            </div>
        </div>
    );
};

export default PersonalForm;