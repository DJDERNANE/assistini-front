import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../custom/CustomButton";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Icons, Images } from "../../constants";

const RDVSection = () => {
  const { t } = useTranslation("welcome");
  const [slideActive, setSlideActive] = useState(0);

  return (
    <div className="bg-[#FCF8F3] py-20 md:py-40">
      <div className="responsive grid grid-cols-1 md:grid-cols-5 gap-x-48">
        <div className="flex flex-col justify-center md:col-span-2">
          <h1 className="text-neutral-700 text-2xl md:text-4xl font-bold mb-4">
            {t("rdv_section.title")}
          </h1>
          <p className=" text-zinc-600 text-sm md:text-base font-normal mb-8">
            {t("rdv_section.description")}
          </p>
          <div className="w-full flex justify-center md:block">
            <div className="w-40 md:w-60">
              <CustomButton name={t("rdv_section.explore")} />
            </div>
          </div>
        </div>
        <div className="md:col-start-3 md:col-span-3 mt-10 md:mt-0">
          <Swiper
            cssMode={true}
            navigation={false}
            pagination={{ clickable: true }}
            mousewheel={true}
            keyboard={true}
            modules={[Pagination, Mousewheel, Keyboard]}
            slidesPerView={2}
            spaceBetween={30}
            onSlideChange={(s) => setSlideActive(s.activeIndex)}
            className="mySwiper h-[300px] md:h-[500px]"
          >
            {["RDV1", "RDV2", "RDV3", "RDV5", "RDV6"].map((item, idx) => (
              <SwiperSlide key={idx} className="!w-fit">
                <div
                  className={`${
                    slideActive === idx
                      ? "w-[200px] h-[300px] md:w-[300px] md:h-[400px] xl:w-[400px] xl:h-[500px] transform duration-500"
                      : "w-[100px] h-[200px] md:w-[200px] md:h-[300px] xl:w-[300px] xl:h-[400px] transform duration-500"
                  }`}
                >
                  <img
                    src={Images[item]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  {slideActive === idx && (
                    <div className="absolute md:left-10 left-4 md:bottom-10 bottom-4 flex items-end">
                      <div className="bg-white bg-opacity-70 backdrop-blur-sm p-3 md:p-6">
                        <p className="text-zinc-600 text-xs md:text-base font-normal capitalize">
                          01 -- bed room
                        </p>
                        <h4 className="text-neutral-700 text-base font-medium md:text-3xl capitalize">
                          inner peace
                        </h4>
                      </div>
                      <div className="bg-blue-600 p-2 md:p-3">
                        <img
                          src={Icons.RightArrowLineWhite}
                          alt=""
                          className="w-3 md:w-fit"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default RDVSection;
