import React, {useEffect, useState} from 'react';
import './ProfileData.css';
import profile_image from '../../assets/images/profile.png'

const ProfileData = (props) => {

    const [ text, setText ] = useState([]);
    const [patientId, setPatienId] = useState(props.patientId);

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
                array = array.filter((item) => {
                    console.log(patientId, item.patientId);
                    if(patientId === item.patientId) {
                        return true;
                    } else {
                        return false;
                    }
                })
                setText(array);
            })
    };

    useEffect(() => {
        load();
    },[])

    return (
        <>
            <div className="profile-image">
                <img src={profile_image} className="profile-image-scale" />
            </div> 
            <div className="items-main">
                {text.map((item) => (
                    <>
                        <div className="item-display">
                            <div className="item-label">Patient Id: </div>
                            <div className="item-value">{item.patientId}</div>
                        </div>
                        <div className="item-display">
                            <div className="item-label">Patient Name: </div>
                            <div className="item-value">{item.name}</div>
                        </div>
                        <div className="item-display">
                            <div className="item-label">Patient's Age: </div>
                            <div className="item-value">{item.age}</div>
                        </div>
                        <div className="item-display">
                            <div className="item-label">Patient's City: </div>
                            <div className="item-value">{item.city}</div>
                        </div>
                        <div className="item-display">
                            <div className="item-label">Patient's Height: </div>
                            <div className="item-value">{item.height}</div>
                        </div>
                        <div className="item-display">
                            <div className="item-label">Patient's Weight: </div>
                            <div className="item-value">{item.weight}</div>
                        </div>
                    </>
                ))}    
            </div>       
        </>
    )
}

export default ProfileData;