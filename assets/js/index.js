
const ctx = document.querySelector(".stub_first");

const chart1 = new Chart(ctx, {
    type: "line",
    data: {
        labels: ["31", "Sep", "02", "03", "04", "05", "06", "07"],
        datasets: [
        {
            label: "My Table",
            data: [0, 0, 0, 0, 1, 0, 1, 1],
            borderWidth: 3,
            borderColor: "#FF6157"
        },
    
        {
            label: "My erewew",
            data: [0, 2, 5, 3, 6, 0, 1, 1],
            borderWidth: 3,
            borderColor: "#F9CF3D"
        }
    ]
    },
    options: {
        elements: {
            line: {
                tension: 0.5
            },
            point: {
                borderWidth: 3,
                borderColor: "#000000",
                backgroundColor: "#FF6157"
            },
            bar: {
                borderwidth: 5,
            }
        },
        scales: {
            y: {
                display: false
            },
        }
    }
});