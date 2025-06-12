import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { format, isSameDay } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

const CardCalendar = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    highlightedDates = [],
}) => {
    const { t } = useTranslation("rdvs");

    // Custom day component to add dots on specific dates
    const renderDayContents = (day, date) => {
        const isHighlighted = highlightedDates.some((highlightedDate) =>
            isSameDay(date, new Date(highlightedDate))
        );
        return (
            <div className="relative">
                <span>{day}</span>
                {isHighlighted && (
                    <span className="absolute w-4 h-1 bg-blue-600 rounded-full bottom-0 left-1/2 transform -translate-x-1/2 mt-1"></span>
                )}
            </div>
        );
    };

    return (
        <div className="md:p-4 bg-white rounded-lg w-full">
            <div className="flex items-start md:space-x-4">
                {/* <div className="space-y-3 w-[150px]">
                    <button
                        className="py-2 px-4 bg-gray-100 rounded-md w-full"
                        onClick={() => {
                            setStartDate(new Date());
                            // setEndDate(new Date());
                        }}
                    >
                        Aujourd'hui
                    </button>
                    <button className="py-2 px-4 bg-gray-100 rounded-md w-full">
                        Cette semaine
                    </button>
                    <button className="py-2 px-4 bg-gray-100 rounded-md w-full">
                        Ce mois
                    </button>
                </div> */}

                <div>
                    <div className="flex flex-col md:flex-row items-start justify-between space-y-4 md:space-y-0 md:!space-x-4">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            startDate={startDate}
                            endDate={endDate}
                            selectsStart
                            inline
                            calendarClassName="custom-datepicker"
                            dayClassName={(date) =>
                                date >= startDate && date <= endDate
                                    ? "!bg-blue-600 text-white !rounded-full"
                                    : undefined
                            }
                            renderDayContents={(day, date) =>
                                renderDayContents(day, date)
                            }
                        />
                        <div></div>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            startDate={startDate}
                            endDate={endDate}
                            selectsEnd
                            inline
                            minDate={startDate}
                            calendarClassName="custom-datepicker"
                            dayClassName={(date) =>
                                date >= startDate && date <= endDate
                                    ? "!bg-blue-600 text-white !rounded-full"
                                    : undefined
                            }
                            renderDayContents={(day, date) =>
                                renderDayContents(day, date)
                            }
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <input
                            type="text"
                            readOnly
                            value={
                                startDate
                                    ? format(startDate, "MMM d, yyyy")
                                    : ""
                            }
                            placeholder="Date de debut"
                            className="w-full px-4 py-2 border rounded-md text-center outline-none"
                        />
                        <span className="mx-2">-</span>
                        <input
                            type="text"
                            readOnly
                            value={
                                endDate ? format(endDate, "MMM d, yyyy") : ""
                            }
                            placeholder="Date de fin"
                            className="w-full px-4 py-2 border rounded-md text-center outline-none"
                        />
                    </div>

                    <div className="flex items-center justify-end space-x-3 mt-4 w-full">
                        <button
                            className="py-2 px-4 bg-gray-100 rounded-md"
                            onClick={() => {
                                setStartDate(null);
                                setEndDate(null);
                            }}
                        >
                            {t("calendar.clear")}
                        </button>
                        {/* <button className="py-2 px-4 bg-blue-600 text-white rounded-md">
              Appliquer
            </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardCalendar;
