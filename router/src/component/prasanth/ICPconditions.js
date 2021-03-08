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
import ComboBox from "./ComboBox";
import { useParams } from 'react-router';


import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

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
var indexOfIcpCondition;
var indexOfFilter;
var defaultData;
var j;
var i;
var k;
var keys;
var icpNameForPost;
var changedParameter;
var isDisabled = true;

const ICPconditions = () => {
    const [data, setData] = useState(undefined);
    let { icpname } = useParams();
    let { filterid } = useParams();
    console.log(filterid);
    const icpconditions = async () => {
        console.log("icpconditions");

        if (data === undefined) {
            try {
                await axios.get('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/' + icpname).then((result) => {
                    setData(result.data);
                    console.log(result.data);
                });

            } catch (err) {

                console.error(err.message);
            }
        }



    }

    // const testing = async () => {
    //     console.log("testing");

    //     for (j = 0; j <= data.filterCondition.length; j++) {
    //         if (data.filterCondition[j].filterId === 210) {
    //             defaultData = j;
    //             console.log(defaultData);
    //         }
    //     }
    // }

    useEffect(() => {
        console.log("useEffect");
        icpconditions()
    });

    // console.log(defaultData);

    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null,
        parameterType: ""
    })

    const onEdit = (rowid, type) => {
        setInEditMode({
            status: true,
            rowKey: rowid,
            parameterType: type
        })
    }




    const onDelete = (item, rowid, filterId) => {
         console.log(item);
        // console.log(rowId);
        console.log(filterId);
        item.parameters.splice(item.parameters.findIndex(function(i){
            return i.rowid === rowid;
        }), 1);
        
         console.log(item);

        axios.delete('/definition/fd65777b-6182-459c-bb95-6432590bc3b4/icp1/' + filterId, { data: item }).then((response) => {
            console.log(response);
            axios.get('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/icp1').then((result) => {
                setData(result.data);
                console.log(result.data);
            });
        });

    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null,
            parameterType: ""
        })
    }

    const onSave = async(item, currentRowId, currentValueMin, currentValueMax, currentValue, currentImportance, currentComments) => {

        for (k = 0; k < item.parameters.length; k++) {
            if (item.parameters[k].rowid == currentRowId) {
                changedParameter = k;
                break;
            }
        }
        icpNameForPost = data.id.icpName;
        console.log(changedParameter);

        if (newValueMin === undefined) { newValueMin = currentValueMin; }
        if (newValueMax === undefined) { newValueMax = currentValueMax; }
        if (newImportance === undefined) { newImportance = currentImportance; }
        if (newComments === undefined) { newComments = currentComments; }
        if (newRealValue === undefined) { newRealValue = currentValue; }
        console.log(item);
        
        item.parameters[changedParameter].valueMin = newValueMin;
        item.parameters[changedParameter].valueMax = newValueMax;
        item.parameters[changedParameter].importance = newImportance;
        item.parameters[changedParameter].comments = newComments;
        item.parameters[changedParameter].value = newRealValue;

        console.log(item);
       
        // await axios.put('/definition/edit/fd65777b-6182-459c-bb95-6432590bc3b4/' + icpNameForPost, item).then((result) => {
        //     console.log(result.data);
        //     onCancel();
        //     axios.get('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/icp1').then((result) => {
        //         setData(result.data);
        //         console.log(result.data);
        //     });
        // });

    }

    const onUpdateImportance = (importanceFromCombo) => {
        newImportance = importanceFromCombo;
    } 

    const onChangeSetData = (newValue, key) => {
        if (key === 'valueMin') { newValueMin = newValue; }
        if (key === 'valueMax') { newValueMax = newValue; }
        //if (key === 'importance') { newImportance = newValue; }
        if (key === 'comments') { newComments = newValue; }
        if (key === 'value') { newRealValue = newValue; }

    }

    const onAddNewCondition = async (filterForPostRequest, forAddingNewCondition) => {
        console.log(filterForPostRequest);
        // console.log(forAddingNewCondition);
        icpNameForPost = data.id.icpName;
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
        // var icpName = newParameterCondition.name;
        const newParameter = {
            rowid: newRowId,
            valueMin: Number(''),
            valueMax: Number(''),
            importance: 8,
            value: 'value',
            comments: 'Comments'
        };
        forAddingNewCondition.parameters.push(newParameter);
        await axios.put('/definition/edit/fd65777b-6182-459c-bb95-6432590bc3b4/' + icpNameForPost + '/' + filterForPostRequest, forAddingNewCondition).then((result) => {
            console.log(result);
            axios.get('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/icp1').then((result) => {
                setData(result.data);
                console.log(result.data);
            });
        });

    }


    const getKeys = () => {
        return Object.keys({ "importance": "", "valueMin": "", "valueMax": "", "comments": "" });
    }

    const getKeysForCategorical = () => {
        return Object.keys({ "importance": "", "value": "", "comments": "" });
    }


    const getHeader = (icpCondition) => {
        console.log(icpCondition);
        var headerContent = [];
        if(icpCondition.type==="Numeric"){
            keys = getKeys();
        }
        else{
            keys= getKeysForCategorical();
        }
        keys.map((key, index) => {
            headerContent.push(<StyledTableCell width="130px" align="left" key={key}> {key.toUpperCase()} </StyledTableCell>)
        })
        headerContent.push(<StyledTableCell width="220px" align="right"> ACTIONS </StyledTableCell>)
        return <div>{headerContent}</div>
    }


    const RenderRow = (props) => {
        var rowContent = [];
        console.log(props);
        props.keys.map((key, index) => {
            rowContent.push(<StyledTableCell width="130px" align="left" key={props.rowData[key]}>
                {
                    inEditMode.status && inEditMode.rowKey === props.rowData.rowid && inEditMode.parameterType === props.item.type ? (
                    key === "importance" ?
                            <ComboBox imp={props.rowData["importance"]} onUpdateImportance={onUpdateImportance} /> :<input placeholder={props.rowData[key]}
                        onChange={(event) => onChangeSetData(event.target.value, key)}
                    />) :
                        key === "importance" ?
                            <ComboBox imp={props.rowData["importance"]} disable={isDisabled} /> :

                            props.rowData[key]
                }

            </StyledTableCell>
            )
        });
        rowContent.push(<StyledTableCell align="right">
            {
                inEditMode.status && inEditMode.rowKey === props.rowData.rowid && inEditMode.parameterType === props.item.type ? (
                    <React.Fragment>

                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<Icon>save</Icon>}
                            onClick={() => onSave(props.item, props.rowData.rowid, props.filterId, props.rowData.valueMin, props.rowData.valueMax, props.rowData.importance, props.rowData.value, props.rowData.comments)}
                        >
                            SAVE
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<Icon>cancel</Icon>}
                            onClick={() => onCancel()}
                        >
                            CANCEL
                        </Button>

                    </React.Fragment>) : (
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<Icon>edit</Icon>}
                            onClick={() => onEdit(props.rowData.rowid, props.item.type)}
                        >
                            EDIT
                        </Button>)
            }
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<Icon>delete</Icon>}
                onClick={() => onDelete(props.item, props.rowData.rowid, props.filterId)}
            >
                Delete
          </Button>
        </StyledTableCell>)

        return <div>{rowContent}</div>
    }


    const getRowsData = (icpCondition,filterId) => {
        var getRowsDataContent = [];
        var items = icpCondition.parameters;
        var item = icpCondition;
        console.log(item);
        console.log(items);
        if(icpCondition.type==="Numeric"){
            keys = getKeys();
        }
        else{
            keys= getKeysForCategorical();
        }
        console.log(items);
        items.map((row, index) => {
            getRowsDataContent.push(<StyledTableRow key={index}><RenderRow key={index} rowData={row} keys={keys} item={item} filterId={filterId}/></StyledTableRow>)
        })
        return getRowsDataContent
    }


    const RenderTable = () => {
        var i = 0;
        data.filterCondition.sort((a, b) => {
            return a.filterId - b.filterId;
        });

        var indexOfSelectedFilter = data.filterCondition.findIndex(function (i) {
            return i.filterId == filterid;
          })
          console.log(indexOfSelectedFilter);
          console.log(filterid);

        data.filterCondition[indexOfSelectedFilter].icpCondition.sort((a, b) => {
            return a.recordId - b.recordId;
        });
        
        var filterId = data.filterCondition[indexOfSelectedFilter].filterId;
        var renderComponents = data.filterCondition[indexOfSelectedFilter].icpCondition.map(function (icpCondition) {
            return <div>
                <div>
                    <h3>{icpCondition.name.toUpperCase()}
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<Icon>add</Icon>}
                            onClick={() => onAddNewCondition(filterId, icpCondition)}
                        >
                            Add New Condition
                        </Button>
                    </h3>
                </div>
                <Table style={{ tableLayout: 'auto' }} className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {data === undefined ? <div></div> :
                                getHeader(icpCondition)
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data === undefined ?
                            (<div>data</div>) : (
                                getRowsData(icpCondition,filterId)
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
                    (<div>Loading Data.....</div>) : (
                        (data.icpConditions === []) ?
                            (<div>No ICP Data</div>) :
                            (RenderTable())
                    )}
            </TableContainer>
        </div>
    );
}

export default ICPconditions 