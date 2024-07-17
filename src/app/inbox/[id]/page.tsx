import React, { useState, useEffect } from "react";
// my components
import ConversationDetail from "@/components/inbox/conversation-detail";
// my functions
import { getUserId, getAccessToken } from "@/lib/actions";
import apiServices from "@/services/api-services";
import { UserType } from "../page";


export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    sent_to: UserType;
    created_by: UserType;
}


const ConversationPage = async ({ params }: { params: { id: string } }) => {
    const userId = await getUserId();
    const token = await getAccessToken();

    if (!userId || !token) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated </p>
            </main>
        );
    };

    const response = await apiServices.get(`/api/chat/${params.id}/`)

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <ConversationDetail
                userId={userId}
                token={token}
                conversation={response.conversation}
                messages={response.messages}
            />
        </main >
    );
};

export default ConversationPage;