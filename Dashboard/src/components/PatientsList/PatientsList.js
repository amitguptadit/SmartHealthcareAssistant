import React, {useEffect, useState} from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link, Route, Routes } from "react-router-dom";

const PatientsList = (props) => {
    const [ text, setText ] = useState([]);
    const [rows, setRows] = useState([]);

    const load = function(){
        fetch( './datafiles/patientsdetails.csv' )
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
                console.log("array", array);               
                setText(array);

                function createData(patientId, name, dob, age, city, height, wieght) {
                    return { patientId, name, dob, age, city, height, wieght };
                }
    
                let rowsTemp = array.filter((item) => {
                    console.log(item);
                    if(item.patientId) {
                        let rowDataTemp = createData(item.patientId, item.name, item.dob, item.age, item.city, item.height, item.weight);
                        item = rowDataTemp;
                        return true;
                    }               
                    return false;        
                });
    
                console.log(rowsTemp);
                setRows(rowsTemp);
            });
    };

    useEffect(() => {
        load();
    },[])

    return (rows && rows.length>0 && 
        <><TableContainer component={Paper} style={{marginTop: "100px", width: "90%", marginLeft: "60px"}}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Patient Id</TableCell>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">DOB</TableCell>
          <TableCell align="right">Age</TableCell>
          <TableCell align="right">City</TableCell>
          <TableCell align="right">Height</TableCell>
          <TableCell align="right">Weight</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.patientId}>
            <TableCell component="th" scope="row">
              {row.patientId}
            </TableCell>
            <TableCell align="right">{row.name}</TableCell>
            <TableCell align="right">{row.dob}</TableCell>
            <TableCell align="right">{row.age}</TableCell>
            <TableCell align="right">{row.city}</TableCell>
            <TableCell align="right">{row.height}</TableCell>
            <TableCell align="right">{row.weight}</TableCell>
            <TableCell align="right" style={{textDecoration: "underline", color: "#000000", cursor: "pointer"}}>
                <Link to={{pathname: '/app'}} state={{patientId: row.patientId}}>View Details
                </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </TableContainer></>);
}

export default PatientsList;