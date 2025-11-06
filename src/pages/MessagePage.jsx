/** @format */

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchForm from "../components/form/SearchForm";
import { Icons } from "../constants";
import {
    useCreateMsg,
    useGetAllMsg,
    useGetDetailMsg,
} from "../hooks/useMsgService";
import { CircularProgress, Spinner } from "@chakra-ui/react";

const MessagePage = () => {
    const { t } = useTranslation("global");
    const { isLoading, data, fetchData } = useGetAllMsg(true);
    const [search, setSearch] = useState("");
    const messagesEndRef = useRef(null);
    const [selectedConversation, setSelectedConversation] = useState(null);

    const {
        isLoading: isLoadingDetail,
        data: dataDetail,
        fetchData: fetchDataDetail,
    } = useGetDetailMsg();

    const {
        register,
        handleSubmit,
        loading,
        onSubmit,
        reset,
        setValue,
    } = useCreateMsg(() => {
        if (selectedConversation) {
            fetchDataDetail(selectedConversation.id);
            scrollToBottom();
        }
    }, true);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        fetchData(search);
    }, [search]);

    useEffect(() => {
        scrollToBottom();
    }, [dataDetail]);

    useEffect(() => {
        if (selectedConversation) {
            reset();
            fetchDataDetail(selectedConversation.id);
            setValue("recipient_id", selectedConversation.id);
        }
    }, [selectedConversation]);

    const handleSelectConversation = (user) => {
        setSelectedConversation(user);
    };

    const handleBackToConversations = () => {
        setSelectedConversation(null);
    };

    // If no conversation is selected, show all conversations
    if (!selectedConversation) {
        return (
            <div className="bg-[#f5f9fe] rounded p-0 
             h-full">
                <div className="bg-white rounded-xl p-4 md:p-6 min-h-[80vh] h-full">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-800 capitalize">
                            {t("message.title") || "Messages"}
                        </h1>
                    </div>
                    
                    <div className="mb-6">
                        <SearchForm setSearch={setSearch} search={search} />
                    </div>

                    {isLoading ? (
                        <div className="w-full flex items-center justify-center h-64">
                            <Spinner
                                thickness="4px"
                                speed="0.65s"
                                emptyColor="gray.200"
                                color="blue.500"
                                size="xl"
                            />
                        </div>
                    ) : data && data.data && data.data.length > 0 ? (
                        <div className="space-y-3 max-h-[500px] overflow-y-auto">
                            {data.data.map((user) => (
                                <ConversationItem
                                    key={user.id}
                                    user={user}
                                    onSelect={handleSelectConversation}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-lg">
                                {t("msg.noConversations") || "No conversations found"}
                            </div>
                            <p className="text-gray-500 mt-2">
                                {search ? "Try a different search term" : "Start a new conversation"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    console.log("selectedConversation:", selectedConversation);

    // If a conversation is selected, show the chat interface
    return (
        <div className="bg-[#f5f9fe] rounded p-0 min-h-[80vh] h-full">
            <div className="bg-white rounded-xl h-full flex flex-col">
                {/* Chat Header */}
                <div className="flex items-center space-x-4 border-b-2 border-blue-500/30 p-4">
                    <button
                        onClick={handleBackToConversations}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <img 
                            src={Icons.ArrowLeft || "https://img.icons8.com/ios-filled/50/000000/left.png"} 
                            alt="Back" 
                            className="w-5 h-5"
                        />
                    </button>
                    <img
                        src={`${process.env.REACT_APP_URL_API}/${selectedConversation?.logo}`}
                        alt=""
                        className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                        <h3 className="first-letter:capitalize font-semibold text-lg">
                            {selectedConversation?.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                            <img src={Icons.locationBlue} alt="" className="w-4 h-4" />
                            <p className="text-gray-600 text-sm">{selectedConversation?.location}</p>
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto ">
                    {isLoadingDetail ? (
                        <div className="w-full flex items-center justify-center h-32">
                            <Spinner
                                thickness="4px"
                                speed="0.65s"
                                emptyColor="gray.200"
                                color="blue.500"
                                size="xl"
                            />
                        </div>
                    ) : dataDetail && dataDetail.data && dataDetail.data.length > 0 ? (
                        dataDetail.data.map((message) => (
                            <MessageBubble
                                key={message.id}
                                message={message}
                                isProvider={message?.isProvider}
                            />
                        ))
                    ) : (
                        <div className="text-center text-gray-500 mt-8">
                            {t("msg.noMessages") || "No messages yet. Start a conversation!"}
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex items-center space-x-4"
                    >
                        <input
                            type="text"
                            className="flex-1 border rounded-full px-6 py-3 outline-none focus:border-blue-500"
                            placeholder={t("msg.typeMessage") || "Type a message..."}
                            {...register("message", { required: true })}
                            disabled={loading}
                        />
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <CircularProgress
                                    isIndeterminate
                                    color="blue.400"
                                    size={8}
                                />
                            </div>
                        ) : (
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                <img src={Icons.SendWhite || Icons.SendBlue} alt="Send" className="w-5 h-5" />
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

// Conversation Item Component
const ConversationItem = ({ user, onSelect }) => {
    // You might want to get the last message from your API
    const getLastMessagePreview = () => {
        // This should come from your conversation list API
        // For now, returning a placeholder
        return "Click to view conversation";
    };

    const getLastMessageTime = () => {
        // This should come from your conversation list API
        return "";
    };

    return (
        <div
            onClick={() => onSelect(user)}
            className="p-4 rounded-lg cursor-pointer transition-colors hover:bg-blue-50 border border-gray-100"
        >
            <div className="flex items-center space-x-4">
                <img
                    src={`${process.env.REACT_APP_URL_API}/${user?.logo}`}
                    alt=""
                    className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-gray-900 truncate text-lg">
                            {user?.name}
                        </h4>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {getLastMessageTime()}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                        {getLastMessagePreview()}
                    </p>
                </div>
            </div>
        </div>
    );
};

// Message Bubble Component
const MessageBubble = ({ message, isProvider }) => {
    const formatDateTime = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    return (
        <div className={`w-full flex ${isProvider ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[70%] ${isProvider ? 'items-start' : 'items-end'}`}>
                <p className="text-xs text-gray-500 mb-1">
                    {formatDateTime(message?.created_at)}
                </p>
                <div
                    className={`rounded-3xl px-4 py-2 ${
                        isProvider
                            ? 'bg-[#FFF3DB] border border-amber-200 text-gray-800'
                            : 'bg-blue-600 text-white'
                    }`}
                >
                    <p className="first-letter:capitalize whitespace-pre-wrap">
                        {message?.content?.trim() === "" ? "." : message?.content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MessagePage;