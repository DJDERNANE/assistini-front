import React from "react";
import ReactApexChart from "react-apexcharts";

const CardBarChart = ({ data, title }) => {
    const options = {
        chart: {
            type: "bar",
            //   height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "25%",
                endingShape: "rounded",
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
        },
        xaxis: {
            categories: data?.map((item) => item.month) ?? [],
        },
        yaxis: {
            title: {
                text: title,
            },
        },
        // fill: {
        //   opacity: 1,
        // },
    };

    const series = [
        {
            name: "Net Profit",
            data: data?.map((item) => item.count),
        },
    ];

    return (
        <div className="bg-gray-100 rounded-xl p-2 h-full">
            <div id="chart" className="h-[180px]">
                <ReactApexChart
                    options={options ?? {}}
                    series={series ?? []}
                    type="bar"
                    height={180}
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default CardBarChart;
