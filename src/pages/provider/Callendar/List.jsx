/** @format */

import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    useDisclosure,
    CircularProgress,
} from "@chakra-ui/react";
import { Outlet, useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useGetAllInvoice } from "../../../hooks/useInvoiceService";
import CardCalendar from "./components/CardCalendar";
import CardTime from "./components/CardTime";
import CardDay from "./components/CardDay";
import Icons from "../../../constants/icons";
import {
    useEditDispo,
    useGetAllDispo,
} from "../../../hooks/useProviderService";
import { startOfDay } from "date-fns";

const List = () => {
    const { t } = useTranslation("rdvs");

    const [time1, setTime1] = useState({ hours: 8, minutes: 30 });
    const [time2, setTime2] = useState({ hours: 12, minutes: 0 });
    const [time3, setTime3] = useState({ hours: 13, minutes: 30 });
    const [time4, setTime4] = useState({ hours: 17, minutes: 0 });

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [removeFridays, setRemoveFridays] = useState(false);
    const [removeSaturdays, setRemoveSaturdays] = useState(false);

    const { isLoading, fetchData, data } = useGetAllDispo();

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const {
        register,
        handleSubmit,
        loading,
        onSubmit,
        reset,
        message,
        setMessage,
        setValue,
        watch,
    } = useEditDispo(() => {
        fetchData();
        setTime1({ hours: 8, minutes: 30 });
        setTime2({ hours: 12, minutes: 0 });
        setTime3({ hours: 13, minutes: 30 });
        setTime4({ hours: 17, minutes: 0 });
        setRemoveFridays(false);
        setRemoveSaturdays(false);
        setEndDate(null);
        setStartDate(null);
    });

    console.log("#####", data);
    return (
        <div className="responsive mt-4 space-y-4">
            <Card borderRadius={"xl"} shadow={"sm"}>
                <CardBody>
                    <div className="">
                        {isLoading ? (
                            <div className="flex items-center justify-center min-h-[200px]">
                                <CircularProgress
                                    isIndeterminate
                                    color="blue.400"
                                />
                            </div>
                        ) : (
                            <div>
                                <h1 className="font-semibold text-2xl first-letter:capitalize mb-4">
                                    {t("calendar.title-manage")}
                                </h1>{" "}
                                <div className="grid grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-3">
                                        <CardCalendar
                                            startDate={startDate}
                                            setStartDate={setStartDate}
                                            endDate={endDate}
                                            setEndDate={setEndDate}
                                            highlightedDates={
                                                data?.map((item) =>
                                                    item.date.substring(0, 10)
                                                ) ?? []
                                            }
                                        />

                                        <div className="ml-4">
                                            <label className="font-medium space-x-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={removeFridays}
                                                    onChange={(e) =>
                                                        setRemoveFridays(
                                                            e.target.checked
                                                        )
                                                    }
                                                />{" "}
                                                {t("calendar.remove-fri")}
                                            </label>
                                        </div>

                                        <div className="ml-4">
                                            <label className="font-medium space-x-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={removeSaturdays}
                                                    onChange={(e) =>
                                                        setRemoveSaturdays(
                                                            e.target.checked
                                                        )
                                                    }
                                                />{" "}
                                                {t("calendar.remove-sat")}
                                            </label>
                                        </div>
                                    </div>

                                    <div className="md:space-y-4 md:col-span-2 flex flex-col items-end">
                                        <CardTime
                                            title={t("calendar.morning-shift")}
                                            time1={time1}
                                            setTime1={setTime1}
                                            time2={time2}
                                            setTime2={setTime2}
                                        />
                                        <CardTime
                                            title={t("calendar.evening-shift")}
                                            time1={time3}
                                            setTime1={setTime3}
                                            time2={time4}
                                            setTime2={setTime4}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-end w-full mt-4">
                        <button
                            onClick={() => {
                                const excludedDays = [];
                                if (removeFridays) {
                                    excludedDays.push("Friday");
                                }
                                if (removeSaturdays) {
                                    excludedDays.push("Saturday");
                                }
                                onSubmit({
                                    excludedDays,
                                    date: {
                                        from: startDate
                                            ? startDate
                                                  ?.toLocaleDateString(
                                                      "en-CA",
                                                      {
                                                          timeZone:
                                                              "Europe/Paris",
                                                      }
                                                  )
                                                  ?.substring(0, 10)
                                            : "",
                                        to: endDate
                                            ? endDate
                                                  ?.toLocaleDateString(
                                                      "en-CA",
                                                      {
                                                          timeZone:
                                                              "Europe/Paris",
                                                      }
                                                  )
                                                  ?.substring(0, 10)
                                            : "",
                                    },
                                    availability: {
                                        morningStartTime: `${time1.hours}:${
                                            parseInt(time1.minutes) < 10
                                                ? `0${time1?.minutes}`
                                                : time1?.minutes
                                        }:00`,
                                        morningEndTime: `${time2.hours}:${
                                            parseInt(time2.minutes) < 10
                                                ? `0${time2?.minutes}`
                                                : time2?.minutes
                                        }:00`,
                                        eveningStartTime: `${time3.hours}:${
                                            parseInt(time3.minutes) < 10
                                                ? `0${time3?.minutes}`
                                                : time3?.minutes
                                        }:00`,
                                        eveningEndTime: `${time4.hours}:${
                                            parseInt(time4.minutes) < 10
                                                ? `0${time4?.minutes}`
                                                : time4?.minutes
                                        }:00`,
                                        patientInterval: 30,
                                        status: 1,
                                    },
                                });
                            }}
                            className="bg-blue-600 font-medium first-letter:capitalize px-4 py-2 rounded-full text-white"
                        >
                            {t("calendar.schedule")}
                        </button>
                    </div>
                </CardBody>
            </Card>

            {/* list disp  */}
            <Card borderRadius={"xl"} shadow={"sm"}>
                <CardBody>
                    <div className="">
                        {isLoading ? (
                            <div className="flex items-center justify-center min-h-[200px]">
                                <CircularProgress
                                    isIndeterminate
                                    color="blue.400"
                                />
                            </div>
                        ) : (
                            <div>
                                <h1 className="font-semibold text-2xl first-letter:capitalize mb-4">
                                    {t("calendar.title")}
                                </h1>
                                <div className="grid grid-cols-5 text-sm text-[#5A607F] border-b pb-3">
                                    <h5>{t("calendar.day")}</h5>
                                    <h5>{t("calendar.date")}</h5>
                                    <h5 className="text-center capitalize">
                                        {t("calendar.morning-shift")}
                                    </h5>
                                    <h5 className="text-center capitalize">
                                        {t("calendar.evening-shift")}
                                    </h5>
                                    <h5 className="text-end">
                                        {t("calendar.actions")}
                                    </h5>
                                </div>
                                <div className="">
                                    {data &&
                                        data?.map((item) => (
                                            <div className="grid grid-cols-5 text-sm  rounded my-2 py-1  border-b pb-3">
                                                <p>
                                                    {new Intl.DateTimeFormat(
                                                        "fr-FR",
                                                        { weekday: "long" }
                                                    ).format(
                                                        new Date(item?.date)
                                                    )}
                                                    {/* {new Date(item?.date)
                                                        .toDateString()
                                                        .substring(0, 3)} */}
                                                </p>
                                                <p>
                                                    {item?.date?.substring(
                                                        0,
                                                        10
                                                    )}
                                                </p>
                                                <div className="text-blue-600 bg-blue-600/10 px-2 py-1 rounded-full w-fit flex items-center space-x-2 mx-auto">
                                                    <div className="w-1 h-1 rounded-full bg-blue-600"></div>
                                                    <p>
                                                        {item?.morningStartTime.substring(
                                                            0,
                                                            5
                                                        )}{" "}
                                                        -{" "}
                                                        {item?.morningEndTime.substring(
                                                            0,
                                                            5
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="text-green-600 bg-green-600/10 px-2 py-1 rounded-full w-fit flex items-center space-x-2 mx-auto">
                                                    <div className="w-1 h-1 rounded-full bg-green-600"></div>
                                                    <p>
                                                        {" "}
                                                        {item?.eveningStartTime.substring(
                                                            0,
                                                            5
                                                        )}{" "}
                                                        -{" "}
                                                        {item?.eveningEndTime.substring(
                                                            0,
                                                            5
                                                        )}
                                                    </p>
                                                </div>
                                                <div
                                                    className="flex justify-end cursor-pointer"
                                                    onClick={() => {
                                                        onSubmit({
                                                            excludedDays: [],
                                                            date: {
                                                                from: item?.date?.substring(
                                                                    0,
                                                                    10
                                                                ),
                                                                to: item?.date?.substring(
                                                                    0,
                                                                    10
                                                                ),
                                                            },
                                                            availability: {
                                                                morningStartTime:
                                                                    item?.morningStartTime,
                                                                morningEndTime:
                                                                    item?.morningEndTime,
                                                                eveningStartTime:
                                                                    item?.eveningStartTime,
                                                                eveningEndTime:
                                                                    item?.eveningEndTime,
                                                                patientInterval: 30,
                                                                status: 0,
                                                            },
                                                        });
                                                    }}
                                                >
                                                    <img
                                                        src={Icons.trashBleu}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default List;
