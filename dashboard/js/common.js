document.addEventListener("DOMContentLoaded", function () {

    const labels = ["월", "화", "수", "목", "금", "토", "일"];

    // 공통 옵션
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,

        interaction: {
            intersect: false,
            mode: "index"
        },

        plugins: {
            legend: {
                display: false
            }
        },

        scales: {
            x: {
                offset: true, // 추가

                grid: {
                    display: false
                },

                border: {
                    display: false
                }
            },

            y: {
                beginAtZero: true,

                border: {
                    display: false
                },

                grid: {
                    drawTicks: false
                }
            }
        }
    };


    /* =========================
       01. Area Chart
    ========================= */

    new Chart(document.getElementById("chart01"), {
        type: "line",

        data: {
            labels: labels,

            datasets: [{
                label: "등록 장비 수",
                data: [32, 45, 38, 58, 49, 72, 65],
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                borderWidth: 2
            }]
        },

        options: commonOptions
    });


    /* =========================
       02. Bar Chart
    ========================= */

    new Chart(document.getElementById("chart02"), {
        type: "bar",

        data: {
            labels: labels,

            datasets: [{
                label: "작업 건수",
                data: [42, 55, 37, 65, 48, 72, 60],

                barThickness: 12, // 막대 두께
                borderRadius: 6,
                borderSkipped: false
            }]
        },

        options: commonOptions
    });


    /* =========================
       03. Line Chart
    ========================= */

    new Chart(document.getElementById("chart03"), {
        type: "line",

        data: {
            labels: labels,

            datasets: [{
                label: "장애 건수",
                data: [25, 38, 31, 52, 47, 63, 75],
                tension: 0.4,
                fill: false,
                pointRadius: 3,
                pointHoverRadius: 5,
                borderWidth: 2
            }]
        },

        options: commonOptions
    });


    /* =========================
       04. Area Chart
    ========================= */

    new Chart(document.getElementById("chart04"), {
        type: "line",

        data: {
            labels: labels,

            datasets: [{
                label: "장비수",
                data: [55, 48, 62, 51, 68, 73, 82],
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                borderWidth: 2
            }]
        },

        options: commonOptions
    });


    /* =========================
       05. Bar Chart
    ========================= */

    new Chart(document.getElementById("chart05"), {
        type: "bar",

        data: {
            labels: labels,

            datasets: [{
                label: "작업 완료",
                data: [42, 55, 37, 65, 48, 72, 60],

                barThickness: 12, // 막대 두께
                borderRadius: 6,
                borderSkipped: false
            }]
        },

        options: commonOptions
    });


    /* =========================
       06. Line Chart - 2개 데이터
    ========================= */

    new Chart(document.getElementById("chart06"), {
        type: "line",

        data: {
            labels: labels,

            datasets: [
                {
                    label: "완료 건수",
                    data: [32, 40, 37, 55, 48, 68, 72],
                    tension: 0.4,
                    pointRadius: 0,
                    borderWidth: 2
                },
                {
                    label: "미완료 건수",
                    data: [25, 32, 35, 42, 39, 52, 58],
                    tension: 0.4,
                    pointRadius: 0,
                    borderWidth: 2
                }
            ]
        },

        options: {
            ...commonOptions,

            plugins: {
                legend: {
                    display: true,
                    position: "top",
                    align: "end",

                    labels: {
                        usePointStyle: true,
                        boxWidth: 6,
                        boxHeight: 6
                    }
                }
            }
        }
    });

});