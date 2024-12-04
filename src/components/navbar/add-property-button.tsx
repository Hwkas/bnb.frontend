"use client";

import React from "react";
// my hooks
import useAddPropertyModal from "@/hooks/use-add-property-modal";
import useLoginModal from "@/hooks/use-login-modal";

interface AddPropertyProps {
    userId?: string | null;
}

const AddPropertyButton: React.FC<AddPropertyProps> = ({ userId }) => {
    const loginModal = useLoginModal();
    const addPropertyModal = useAddPropertyModal();

    // TODO make this function async to make it work properly
    const airBnbYourHome = async () => {
        if (userId) {
            addPropertyModal.open();
        } else {
            loginModal.open();
        }
    };

    return (
        <div
            onClick={airBnbYourHome}
            className="p-2 text-sm cursor-pointer font-semibold rounded-full hover:bg-gray-200"
        >
            Django Bnb your home
        </div>
    );
};

export default AddPropertyButton;
