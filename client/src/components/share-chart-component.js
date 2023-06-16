import React from 'react';
import "./share-chart-component.css"
import {Bar, Chart, Line} from "react-chartjs-2"
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    LineElement,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement
} from "chart.js";
import {useSelector} from "react-redux";

ChartJS.register(Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement)

const ShareChartComponent = () => {

    const labels = useSelector(state => state.shareReducer.labels)
    const values = useSelector(state => state.shareReducer.values)

    const lineChartData = {
        labels: labels,
        datasets: [
            {
                data: values,
                label: "Стоимость акций на момент открытия торгов",
                borderColor: "royalblue",
            }
        ]
    }

    return (
        <div className="chart">
            <Line
                type="line"
                data={lineChartData}
            />
        </div>
    )
//     return(
//         <div className="chart">
//         <Bar
//         data={lineChartData}
//         options={{
//             plugins: {
//                 title: {
//                     display: true,
//                     text: "Users Gained between 2016-2020"
//                 },
//                 legend: {
//                     display: false
//                 }
//             }
//         }}
//     />
// </div>)
};

export default ShareChartComponent;