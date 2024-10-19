"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
// my componentss
import Modal from "./modal";
import CustomButton from "../forms/custom-btn";
// my hooks
import useLoginModal from "@/hooks/use-login-modal";
// my functions
import apiServices from "@/services/api-services";
import { handleLogin } from "@/lib/actions";


const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [email, setEmail] = useState("");
    const [password, setPasswod] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    const submitLogin = async () => {
        const loginData = {
            email: email,
            password: password,
        };

        const response = await apiServices.postWithOutToken(
            "/api/accounts/login/",
            JSON.stringify(loginData),
        );

        if (response.access) {
            await handleLogin(response.user.pk, response.access, response.refresh);

            loginModal.close();
            router.push("/?refresh_login=true");
        }
        else {
            setErrors(response.non_field_errors);
        }
    }

    const content = (
        <>
            <form action={submitLogin} className="space-y-4">
                <input
                    onChange={(e) => { setEmail(e.target.value) }}
                    placeholder="Your e-mail"
                    type="email"
                    className="w-full h-54 px-4 border border-gray-300 rounded-xl"
                />
                <input
                    onChange={(e) => { setPasswod(e.target.value) }}
                    placeholder="Your password"
                    type="password"
                    className="w-full h-54 px-4 border border-gray-300 rounded-xl"
                />

                {errors.map((error, index) => {
                    return (
                        <div className="p px-4 bg-red-50 text-airbnb rounded-xl opacity-80">
                            {error}
                        </div>
                    );
                })}


                <CustomButton
                    label="Login"
                    onClick={submitLogin}
                />
            </form>
        </>
    );

    return (
        <Modal
            label="Log In"
            content={content}
            isOpen={loginModal.isOpen}
            close={loginModal.close}
        />
    );
};

export default LoginModal;