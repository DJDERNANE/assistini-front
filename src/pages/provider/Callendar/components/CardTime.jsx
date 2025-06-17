import React, { useState } from "react";

const CardTime = ({ title, time1, setTime1, time2, setTime2 }) => {
    const incrementTime = (time, setTime) => {
        setTime((prevTime) => {
            let newTime = { ...prevTime };
            newTime.minutes = (newTime.minutes + 30) % 60;
            if (newTime.minutes === 0) {
                newTime.hours = (newTime.hours + 1) % 24;
            }
            return newTime;
        });
    };

    const decrementTime = (time, setTime) => {
        setTime((prevTime) => {
            let newTime = { ...prevTime };
            newTime.minutes = (newTime.minutes - 30 + 60) % 60;
            if (newTime.minutes === 30) {
                newTime.hours = (newTime.hours - 1 + 24) % 24;
            }
            return newTime;
        });
    };

    const formatTime = ({ hours, minutes }) => {
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
        )}`;
    };

    return (
        <div className="md:w-80 mt-4 md:mt-0 p-4 bg-white rounded-lg border flex flex-col">
            <h2 className="text-gray-700 font-medium mb-4">{title}</h2>
            <div className="flex space-x-4">
                {[
                    { time: time1, setTime: setTime1 },
                    { time: time2, setTime: setTime2 },
                ].map(({ time, setTime }, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center space-y-2"
                    >
                        <div className="relative flex items-center">
                            <div className="px-4 py-2 border rounded-md font-semibold md:text-lg w-20 text-center whitespace-nowrap min-w-[5rem]">
                                {formatTime(time)}
                            </div>
                            <div className="flex flex-col ml-2">
                                <button
                                    onClick={() =>
                                        incrementTime(time, setTime, "hours")
                                    }
                                    className="text-blue-500 focus:outline-none"
                                >
                                    ⬆️
                                </button>
                                <button
                                    onClick={() =>
                                        decrementTime(time, setTime, "hours")
                                    }
                                    className="text-blue-500 focus:outline-none"
                                >
                                    ⬇️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardTime;
