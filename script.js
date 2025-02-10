document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const welcomePage = document.getElementById('welcomePage');
    const phaseSelectionPage = document.getElementById('phaseSelectionPage');
    const calculatorContainer = document.querySelector('.container');
    startButton.addEventListener('click', () => {
        welcomePage.style.display = 'none'; 
        phaseSelectionPage.style.display = 'flex'; 
    });
    const phaseOptions = document.querySelectorAll('.phase-option');
    phaseOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedPhase = option.getAttribute('data-phase');
            phaseSelectionPage.style.display = 'none';
            calculatorContainer.style.display = 'block';
            createPhaseInputs(selectedPhase);
        });
    });
});
function createPhaseInputs(phaseCount) {
    const container = document.getElementById('phaseInputs');
    container.innerHTML = ''; 

    for (let i = 1; i <= phaseCount; i++) {
        const div = document.createElement('div');
        div.className = 'phase-input';
        div.innerHTML = `
            <h4>Phase ${i}</h4>
            <label>Resistance (R) Ω: </label>
            <input type="number" id="r${i}" value="${10 + i}" step="any">
            <label>Inductance (L) H: </label>
            <input type="number" id="l${i}" value="${0.01 * i}" step="any">
            <label>Capacitance (C) F: </label>
            <input type="number" id="c${i}" value="${0.0001 * i}" step="any">
            <label>Power Factor (cos φ): </label>
            <input type="number" id="pf${i}" value="0.9" step="0.01" min="0" max="1">
        `;
        container.appendChild(div);
    }
}
  function createPhaseInputs() {
    const container = document.getElementById('phaseInputs');
    container.innerHTML = '';
    
    for (let i = 1; i <= 3; i++) {
        const div = document.createElement('div');
        div.className = 'phase-input';
        div.innerHTML = `
            <h4>Phase ${i}</h4>
            <label>Resistance (R) Ω: </label>
            <input type="number" id="r${i}" value="${10 + i}" step="any">
            <label>Inductance (L) H: </label>
            <input type="number" id="l${i}" value="${0.01 * i}" step="any">
            <label>Capacitance (C) F: </label>
            <input type="number" id="c${i}" value="${0.0001 * i}" step="any">
            <label>Power Factor (cos φ): </label>
            <input type="number" id="pf${i}" value="0.9" step="0.01" min="0" max="1">
        `;
        container.appendChild(div);
    }
}
function calculatePower() {
    const voltage = parseFloat(document.getElementById('voltage').value);
    const minFreq = parseInt(document.getElementById('minFreq').value);
    const maxFreq = parseInt(document.getElementById('maxFreq').value);
    const chartsContainer = document.getElementById('charts');
    chartsContainer.innerHTML = '';
    const frequencies = Array.from({length: maxFreq - minFreq + 1}, (_, i) => i + minFreq);
    for (let phase = 1; phase <= 3; phase++) {
        const R = parseFloat(document.getElementById(`r${phase}`).value);
        const L = parseFloat(document.getElementById(`l${phase}`).value);
        const C = parseFloat(document.getElementById(`c${phase}`).value);
        const pf = parseFloat(document.getElementById(`pf${phase}`).value); 
        const phi = Math.acos(pf); 
        const realPower = [];
        const reactivePower = [];
        const apparentPower = [];

        frequencies.forEach(freq => {
            const omega = 2 * Math.PI * freq;
            const Xl = omega * L;
            const Xc = 1 / (omega * C);
            const X = Xl - Xc;
            const Z = Math.sqrt(R**2 + X**2);
            
            const I = voltage / Z; 
            const P = voltage * I * Math.cos(phi);
            const Q = voltage * I * Math.sin(phi);
            const S = voltage * I;

            realPower.push(P);
            reactivePower.push(Q);
            apparentPower.push(S);
        });
        createChart(`Phase ${phase} Real Power`, frequencies, realPower, 'Power (W)', '#4CAF50');
        createChart(`Phase ${phase} Reactive Power`, frequencies, reactivePower, 'Power (VAR)', '#ff6384');
        createChart(`Phase ${phase} Apparent Power`, frequencies, apparentPower, 'Power (VA)', '#36a2eb');
    }
}
function createChart(title, labels, data, yLabel, color) {
    const canvas = document.createElement('canvas');
    const container = document.createElement('div');
    container.className = 'chart-container';
    container.appendChild(canvas);
    document.getElementById('charts').appendChild(container);

    new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: yLabel,
                data: data,
                borderColor: color,
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Frequency (Hz)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: yLabel
                    }
                }
            }
        }
    });
}
createPhaseInputs();
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const welcomePage = document.getElementById('welcomePage');
    const phaseSelectionPage = document.getElementById('phaseSelectionPage');
    const calculatorContainer = document.querySelector('.container');
    startButton.addEventListener('click', () => {
        welcomePage.style.display = 'none'; // Hide the welcome page
        phaseSelectionPage.style.display = 'flex'; // Show the phase selection page
    });
    const phaseOptions = document.querySelectorAll('.phase-option');
    phaseOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedPhase = option.getAttribute('data-phase');
            phaseSelectionPage.style.display = 'none'; // Hide the phase selection page
            calculatorContainer.style.display = 'block'; // Show the calculator
            createPhaseInputs(selectedPhase); // Generate inputs based on selected phase
        });
    });
});

function createPhaseInputs(phaseCount) {
    const container = document.getElementById('phaseInputs');
    container.innerHTML = ''; // Clear existing inputs

    for (let i = 1; i <= phaseCount; i++) {
        const div = document.createElement('div');
        div.className = 'phase-input';
        div.innerHTML = `
            <h4>Phase ${i}</h4>
            <label>Resistance (R) Ω: </label>
            <input type="number" id="r${i}" value="${10 + i}" step="any">
            <label>Inductance (L) H: </label>
            <input type="number" id="l${i}" value="${0.01 * i}" step="any">
            <label>Capacitance (C) F: </label>
            <input type="number" id="c${i}" value="${0.0001 * i}" step="any">
            <label>Power Factor (cos φ): </label>
            <input type="number" id="pf${i}" value="0.9" step="0.01" min="0" max="1">
        `;
        container.appendChild(div);
    }
}