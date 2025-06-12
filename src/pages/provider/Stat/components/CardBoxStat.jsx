import React from "react";
import { useTranslation } from "react-i18next";

const CardBoxStat = ({ data }) => {
    const { t } = useTranslation("stat");

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-[#e3e5ff] rounded-xl p-3 space-y-3">
                <h3 className="text-sm font-semibold">
                    {t("general.status-pending")}
                </h3>
                <div className="flex items-center justify-between">
                    <p className="text-2xl font-semibold">
                        {data?.statusStats?.find(
                            (item) => item.status === "pending"
                        )?.count ?? 0}
                    </p>
                    <p className="text-xs text-gray-600">
                        {data?.statusStats?.find(
                            (item) => item.status === "pending"
                        )?.percentage ?? "0%"}
                    </p>
                </div>
            </div>
            <div className="bg-[#e5ecf6] rounded-xl p-3 space-y-3">
                <h3 className="text-sm font-semibold">
                    {t("general.status-closed")}
                </h3>
                <div className="flex items-center justify-between">
                    <p className="text-2xl font-semibold">
                        {data?.statusStats?.find(
                            (item) => item.status === "closed"
                        )?.count ?? 0}
                    </p>
                    <p className="text-xs text-gray-600">
                        {data?.statusStats?.find(
                            (item) => item.status === "closed"
                        )?.percentage ?? "0%"}
                    </p>
                </div>
            </div>
            <div className="bg-[#e3e5ff] rounded-xl p-3 space-y-3">
                <h3 className="text-sm font-semibold">
                    {t("general.status-confirmed")}
                </h3>
                <div className="flex items-center justify-between">
                    <p className="text-2xl font-semibold">
                        {data?.statusStats?.find(
                            (item) => item.status === "confirmed"
                        )?.count ?? 0}
                    </p>
                    <p className="text-xs text-gray-600">
                        {data?.statusStats?.find(
                            (item) => item.status === "confirmed"
                        )?.percentage ?? "0%"}
                    </p>
                </div>
            </div>
            <div className="bg-[#e5ecf6] rounded-xl p-3 space-y-3">
                <h3 className="text-sm font-semibold">
                    {t("general.type-consultation")}
                </h3>
                <div className="flex items-center justify-between">
                    <p className="text-2xl font-semibold">
                        {data?.typeStats?.find(
                            (item) => item.type === "consultation"
                        )?.count ?? 0}
                    </p>
                    <p className="text-xs text-gray-600">
                        {data?.typeStats?.find(
                            (item) => item.type === "consultation"
                        )?.percentage ?? "0%"}
                    </p>
                </div>
            </div>
            <div className="bg-[#e3e5ff] rounded-xl p-3 space-y-3">
                <h3 className="text-sm font-semibold">
                    {t("general.type-test")}
                </h3>
                <div className="flex items-center justify-between">
                    <p className="text-2xl font-semibold">
                        {data?.typeStats?.find((item) => item.type === "test")
                            ?.count ?? 0}
                    </p>
                    <p className="text-xs text-gray-600">
                        {data?.typeStats?.find((item) => item.type === "test")
                            ?.percentage ?? "0%"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardBoxStat;
