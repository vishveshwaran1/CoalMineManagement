document.addEventListener('DOMContentLoaded', function() {
  const ctxRealTime = document.getElementById('real-time-chart').getContext('2d');
  const ctxTrend = document.getElementById('trend-chart-canvas').getContext('2d');
  const ctxPie = document.getElementById('pie-chart').getContext('2d');
  const alertContainer = document.getElementById('alert-container');

  const realTimeChart = new Chart(ctxRealTime, {
      type: 'line',
      data: {
          labels: [], // Add labels here
          datasets: [
              {
                  label: 'Real-time Emissions',
                  data: [], // Add real-time emissions data here
                  borderColor: '#007bff',
                  backgroundColor: 'rgba(0, 123, 255, 0.2)',
                  borderWidth: 2
              },
              {
                  label: 'Temperature',
                  data: [], // Add real-time temperature data here
                  borderColor: '#ff6347',
                  backgroundColor: 'rgba(255, 99, 71, 0.2)',
                  borderWidth: 2
              },
              {
                  label: 'Humidity',
                  data: [], // Add real-time humidity data here
                  borderColor: '#32cd32',
                  backgroundColor: 'rgba(50, 205, 50, 0.2)',
                  borderWidth: 2
              }
          ]
      },
      options: {
          responsive: true,
          scales: {
              x: {
                  beginAtZero: true
              },
              y: {
                  beginAtZero: true
              }
          },
          animation: {
              duration: 1000,
              easing: 'easeOutQuart'
          }
      }
  });

  const trendChart = new Chart(ctxTrend, {
      type: 'bar',
      data: {
          labels: [], // Add labels here
          datasets: [
              {
                  label: 'Emission Trends',
                  data: [], // Add emission trend data here
                  backgroundColor: '#007bff',
                  borderColor: '#0056b3',
                  borderWidth: 1
              }
          ]
      },
      options: {
          responsive: true,
          scales: {
              x: {
                  beginAtZero: true
              },
              y: {
                  beginAtZero: true
              }
          },
          animation: {
              duration: 1500,
              easing: 'easeOutBounce'
          }
      }
  });

  const pieChart = new Chart(ctxPie, {
      type: 'pie',
      data: {
          labels: [], // Add labels here
          datasets: [{
              label: 'Gas Ratios',
              data: [], // Add gas ratio data here
              backgroundColor: [
                  '#007bff',
                  '#ff6347',
                  '#32cd32'
              ],
              hoverOffset: 4
          }]
      },
      options: {
          responsive: true,
          plugins: {
              legend: {
                  position: 'top',
              },
              tooltip: {
                  callbacks: {
                      label: function(tooltipItem) {
                          return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                      }
                  }
              }
          },
          animation: {
              duration: 1000,
              easing: 'easeInOutQuad'
          }
      }
  });

  function updateSummary(totalEmissions, energyConsumption, temperature, humidity, gasRatio) {
      document.getElementById('total-emissions').textContent = totalEmissions;
      document.getElementById('energy-consumption').textContent = energyConsumption;
      document.getElementById('temperature').textContent = temperature;
      document.getElementById('humidity').textContent = humidity;
      document.getElementById('gas-ratio').textContent = gasRatio;
  }

  function displayAlert(message, type) {
      const alert = document.createElement('div');
      alert.className = `alert ${type}`;
      alert.textContent = message;
      alertContainer.appendChild(alert);
  }

  function fetchData() {
      // Replace with actual data fetching logic
      const mockData = {
          totalEmissions: '1000',
          energyConsumption: '500',
          temperature: '25',
          humidity: '60',
          gasRatio: '1.2'
      };
      const { totalEmissions, energyConsumption, temperature, humidity, gasRatio } = mockData;

      updateSummary(totalEmissions, energyConsumption, temperature, humidity, gasRatio);

      // Check for critical levels
      if (parseFloat(totalEmissions) > 1500) {
          displayAlert('Critical: Emissions are very high!', 'severe');
      }
      if (parseFloat(temperature) > 35) {
          displayAlert('Critical: Temperature is too high!', 'severe');
      }
      if (parseFloat(humidity) > 80) {
          displayAlert('Critical: Humidity is too high!', 'severe');
      }
      if (parseFloat(gasRatio) > 2) {
          displayAlert('Critical: Gas ratio is out of range!', 'severe');
      }

      // Update charts with mock data
      realTimeChart.data.labels.push('New Data'); // Example label
      realTimeChart.data.datasets[0].data.push(totalEmissions); // Example data
      realTimeChart.update();

      trendChart.data.labels.push('Trend Data'); // Example label
      trendChart.data.datasets[0].data.push(totalEmissions); // Example data
      trendChart.update();

      pieChart.data.labels = ['CO2', 'O2', 'Other']; // Example labels
      pieChart.data.datasets[0].data = [parseFloat(gasRatio) * 50, 100 - parseFloat(gasRatio) * 50, 0]; // Example data
      pieChart.update();
  }

  fetchData();
});
