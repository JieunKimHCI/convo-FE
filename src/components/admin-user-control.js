import { useState, useEffect} from "react";
import { restUrl} from "..";
import Timer from './discussion-timer'; 
import DataTable from 'react-data-table-component';

const { DeepstreamClient } = window.DeepstreamClient;
const client = new DeepstreamClient('wss://conversation-agent-deepstream.herokuapp.com');
client.login();

function AdminUserControl({meetingId}) {
    const [wordCounts, setWordCounts] = useState('');
    const [turnCounts, setTurnCounts] = useState('');
    const [timeSilent, setTimeSilent] = useState('');
    const [nameCount, setNameCount] = useState('');
    const [data, setData] = useState([]);
    const [submittedParticipants, setSubmittedParticipants] = useState([])


    const columns = [
        {
            name: 'Users',
            selector: row => row.users,
        },
        {
            name: 'Name',
            selector: row => row.names
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
        },
        

    ];

    const userButtonStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid rgba(0, 0, 0, 0.8)',
        padding: '10px 0px',
        fontSize: '20px',
        textAlign: 'center',
        margin: '5px',
        alignContent: 'center',
        fontWeight: 'bold',
        width: '6.5em'
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
                        setNameCount(response.names);
                        let tableData=[]
                        let i=1
                        for (var netId in wordCounts) {
                            
                            i=i+1
                            tableData.push(
                                { "id": i,
                                    "users": netId, "wordcount": wordCounts[netId], "turns": turnCounts[netId], 
                                    "timesilent": timeSilent[netId], "names": nameCount[netId]
                                }
                            )
                          }
                          setData(tableData);
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
            getSubmittedParticpants();
        }, 9000);
        return () => clearInterval(interval);
    });
  
    return (
        <>
            <div style= {gridContainer}>
                <label style={labelStyle}>Participants Submitted</label>
                {submittedParticipants.map((i) => <button style={userButtonStyle} key={i.name}> {i.name} </button> )}
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