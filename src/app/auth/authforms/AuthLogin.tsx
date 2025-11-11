"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import React from "react";
import * as yup from 'yup';
import { Formik, FormikValues } from "formik";
import Loading from "@/components/loading";
import {Input} from "@/components/ui/input";

const LoginFormSchema = yup.object().shape({
    email: yup.string().required().min(2),
    password: yup.string().required().min(8),
    stay_connected: yup.boolean(),
});

interface ILoginFormProps {
    sending?: boolean;
    onSubmit(data: FormikValues): void;
}

const AuthLogin = ({ onSubmit, sending }: ILoginFormProps) => {

  return (
    <>
      <Formik
          initialValues={{
              email: '',
              password: '',
              stay_connected: false
          }}
          validationSchema={LoginFormSchema}
          onSubmit={values => {
              // same shape as initial values
              onSubmit(values);
              //console.log(values);
          }}
      >
        {formikProps => (
            <>
              <div className="mb-5">
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                    id="email"
                    type="email"
                    sizing="lg"
                    name="email"
                    className="form-control form-control-rounded"
                    placeholder="Renseignez l'email"
                    onChange={formikProps.handleChange('email')}
                    value={formikProps.values.email.trim()}
                    onBlur={formikProps.handleBlur('email')}
                />
                {formikProps.touched.email &&
                    formikProps.errors.email && (
                        <div className="pl-2 mt-1">
                            <span className="text-[12px] text-red-600">Champ obligatoire</span>
                            {/*{formikProps.errors.email}*/}
                        </div>
                    )}
              </div>

              <div className="mb-5">
                <div className="mb-2 block">
                  <Label htmlFor="userpwd" value="Mot de passe" />
                </div>
                <TextInput
                    id="userpwd"
                    type="password"
                    name="password"
                    sizing="lg"
                    className="form-control form-control-rounded"
                    placeholder="Renseignez le mot de passe"
                    onChange={formikProps.handleChange('password')}
                    value={formikProps.values.password.trim()}
                    onBlur={formikProps.handleBlur('password')}
                />
                {formikProps.touched.password &&
                  formikProps.errors.password && (
                      <div className="pl-2 mt-1">
                          <span className="text-[12px] text-red-600">Champ obligatoire</span>
                      </div>
                  )
                }
              </div>
              <div className="flex justify-between my-8">
                <div className="flex items-center gap-2">
                  <Checkbox
                      id="accept"
                      className="checkbox"
                      name="stay_connected"
                      onChange={formikProps.handleChange('stay_connected')}
                      onBlur={formikProps.handleBlur('stay_connected')}
                  />
                  <Label
                      htmlFor="accept"
                      className="opacity-90 font-normal cursor-pointer"
                  >
                    Rester connecté
                  </Label>
                </div>
                <Link href={"/"} className="text-primary text-sm font-medium">
                  Mot de passe oublié?
                </Link>
              </div>
              <Button
                  color={"primary"}
                  /*href="/"
                  as={Link}*/
                  //onSubmit={() => formikProps.handleSubmit()}
                  onClick={() => formikProps.handleSubmit()}
                  className="group relative flex items-stretch justify-center p-0.5 text-center font-medium bg-primary hover:bg-primaryemphasis text-white rounded-3xl w-full"
                  size="lg"
                  disabled={sending}
              >
                  {sending ? <Loading className="fill-orange-500" size={4} /> : "Sign in"}
              </Button>
            </>
        )}
      </Formik>
      {/*<form>

      </form>*/}
    </>
  );
};

export default AuthLogin;
