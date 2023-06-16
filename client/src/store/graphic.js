export default {
    actions: {

    },
    mutations: {
        setChartData(state, data){
            for (let x = 0; x < data.course.length; x++){
                let type = data.course[x][0]
                state.chartData[type].labels = [...state.chartData[type].labels, data.date]
                state.chartData[type].values = [...state.chartData[type].values, data.course[x][1]]
            }
        },
        refreshChartData(state){
            state.chartData = {
                aapl: {
                    labels: [],
                    values: []
                },
                sbux: {
                    labels: [],
                    values: []
                },
                msft: {
                    labels: [],
                    values: []
                },
                csco: {
                    labels: [],
                    values: []
                },
                qcom: {
                    labels: [],
                    values: []
                },
                amzn: {
                    labels: [],
                    values: []
                },
                tsla: {
                    labels: [],
                    values: []
                },
                amd: {
                    labels: [],
                    values: []
                }
            }
        },
        chooseChart(state, chart) {
            state.chosenChart = chart
        },
        refreshChart(state) {
            state.chosenChart = ""
        }
    },
    state: {
        chartData: {
            "aapl": {
                labels: [],
                values: []
            },
            "sbux": {
                labels: [],
                values: []
            },
            "msft": {
                labels: [],
                values: []
            },
            "csco": {
                labels: [],
                values: []
            },
            "qcom": {
                labels: [],
                values: []
            },
            "amzn": {
                labels: [],
                values: []
            },
            "tsla": {
                labels: [],
                values: []
            },
            "amd": {
                labels: [],
                values: []
            }
        },
        chosenChart: ""
    },
    getters: {
        getChartData(state) {
            return {
                labels: state.chosenChart ? state.chartData[state.chosenChart].labels : [],
                datasets: [{
                    label: state.chosenChart.toUpperCase(),
                    data: state.chosenChart ? state.chartData[state.chosenChart].values : [],
                    borderColor: "black",
                    fill: true,
                    lineTension: 0.5,
                    lineWidth: 1
                }]
            }
        },
        getChosenChart(state) {
            return state.chosenChart;
        }
    }
}