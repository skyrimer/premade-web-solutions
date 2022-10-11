const getRandomNumber = (min = 50, max = 100) => {
  return Math.random() * (max - min) + min;
};
const randomDataSet = [
  getRandomNumber(),
  getRandomNumber(),
  getRandomNumber(),
  getRandomNumber(),
  getRandomNumber(),
  getRandomNumber(),
];
const chartsConfig = [
  // 1
  {
    type: "line",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "Number of Votes",
          data: randomDataSet,
          backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          color: "#fff",
          borderWidth: 1,
        },
      ],
    },
    options: {
      layout: {
        padding: {
          top: 40,
          bottom: 40,
          left: 20,
          right: 20,
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          padding: 20,
          labels: {
            font: {
              size: 16,
              family: "Nunito",
              style: "italic",
              weight: 700,
            },
          },
        },
        title: {
          display: true,
          text: "Simple line chart",
          fullSize: false,
          padding: {
            top: 0,
            bottom: 20,
            left: 0,
            right: 0,
          },
          font: {
            size: 22,
            color: "rgb(255,255,255)",
            font: "Nunito",
          },
        },
      },
    },
  },
  // 2
  {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "Number of Votes",
          data: randomDataSet,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          color: "#fff",
          borderWidth: 1,
        },
      ],
    },
    options: {
      layout: {
        padding: {
          top: 40,
          bottom: 40,
          left: 20,
          right: 20,
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          padding: 20,
          labels: {
            font: {
              size: 16,
              family: "Nunito",
              style: "italic",
              weight: 700,
            },
          },
        },
        title: {
          display: true,
          text: "Simple bar chart",
          fullSize: false,
          padding: {
            top: 0,
            bottom: 20,
            left: 0,
            right: 0,
          },
          font: {
            size: 22,
            font: "Nunito",
          },
        },
      },
    },
  },
  // 3
  {
    type: "bubble",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "Number of Votes",
          data: [
            { x: getRandomNumber(), y: getRandomNumber(), r: getRandomNumber(5, 15) },
            { x: getRandomNumber(), y: getRandomNumber(), r: getRandomNumber(5, 15) },
            { x: getRandomNumber(), y: getRandomNumber(), r: getRandomNumber(5, 15) },
            { x: getRandomNumber(), y: getRandomNumber(), r: getRandomNumber(5, 15) },
            { x: getRandomNumber(), y: getRandomNumber(), r: getRandomNumber(5, 15) },
            { x: getRandomNumber(), y: getRandomNumber(), r: getRandomNumber(5, 15) },
            { x: getRandomNumber(), y: getRandomNumber(), r: getRandomNumber(5, 15) },
            { x: getRandomNumber(), y: getRandomNumber(), r: getRandomNumber(5, 15) },
            { x: getRandomNumber(), y: getRandomNumber(), r: getRandomNumber(5, 15) },
            { x: getRandomNumber(), y: getRandomNumber(), r: getRandomNumber(5, 15) },
            { x: getRandomNumber(), y: getRandomNumber(), r: getRandomNumber(5, 15) },
            { x: getRandomNumber(), y: getRandomNumber(), r: getRandomNumber(5, 15) },
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          color: "#fff",
          borderWidth: 1,
        },
      ],
    },
    options: {
      layout: {
        padding: {
          top: 40,
          bottom: 40,
          left: 20,
          right: 20,
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          padding: 20,
          labels: {
            font: {
              size: 16,
              family: "Nunito",
              style: "italic",
              weight: 700,
            },
          },
        },
        title: {
          display: true,
          text: "Simple bubble chart",
          fullSize: false,
          padding: {
            top: 0,
            bottom: 20,
            left: 0,
            right: 0,
          },
          font: {
            size: 22,
            font: "Nunito",
          },
        },
      },
    },
  },
  // 4
  {
    type: "scatter",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "Number of Votes",
          data: [
            { x: getRandomNumber(), y: getRandomNumber() },
            { x: getRandomNumber(), y: getRandomNumber() },
            { x: getRandomNumber(), y: getRandomNumber() },
            { x: getRandomNumber(), y: getRandomNumber() },
            { x: getRandomNumber(), y: getRandomNumber() },
            { x: getRandomNumber(), y: getRandomNumber() },
            { x: getRandomNumber(), y: getRandomNumber() },
            { x: getRandomNumber(), y: getRandomNumber() },
            { x: getRandomNumber(), y: getRandomNumber() },
            { x: getRandomNumber(), y: getRandomNumber() },
            { x: getRandomNumber(), y: getRandomNumber() },
            { x: getRandomNumber(), y: getRandomNumber() },
            { x: getRandomNumber(), y: getRandomNumber() },
            { x: getRandomNumber(), y: getRandomNumber() },
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          color: "#fff",
          borderWidth: 1,
        },
      ],
    },
    options: {
      layout: {
        padding: {
          top: 40,
          bottom: 40,
          left: 20,
          right: 20,
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          padding: 20,
          labels: {
            font: {
              size: 16,
              family: "Nunito",
              style: "italic",
              weight: 700,
            },
          },
        },
        title: {
          display: true,
          text: "Simple scatter diagram",
          fullSize: false,
          padding: {
            top: 0,
            bottom: 20,
            left: 0,
            right: 0,
          },
          font: {
            size: 22,
            font: "Nunito",
          },
        },
      },
    },
  },
  // 5
  {
    type: "pie",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "Number of Votes",
          data: randomDataSet,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          color: "#fff",
          borderWidth: 1,
        },
      ],
    },
    options: {
      layout: {
        padding: {
          top: 40,
          bottom: 40,
          left: 20,
          right: 20,
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          padding: 20,
          labels: {
            font: {
              size: 16,
              family: "Nunito",
              style: "italic",
              weight: 700,
            },
          },
        },
        title: {
          display: true,
          text: "Simple pie chart",
          fullSize: false,
          padding: {
            top: 0,
            bottom: 20,
            left: 0,
            right: 0,
          },
          font: {
            size: 22,
            font: "Nunito",
          },
        },
      },
    },
  },
  // 6
  {
    type: "polarArea",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "Number of Votes",
          data: randomDataSet,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          color: "#fff",
          borderWidth: 1,
        },
      ],
    },
    options: {
      layout: {
        padding: {
          top: 40,
          bottom: 40,
          left: 20,
          right: 20,
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          padding: 20,
          labels: {
            font: {
              size: 16,
              family: "Nunito",
              style: "italic",
              weight: 700,
            },
          },
        },
        title: {
          display: true,
          text: "Simple polarArea chart",
          fullSize: false,
          padding: {
            top: 0,
            bottom: 20,
            left: 0,
            right: 0,
          },
          font: {
            size: 22,
            font: "Nunito",
          },
        },
      },
    },
  },
  // 7
  {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "Number of Votes",
          data: randomDataSet,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          color: "#fff",
          borderWidth: 10,
        },
      ],
    },
    options: {
      layout: {
        padding: {
          top: 40,
          bottom: 40,
          left: 20,
          right: 20,
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          padding: 20,
          labels: {
            font: {
              size: 16,
              family: "Nunito",
              style: "italic",
              weight: 700,
            },
          },
        },
        title: {
          display: true,
          text: "Simple doughnut chart",
          fullSize: false,
          padding: {
            top: 0,
            bottom: 20,
            left: 0,
            right: 0,
          },
          font: {
            size: 22,
            font: "Nunito",
          },
        },
      },
    },
  },
];

canvasList = document.querySelectorAll("canvas.chart");
for (let index = 0; index < canvasList.length; index++) {
  new Chart(canvasList[index].getContext("2d"), chartsConfig[index]);
}
