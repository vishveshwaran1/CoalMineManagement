// Sample data for demonstration
const temperatureData = 25; // Temperature in °C
const humidityData = 60; // Humidity in %
const energyConsumptionData = [120, 150, 180, 220, 170]; // Example data for energy consumption
const emissionData = [300, 50, 20]; // Example data for emissions
const gasLevelsData = [65, 25, 10]; // Example data for gas levels

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

    if (humidityData < 40) {
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
