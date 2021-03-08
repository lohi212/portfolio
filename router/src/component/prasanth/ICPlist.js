import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import FormDialog from "./FormDialog"
import Filter from "./Filter";

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
//import AddButton from "./AddButton";

import Button from '@material-ui/core/Button';
//import DeleteIcon from '@material-ui/icons/Delete';
//import CloudUploadIcon from '@material-ui/icons/CloudUpload';
//import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
//import SaveIcon from '@material-ui/icons/Save';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const ICPlist = (props) => {
    const [data, setData] = useState(undefined);
    const onDelete = async (icpName) => {
        console.log(icpName);
        await axios.delete('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/' + icpName).then((response) => {
            console.log(response);
            axios.get('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4').then((result) => {
                setData(result.data);
                console.log(result.data);
            });
        });



    }
    const icplist = async () => {
        console.log("icplist");

        if (data === undefined) {
            try {
                await axios.get('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4').then((result) => {
                    setData(result.data);
                    console.log(result.data);
                });

            } catch (err) {

                console.error(err.message);
            }
        }

    }

    useEffect(() => {
        console.log("useEffect");
        icplist()
    });

    const onButtonClick =  (icpname) => {
        console.log(icpname);
        props.history.push('/FilterEdit/'+icpname)
        };

  



    var noICP = "noICP";
    var num1 = 1;
    var num2 = 2;

    const getData = async () => {
        console.log("get data chal raha hai ");
        await axios.get('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4').then((result) => {
            setData(result.data);
            console.log(result.data);
        });
    }

    const classes = useStyles();

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>

                            <StyledTableCell>ICP Name</StyledTableCell>
                            <StyledTableCell align="left">Description</StyledTableCell>
                            <StyledTableCell align="right">Actions&nbsp;</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data === undefined ?
                            (<div></div>) : (
                                data.map((item) => (
                                    <StyledTableRow key={item.id.icpName}>

                                        <StyledTableCell align="left">{item.id.icpName}</StyledTableCell>
                                        <StyledTableCell align="left">{item.comments}
                                            {/* <Filter filterTableData={item} getDataFromFilter={getData}/> */}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                endIcon={<Icon>edit</Icon>}
                                                onClick={() => onButtonClick(item.id.icpName)}
                                                //onClick={() => onEdit(item.id.icpName)}
                                                //onClick function will trigger a route to the filter page with icp name 
                                            >
                                                EDIT
                                        </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                className={classes.button}
                                                startIcon={<Icon>delete</Icon>}
                                                onClick={() => onDelete(item.id.icpName)}
                                            >
                                                Delete
                                         </Button>
                                            {/* <FormDialog previousICP={item.id.icpName} content={num1} getData={getData} /> */}
                                            {/* <Button
                                                variant="contained"
                                                color="secondary"
                                                className={classes.button}
                                                startIcon={<Icon>copy</Icon>}
                                                onClick={() => onCopyAndCreate(item.id.filter)}
                                            >
                                                Delete
                                         </Button> */}
                                        </StyledTableCell>
                                        {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
                                    </StyledTableRow>
                                )))}
                    </TableBody>
                </Table>
            </TableContainer>
            <FormDialog previousICP={noICP} ICPlistData={data} content={num2} getData={getData} />
        </div>
    );
}

export default ICPlist 
