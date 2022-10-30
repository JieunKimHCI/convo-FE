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
    const [datarows, setDataRows] = useState('');
    const [participants, setParticipants] = useState('');
    const [data,setData] = useState([]);

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
        }
    ];
    
    const datasamp = [
        {
            id: 1,
            users: 'User 1',
            wordcount: 57,
            turns: 8,
        },
        {
            id: 2,
            users: 'User 2',
            wordcount: 32,
            turns: 3,
        },
        {
            id: 3,
            users: 'User 3',
            wordcount: 0,
            turns: 0,
        },
        ,
        {
            id: 4,
            users: 'User 4',
            wordcount: 17,
            turns: 2,
        }
    ]
    
    const userButtonStyleSubmitted = {
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '10%',
        padding: '0.5vh', 
        margin: '10px',
        fontSize: '20px',
        fontWeight: 'bold',
    }

    const userButtonStyleNotSubmitted = {
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
   
   const sendButtonStyleEnabled = {
        backgroundColor: '#282c34',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '10%',
        padding: '0.5vh',
    }

    const sendButtonStyleDisabled = {
        backgroundColor: 'grey',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '10%',
        padding: '0.5vh',
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

    const startButtonStyle = {
        color: 'black',
        alignSelf: 'center',
        gridRowStart: 2,
        gridColumnStart: 3,
        backgroundColor: 'rgba(217, 217, 214, 0.8)',
        cursor: 'pointer',
        border: '1px solid rgba(0, 0, 0, 0.8)',
        padding: '10%',
        textAlign: 'center',
        fontWeight: 'bold',
        margin: '10px',
        alignContent: 'center',
        fontSize: '15px'
    }

    const tableStyle = {
        gridRowStart: 3,
        gridColumnStart: 1,
        gridColumnEnd: 6,
        width: '100%',
        align: 'center'
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
            console.log(meetingId);
            const url = restUrl + 'participantCounts?meetingId=' + meetingId;
            console.log(url)
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
                        // console.log("wordCounts Response",response);
                        // console.log(response.wordCounts);
                        // console.log(response.turnCounts);
                        setWordCounts(response.wordCounts);
                        setTurnCounts(response.turnCounts);
                        // datavar["id"]=

                        // console.log(...wordCounts);
                        // setData(data, [wordCounts, turnCounts]);
                        console.log(wordCounts, turnCounts)
                        // console.log("Data Now:", data);
                        let fulldata=[]
                        let i=1
                        let datavar= {}
                        for (var prop in wordCounts) {
                            console.log("" + prop + " = " + wordCounts[prop]);
                          
                            datavar["users"] = prop
                            datavar["wordcount"] = wordCounts[prop]
                            datavar["turns"] = turnCounts[prop]
                            i=i+1
                            fulldata.push(
                                { "id": i,
                                    "users": prop, "wordcount": wordCounts[prop], "turns": turnCounts[prop]
                                }


                            )
                            console.log("here",fulldata)
                          }
                          setData(fulldata);
                        //   console.log("Data Now:", datavar);
                          console.log("Data Now:", data);
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
        getParticipantCounts();
        console.log(activeParticipants);
        console.log(meetingId);
        try{
            console.log("Making request now! getParticipant")
            const url = restUrl + 'participants?meetingId=' + meetingId;
            console.log(url)
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
                        console.log(`response: ${response}`)
                        console.log(response.participants);
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

    useEffect(() => {
    
        const interval = setInterval(() => {
            console.log("Calling participants count now")
            getParticipantCounts();    
        }, 9000);
        return () => clearInterval(interval);
    });
  
    return (
        <>
            <div style= {gridContainer}  >
                <label style={labelStyle}>Participants joined:</label>
                {/* <textarea style={labelStyle}> { data[2]}</textarea> */}
                {/* <label style={labelStyle}> </label> */}
                 {/* <label style={labelStyle}> {participants}</label> */}
                <button style={true ? userButtonStyleNotSubmitted : userButtonStyleSubmitted} >User 1</button>
                <button style={true ? userButtonStyleNotSubmitted : userButtonStyleSubmitted}>User 2</button>
                <button style={true ? userButtonStyleNotSubmitted : userButtonStyleSubmitted}>User 3</button>
                <button style={true ? userButtonStyleNotSubmitted : userButtonStyleSubmitted}>User 4</button>    
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