/** @format */

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    useCreateMsg,
    useGetAllMsg,
    useGetDetailMsg,
} from "../../../hooks/useMsgService";
import { CircularProgress, Icon, Spinner } from "@chakra-ui/react";
import { Icons } from "../../../constants";
import SearchForm from "../../../components/form/SearchForm";

const ListChat = () => {
    const { t } = useTranslation("global");
    const { isLoading, data, fetchData } = useGetAllMsg(false);

    const sectionRef = useRef(null);

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
        message,
        error,
        setMessage,
        setValue,
        watch,
    } = useCreateMsg(() => {
        fetchDataDetail(selected.id);
        sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }, false);

    const [selected, setSelected] = useState({});
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchData(search);
    }, [search]);

    useEffect(() => {
        if (sectionRef && sectionRef.current)
            sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }, [dataDetail]);

    useEffect(() => {
        if (Object.keys(selected).length > 0) {
            reset();
            fetchDataDetail(selected.id);
            setValue("recipient_id", selected.id);
        }
    }, [selected]);

    return (
        <div className="bg-[#f5f9fe]  rounded p-4">
            <div className="mb-4">
                <h1 className="mb-2 font-semibold text-xl capitalize">
                    {t("msg.title-prestateur")}
                </h1>
            </div>
            <div className="grid grid-cols-3 gap-4 rounded h-[600px]">
                <div className="bg-white rounded-xl p-2 h-full">
                    <SearchForm setSearch={setSearch} search={search} />
                    {isLoading ? (
                        <div className="w-full flex items-center justify-center h-[300px]">
                            <Spinner
                                thickness="4px"
                                speed="0.65s"
                                emptyColor="gray.200"
                                color="blue.500"
                                size="xl"
                            />
                        </div>
                    ) : (
                        data &&
                        data.data &&
                        data.data.map((item) => (
                            <div
                                onClick={() => {
                                    setSelected(item);
                                }}
                                key={item}
                                className={`${
                                    item < 10 && "border-b"
                                } pb-1 pt-1 px-4`}
                            >
                                <ItemMsg key={item.id} item={item} />
                            </div>
                        ))
                    )}
                </div>
                <div className="col-span-2 grid grid-cols-1 gap-4 grid-rows-6">
                    {selected && selected?.id ? (
                        <div className="bg-white rounded-xl row-span-5">
                            <div className="flex items-center space-x-4 border-b-2 border-blue-500/30 p-4">
                                <img
                                    src={
                                        selected &&
                                        `${process.env.REACT_APP_URL_API}/${selected?.logo}`
                                    }
                                    alt=""
                                    className="w-[56px] h-[56px] rounded-full"
                                />
                                <div>
                                    <h3 className="first-letter:capitalize font-semibold ">
                                        {selected?.fullName}
                                    </h3>
                                    <div className="flex items-center space-x-2">
                                        <img src={Icons.locationBlue} alt="" />
                                        <p>{selected?.location}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3 p-4 h-[400px] overflow-y-auto relative">
                                {dataDetail &&
                                    dataDetail?.data?.map((item) =>
                                        item?.isProvider === 0 ? (
                                            <div
                                                key={item.id}
                                                className={`w-full flex flex-col`}
                                            >
                                                <p className="text-xs font-light w-full flex justify-start">
                                                    {item?.created_at?.substring(
                                                        0,
                                                        10
                                                    )}{" "}
                                                    {item?.created_at?.substring(
                                                        11,
                                                        19
                                                    )}
                                                </p>
                                                <p className="rounded-3xl px-4 py-2 border bg-[#FFF3DB]  first-letter:capitalize mt-1 w-fit max-w-[70%]">
                                                    {item?.content?.trim() ===
                                                    ""
                                                        ? "."
                                                        : item?.content}
                                                </p>
                                            </div>
                                        ) : (
                                            <div
                                                key={item.id}
                                                className={`w-full flex flex-col items-end`}
                                            >
                                                <p className="text-xs font-light w-full flex justify-end">
                                                    {item?.created_at?.substring(
                                                        0,
                                                        10
                                                    )}{" "}
                                                    {item?.created_at?.substring(
                                                        11,
                                                        19
                                                    )}
                                                </p>
                                                <p className="rounded-3xl px-4 py-2 border bg-blue-600 first-letter:capitalize text-white mt-1 w-fit max-w-[70%]">
                                                    {item?.content?.trim() ===
                                                    ""
                                                        ? "."
                                                        : item?.content}
                                                </p>
                                            </div>
                                        )
                                    )}

                                <div
                                    ref={sectionRef}
                                    className="absolute bottom-[300px]"
                                ></div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl row-span-5"></div>
                    )}
                    <div className="bg-white rounded-xl p-4 flex items-center">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="border rounded-full border-[#00000020]  flex items-center flex-1 overflow-hidden"
                        >
                            <input
                                type="text"
                                className="w-full mr-6 px-6 py-2 outline-none "
                                {...register("message", { required: true })}
                                disabled={
                                    Object.keys(selected).length === 0 ||
                                    loading
                                }
                            />
                            {loading ? (
                                <div className="w-fit flex items-center justify-center">
                                    <CircularProgress
                                        isIndeterminate
                                        color="blue.400"
                                        size={10}
                                    />
                                </div>
                            ) : (
                                <button
                                    disabled={
                                        Object.keys(selected).length === 0
                                    }
                                    type="submit"
                                    className="w-[30px] h-[30px] flex items-center justify-center mr-6"
                                >
                                    <img src={Icons.SendBlue} alt="" />
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListChat;

const ItemMsg = ({ item }) => {
    return (
        <div className="relative w-full hover:bg-blue-600/5 p-1 rounded-lg cursor-pointer">
            <div className="flex items-center space-x-4">
                <img
                    src={`${process.env.REACT_APP_URL_API}/${item?.logo}`}
                    alt=""
                    className="w-11 h-11 rounded-full object-cover"
                />

                <p className=" text-sm">{item?.fullName}</p>
            </div>
        </div>
    );
};
