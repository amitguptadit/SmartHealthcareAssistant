import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line,Pie } from 'react-chartjs-2';
import "./ChartData.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartData = (props) => {
  console.log(props.chartType);
  if(props.chartType==="line") {
    return (
      <>
          <div className="heading-display"><span>Temperature History</span></div>          
          <div  style={{height: "80%", width: "95%", marginTop: "20px", marginLeft: "20px"}}>
            <Line id="linechart" options={props.options} data={props.data} />
          </div>
        </>
      );
  } else if(props.chartType==="pie") {
    return ( 
      <>
        <div className="heading-display"><span>Temperature Spread</span></div>
        <div style={{height: "85%", width: "85%", marginLeft: "45px"}}>
          <Pie id="piechart" options={{ maintainAspectRatio: false }} data={props.data} />
        </div>
      </>  
    );
  }
  return null;
}

export default ChartData;
