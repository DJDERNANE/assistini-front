import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const CardCircleChart = ({ labels = [], data = [] }) => {
    const options = {
        chart: {
            type: "donut",
            width: 200,
        },
        labels: labels,
    };

    console.log(data?.map((item) => item.percentage));

    return (
        <div className="bg-gray-100 rounded-xl p-2 h-[100px] md:h-full w-full flex items-center justify-center">
            <div id="chart" className="w-[350px] !h-full">
                <ReactApexChart
                    options={options ?? {}}
                    series={data?.map((item) => item.count)}
                    labels={labels}
                    type="donut"
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default CardCircleChart;
