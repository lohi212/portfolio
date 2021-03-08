import React from 'react'
//import { Button } from 'semantic-ui-react'
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
//import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > span': {
        margin: theme.spacing(2),
      },
    },
  }));


const AddButton = () => {
    const classes = useStyles();

    return (
        <div>
            <Icon style={{ fontSize: 30 }}>add_circle</Icon>
        </div>

    );
}


export default AddButton