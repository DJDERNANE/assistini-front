/** @format */

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomInput from "../../../../components/custom/CustomInput";
import { useNavigate } from "react-router-dom";

const FormPatientData = ({ setData }) => {
    const { t } = useTranslation("rdvs");

    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [addresse, setAddresse] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [motif, setMotif] = useState("");
    const [entreprise, setEntreprise] = useState("");
    const [sexe, setSexe] = useState("");

    useEffect(() => {
        setData({
            prenom,
            nom,
            location: addresse,
            birthday: "1990-01-01",
            email,
            phone,
            motif,
            entreprise,
            sexe,
        });
    }, [prenom, nom, addresse, email, phone, motif, entreprise, sexe]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-3">
            <div>
                <div className="text-xs mb-1">
                    <label className="capitalize text-[#5A607F]">
                        {t("new.firstname")}
                    </label>
                </div>
                <input
                    onChange={(e) => setPrenom(e.target.value)}
                    value={prenom}
                    className={`!text-neutral-700 h-[40px] !px-4 !text-xs !py-3 !w-full !bg-white border !border-[#D3E1FF] !rounded-lg`}
                ></input>
            </div>
            <div>
                <div className="text-xs mb-1">
                    <label className="capitalize text-[#5A607F]">
                        {t("new.lastname")}
                    </label>
                </div>
                <input
                    onChange={(e) => setNom(e.target.value)}
                    value={nom}
                    className={`!text-neutral-700 h-[40px] !px-4 !text-xs !py-3 !w-full !bg-white border !border-[#D3E1FF] !rounded-lg`}
                ></input>
            </div>
            <div>
                <div className="text-xs mb-1">
                    <label className="capitalize text-[#5A607F]">
                        {t("new.address")}
                    </label>
                </div>
                <input
                    onChange={(e) => setAddresse(e.target.value)}
                    value={addresse}
                    className={`!text-neutral-700 h-[40px] !px-4 !text-xs !py-3 !w-full !bg-white border !border-[#D3E1FF] !rounded-lg`}
                ></input>
            </div>
            <div>
                <div className="text-xs mb-1">
                    <label className="capitalize text-[#5A607F]">
                        {t("new.email")}
                    </label>
                </div>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className={`!text-neutral-700 h-[40px] !px-4 !text-xs !py-3 !w-full !bg-white border !border-[#D3E1FF] !rounded-lg`}
                ></input>
            </div>
            <div>
                <div className="text-xs mb-1">
                    <label className="capitalize text-[#5A607F]">
                        {t("new.phone")}
                    </label>
                </div>
                <input
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    className={`!text-neutral-700 h-[40px] !px-4 !text-xs !py-3 !w-full !bg-white border !border-[#D3E1FF] !rounded-lg`}
                ></input>
            </div>
            <div>
                <div className="text-xs mb-1">
                    <label className="capitalize text-[#5A607F]">
                        {t("new.motif")}
                    </label>
                </div>
                <input
                    onChange={(e) => setMotif(e.target.value)}
                    value={motif}
                    className={`!text-neutral-700 h-[40px] !px-4 !text-xs !py-3 !w-full !bg-white border !border-[#D3E1FF] !rounded-lg`}
                ></input>
            </div>
            <div>
                <div className="text-xs mb-1">
                    <label className="capitalize text-[#5A607F]">
                        {t("new.company")}
                    </label>
                </div>
                <input
                    onChange={(e) => setEntreprise(e.target.value)}
                    value={entreprise}
                    className={`!text-neutral-700 h-[40px] !px-4 !text-xs !py-3 !w-full !bg-white border !border-[#D3E1FF] !rounded-lg`}
                ></input>
            </div>
            <div>
                <div className="text-xs mb-1">
                    <label className="capitalize text-[#5A607F]">
                        {t("new.sexe")}
                    </label>
                </div>
                <input
                    onChange={(e) => setSexe(e.target.value)}
                    value={sexe}
                    className={`!text-neutral-700 h-[40px] !px-4 !text-xs !py-3 !w-full !bg-white border !border-[#D3E1FF] !rounded-lg`}
                ></input>
            </div>
        </div>
    );
};

export default FormPatientData;
