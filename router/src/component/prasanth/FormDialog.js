import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import Icon from '@material-ui/core/Icon';
import { withStyles, makeStyles } from '@material-ui/core/styles';


// var data = {
//   "custid": "fd65777b-6182-459c-bb95-6432590bc3b4",
//   "industry": "",
//   "comments": "",
//   "icpname": "",
//   "icpcomments": "1.0"
// }
var icpname1;
//var industry1;
var comments1;
var newICP1;
var filterName;
var industry1CC;
var FilterID1;
var comment1;


const FormDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const [buttonContent, editButtonContent] = React.useState(props.content);
  const [previousICP, editPreviousICP] = React.useState(props.previousICP);
  const [filterId, editfilterId] = React.useState(props.filterId);
  const [currentICPFilterlength, editcurrentICPFilterlength] = React.useState(props.currentICPFilterlength);
  console.log(currentICPFilterlength);
  console.log(props);






  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // const handleSubmit = () => {
  //   //onSubmit();
  //   setOpen(false);
  // };

  const onChangeIcpname = (e) => {
    icpname1 = e.target.value;
    console.log(icpname1);
  }

  // const onChangeIndustry = (e) => {
  //   industry1 = e.target.value;
  //   console.log(industry1);
  // }

  const onChangeComments = (e) => {
    comments1 = e.target.value;
    console.log(comments1);
  }

  const onChangeICP = (e) => {
    newICP1 = e.target.value;
    console.log(newICP1);
  }

  const onFilterName = (e) => {
    filterName = e.target.value;
    console.log(filterName);
  }

  const onChangeIndustryCC = (e) => {
    industry1CC = e.target.value;
    console.log(industry1CC);
  }
  
  const onChangeComment = (e) => {
    comment1 = e.target.value;
    console.log(comment1);
  }
  const onSubmitfilter = (e) => {
    e.preventDefault();
    console.log(currentICPFilterlength);
    editcurrentICPFilterlength(currentICPFilterlength + 1);
    console.log(currentICPFilterlength);
    var newFilterFormat = {
      "filterName": filterName,
      "filterRank": currentICPFilterlength,
      "icpFilter": [],
      "icpCondition": [
        {
          "type": "Hierarchical",
          "name": "Country",
          "subtype": "",
          "comments": "",
          "hierarchy": "Geography",
          "position": 2,
          "parameters": []
        },
        {
          "type": "Hierarchical",
          "name": "Region",
          "subtype": "",
          "comments": "",
          "hierarchy": "Geography",
          "position": 1,
          "parameters": []
        },
        {
          "type": "Categorical",
          "name": "industry",
          "subtype": "",
          "comments": "",
          "hierarchy": "",
          "position": 0,
          "parameters": []
        },
        {
          "type": "Numeric",
          "name": "numOfEmployees",
          "subtype": "",
          "comments": "",
          "hierarchy": "",
          "position": 0,
          "parameters": []
        },
        {
          "type": "Numeric",
          "name": "annualRevenue",
          "subtype": "",
          "comments": "",
          "hierarchy": "",
          "position": 0,
          "parameters": []
        }
      ]
    };
    axios.post('/filter/fd65777b-6182-459c-bb95-6432590bc3b4/icp1', newFilterFormat)
      .then((result) => {
        console.log(result);
        props.getData();
      });
    setOpen(false);
  };

  const onSubmit = (e) => {
    if (previousICP === 'noICP') {
      e.preventDefault();
      axios.post('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/' + icpname1 + '/' + comments1)
        .then((result) => {
          console.log(result);
          props.getData();
        });
      setOpen(false);
    }
    else {
      //Button for  the copy and create 
      e.preventDefault();
      // axios.post('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/' + industry1 + '/' + icpname1 + '/' + comments1)
      //   .then((result) => {
      //     console.log(result);
      //     props.getData();
      //   });
      setOpen(false);
    }

  };

  const onCopyCreate = (e) => {
  
      e.preventDefault();
      axios.post('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/' + newICP1 + '/' + industry1CC + '/' + filterId + '/' + comment1)
        .then((result) => {
          console.log(result);
          props.getData();
        });
      setOpen(false);
  };

  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 700,
    },
    button: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();
  return (
    <div>
      { previousICP === 'noICP' && buttonContent !== 1 ?
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<Icon>add</Icon>}
            onClick={handleClickOpen}
          >
            Create New ICP
      </Button>

          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create New ICP</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To create new ICP, please enter new ICP name and description.
          </DialogContentText>
              <form onSubmit={onSubmit}>
                <TextField
                  autoFocus
                  margin="dense"
                  name="icpname"
                  id="icpName"
                  label="ICP Name"
                  onChange={onChangeIcpname}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  name="comments"
                  id="comments"
                  label="Description"
                  onChange={onChangeComments}
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
          </Dialog></div> :

        previousICP !== 'noICP' && buttonContent === 3 ?
          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<Icon>add</Icon>}
              onClick={handleClickOpen}
            >
              Add New Filter
    </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add New Filter</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To create new filters
        </DialogContentText>
                <form onSubmit={onSubmitfilter}>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="filterName"
                    id="filterName"
                    label="Filter Name"
                    onChange={onFilterName}
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
          : <div><Button
            variant="contained"
            color="primary"
            className={classes.button}
            value={props.previousICP}
            startIcon={<Icon>create</Icon>}
            onClick={handleClickOpen}
          >
            COPY & CREATE
  </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To create new ICP with the existing Data of the chosen ICP
      </DialogContentText>
                <form onSubmit={onCopyCreate}>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="Current ICP"
                    id="currentICP"
                    label="Current ICP"
                    value={previousICP}
                    type="Text"
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    name="New ICP"
                    id="newICP"
                    label="New ICP"
                    onChange={onChangeICP}
                    type="Text"
                    fullWidth
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    name="Industry"
                    id="industry"
                    label="Industry"
                    onChange={onChangeIndustryCC}
                    type="Text"
                    fullWidth
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    name="filterID"
                    id="filterID"
                    label="FilterID"
                    value={filterId}
                    type="Text"
                    fullWidth
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    name="comment"
                    id="comment"
                    label="Comment"
                    onChange={onChangeComment}
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

      }
    </div>
  );
}

export default FormDialog
