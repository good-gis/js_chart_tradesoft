let fullText = "";
let dataForChartAll = [];
let dataForChart = [];
let sizePointOnChart = 70000;

function readFile(input) {
    let file = input.files[0];

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
        fullText = reader.result;
        prepareDataForChart();
        // chartStart();
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

    // проходит по значениям
    for (let element of arraySplit) {
        dataForChartAll.push({
                "date": element[1] + ' ' + element[2],
                "value": element[3]
            }
        );
    }

    limitDataForChart();
}

function limitDataForChart() {
    let startPoint = dataForChartAll.length - sizePointOnChart;

    if (startPoint < 0) {
        dataForChart = dataForChartAll
    } else {
        dataForChart = dataForChartAll.slice(startPoint, dataForChartAll.length)
    }
}