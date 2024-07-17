"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
// my components
import Modal from "./modal";
import CustomButton from "../forms/custom-btn";
// my hooks
import useSignupModal from "@/hooks/use-signup-modal";
// my functions
import apiServices from "@/services/api-services";
import { handleLogin } from "@/lib/actions";


const SignupModal = () => {
    const router = useRouter();
    const signupModal = useSignupModal();
    const [email, setEmail] = useState("");
    const [password1, setPasswod1] = useState("");
    const [password2, setPasswod2] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    const submitSignup = async () => {
        const signUpData = {
            email: email,
            password1: password1,
            password2: password2,
        };

        const response = await apiServices.postWithOutToken(
            "/api/accounts/register/",
            JSON.stringify(signUpData),
        );

        if (response.access) {
            handleLogin(response.user.pk, response.access, response.refresh)

            signupModal.close();
            router.push("/");
        }
        else {
            const responseErrors: string[] = Object.values(response).map((error: any) => {
                return error;
            });

            setErrors(responseErrors);
        }
    }

    const content = (
        <>
            <form
                action={submitSignup}
                className="space-y-4"
            >
                <input
                    onChange={(e) => { setEmail(e.target.value) }}
                    placeholder="Your e-mail"
                    type="email"
                    className="w-full h-54 px-4 border border-gray-300 rounded-xl"
                />
                <input
                    onChange={(e) => { setPasswod1(e.target.value) }}
                    placeholder="Your password"
                    type="password"
                    className="w-full h-54 px-4 border border-gray-300 rounded-xl"
                />
                <input
                    onChange={(e) => { setPasswod2(e.target.value) }}
                    placeholder="Repeat password"
                    type="password"
                    className="w-full h-54 px-4 border border-gray-300 rounded-xl"
                />

                {errors.map((error, index) => {
                    return (
                        <div
                            key={`error_${index}`}
                            className="p px-4 bg-red-50 text-airbnb rounded-xl opacity-80"
                        >
                            {error}
                        </div>
                    );
                })}

                <CustomButton
                    label="Signup"
                    onClick={submitSignup}
                />
            </form>
        </>
    );

    return (
        <Modal
            label="Sign Up"
            content={content}
            isOpen={signupModal.isOpen}
            close={signupModal.close}
        />
    );
};

export default SignupModal;