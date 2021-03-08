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


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 2000,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

var newValueMin;
var newValueMax;
var newImportance;
var newComments;
var newRealValue;
var num1 = 1;
var currentICPFilterlen;

const Filter = (props) => {
    const [data, setData] = useState(props.filterTableData);
    console.log(props);
    console.log(data.filterCondition.length);
    currentICPFilterlen = data.filterCondition.length;
    currentICPFilterlen = currentICPFilterlen - 1;
    console.log(currentICPFilterlen);


    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

    const onEdit = (rowid) => {
        setInEditMode({
            status: true,
            rowKey: rowid
        })
    }




    const onDelete = (rowid, record) => {
        console.log(rowid, record);
        axios.delete('/scoredefinition/delete/' + record + '/' + rowid).then((response) => {
            console.log(response);
            axios.get('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/Reatail').then((result) => {
                setData(result.data);
                console.log(result.data);
            });
        });

    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
    }

    const onSave = (accessData, filter, ipcConditionName, record, currentRowId, currentValueMin, currentValueMax, currentValue, currentImportance, currentComments) => {
        var k;
        var changedParameter
        for (k = 0; k < accessData.parameters.length; k++) {
            if (accessData.parameters[k].rowid == currentRowId) {
                changedParameter = k;
                break;
            }
        }

        if (newValueMin === undefined) { newValueMin = currentValueMin; }
        if (newValueMax === undefined) { newValueMax = currentValueMax; }
        if (newImportance === undefined) { newImportance = currentImportance; }
        if (newImportance === undefined) { newComments = currentComments; }
        if (newRealValue === undefined) { newRealValue = currentValue; }
        console.log(changedParameter);
        console.log(accessData.parameters[k]);


        accessData.parameters[changedParameter].valueMin = newValueMin;
        accessData.parameters[changedParameter].valueMax = newValueMax;
        accessData.parameters[changedParameter].importance = newImportance;
        accessData.parameters[changedParameter].comments = newComments;
        accessData.parameters[changedParameter].value = newRealValue;
        console.log(accessData)
        axios.put('/scoredefinition/' + record, accessData).then((result) => {
            console.log(result.data);
            onCancel();
            axios.get('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/Reatail').then((result) => {
                setData(result.data);
                console.log(result.data);
            });
        });


    }


    const onChangeSetData = (newValue, key, accessData) => {
        if (key === 'valueMin') { newValueMin = newValue; }
        if (key === 'valueMax') { newValueMax = newValue; }
        if (key === 'importance') { newImportance = newValue; }
        if (key === 'comments') { newComments = newValue; }
        if (key === 'value') { newRealValue = newValue; }

    }

    const onAddNewCondition = (filterForPostRequest, forAddingNewCondition) => {
        console.log(forAddingNewCondition);
        console.log(filterForPostRequest);
        var icpNameForPost = forAddingNewCondition.name;
        var newRowIdArray = [];
        var newRowId;
        var j;
        if (forAddingNewCondition.parameters.length !== 0) {
            for (j = 0; j < forAddingNewCondition.parameters.length; j++) {
                newRowIdArray.push(forAddingNewCondition.parameters[j].rowid);
            }
            newRowIdArray.sort(function (a, b) { return b - a });
            newRowId = (newRowIdArray[0] + 1);
        }
        else { newRowId = 1; }

        //Calculating the new rowid 

        console.log(newRowId);
        //var icpName = newParameterCondition.name;
        const newParameter = {
            rowid: newRowId,
            importance: '',
            valueMin: Number(''),
            valueMax: Number(''),
            value: 'value',
            comments: 'Comments'
        };
        forAddingNewCondition.parameters.push(newParameter);
        axios.post('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/' + filterForPostRequest + '/' + icpNameForPost, forAddingNewCondition).then((result) => {
            console.log(result);
            axios.get('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/Reatail').then((result) => {
                setData(result.data);
                console.log(result.data);
            });
        });

    }


    // const getKeys = (vari) => {
    //     console.log(props.filterTableData);
    //     if (data.filterCondition[vari].icpFilter.length > 0) {
    //         return Object.keys(data.filterCondition[vari].icpFilter[0]);
    //     }
    //      return [];
    //     //return Object.keys(data[vari].filterCondition[vari].icpFilter[vari]);

    // }

    const getKeys = () => {

        return Object.keys({ "name": "", "type": "", "relation": "", "value": "" });
    }

    const getHeader = (vari) => {
        console.log("getHeader chal raha hai");
        var headerContent = [];
        var keys = getKeys();
        // if (data.filterCondition[vari].icpFilter.length !== 0) {
        //     keys.map((key, index) => {
        //         headerContent.push(<StyledTableCell width="235px" align="left" key={key}> {key.toUpperCase()} </StyledTableCell>)
        //     })
        //      //headerContent.push(<StyledTableCell width="130px" align="right"> ACTIONS </StyledTableCell>)
        // }
        //console.log(headerContent);
        keys.map((key, index) => {
            headerContent.push(<StyledTableCell width="235px" align="left" key={key}> {key.toUpperCase()} </StyledTableCell>)
        })
        //headerContent.push(<StyledTableCell width="130px" align="right"> ACTIONS </StyledTableCell>)



        return <div>{headerContent}</div>
    }


    const RenderRow = (props) => {
        console.log(props);
        var rowContent = [];
        console.log(props.keys);
        props.keys.map((key, index) => {
            rowContent.push(<StyledTableCell width="240px" align="left" key={props.rowData[key]}>
                {
                    props.rowData[key]
                }

            </StyledTableCell>
            )
        })

        // rowContent.push(<StyledTableCell align="right">

        //     <Button
        //         variant="contained"
        //         color="primary"
        //         className={classes.button}
        //         endIcon={<Icon>edit</Icon>}
        //     //onClick={() => onEdit(props.rowData.rowid)} function for going to edit page
        //     >
        //         EDIT
        //     </Button>
        // </StyledTableCell>)

        return <div>{rowContent}</div>
    }

    const getRowsData = (vari) => {
        var getRowsDataContent = [];
        var j = 1;
        var items = vari.icpFilter;
        var keys = getKeys();
        items.map((row, index) => {
            getRowsDataContent.push(
                <StyledTableRow key={index}><RenderRow key={index} rowData={row} keys={keys} /></StyledTableRow>
            )
        })
        return getRowsDataContent
    }

    const getData = async () => {
        console.log("get data chal raha hai ");
        // await axios.get('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4').then((result) => {
        //     setData(result.data);
        //     console.log(result.data);
        // });
        props.getDataFromFilter();
    }


    const RenderTable = () => {
        //console.log("RenderTable wala function chal raha hai");
        var i = 0;
        var j = 0;
        var previousICP = data.id.icpName;
        var renderComponents = data.filterCondition.map(function (icpfilter) {
            return <div style={{ width: "935px" }}>
                <div>
                    <h3>
                        {icpfilter.filterName}
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<Icon>edit</Icon>}
                            onClick={() => onEdit(props.rowData.rowid)} function for going to edit page
                        >
                            EDIT
                         </Button>
                        <FormDialog previousICP={previousICP} filterId={icpfilter.filterId} currentICPFilterlength = {currentICPFilterlen} content={num1} getData={getData} />
                    </h3>
                </div>
                <Table style={{ width: "70px" }} className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {data === undefined ? <div></div> :
                                getHeader(i)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data === undefined ?
                            (<div>undefinedData</div>) : (
                                getRowsData(icpfilter)
                            )}
                    </TableBody>
                </Table></div>;
        });
        return <div>{renderComponents}</div>;


    }

    const classes = useStyles();

    return (
        <div>
            <TableContainer component={Paper}>
                {data === undefined ?
                    (<div>Loading Data.....</div>) : (RenderTable())
                }
            </TableContainer>
        </div>
    );
}

export default Filter 