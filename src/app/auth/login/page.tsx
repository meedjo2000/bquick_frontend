"use client";

import React, {useEffect, useState} from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import AuthLogin from "../authforms/AuthLogin";
import backgroundImage  from '../../../../public/images/pages/auth-v1-mask-1-light.png'
import Image from "next/image";
import LogoAkuaba from "@/app/(AppLayout)/layout/shared/LogoAkuaba";
import {useDispatch} from "react-redux";
import {AppDispatch, useAppSelector} from "@/redux/store";
import {loginUser, onIsStayConnected} from "@/redux/features/user/user-slice";
import AuthenticationService from "@/services/AuthenticationService";
import {setAuthToken} from "@/api/api-manager";
import { useRouter } from 'next/navigation';
import {AxiosError} from "axios";

interface ILoginFormProps {
  email: string;
  password: string;
  stay_connected: boolean;
}

const BoxedLogin = () => {
  const [buttonStatus, setButtonStatus] = useState(false);
  //const [authStatus, setAuthStatus] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const userData = useAppSelector((state) => state.user);
  const router = useRouter();

  const onSubmit = async (data: ILoginFormProps) => {
    try {
      setButtonStatus(true);
      const response = await AuthenticationService.authenticateUser('/auth/login', data);
      const userData = {
        ...response.data,
        isStayConnected: data.stay_connected
      }
      setAuthToken(response.data.token);
      dispatch(loginUser(userData));
      //router.push('/');
      setButtonStatus(false);
    }
    catch (error: unknown) {
      setButtonStatus(false);
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          toast.error('Error message', {
            description: error.response.data.message,
          });
        } else {
          if (error.code === 'ERR_NETWORK') {
            toast.error('Error message', {
              description: "Probleme de connexion au serveur, veuillez verifier votre connexion internet ou contacter l'administrateur si le probleme persiste.",
            });

            console.log(error.code);
          } else {
            console.log(JSON.stringify(error));
          }
        }
      }
    }
  };

  useEffect(() => {
    if(AuthenticationService.checkUserToken()) {
      //setAuthStatus(AuthenticationService.checkUserToken());
      dispatch(onIsStayConnected(AuthenticationService.checkUserToken()));
      router.push('/');
    }
    else {
      dispatch(onIsStayConnected(false));
      router.push('/auth/login');
    }
  }, [userData, router, dispatch]);

  return (
    <>
      {!userData.isStayConnected && (
          <div className="relative overflow-hidden h-screen bg-lightprimary dark:bg-dark">
            <div className="flex h-full justify-center items-center px-4">
              <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words md:w-[500px] border-none ">
                <div className="flex h-full flex-col justify-center gap-2 p-0 w-full">
                  <div className="mx-auto">
                    <LogoAkuaba/>
                  </div>
                  <p className="text-lg text-center text-dark my-2">sur votre espace visiteur !</p>
                  <AuthLogin
                      onSubmit={onSubmit}
                      sending={buttonStatus}
                  />
                  <div className="py-2"></div>
                  {/*<div className="flex gap-2 text-base text-ld font-medium mt-6 items-center justify-center">
                    <p>New to MaterialM?</p>
                    <Link
                        href={"/auth/register"}
                        className="text-primary text-sm font-medium"
                    >
                      Create an account
                    </Link>
                  </div>*/}
                </div>
              </div>
            </div>
            <Toaster
                position="top-center"
                theme="light"
                richColors
                closeButton
            />
            <Image
                src={backgroundImage}
                alt="backgroundIamge"
                className='absolute bottom-[5%] z-[-1] is-full'
                priority={true}
            />
          </div>
      )}
    </>
  );
};

export default BoxedLogin;
