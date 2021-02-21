import React, {useEffect, useState} from 'react';
import axios from 'axios'
import '@elastic/eui/dist/eui_theme_light.css';
import {
    EuiPage,
    EuiPageBody,
    EuiFieldText,
    EuiButton,
    EuiForm,
    EuiCallOut,
    EuiCard,
    EuiText,
    EuiFlexGroup,
    EuiSpacer,
    EuiFlexItem,
    EuiFieldNumber,
    EuiSelect,
    EuiFilePicker,
  } from '@elastic/eui';

const Dashboard = () => {


    //User States
    const [token,setToken] = useState('')
    const [userID,setUserID] = useState('')
    const [allBuildings,setallBuildings] = useState([])
    //Building States
    const [newlat, setNewLat] = useState('') 
    const [newlong, setNewLong] = useState('') 
    const [newBuilding, setNewBuilding] = useState('')
    const [buildingM, setbuildingM] = useState('')

    //Floorplan States
    const [boption, setboption] = useState('')
    const [files, setFiles] = useState({})
    const [fpM, setfpM] = useState('')

    //Room States
    const [roption, setroption] = useState('')
    const [width,setW] = useState('')
    const [length,setl] = useState('')
    const [height,seth] = useState('')
    const [roomN,setroomN] = useState('')
    const [coords, setcoords] = useState([])
    const [rM, setrM] = useState('')


    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem('loggedInUser'))
        setUserID(user.data.id)
        setToken(user.data.AcessToken)
      }, [])

      useEffect(() => {
          if(userID!='') {
          axios({
            method: 'get',
            url:`https://engo500.herokuapp.com/user/${userID}`
        }).then(res => setallBuildings(res.data.buildings))
      }
    },[userID,buildingM])


    //Building select options
    const options = allBuildings.map(building => { return {value: building._id, text: building.Name} });

    const roptions = allBuildings.map(building => { return {value: building.floorplans[0], text: building.Name} });

    //Building POST function
    const createBuilding = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url:'https://engo500.herokuapp.com/building',
            headers: {'auth-token': token}, 
            data: {
              userID: userID,
              name: newBuilding,
              lat: newlat,
              lon: newlong,
            }
        }).then(res => {
            setbuildingM('success')
            setNewBuilding('')
            setNewLat('')
            setNewLong('')
            setTimeout(()=>setbuildingM(''),3000)
        }).catch(error => {
            setbuildingM('error')
            setNewBuilding('')
            setNewLat('')
            setNewLong('')
            setTimeout(()=>setbuildingM(''),3000)
          })
}

 //Floorplan Post
 const floorplanf = (event) => {
    event.preventDefault();
    let send = new FormData();
    send.append('buildingID',boption)
    send.append('floorplanImage',files[0])
    axios({
        method: 'post',
        url:'https://engo500.herokuapp.com/floorplan',
        data: send,
        headers: {'auth-token': token,'Content-Type': 'multipart/form-data'}, 
    }).then(res => {
        setfpM('success')
        setFiles({})
        setTimeout(()=>setfpM(''),3000)
    }).catch(error => {
        setfpM('error')
        setFiles({})
        setTimeout(()=>setfpM(''),3000)
    })
}

//Room POST function
const createRoom = (event) => {
    event.preventDefault();
    axios({
        method: 'post',
        url:'https://engo500.herokuapp.com/room',
        headers: {'auth-token': token}, 
        data: {
          roomNumber: roomN,
          floorplanID : roption,
          RoomWidth: width,
          roomHeight: height,
          roomLength: length,
          flipC: coords,
        }
    }).then(res => {
        setrM('success')
        setW('')
        setl('')
        seth('')
        setroomN('')
        setcoords('')
        setTimeout(()=>setrM(''),3000)
    }).catch(error => {
        setrM('error')
        setW('')
        setl('')
        seth('')
        setroomN('')
        setcoords('')
        setTimeout(()=>setrM(''),3000)
      })
}

    return (
        <>
        <EuiPage style={{display:'flex', height:'100vh'}}>
        <EuiPageBody component="div">
        <EuiText><h1>DASHBOARD</h1></EuiText>
            <EuiFlexGroup justifyContent='center' alignItems='center'>
            <EuiFlexItem>
            <EuiCard style={{maxWidth:'400px', justifyContent:'center',}}>
            {(() => {
                switch (buildingM) {
                case "success" : return <EuiCallOut title="Building Created."color="success" iconType="documentEdit"></EuiCallOut>
                case "error" : return <EuiCallOut title="Something went wrong. Please try again."color="danger" iconType="alert"></EuiCallOut>
                default: return <></>
                }
            })()}
            <EuiText><h1>Add New Building </h1></EuiText>
            <EuiSpacer></EuiSpacer>
            <EuiForm component="form" onSubmit={createBuilding}>
            <EuiFieldText
                    placeholder="Building Name"
                    fullWidth
                    value={newBuilding}
                    onChange={(e) => setNewBuilding(e.target.value)}
                />
            <EuiSpacer></EuiSpacer>
            <EuiFieldNumber
                    placeholder="Latitude"
                    fullWidth
                    value={newlat}
                    onChange={(e) => setNewLat(e.target.value)}
                />
             <EuiSpacer></EuiSpacer>
            <EuiFieldNumber
                    placeholder="Longitude"
                    fullWidth
                    value={newlong}
                    onChange={(e) => setNewLong(e.target.value)}
                />
                <EuiSpacer></EuiSpacer>
            <EuiButton type="submit" fill>Create Building</EuiButton>
            </EuiForm>
            </EuiCard>
            </EuiFlexItem>

            <EuiFlexItem>
            <EuiCard style={{maxWidth:'400px', justifyContent:'center',}}>
            {(() => {
                switch (fpM) {
                case "success" : return <EuiCallOut title="Floor Plan Created."color="success" iconType="documentEdit"></EuiCallOut>
                case "error" : return <EuiCallOut title="Something went wrong. Please try again."color="danger" iconType="alert"></EuiCallOut>
                default: return <></>
                }
            })()}
            <EuiText><h1>Add New Floor Plan</h1></EuiText>
            <EuiSpacer></EuiSpacer>
            <EuiForm component="form" onSubmit={floorplanf}>
            <EuiSelect
                 options={options}
                 value={boption}
                 onChange={(e) =>  setboption(e.target.value)}
                 />
            <EuiSpacer></EuiSpacer>
            <EuiFilePicker
              id="aaaaaaa"
              multiple
              initialPromptText="Select or drag and drop a floor plan file"
              onChange={(files) => {setFiles(files)}}
            
            />
             <EuiSpacer></EuiSpacer>
            <EuiButton type="submit" fill>Create Floor Plan</EuiButton>
            </EuiForm>
            </EuiCard>
            </EuiFlexItem>

            <EuiFlexItem>
            <EuiCard style={{maxWidth:'400px', justifyContent:'center',}}>
            {(() => {
                switch (rM) {
                case "success" : return <EuiCallOut title="Room Created."color="success" iconType="documentEdit"></EuiCallOut>
                case "error" : return <EuiCallOut title="Something went wrong. Please try again."color="danger" iconType="alert"></EuiCallOut>
                default: return <></>
                }
            })()}
            <EuiText><h1>Add New Room</h1></EuiText>
            <EuiSpacer></EuiSpacer>
            <EuiForm component="form" onSubmit={createRoom}>
            <EuiSelect
                 options={roptions}
                 value={roption}
                 onChange={(e) =>  setroption(e.target.value)}
                 />
            <EuiSpacer></EuiSpacer>
            <EuiFieldText
                    placeholder="Room Number"
                    fullWidth
                    value={roomN}
                    onChange={(e) => setroomN(e.target.value)}
                />
            <EuiSpacer></EuiSpacer>
            <EuiFieldNumber
                    placeholder="Width"
                    fullWidth
                    value={width}
                    onChange={(e) => setW(e.target.value)}
                />
            <EuiSpacer></EuiSpacer>
            <EuiFieldNumber
                    placeholder="Length"
                    fullWidth
                    value={length}
                    onChange={(e) => setl(e.target.value)}
                />
            <EuiSpacer></EuiSpacer>
            <EuiFieldNumber
                    placeholder="Height"
                    fullWidth
                    value={height}
                    onChange={(e) => seth(e.target.value)}
                />
            <EuiSpacer></EuiSpacer>
            <EuiFieldText
                    placeholder="Room Coordinates"
                    fullWidth
                    value={coords}
                    onChange={(e) => setcoords(e.target.value)}
                />
            <EuiSpacer></EuiSpacer>
            <EuiButton type="submit" fill>Create Room</EuiButton>
            </EuiForm>
            </EuiCard>
            </EuiFlexItem>


            </EuiFlexGroup>
        </EuiPageBody>
        </EuiPage>
        </>
    
    )

}

export default Dashboard;