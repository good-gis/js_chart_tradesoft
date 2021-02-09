let fullText = "";
let dataForChartAll = [];
let dataForChart = [];
let sizePointOnChart = 10000;
let criticalTime = 10000;
let stepMiss = 100;

function readFile(input) {
    let file = input.files[0];

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
        fullText = reader.result;
        prepareDataForChart();
        chartStart();
    };

    reader.onerror = function () {
        console.log(reader.error);
    };
}

function prepareDataForChart() {
    let arrayText = fullText.split('\n');

    let arraySplit = arrayText.map(function (element) {
        return element.split(' ');
    });

    let step = 0;
    // проходит по значениям
    for (let element of arraySplit) {
        if((parseInt(element[3]) < criticalTime) && (step % stepMiss !== 0)){
            step++;
        } else {
            step++;
            dataForChartAll.push({
                    "date": element[1] + ' ' + element[2],
                    "value": parseInt(element[3])
                }
            );
        }
    }

    limitDataForChart();
}

function limitDataForChart() {
    let startPoint = dataForChartAll.length - sizePointOnChart;
    if (startPoint < 0) {
        dataForChart = dataForChartAll;
    } else {
        dataForChart = dataForChartAll.slice(startPoint, dataForChartAll.length)
    }
}