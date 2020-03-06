import React, {Component} from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import {makeStyles} from '@material-ui/core/styles'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import MapIcon from '@material-ui/icons/Map'
import ChatIcon from '@material-ui/icons/Chat';
import PersonIcon from '@material-ui/icons/Person';
import Account from '../screens/Account/Account'
import {Link, useHistory} from 'react-router-dom'
const useStyles = makeStyles({
    root: {
      width:'100%',
    },
  });


  
  
export default function NavBarContainer() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const history = useHistory()
    return (
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
              style={{width:"100%", overflow:"hidden", position:"fixed", bottom:"0", right:'0', left:'0'}}
      >
        <BottomNavigationAction label="Map" icon={<MapIcon />} />
        <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
        <BottomNavigationAction label="Account" fontSize="large" onClick={() => history.push('/omae')} icon={<PersonIcon />}/>
      </BottomNavigation>
    );
  }