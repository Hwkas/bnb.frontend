"use client";


import { useRouter } from "next/navigation";
// my custom types
import { ConversationType } from "@/app/inbox/page";


interface ConversationProps {
    userId: string;
    conversation: ConversationType;
};

const Conversation: React.FC<ConversationProps> = ({ userId, conversation }) => {
    const router = useRouter();
    const other_user = conversation.users.find((user) => user.id != userId);

    return (
        <div className="px-6 py-4 cursor-pointer border border-gray-300 rounded-xl">
            <p className="mb-6 text-xl">{other_user?.name}</p>

            <p
                onClick={() => router.push(`/inbox/${conversation.id}`)}
                className="text-airbnbDark"
            >
                Go to Conversation
            </p>
        </div>
    );
};

export default Conversation;