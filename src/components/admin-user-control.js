import { useState, useEffect, KeyboardEvent} from "react";
import { useLocation } from "react-router-dom";
import { restUrl, deepStreamUrl } from "..";
import Timer from './discussionTimer'; 
import DataTable from 'react-data-table-component';

const { DeepstreamClient } = window.DeepstreamClient;
const client = new DeepstreamClient('wss://desolate-spire-52971.herokuapp.com');
client.login();

function AdminUserControl({activeParticipants, meetingId}) {
    const location = useLocation();
    const [wordCounts, setWordCounts] = useState('');
    const [turnCounts, setTurnCounts] = useState('');
    const [participants, setParticipants] = useState('');
    const [timeSilent, setTimeSilent] = useState('');
    const [data, setData] = useState([]);
    const [submittedParticipants, setSubmittedParticipants] = useState([])


    const columns = [
        {
            name: 'Users',
            selector: row => row.users,
        },
        {
            name: 'Word Count',
            selector: row => row.wordcount,
        },
        {
            name: 'Turn Taking',
            selector: row => row.turns,
        },
        {
            name: 'Time Silent',
            selector: row => row.timesilent
        }
    ];

    const userButtonStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid rgba(0, 0, 0, 0.8)',
        padding: '20px',
        fontSize: '30px',
        textAlign: 'center',
        margin: '10px',
        alignContent: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
    }

    const gridContainer = {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridTemplateRows: 'repeat(1, 1fr)',
        gridColumnGap: '10px',
        gridRowGap: '10px',
        justifyContent: 'center',
        width: '125vh',
        gridAutoRows: 'minmax(100px, auto)',
        backgroundColor: 'white',
        color: 'black',
        padding : '2vh',
        marginTop: '20px'
    };
    const TableContainer = {
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gridTemplateRows: 'repeat(1, 1fr)',
        justifyContent: 'center',
        width: '125vh',
        backgroundColor: 'white',
        color: 'black',
        padding : '2vh',
    };

    const labelStyle = {
        color: 'black',
        alignSelf: 'center', 
        fontSize: '25px'
    }

    const timerStyle = {
        gridRowStart: 2,
        gridColumnStart: 3,
        alignContent: 'center'
    }

    const customStyles = {
        rows: {
            style: {
                color: 'black',
                border: '2px solid',
            },
        },
        headCells: {
            style: {
                backgroundColor: '',
                border: '2px solid',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '20px'
            },
        },
        cells: {
            style: {
               alignContent: 'center',
               justifyContent: 'center',
               fontSize: '15px'
            },
        },
    };

    function getParticipantCounts(){
        try {
            const url = restUrl + 'participantCounts?meetingId=' + meetingId;
            fetch(url, {
                method: 'GET',
                mode: 'cors', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                
                if(response.status === 200){
                    response.json().then(response => {
                        setWordCounts(response.wordCounts);
                        setTurnCounts(response.turnCounts);
                        setTimeSilent(response.timeSilent);
                        let fulldata=[]
                        let i=1
                        let datavar= {}
                        for (var prop in wordCounts) {
                            datavar["users"] = prop
                            datavar["wordcount"] = wordCounts[prop]
                            datavar["turns"] = turnCounts[prop]
                            datavar["timesilent"] = timeSilent[prop]
                            i=i+1
                            fulldata.push(
                                { "id": i,
                                    "users": prop, "wordcount": wordCounts[prop], "turns": turnCounts[prop], 
                                    "timesilent": timeSilent[prop]
                                }


                            )
                          }
                          setData(fulldata);
                    });
                }
                else{
                    alert('Something went wrong!')
                    throw new Error();
                }
            });
        }
        catch(error){
            console.log(error);
        }
    }

    function getParticipants() {
        try{
            const url = restUrl + 'participants?meetingId=' + meetingId;
            fetch(url, {
                method: 'GET',
                mode: 'cors', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if(response.status === 200){
                    response.json().then(response => {
                        setParticipants(response.participants);
                        
                    });
                }
                else{
                    alert('Something went wrong!')
                    throw new Error();
                }
            });
        }
        catch(error){
            console.log(error);
        }
    }

    function getSubmittedParticpants(){
        try {
            const url = restUrl + 'submittedParticipants?meetingId=' + meetingId;
            fetch(url, {
                method: 'GET',
                mode: 'cors', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                
                if(response.status === 200){
                    response.json().then(response => {
                        let same = true;

                        for(let netId in response){
                            let name = response[netId];
                            const inList = submittedParticipants.some(element => {
                                return (element.netId === netId && element.name === name);
                            });
                        
                            if(!inList) {
                                same = false;
                            }
                        }
                        if(!same){
                            let participants = [];
                            for (let netId in response) {
                                let name = response[netId];
                                participants.push({netId, name});
                            }
                            setSubmittedParticipants(participants);
                        }
                    });
                }
                else{
                    alert('Something went wrong!')
                    throw new Error();
                }
            });
        }
        catch(error){
            console.log(error);
        }
    }


    useEffect(() => {
    
        const interval = setInterval(() => {
            getParticipantCounts();    
            getParticipants();
            getSubmittedParticpants();
        }, 9000);
        return () => clearInterval(interval);
    });
  
    return (
        <>
            <div style= {gridContainer}  >
                <label style={labelStyle}>Participants joined:</label>
                {
                    submittedParticipants.map((i) => <button style={userButtonStyle} > {i.name} </button> )
                }
                <div style={timerStyle}>
                    <Timer/>  
                </div>
            </div>
            <div style={TableContainer}>
                <DataTable columns={columns} data={data} customStyles={customStyles}/>
            </div>
            
        </>
    );
}
export default AdminUserControl;