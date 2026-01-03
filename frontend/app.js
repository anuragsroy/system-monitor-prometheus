const cpuCtx = document.getElementById("cpuChart").getContext("2d");
const memCtx = document.getElementById("memoryChart").getContext("2d");

let cpuValues = [];
let labels = [];

const cpuChart = new Chart(cpuCtx, {
  type: "bar",
  data: {
    labels: labels,
    datasets: [{
      label: "CPU Usage (%)",
      data: cpuValues
    }]
  }
});

const memoryChart = new Chart(memCtx, {
  type: "pie",
  data: {
    labels: ["Used Memory (%)", "Free Memory (%)"],
    datasets: [{
      data: [0, 100]
    }]
  }
});

function fetchMetrics() {
  fetch("http://localhost:5000/api/system")
    .then(res => res.json())
    .then(data => {
      const time = new Date().toLocaleTimeString();

      labels.push(time);
      cpuValues.push(data.cpu);

      if (labels.length > 10) {
        labels.shift();
        cpuValues.shift();
      }

      cpuChart.update();

      memoryChart.data.datasets[0].data = [
        data.memory,
        100 - data.memory
      ];
      memoryChart.update();
    });
}

setInterval(fetchMetrics, 3000);
