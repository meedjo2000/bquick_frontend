import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import React from "react";
import {useTranslations} from "next-intl";

interface PositionFormProps {
    formik: any;
}

const PositionForm = ({formik}: PositionFormProps) => {
    const t = useTranslations();
    return (
        <div className="grid gap-4 my-2">
            <div className="grid grid-cols-1 gap-4 mt-1">
                <div>
                    <Label htmlFor="position_title" className="text-label-dialog">{t('Position.POSITION_LABEL')}*</Label>
                    <Input
                        id="position_title"
                        name="position_title"
                        className="text-input-dialog"
                        placeholder={t('Position.POSITION_LABEL_PLACEHOLDER')}
                        onChange={formik.handleChange}
                        value={formik.values.position_title}
                        autoComplete="off"
                        required
                    />
                    <span className="text-red-600">
                        {formik.errors.position_title ? <div>{formik.errors.position_title}</div> : null}
                    </span>
                </div>
            </div>

        </div>
    );
}

export default PositionForm