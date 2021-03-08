import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import { withStyles, makeStyles } from '@material-ui/core/styles';


var name;
var type;
var relation;
var value;

const AddNewFilterCondition = (props) => {
    const [open, setOpen] = React.useState(false);
    console.log(props);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChangeName = (e) => {
        name = e.target.value;
        console.log(name);
    }

    const onChangeType = (e) => {
        type = e.target.value;
        console.log(type);
    }

    const onChangeRelation = (e) => {
        relation = e.target.value;
        console.log(relation);
    }

    const onChangeValue = (e) => {
        value = e.target.value;
        console.log(value);
    }


    const onSubmit = (e) => {
        e.preventDefault();
        // axios.post('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/' + icpname1 + '/' + industry1 + '/' + comments1)
        //   .then((result) => {
        //     console.log(result);
        //     props.getData();
        //   });
        props.onAddNewCondition(props.filterName, props.icpFilter, props.filterId, name, type, value, relation);
        setOpen(false);
    };

    // const onCopyCreate = (e) => {

    //     e.preventDefault();
    //     axios.post('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/' + newICP1 + '/' + industry1CC + '/' + filterId + '/' + comment1)
    //       .then((result) => {
    //         console.log(result);
    //         props.getData();
    //       });
    //     setOpen(false);
    // };

    const useStyles = makeStyles((theme) => ({
        table: {
            Width: 200,
        },
        button: {
            margin: theme.spacing(1),
            width: 170,
            height: 35
        },
    })); 

    const classes = useStyles();
    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<Icon>add</Icon>}
                onClick={handleClickOpen}
            >
                New Condition
      </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{props.filterName}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create new filter condition for {props.filterName} filter
                    </DialogContentText>
                    <form onSubmit={onSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            id="Name"
                            label="Name"
                            onChange={onChangeName}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            name="type"
                            id="type"
                            label="Type"
                            onChange={onChangeType}
                            type="Text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            name="relation"
                            id="relation"
                            label="Relation"
                            onChange={onChangeRelation}
                            type="Text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            name="value"
                            id="value"
                            label="Value"
                            onChange={onChangeValue}
                            type="Text"
                            fullWidth
                        />
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
          </Button>
                            <Button type="submit" color="primary">
                                Create
          </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog></div>
    );
}

export default AddNewFilterCondition
