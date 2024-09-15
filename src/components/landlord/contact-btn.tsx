"use client";


import { useRouter } from "next/navigation";
// my functions
import apiServices from "@/services/api-services";
import useLoginModal from "@/hooks/use-login-modal";


interface ContactButtonProps {
    userId: string | null;
    landLordId: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({ userId, landLordId }) => {
    const LoginModal = useLoginModal();
    const router = useRouter();

    const startConversation = async () => {
        if (userId) {
            const response = await apiServices.get(`/api/chat/start/${userId}`);

            if (response.conversation_id) {
                router.push(`/inbox/${response.conversation_id}`);
            }
        }
        else {
            LoginModal.open();
        }
    };

    return (
        <div
            onClick={startConversation}
            className="py-4 px-6 cursor-pointer bg-airbnb hover:bg-airbnbDark transition text-white rounded-xl"
        >
            Contact
        </div>
    );
};

export default ContactButton;