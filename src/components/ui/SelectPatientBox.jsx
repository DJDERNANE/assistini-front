/** @format */

import React, { useState } from "react";
import { Icons } from "../../constants";

const SelectPatientBox = ({ data, selected, setSelected }) => {
    return (
        <div className="bg-gray-100 rounded-md p-4 flex flex-wrap">
            {data?.length === 0 && "(vide)"}
            {data.map((patient) => (
                <div
                    onClick={() => setSelected(patient?.name)}
                    className={` ${
                        selected === patient?.name
                            ? "bg-blue-600"
                            : "bg-blue-500 cursor-pointer"
                    }  rounded-md justify-center items-center text-white uppercase p-2 w-fit inline-block mb-2 mr-2 text-sm md:text-base`}
                    key={patient?.id}
                >
                    {patient?.name}
                </div>
            ))}
            {selected && (
                <img
                    src={Icons.PlusCircle}
                    alt=""
                    className="rotate-45 cursor-pointer"
                    onClick={() => setSelected(null)}
                />
            )}
        </div>
    );
};

export default SelectPatientBox;
