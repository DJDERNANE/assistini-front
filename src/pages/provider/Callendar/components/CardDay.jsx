import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

const CardDay = ({ title, register }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { t } = useTranslation("rdvs");

  return (
    <div>
      <div className="space-y-4">
        <div>
          <p className="mb-2 first-letter:capitalize font-semibold">
            {t("calendar.start-date")}
          </p>

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            isClearable
            // placeholderText="Select start date"
            className="bg-gray-100 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <p className="mb-2 first-letter:capitalize font-semibold">
            {t("calendar.end-date")}
          </p>

          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            isClearable
            className="bg-gray-100 rounded-lg px-4 py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default CardDay;
