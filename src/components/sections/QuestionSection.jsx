/** @format */

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
import icons from "../../constants/icons";

const QuestionSection = () => {
    const { t } = useTranslation("welcome");
    const [slideActive, setSlideActive] = useState(0);

    return (
        <div className="bg-[#FCF8F3] pt-20 md:pt-32">
            <div className="responsive grid md:grid-cols-2">
                <div className="flex flex-col justify-center">
                    <div className="flex items-start space-x-2">
                        <div className="w-3 h-3 rounded-full bg-primary-200 mt-0.5"></div>
                        <h3 className="text-stone-700 text-xs font-normal text-center">
                            {t("question.sub-title")}
                        </h3>
                    </div>
                    <h1 className="text-blue-950 text-3xl font-bold mt-2 md:w-[200px]">
                        {t("question.title")}
                    </h1>
                    <p className="text-gray-400 italic mt-6 md:w-2/3">
                        {t("question.sub-sub-title")}
                    </p>
                    <div className="w-1/3 border-t border-gray-400 mt-10"></div>
                </div>

                <div>
                    <Accordion className="space-y-4">
                        <AccordionItem className="bg-[#E7E0D8] rounded-xl border-none w-full py-4">
                            <h2>
                                <AccordionButton className="flex items-center justify-between">
                                    <div className="text-blue-950 font-bold">
                                        {t("question.acc-title-1")}
                                    </div>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                {t("question.acc-desp-1")}
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem className="bg-[#E7E0D8] rounded-xl border-none w-full py-4">
                            <h2>
                                <AccordionButton className="flex items-center justify-between">
                                    <div className="text-blue-950 font-bold">
                                        {t("question.acc-title-2")}
                                    </div>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                {t("question.acc-desp-2")}
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem className="bg-[#E7E0D8] rounded-xl border-none w-full py-4">
                            <h2>
                                <AccordionButton className="flex items-center justify-between">
                                    <div className="text-blue-950 font-bold">
                                        {t("question.acc-title-3")}
                                    </div>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                {t("question.acc-desp-3")}
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem className="bg-[#E7E0D8] rounded-xl border-none w-full py-4">
                            <h2>
                                <AccordionButton className="flex items-center justify-between">
                                    <div className="text-blue-950 font-bold">
                                        {t("question.acc-title-4")}
                                    </div>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                {t("question.acc-desp-4")}
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem className="bg-[#E7E0D8] rounded-xl border-none w-full py-4">
                            <h2>
                                <AccordionButton className="flex items-center justify-between">
                                    <div className="text-blue-950 font-bold">
                                        {t("question.acc-title-5")}
                                    </div>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                {t("question.acc-desp-5")}
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default QuestionSection;
