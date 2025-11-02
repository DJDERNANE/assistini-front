/** @format */

import React, { useState } from "react";
import { Icons } from "../../constants";

const SelectPatientBox = ({ data, selected, setSelected  }) => {
    return (
        <div className="bg-gray-100 rounded-md p-4 flex flex-wrap">
            {data?.length === 0 && "(vide)"}
            {data.map((patient) => (
                <div
                    onClick={() => {console.log("patieeeent : ::: ", patient);setSelected(patient)}}
                    className={` ${
                        selected?.name == patient?.name
                            ? "bg-blue-600"
                            : "bg-blue-500 cursor-pointer"
                    } text-[12px] rounded-md justify-center items-center text-white uppercase p-1 w-fit inline-block m-1`}
                    key={patient?.id}
                >
                    {patient?.name} {patient?.prenom}
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
