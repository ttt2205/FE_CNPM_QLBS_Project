import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const LineChart = () => {
  // State cho dữ liệu gốc và dữ liệu hiển thị
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState({
    dates: [],
    counts: [],
  });

  // State cho loại thống kê và giá trị được chọn
  const [statType, setStatType] = useState("month"); // "month" hoặc "year"
  const [selectedMonth, setSelectedMonth] = useState("01"); // Mặc định là tháng 1
  const [selectedYear, setSelectedYear] = useState("2024"); // Mặc định là năm 2024

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Số lượt truy cập",
        data: [0], // Dữ liệu số lượt truy cập
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
        fontFamily: "inherit",
      },
      xaxis: {
        categories: ["time"], // Trục thời gian
        title: {
          text: "Ngày/Tháng",
        },
      },
      yaxis: {
        title: {
          text: "Số lượt truy cập",
        },
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Thống kê số lượt truy cập",
        align: "center",
      },
    },
  });

  // Tạo dữ liệu mẫu khi component mount
  useEffect(() => {
    const generateSampleData = () => {
      const startDate = new Date(2020, 0, 1); // 1/1/2024
      const days = 365 * 5; // Số ngày
      let data = [];

      for (let i = 0; i < days; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const formattedDate = date.toISOString().split("T")[0]; // Format YYYY-MM-DD
        data.push({
          date: formattedDate,
          count: Math.floor(Math.random() * 50) + 1, // Random lượt truy cập
        });
      }

      setOriginalData((prevData) => {
        setChartData((prevState) => ({
          ...prevState,
          series: [
            {
              ...prevState.series[0],
              data: data.map((item) => item.count),
            },
          ],
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: data.map((item) => item.date),
            },
          },
        }));

        return data;
      });
    };

    generateSampleData();
  }, []);

  useEffect(() => {
    let newData = [];
    for (let i = 0; i < 12; i++) {
      newData.push(
        originalData
          .filter((item) => {
            const [year, month] = item.date.split("-");
            return parseInt(month) === i + 1 && year === selectedYear;
          })
          .reduce((sum, item) => sum + item.count, 0)
      );
    }
    setChartData((prevState) => ({
      ...prevState,
      series: [
        {
          ...prevState.series[0],
          data: newData,
        },
      ],
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: Array.from({ length: 12 }, (_, i) => {
            return "Tháng " + (i + 1);
          }),
        },
        title: {
          ...prevState.options.title,
          text: "Thống kê số lượt truy cập năm " + selectedYear,
        },
      },
    }));
  }, [selectedYear]);

  useEffect(() => {
    let newData = [];
    for (let i = 0; i < 31; i++) {
      newData.push(
        originalData
          .filter((item) => {
            const [year, month, day] = item.date.split("-");
            return (
              parseInt(day) === i + 1 &&
              month === selectedMonth &&
              year === selectedYear
            );
          })
          .reduce((sum, item) => sum + item.count, 0)
      );
    }
    setChartData((prevState) => ({
      ...prevState,
      series: [
        {
          ...prevState.series[0],
          data: newData,
        },
      ],
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: Array.from({ length: 31 }, (_, i) => {
            return "Ngay " + (i + 1);
          }),
        },
        title: {
          ...prevState.options.title,
          text:
            "Thống kê số lượt truy cập tháng " +
            selectedMonth +
            "/" +
            selectedYear,
        },
      },
    }));
  }, [selectedMonth]);

  return (
    <div>
      <h1>Thống kê số lượt truy cập</h1>
      <div className="row mb-3">
        <div className="col-3">
          <select
            className="form-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {Array.from({ length: 12 }, (_, i) => {
              const month = (i + 1).toString().padStart(2, "0");
              return (
                <option value={month} key={month}>
                  Tháng {month}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-3">
          <select
            className="form-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {["2021", "2022", "2023", "2024", "2025"].map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={() => {
          let newData = [];
          for (let i = 0; i < 5; i++) {
            newData.push(
              originalData
                .filter((item) => {
                  const [year] = item.date.split("-");
                  return year === "202" + i;
                })
                .reduce((sum, item) => sum + item.count, 0)
            );
          }
          setChartData((prevState) => ({
            ...prevState,
            series: [
              {
                ...prevState.series[0],
                data: newData,
              },
            ],
            options: {
              ...prevState.options,
              xaxis: {
                ...prevState.options.xaxis,
                categories: Array.from({ length: 5 }, (_, i) => {
                  return "202" + i;
                }),
              },
            },
          }));
        }}
      >
        Theo tung nam
      </button>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChart;
