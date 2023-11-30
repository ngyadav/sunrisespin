/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");

/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 45, maxDegree: 90, value: "Headphones" },
  { minDegree: 0, maxDegree: 44, value: "Airpodes" },
  { minDegree: 315, maxDegree: 359, value: "Cashback" },
  { minDegree: 270, maxDegree: 314, value: "Speaker" },
  { minDegree: 225, maxDegree: 269, value: "Earphones" },
  { minDegree: 180, maxDegree: 224, value: "Smartwatch" },
  { minDegree: 135, maxDegree: 179, value: "Neckband" },
  { minDegree: 91, maxDegree: 134, value: "Better Luck Next Time" },
];

/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10];

/* --------------- Background Colors  --------------------- */
const spinColors = [
  "#E74C3C",
  "#7D3C98",
  "#2E86C1",
  "#138D75",
  "#F1C40F",
  "#D35400",
  "#138D75",  
  "#F1C40F",
];

/* --------------- Chart --------------------- */
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'], // Update labels for 8 values
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});




/* --------------- Display Value Based On The Angle --------------------- */

// Function to manually return to the spinning wheel when clicking on the overlay
function returnToWheel() {
  const blastOverlay = document.getElementById("blastOverlay");

  // Hide the overlay
  blastOverlay.style.display = "none";

  // Clear the winning value
  winningValue = null;
}

// Updated generateValue function
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      const currentWinningValue = i.value;
      const isBetterLuckNextTime = currentWinningValue.toLowerCase() === "better luck next time";

      setTimeout(() => {
        text.innerHTML = `<p class="win-message">${isBetterLuckNextTime ? "Better Luck Next Time" : `Congratulations, You Have Won ${currentWinningValue}!`}</p>`;
        const blastOverlay = document.getElementById("blastOverlay");
        const wonValue = document.getElementById("wonValue");
        const wonImage = document.getElementById("wonImage");
        const wonImageContainer = document.getElementById("wonImageContainer");

        wonValue.innerHTML = isBetterLuckNextTime ? "Better Luck Next Time" : `Congratulations, You Have Won ${currentWinningValue}!`;
        blastOverlay.style.display = "flex";

        if (!isBetterLuckNextTime) {
          wonImage.src = `images/${currentWinningValue.toLowerCase().replace(/\s/g, '-')}.png`;
          wonImage.alt = currentWinningValue;
          wonImageContainer.style.display = "block"; // Display the won image container
        } else {
          wonImageContainer.style.display = "none"; // Hide the won image container
        }

        setTimeout(() => {
          if (currentWinningValue === winningValue) {
            winningValue = null;
          }
          wonImageContainer.style.display = "none"; // Hide the won image container after a delay
        }, 3000);
      }, 1000);
      break;
    }
  }
};


/* --------------- Spinning Code --------------------- */
let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = `<p>Best Of Luck!</p>`;
  let randomDegree = Math.floor(Math.random() * (359 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + resultValue;
    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    } else if (count > 15 && spinChart.options.rotation == randomDegree) {
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
/* --------------- End Spin Wheel  --------------------- */
