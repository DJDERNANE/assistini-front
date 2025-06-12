import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CardInput from "./components/CardInput";
import icons from "../../../constants/icons";
import {
    Alert,
    AlertIcon,
    CircularProgress,
    Select,
    useDisclosure,
} from "@chakra-ui/react";
import {
    useCreateSubAdmin,
    useDeleteSubAdmin,
    useEditProvider,
    useGetAllSubAdmin,
    useSendNote,
} from "../../../hooks/useProviderService";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from "@chakra-ui/react";
import { Icons } from "../../../constants";
import ConfirmCreateSubAdminPopUp from "./components/ConfirmCreateSubAdminPopUp";
import ConfirmDeleteSubAdminPopUp from "./components/ConfirmDeleteSubAdminPopUp";

const AccountPage = () => {
    const { t } = useTranslation("settings");

    const [content, setContent] = useState("");
    const [receivers, setReceivers] = useState({});
    const [selected, setSelected] = useState(null);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isOpenDelete,
        onOpen: onOpenDelete,
        onClose: onCloseDelete,
    } = useDisclosure();

    const {
        register: registerSendNote,
        handleSubmit: handleSubmitSendNote,
        loading: loadingSendNote,
        onSubmit: onSubmitSendNote,
        error: errorSendNote,
        message: messageSendNote,
        setMessage: setMessageSendNote,
        setValue: setValueSendNote,
        watch: watchSendNote,
    } = useSendNote(
        {
            title: "",
            content: "",
            receivers: [],
        },
        () => {
            setContent("");
        }
    );

    const {
        register,
        handleSubmit,
        loading,
        onSubmit,
        message,
        setMessage,
        setValue,
        watch,
        error,
    } = useCreateSubAdmin(() => {
        refetch();
    });

    const {
        register: registerDelete,
        handleSubmit: handleSubmitDelete,
        loading: loadingDelete,
        onSubmit: onSubmitDelete,
        reset: resetDelete,
        message: messageDelete,
        error: errorDelete,
        setMessage: setMessageDelete,
        setValue: setValueDelete,
        watch: watchDelete,
    } = useDeleteSubAdmin(() => {
        refetch();
        onCloseDelete();
    });

    const {
        isLoading,
        data,
        isError,
        error: errorGetAllSubAdmin,
        refetch,
    } = useGetAllSubAdmin();

    const receiversData = watchSendNote("receivers");

    useEffect(() => {
        setValueSendNote(
            "receivers",
            Object.keys(receivers).filter((item) => receivers[item] === true)
        );
    }, [receivers]);

    const handleChooseSubAdmin = async (id) => {
        // if (id === "all") {
        //   const receivers = await data?.data?.data.map((item) => item.id);
        //   setReceivers(receivers);
        // } else {
        // }

        // if (receivers.includes(id)) {
        //   const removeSubAd = receivers.filter((item) => item !== id);
        //   setReceivers(removeSubAd);
        // } else
        setReceivers({ ...receivers, [id]: !receivers[id] });
    };

    useEffect(() => {
        setValueSendNote("content", content);
    }, [content]);

    useEffect(() => {
        if (data?.data?.data) {
            const obj = {};
            const content = data?.data?.data;
            for (let i = 0; i < content.length; i++) {
                obj[content[i].id] = false;
            }
            setReceivers(obj);
        }
    }, [data]);

    console.log("####", receivers);

    const handleRightClick = (event, item) => {
        event.preventDefault(); // Prevents the default right-click menu
        setSelected(item); // Change selectedDeleted to red on right-click
        onOpenDelete();
    };

    // useEffect(() => {
    //   setValueDelete('id', )
    // }, [selected])

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3 border border-gray-300 rounded-xl p-4">
                <h3 className="first-letter:capitalize font-medium">
                    {t("account.add-sub")}
                </h3>
                {loading ? (
                    <div className="flex items-center justify-center min-h-[200px]">
                        <CircularProgress isIndeterminate color="blue.400" />
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-3"
                    >
                        <div className="relative">
                            <input
                                type="text"
                                className="border border-gray-300 rounded-xl pl-10 pr-4 py-2 outline-none w-full bg-gray-50"
                                placeholder={t("account.username")}
                                required
                                {...register("username")}
                            />
                            <img
                                src={icons.boxChevronDown}
                                alt=""
                                className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                className="border border-gray-300 rounded-xl pl-10 pr-4 py-2 outline-none w-full bg-gray-50"
                                placeholder={t("account.password")}
                                required
                                {...register("password")}
                            />
                            <img
                                src={icons.boxChevronDown}
                                alt=""
                                className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2"
                            />
                        </div>
                        <div className="flex items-center justify-end w-full">
                            <button
                                type="submit"
                                className="bg-primary-100 font-medium first-letter:capitalize px-4 py-2 rounded-full text-white"
                            >
                                {t("account.validate")}
                            </button>
                        </div>
                    </form>
                )}
            </div>
            <div className="space-y-3 border border-gray-300 rounded-xl p-4">
                <h3 className="first-letter:capitalize font-medium">
                    {t("account.existing")}
                </h3>

                <div className="h-[200px] overflow-y-auto space-y-2 pr-2">
                    {data &&
                        data?.data?.data.map((item) => (
                            <div
                                className="relative"
                                key={item.id}
                                onContextMenu={(e) =>
                                    handleRightClick(e, item.id)
                                }
                            >
                                <p
                                    type="text"
                                    className={`border border-gray-300 rounded-xl pl-4 pr-4 py-2 outline-none w-full bg-gray-50 ${
                                        selected === item.id &&
                                        "!bg-red-500 !text-white"
                                    }`}
                                    placeholder={t("account.username")}
                                >
                                    {item.username}
                                </p>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <div className="flex items-center space-x-2">
                                        <div
                                            className={`w-4 h-4 rounded-full bg-opacity-20 flex items-center justify-center ${
                                                true
                                                    ? "bg-green-400"
                                                    : "bg-red-400"
                                            }`}
                                        >
                                            <div
                                                className={`w-2 h-2 rounded-full ${
                                                    true
                                                        ? "bg-green-400"
                                                        : "bg-red-400"
                                                }`}
                                            ></div>
                                        </div>
                                        <p
                                            className={`${
                                                true
                                                    ? "text-green-400"
                                                    : "text-red-400"
                                            } font-medium first-letter:capitalize text-sm`}
                                        >
                                            {true
                                                ? t("account.active")
                                                : t("account.offline")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                {/* <div className="relative py-2 w-full bg-primary-100 bg-opacity-10 rounded-xl flex items-center justify-center cursor-pointer">
          <div className="w-6 h-6 rounded-full bg-primary-100 bg-opacity-40 flex items-center justify-center">
            <img src={icons.PlusWhite} alt="" />
          </div>
        </div> */}
            </div>
            <div className="space-y-3 border border-gray-300 rounded-xl p-4">
                <h3 className="first-letter:capitalize font-medium">
                    {t("account.send-notes")}
                </h3>

                <form onSubmit={handleSubmitSendNote(onSubmitSendNote)}>
                    <div className="flex items-center space-x-2 mb-4">
                        <p className="font-light text-sm">
                            {t("edit-modal.sub-admin")} /
                        </p>
                        <div className="w-[150px]">
                            <Menu closeOnSelect={false}>
                                <MenuButton
                                    type="button"
                                    sx={{
                                        border: "1px solid #2760F3",
                                        backgroundColor: "#F5F9FF",
                                        fontSize: 14,
                                        padding: "2px 12px",
                                        borderRadius: 5,
                                    }}
                                >
                                    {/* {receivers && receivers.length > 0
                    ? receivers.map((item) => <p>{item}</p>)
                    : t("edit-modal.choose")} */}
                                    {t("edit-modal.choose")}
                                </MenuButton>
                                <MenuList>
                                    {receivers &&
                                        Object.entries(receivers).length > 0 &&
                                        Object.entries(receivers).map(
                                            (item) => (
                                                <MenuItem
                                                    className=""
                                                    key={item[0]}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        name=""
                                                        id={
                                                            "sub-admin-" +
                                                            item[0]
                                                        }
                                                        className="cursor-pointer"
                                                        checked={item[1]}
                                                        onClick={() =>
                                                            handleChooseSubAdmin(
                                                                item[0]
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={`sub-admin-${item[0]}`}
                                                        className="pl-4"
                                                    >
                                                        {data?.data?.data?.find(
                                                            (d) =>
                                                                d.id == item[0]
                                                        )?.username ?? ""}
                                                    </label>
                                                </MenuItem>
                                            )
                                        )}
                                </MenuList>
                            </Menu>
                        </div>
                    </div>
                    <div>
                        <div className="rounded-xl p-4 text-sm bg-[#F5F9FF] h-fit">
                            <textarea
                                type="text"
                                placeholder={t("account.placeholder-note")}
                                className="text-[#627188] w-full h-[60px] bg-transparent outline-none"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="flex items-center justify-end w-full">
                            {loadingSendNote ? (
                                <div className="flex items-center justify-center min-h-[200px]">
                                    <CircularProgress
                                        isIndeterminate
                                        color="blue.400"
                                    />
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    className="mt-4 bg-secondary-100 font-medium first-letter:capitalize px-4 py-2 rounded-full text-white"
                                >
                                    {t("account.send")}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            {message && (
                <Alert status="success" className="col-span-3 rounded-md">
                    <AlertIcon />
                    {message}
                </Alert>
            )}
            {messageSendNote && (
                <Alert status="success" className="col-span-3 rounded-md">
                    <AlertIcon />
                    {messageSendNote}
                </Alert>
            )}
            {error && (
                <Alert status="error" className="col-span-3 rounded-md">
                    <AlertIcon />
                    {error}
                </Alert>
            )}
            {errorSendNote && (
                <Alert status="error" className="col-span-3 rounded-md">
                    <AlertIcon />
                    {errorSendNote}
                </Alert>
            )}

            <ConfirmCreateSubAdminPopUp isOpen={isOpen} onClose={onClose} />
            <ConfirmDeleteSubAdminPopUp
                isOpen={isOpenDelete}
                onClose={() => {
                    setSelected(null);
                    onCloseDelete();
                }}
                onClick={() => {
                    handleSubmitDelete(onSubmitDelete({ id: selected }));
                    setSelected(null);
                }}
            />
        </div>
    );
};

export default AccountPage;
