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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const ICPconditions = () => {
    const [data, setData] = useState(undefined);
    const icpconditions = async () => {
        console.log("icpconditions");

        if (data === undefined) {
            try {
                await axios.get('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/Reatail').then((result) => {
                    setData(result.data);
                    console.log(result.data);
                    // if (!(Array.isArray(result.data.icpConditions) && result.data.icpConditions.length)) {
                    //     postRevenue.parameters = [];
                    // }
                    // else {
                    //     postRevenue.parameters = result.data.icpConditions[0].parameters;
                    // }
                    // console.log(postRevenue)
                });

            } catch (err) {

                console.error(err.message);
            }
        }

    }

    useEffect(() => {
        console.log("useEffect");
        icpconditions()
    });


    const onDelete = (rowid, record) => {
        //setRow(noOfRows - 1);
        console.log(rowid,record); 
        // axios.delete('/scoredefinition/delete/' +record+'/'+rowid).then((response) => {
        //     console.log(response);
        // });
        
    }
    // const getData = async () => {
    //     console.log("get data chal raha hai ");
    //     //setData(undefined);
    //     //icpconditions();
    //     await axios.get('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/Retail').then((result) => {
    //         setData(result.data);
    //         console.log(result.data);
    //     });
    // }

    const getKeys = (vari) => {
        console.log(data);
        console.log(vari);
        if (data.icpConditions[vari].parameters.length > 0) {
            return Object.keys(data.icpConditions[vari].parameters[0]);
        }
        return [];

    }

    const getHeader = (vari) => {
        console.log(vari);
        var headerContent = [];
        var keys = getKeys(vari);
        console.log(vari);
        if (data.icpConditions[vari].parameters.length !== 0) {
            keys.map((key, index) => {
                headerContent.push(<StyledTableCell align="left" key={key}> {key.toUpperCase()} </StyledTableCell>)
            })
            headerContent.push(<StyledTableCell align="left"> ACTIONS </StyledTableCell>)
        }
        console.log(headerContent);


        return <div>{headerContent}</div>
        // <StyledTableCell align="left"> Actions </StyledTableCell>
        // <div><StyledTableCell align="left"> Actions </StyledTableCell>
        //             <StyledTableCell align="left"> Testing </StyledTableCell>
        //        </div>

    }


    const RenderRow = (props) => {
        var rowContent = [];
        props.keys.map((key, index) => {
            rowContent.push(<StyledTableCell align="left" key={props.rowData[key]}>{props.rowData[key]}</StyledTableCell>
            )
            //return <td key={props.rowData[key]}>{props.rowData[key]}</td>
        });
        rowContent.push(<StyledTableCell align="right">
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Icon>edit</Icon>}
            >
                EDIT
         </Button>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<Icon>delete</Icon>}
                onClick={() => onDelete(props, props.record)}
            >
                Delete
          </Button>
        </StyledTableCell>)

        return <div>{rowContent}</div>
    }

    const getRowsData = (vari) => {
        var getRowsDataContent = [];
        console.log(data)
        var accessData = data.icpConditions[vari]
        var record = data.icpConditions[vari].record;
        var items = data.icpConditions[vari].parameters;
        var keys = getKeys(vari);
        items.map((row, index) => {
            getRowsDataContent.push(<StyledTableRow key={index}><RenderRow key={index} rowData={row} keys={keys} record={record} accessData={accessData} /></StyledTableRow>)
        })
        return getRowsDataContent
    }

    const RenderTable = () => {
        console.log("RenderTable wala function chal raha hai");
        //console.log(data);
        var content = [];
        var i;
        for (i = data.icpConditions.length; i > 0; i--) {
            console.log(i);
            content.push(<div>
                <div>
                    <h3>{data.icpConditions[i - 1].name}
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<Icon>add</Icon>}
                        //onClick={() => AddInventory({ newrowid: { noOfRows }, newimportance: "", newvalueMin: "", newvalueMax: "", newvalue: "", newcomments: "" })}
                    >
                        Add New Condition 
                    </Button>
                    </h3>
                </div>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {data === undefined ? <div></div> :
                                getHeader(i - 1)
                                /* <StyledTableCell align="left">Min Value</StyledTableCell>
                                <StyledTableCell align="left">Max Value</StyledTableCell>
                                <StyledTableCell align="left">Importance</StyledTableCell>
                                <StyledTableCell align="left">Value</StyledTableCell>
                                <StyledTableCell align="left">Comments</StyledTableCell>
                                <StyledTableCell align="left">Actions</StyledTableCell> */
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data === undefined ?
                            (<div>data</div>) : (
                                getRowsData(i - 1)

                                // <StyledTableRow key={item.id.filter}>
                                //     <StyledTableCell component="th" scope="row">
                                //         {row.name}
                                //     </StyledTableCell>
                                //     <StyledTableCell align="left">{item.icpname}</StyledTableCell>
                                //     <StyledTableCell align="left">{item.comments}</StyledTableCell>
                                //     <StyledTableCell align="right">
                                //         <Button
                                //             variant="contained"
                                //             color="primary"
                                //             className={classes.button}
                                //             endIcon={<Icon>edit</Icon>}
                                //         >
                                //             EDIT
                                //     </Button>
                                //         <Button
                                //             variant="contained"
                                //             color="secondary"
                                //             className={classes.button}
                                //             startIcon={<Icon>delete</Icon>}
                                //             onClick={() => onDelete(item.id.filter)}
                                //         >
                                //             Delete
                                //      </Button>
                                //     </StyledTableCell>
                                //     <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                // </StyledTableRow>
                            )}
                    </TableBody>
                </Table></div>)

        }
        return content
    }


    const classes = useStyles();

    return (
        <div>
            <TableContainer component={Paper}>
                {data === undefined ?
                    (<div>Loading Data.....</div>) : (
                        (data.icpConditions === []) ?
                            (<div>No ICP Data</div>) :
                            (RenderTable())
                    )}
            </TableContainer>
            {/* <FormDialog ICPconditionsData={data} getData={getData} /> */}
        </div>
    );
}

export default ICPconditions 
