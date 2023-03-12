import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ProfileData from "./components/ProfileData/ProfileData";
import ChartData from "./components/ChartData/ChartData";
import {useState, useEffect} from "react";
import moment from "moment";
import {useLocation} from 'react-router-dom';

function App() {
  
  const { state } = useLocation();
  const [options, setOptions] = useState({});
  const [data, setData] = useState({});
  const [ text, setText ] = useState([]);
  const [pieData, setPieData] = useState({});
  const [patientIdTemp, setPatientIdTemp] = useState(state);
  let reloadInterval = null;  

  const load = function(){
    let patientIdSet = (state && state.patientId) ? state.patientId : "AA001";
    fetch( './datafiles/patient_records.csv' )
        .then( response => response.text() )
        .then( responseText => {
            //setText( responseText );
            const csvHeader = responseText.slice(0, responseText.indexOf("\n")).split(",");
            const csvRows = responseText.slice(responseText.indexOf("\n") + 1).split("\n");
console.log("csvRows", csvRows);
            let array = csvRows.map(i => {
                const values = i.split(",");
                const obj = csvHeader.reduce((object, header, index) => {
                    object[header.trim()] = values[index];
                    return object;
                }, {});
                return obj;
            });
            array = array.slice(0,array.length-1);
            array = array.filter((item) => {
              return item.patientId === patientIdSet;
            });
            console.log("array", array);
            let dataSet = array.map((item) => {
                return item.temperature;
            });
            let kerDataArr = array.map((item) => {
                //return new Date(Number(item.timestamp)*1000).toLocaleString(undefined, {dateStyle: 'short'});
                return moment(item.timestamp*1000).format('DD/MM/YYYY, h:mm:ss a')
                //return item.seq.split("\r")[0];
            });
            let dataTemp = {
                charttype: "line",
                labels: kerDataArr,
                datasets: [
                  {
                    label: 'Temperature',
                    data: dataSet,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: "#77C2FE",
                    pointBackgroundColor: ["#77C2FE"]
                  }
                ],
              };
              console.log(dataTemp);
            //setData(dataTemp);
            

        setData(dataTemp);

        let pieDataObj = {
          "red": 0,
          "green": 0,
          "orange": 0
        }

        array.forEach((item) => {
          if(Number(item.temperature)>101) {
            pieDataObj["red"] = pieDataObj["red"]+1;
          } else if(parseFloat(item.temperature)<=98.6) {
            pieDataObj["green"] = pieDataObj["green"]+1;
          } else {
            console.log("asdasdasdasdasd");
            pieDataObj["orange"] = pieDataObj["orange"]+1;
          }
        });

        console.log(pieDataObj);

          let pieData = {
            charttype: "pie",
            labels: ['>101', '<=98.6', '98.6 - 101'],
            datasets: [
              {
                label: '# of Temperature',
                data: [pieDataObj["red"], pieDataObj["green"], pieDataObj["orange"]],
                backgroundColor: [
                  '#FB0007',
                  '#7AC142',
                  '#F47A1F'
                ],
                borderWidth: 1,
              },
            ],
          };

          setPieData(pieData);
        });
};

  useEffect(() => {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false
          }
        }
      },   
      plugins: {
        legend: {
          display: false,
          position: 'top',
        },
        title: {
          display: false,
          text: 'Temperature History',
        },
      },
    };
  
    setOptions(options);
    //setData(data);
    load();
    reloadInterval = setInterval(() => {
      console.log("reload data");
      load();
    }, 5000);    
  }, []);

  let displayComponentTemp = (
    data && data.datasets && data.datasets[0] && data.datasets[0].data && data.datasets[0].data.length>0
  ) ? <ChartData options={options} data={data} chartType={data.charttype} /> : null;
console.log(displayComponentTemp);

  let pieDisplayComponentTemp = (
    pieData && pieData.datasets && pieData.datasets[0] && pieData.datasets[0].data && pieData.datasets[0].data.length>0
  ) ? <ChartData data={pieData} chartType={pieData.charttype} /> : null;
  console.log(pieDisplayComponentTemp);
  let patientIdSet = (state && state.patientId) ? state.patientId : "AA001";
  console.log("location:", patientIdTemp)
  return (
    <>
      <Grid container style={{width: '100%', marginTop: '70px'}}>
        <Grid item xs={3}>
          <Paper style={{height: "100vh", margin: 10, minHeight: "100vh"}}>
            <ProfileData patientId={patientIdSet}/>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Grid container>
            <Grid item xs={6}>
                <Paper style={{height: "48vh", margin: 10}}>
                  {pieDisplayComponentTemp}
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper style={{height: "48vh", margin: 10}}>
                  <div className="heading-display"><span>Patient's Vitals</span></div>
                  <div className="comin-soon">Coming Soon....</div>
                </Paper>
              </Grid>   
            </Grid>                  
            <Grid item xs={12}>
              <Paper style={{height: "50vh", margin: 10}}>
                {displayComponentTemp}
              </Paper>
            </Grid>            
        </Grid>
      </Grid>
    </>
  );
}

export default App;
