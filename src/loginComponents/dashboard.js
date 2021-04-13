import React, {useEffect, useState, Fragment} from 'react';
import axios from 'axios';
import MapModal from './modalMapDraw';
import { useHistory } from 'react-router-dom';
import '@elastic/eui/dist/eui_theme_light.css';
import iconV from '../iconV.svg';
import user from '../user.svg';
import {
    EuiPage,
    EuiPageBody,
    EuiPageSideBar,
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
    EuiHeader,
    EuiHeaderSectionItem,
    EuiHeaderSectionItemButton,
    EuiHeaderLogo,
    EuiHeaderLinks,
    EuiHeaderLink,
    EuiAvatar,
    EuiTabbedContent,
    EuiTitle,
    EuiSideNav,
    EuiIcon,
    EuiToken,
  } from '@elastic/eui';

const Dashboard = () => {

    //Polymap States
    const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
    const toggle = () => setIsFlyoutVisible(!isFlyoutVisible);
    const [roomPoly, setRoomPoly] = useState([]);

    //UI States
    const history = useHistory();
    const sections = [
    {
      items: [<EuiHeaderLogo>ENGO 500 Capstone</EuiHeaderLogo>],
      borders: 'right',
    }];


    const [isSideNavOpenOnMobile, setisSideNavOpenOnMobile] = useState(false);
    const [selectedItemName, setSelectedItem] = useState(null);

    const toggleOpenOnMobile = () => {
      setisSideNavOpenOnMobile(!isSideNavOpenOnMobile);
    };
    const selectItem = (name) => {
    setSelectedItem(name);
    };

    //User States
    const [token,setToken] = useState('')
    const [userID,setUserID] = useState('')
    const [userName, setUserName] = useState('')
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
    const [sFP, setsFP] = useState('')
    const [FPS, setFPS] = useState('')

    //Room States
    const [roption, setroption] = useState('')
    const [width,setW] = useState('')
    const [length,setl] = useState('')
    const [height,seth] = useState('')
    const [roomN,setroomN] = useState('')
    const [coords, setcoords] = useState([])
    const [rM, setrM] = useState('')
    const [nR, setnR] = useState('')


    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem('loggedInUser'))
        if (!user) {
          history.push('/');
        } else {
        setUserID(user.data.id)
        setUserName(user.config.data.username)
        setToken(user.data.AcessToken)
       }
      }, [])

      useEffect(() => {
          if(userID!='') {
          axios({
            method: 'get',
            url:`https://engo500.herokuapp.com/user/${userID}`
        }).then(res => {
            setallBuildings(res.data.buildings);
            setroption(res.data.buildings[0].floorplans[0]);
            setsFP(res.data.buildings[0]._id);
        });
      }
    },[userID,buildingM])

    //Polymap store function
    const polyCoords = (index) => {      setRoomPoly(index);   };

    //Building select options
    const options = allBuildings.map(building => { return {value: building._id, text: building.Name} });

    const roptions = allBuildings.map(building => { return {value: [building.floorplans[0],building._id], text: building.Name} });


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
            setTimeout(()=>setbuildingM(''),20000)
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
          floorplanID : roption[0],
          roomWidth: width,
          roomHeight: height,
          roomLength: length,
          flipC: coords,
        }
    }).then(res => {
      setnR(res.data._id);
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

  //Find Floorplan Image
  const findPlan = () => {

    axios({
      method: 'get',
      url:`https://engo500.herokuapp.com/building/${sFP}`
  }).then(res => {
      setFPS(res.data.floorplans[0].floorplanImage)
  });

  toggle();

  }

  const tabs = [
  {
    id: 'building--id',
    name: 'New Building',
    content: (
      <Fragment>
        <EuiCard style={{maxWidth:'100%', justifyContent:'center',}}>
        <EuiFlexItem>
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
        </EuiFlexItem>
        </EuiCard>
      </Fragment>
    )
  },
  {
    id: 'floor--id',
    name: 'New Floor Plan',
    content: (
      <Fragment>
      <EuiCard style={{maxWidth:'100%', justifyContent:'center',}}>
      <EuiFlexItem>
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
      </EuiFlexItem>
      </EuiCard>
      </Fragment>
    )
  },
  {
    id: 'room--id',
    name: 'New Room',
    content: (
      <Fragment>
        <EuiFlexItem>
        <EuiCard style={{maxWidth:'100%', justifyContent:'center',}}>
        {(() => {
            switch (rM) {
            case "success" : return <EuiCallOut title="Room Created."color="success" iconType="documentEdit"><p>The created Room ID is: {nR}</p></EuiCallOut>
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
             onChange={(e) =>  {
               let temp = e.target.value.split(",")
               setroption(temp)
               setsFP(temp[1])
             }}
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

        <EuiButton id="roomButton" onClick={() => {
          findPlan();
        }}>Draw Room Coordinates</EuiButton>

        <MapModal
        visibility={isFlyoutVisible}
        toggle={toggle}
        polyCoords={polyCoords}
        image = {FPS}
        onPolyConfirm={() => {setcoords(roomPoly)}}
        />

        <EuiSpacer></EuiSpacer>

        <EuiFieldText
                placeholder="Room Coordinates"
                fullWidth
                value={coords}
        />

        <EuiSpacer></EuiSpacer>

        <EuiButton type="submit" fill>Create Room</EuiButton>
        </EuiForm>
        </EuiCard>
        </EuiFlexItem>
      </Fragment>
    )
  },
  {
    id: 'clear--id',
    name: 'Clear Risk Values',
    content: (
      <Fragment>
        <EuiFlexItem>
        <EuiCard style={{maxWidth:'100%', justifyContent:'center',}}>
        {(() => {
            switch (rM) {
            case "success" : return <EuiCallOut title="Room Created."color="success" iconType="documentEdit"></EuiCallOut>
            case "error" : return <EuiCallOut title="Something went wrong. Please try again."color="danger" iconType="alert"></EuiCallOut>
            default: return <></>
            }
        })()}
        <EuiText><h1>Clear COVID Risk Values</h1></EuiText>
        <EuiSpacer></EuiSpacer>
        <EuiForm component="form" >
        <EuiText textAlign="left">
          <p>Select a room below to manually reset it's current COVID risk.</p>
          <p>This assumes that the room has already been cleaned/decontaminated:</p>
        </EuiText>
        <EuiSelect
             options={roptions}
             value={roption}
             onChange={(e) =>  setroption(e.target.value)}
             />
        <EuiSpacer></EuiSpacer>

        <EuiButton type="submit" color="danger" fill>Reset Room Risk</EuiButton>
        </EuiForm>
        </EuiCard>
        </EuiFlexItem>
      </Fragment>
    )
  }
];

    return (
        <>
        <EuiHeader position='static'>
          <EuiHeaderSectionItem border="right">
          <EuiIcon type={iconV} size="xxl"></EuiIcon><EuiTitle size="s"><h4>COVID-19 Tracker</h4></EuiTitle>
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem>
            <EuiHeaderLinks>
            <EuiHeaderLink onClick={() => {history.push('/dashboard')}}>Dashboard  <EuiIcon type="dashboardApp"></EuiIcon></EuiHeaderLink>
            <EuiHeaderLink isActive onClick={() => {history.push('/')}}>World Map  <EuiIcon type="gisApp"></EuiIcon></EuiHeaderLink>
            <EuiHeaderLink href="https://github.com/ENGO500/react-leaflet">GitHub  <EuiIcon type="logoGithub"></EuiIcon></EuiHeaderLink>
            </EuiHeaderLinks>
          </EuiHeaderSectionItem>

          <EuiHeaderSectionItemButton>
          <EuiAvatar
      size="m"
      name="Cat"
      imageUrl={user}
      onClick={() => {history.push('/login')}}
      color = "#000000"
    />
          </EuiHeaderSectionItemButton>

        </EuiHeader>
        <EuiPage style={{width: '90%', display:'flex', height:'100vh', margin:'auto'}}>


        <EuiPageBody component="div">
        <EuiText><h1>DASHBOARD</h1></EuiText>

        <EuiTabbedContent
          tabs={tabs}
          initialSelectedTab={tabs[1]}
          autoFocus="selected"
          onTabClick={(tab) => {
            console.log('clicked tab', tab);
          }}
        />

        </EuiPageBody>
        </EuiPage>
        </>

    )

}

export default Dashboard;
