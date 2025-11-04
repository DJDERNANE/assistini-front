/** @format */

import React, { useRef, useState } from "react";
import CustomSwiper from "../custom/CustomSwiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icons } from "../../constants";
import { useTranslation } from "react-i18next";

const CallendarRdv = ({ data = [], value = null, setValue = () => {} }) => {
    const { t } = useTranslation("search");

    const swiperRef = useRef(null);

    const [showAll, setShowAll] = useState(false);

    const handleSwiperNext = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slideNext();
        }
    };
    const handleSwiperPrev = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const getIntervals = (start, end, interval) => {
        const intervals = [];
        let currentTime = new Date(`1970-01-01T${start}`);
        const endTime = new Date(`1970-01-01T${end}`);

        while (currentTime <= endTime) {
            intervals.push(currentTime.toTimeString().slice(0, 5)); // Push time in HH:MM format
            currentTime = new Date(currentTime.getTime() + interval * 60000); // Add interval in milliseconds
        }

        return intervals;
    };

    const appointementIntervals = (
        morningStartTime,
        morningEndTime,
        eveningStartTime,
        eveningEndTime,
        interval,
        bookedSlots = [],
        date = null
    ) => {
        // Generate morning and evening intervals
        const morningIntervals = getIntervals(
            morningStartTime,
            morningEndTime,
            interval
        );
        const eveningIntervals = getIntervals(
            eveningStartTime,
            eveningEndTime,
            interval
        );

        // Combine both sessions' intervals
        let allIntervals = [...morningIntervals, ...eveningIntervals];

        // Filter out booked slots
        if (bookedSlots && bookedSlots.length > 0) {
            allIntervals = allIntervals.filter(
                (time) => !bookedSlots.includes(time)
            );
        }

        // Filter out past times if it's today
        if (date) {
            const today = new Date().toISOString().split("T")[0];
            if (date === today) {
                const currentTime = new Date().toTimeString().slice(0, 5);
                allIntervals = allIntervals.filter((time) => time > currentTime);
            }
        }

        return allIntervals;
    };

    return (
        <div className="grid grid-cols-10">
            {true && (
                <img
                    src={Icons.LeftArrowLine}
                    alt="icon left arrow"
                    className="mx-auto cursor-pointer"
                    onClick={handleSwiperPrev}
                />
            )}
            <div className={`col-span-8 `}>
                <CustomSwiper slides={5} ref={swiperRef}>
                    {[...data]?.map((item, idx) => {
                        const availableTimes = appointementIntervals(
                            item?.morningStartTime,
                            item?.morningEndTime,
                            item?.eveningStartTime,
                            item?.eveningEndTime,
                            item?.patientInterval,
                            item?.bookedSlots || [], // Use booked slots from data
                            item?.date
                        );

                        // Only render the slide if there are available times
                        if (availableTimes.length === 0) {
                            return null;
                        }

                        return (
                            <SwiperSlide key={idx}>
                                <TimeDay
                                    showAll={showAll}
                                    day={item?.date}
                                    value={value}
                                    setValue={setValue}
                                    times={availableTimes}
                                />
                            </SwiperSlide>
                        );
                    })}
                </CustomSwiper>
                <div
                    className="flex items-center w-full justify-center space-x-2 mt-4 cursor-pointer"
                    onClick={() => setShowAll((s) => !s)}
                >
                    <p>{showAll ? t("doctor.moins") : t("doctor.plus")}</p>
                    <div className="bg-stone-300 rounded-2xl p-px">
                        <img
                            src={Icons.ArrowDown}
                            alt="icon arrow down"
                            className={`w-5 ${showAll && "rotate-180"}`}
                        />
                    </div>
                </div>
            </div>
            {true && (
                <img
                    src={Icons.RightArrowLine}
                    alt="icon right arrow"
                    className="mx-auto cursor-pointer"
                    onClick={handleSwiperNext}
                />
            )}
        </div>
    );
};

export default CallendarRdv;

const TimeDay = ({ day, times, showAll, setValue, value }) => {
    return (
        <div className={`${showAll ? "h-fit" : "h-[150px] overflow-y-hidden"}`}>
            <p className="text-neutral-400 text-xs mb-2 text-center">
                {new Date(day).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                })}
            </p>
            {times.length === 0 ? (
                <p className="text-neutral-400 text-xs text-center mt-4">
                    No availability
                </p>
            ) : (
                <ul className="space-y-2">
                    {times.map((time, idx) => (
                        <li
                            onClick={() => {
                                if (value !== null)
                                    setValue(
                                        `${time}|${addMinutesToTime(
                                            time,
                                            30
                                        )}|${day}`
                                    );
                            }}
                            key={idx}
                            className={`${
                                value !== null &&
                                "cursor-pointer hover:bg-opacity-80"
                            } ${
                                value?.substring(0, 22) ===
                                `${time}|${addMinutesToTime(
                                    time,
                                    30
                                )}|${day?.substring(0, 10)}`
                                    ? "bg-green-600"
                                    : "bg-sky-500"
                            } rounded px-px py-2 text-xs font-medium text-white text-center`}
                        >
                            {time}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

function addMinutesToTime(time, minutesToAdd) {
    // Parse the input time
    const [hours, minutes] = time.split(":").map(Number);

    // Create a new Date object with today's date and the given time
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    // Add the minutes
    date.setMinutes(date.getMinutes() + minutesToAdd);

    // Format the new time as HH:mm
    const updatedHours = String(date.getHours()).padStart(2, "0");
    const updatedMinutes = String(date.getMinutes()).padStart(2, "0");

    return `${updatedHours}:${updatedMinutes}`;
}