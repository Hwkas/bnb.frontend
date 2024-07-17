"use client";


import { useState, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
// my components
import CustomButton from "../forms/custom-btn";
// my custom types
import { ConversationType, UserType } from "@/app/inbox/page";
import { MessageType } from "@/app/inbox/[id]/page";


interface ConversationDetailProps {
    userId: string;
    token: string;
    conversation: ConversationType;
    messages: MessageType[];
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({ userId, token, conversation, messages }) => {
    const messagesDiv = useRef(null);
    const [newMessage, setNewMessage] = useState("");
    const [realTimeMessage, setRealTimeMessage] = useState<MessageType[]>([]);

    const my_user = conversation.users?.find((user) => user.id == userId);
    const other_user = conversation.users?.find((user) => user.id != userId);

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        `${process.env.NEXT_PUBLIC_WS_HOST}/ws/${conversation.id}/?token=${token}`,
        { share: false, shouldReconnect: () => true }
    );

    useEffect(() => {
        console.log("Connection state changed", readyState);
    }, [readyState]);

    useEffect(() => {
        if (lastJsonMessage
            && typeof lastJsonMessage === "object"
            && "name" in lastJsonMessage
            && "body" in lastJsonMessage
        ) {
            const message: MessageType = {
                id: "",
                name: lastJsonMessage.name as string,
                body: lastJsonMessage.body as string,
                sent_to: other_user as UserType,
                created_by: my_user as UserType,
                conversationId: conversation.id,
            }
            setRealTimeMessage((realTimeMessage) => [...realTimeMessage, message]);
        }
        scrollToBottom();
    }, [lastJsonMessage]);

    const scrollToBottom = () => {
        if (messagesDiv.current) {
            messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
        }
    }

    const sendMessage = async () => {
        sendJsonMessage({
            event: "chat_message",
            data: {
                body: newMessage,
                name: my_user?.name,
                sent_to_id: other_user?.id,
                conversation_id: conversation.id,
            }
        });

        setNewMessage("");

        setTimeout(() => scrollToBottom(), 50);
    };

    return (
        <>
            <div
                ref={messagesDiv}
                className="max-h-[400px] overflow-auto flex flex-col space-y-4"
            >
                {messages.map((message, index) => (
                    < div
                        key={index}
                        className={`w-[80%] py-4 px-6 rounded-xl ${message.created_by.id === my_user?.id ? "bg-blue-200 ml-[20%]" : "bg-gray-200"}`}
                    >
                        <p className="font-bold text-gray-500">{message.created_by.name}</p>
                        <p>{message.body}</p>
                    </div>
                ))}

                {realTimeMessage.map((message, index) => (
                    < div
                        key={index}
                        className={`w-[80%] py-4 px-6 rounded-xl ${message.created_by.id === my_user?.id ? "bg-blue-200 ml-[20%]" : "bg-gray-200"}`}
                    >
                        <p className="font-bold text-gray-500">{message.name}</p>
                        <p>{message.body}</p>
                    </div>
                ))}
            </div >

            <div className="mt-6 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
                <input
                    type="text"
                    placeholder="Type your message...."
                    className="w-full p-2 bg-gray-200 rounded-xl"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />

                <CustomButton
                    onClick={sendMessage}
                    label="Send"
                    className="w-[100px]"
                />
            </div>
        </>
    );
};

export default ConversationDetail;