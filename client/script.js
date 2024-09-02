// Sample data for demonstration
const temperatureData = 25; // Temperature in °C
const humidityData = 60; // Humidity in %
const energyConsumptionData = [120, 150, 180, 220, 170]; // Example data for energy consumption
const emissionData = [300, 50, 20]; // Example data for emissions
const gasLevelsData = [65, 25, 10]; // Example data for gas levels
const ctx = document.getElementById('tempHumidityChart').getContext('2d');
let timeLabels = ['10:00', '10:05', '10:10', '10:15', '10:20'];
let tempData = [22, 23, 22.5, 23.5, 24];
let humidityData1 = [45, 47, 46, 48, 50];



// Initialize charts

function initCharts() {
    const ctxConsumption = document.getElementById('consumptionChart').getContext('2d');
    new Chart(ctxConsumption, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar'],
            datasets: [{
                label: 'Energy Consumption',
                data: [100, 150, 200],
                borderColor: 'blue',
                fill: false,
            }]
        }
    });

    const ctxEmission = document.getElementById('emissionChart').getContext('2d');
    new Chart(ctxEmission, {
        type: 'bar',
        data: {
            labels: ['CO2', 'CH4'],
            datasets: [{
                label: 'Emissions',
                data: [300, 100],
                backgroundColor: ['red', 'green'],
            }]
        }
    });

    const ctxPie = document.getElementById('pieChart').getContext('2d');
    new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: ['O2', 'CO2'],
            datasets: [{
                data: [70, 30],
                backgroundColor: ['yellow', 'purple'],
            }]
        }
    });
}
// Initialize thermometers
function initThermometers() {
    const temperatureMercury = document.getElementById('temperature-mercury');
    temperatureMercury.style.height = (temperatureData / 40) * 100 + '%';

    const humidityMercury = document.getElementById('humidity-mercury');
    humidityMercury.style.height = (humidityData / 100) * 100 + '%';
}

// Generate alerts based on data thresholds
function generateAlerts() {
    const alertsContainer = document.querySelector('.alerts');

    if (temperatureData > 35) {
        const alert = document.createElement('div');
        alert.className = 'alert severe';
        alert.textContent = 'Severe heat alert! Temperature is above 35°C.';
        alertsContainer.appendChild(alert);
    }

    if (humidityData < 30) {
        const alert = document.createElement('div');
        alert.className = 'alert warning';
        alert.textContent = 'Low humidity alert! Humidity is below 30%.';
        alertsContainer.appendChild(alert);
    }

    // Additional alerts can be added similarly
}

// Generate recommendations based on data
function generateRecommendations() {
    const recommendationsList = document.querySelector('.recommendations ul');

    if (temperatureData > 30) {
        const recommendation = document.createElement('li');
        recommendation.textContent = 'Consider using air conditioning to reduce temperature.';
        recommendationsList.appendChild(recommendation);
    }

    if (humidityData1 < 40) {
        const recommendation = document.createElement('li');
        recommendation.textContent = 'Consider using a humidifier to increase humidity levels.';
        recommendationsList.appendChild(recommendation);
    }

    // Additional recommendations can be added similarly
}
function updateCameraFeed() {
    const cameraView = document.getElementById('camera-view');
    cameraView.innerHTML = `<p>Loading camera feeds...</p>`;
    // Integrate actual camera feed source
}

function updateSafetyStatus() {
    const safetyStatus = document.getElementById('safety-status');
    safetyStatus.innerHTML = `<p>Analyzing worker safety...</p>`;
    // Integrate AI safety analysis
}
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/api/data');
        const data = await response.json();
        document.getElementById('temperature').textContent = `${data.temperature} °C`;
        document.getElementById('humidity').textContent = `${data.humidity} %`;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
const tempHumidityChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: timeLabels,
        datasets: [
            {
                label: 'Temperature (°C)',
                data: tempData,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
                yAxisID: 'y-axis-temp'
            },
            {
                label: 'Humidity (%)',
                data: humidityData1,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: false,
                yAxisID: 'y-axis-humidity'
            }
        ]
    },
    options: {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-temp',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        beginAtZero: false,
                        suggestedMin: 20,
                        suggestedMax: 30
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature (°C)'
                    }
                },
                {
                    id: 'y-axis-humidity',
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        beginAtZero: true,
                        suggestedMin: 30,
                        suggestedMax: 100
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Humidity (%)'
                    }
                }
            ],
            xAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    }
                }
            ]
        }
    }
});

// Example function to update the chart with new data
function updateChart(newTime, newTemp, newHumidity) {
    timeLabels.push(newTime);
    tempData.push(newTemp);
    humidityData1.push(newHumidity);

    // Limit the data to the last 10 entries
    if (timeLabels.length > 10) {
        timeLabels.shift();
        tempData.shift();
        humidityData1.shift();
    }

    tempHumidityChart.update();
}

// Simulate incoming data (For demonstration, update every 5 seconds)
setInterval(() => {
    const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newTemp = (Math.random() * 5) + 20;  // Random temperature between 20 and 25
    const newHumidity = (Math.random() * 20) + 40;  // Random humidity between 40 and 60

    updateChart(newTime, newTemp, newHumidity);
}, 5000);


// Fetch data every 5 seconds
setInterval(fetchData, 5000);
// Initialize all components
function init() {
    initCharts();
    initThermometers();
    generateAlerts();
    generateRecommendations();
    updateCameraFeed();
    updateSafetyStatus();
    fetchData();
}

document.addEventListener('DOMContentLoaded', init);
