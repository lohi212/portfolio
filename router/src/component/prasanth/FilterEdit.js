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
import { useParams } from 'react-router';
import AddNewFilterCondition from "./AddNewFilterCondition";
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
        fontSize: 15,
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
        Width: 200,
    },
    button: {
        margin: theme.spacing(1),
        width: 170,
        height: 35
    },
}));

var newValueMin;
var newValueMax;
var newImportance;
var newComments;
var newRealValue;
var noICP = "filterEdit";
var num3 = 3;
var icpNameParticular;
var currentICPFilterlen;

const FilterEdit = (props) => {
    //const [data, setData] = useState(undefined);
    const [data, setData] = useState(undefined);
    let { icpname } = useParams();
    console.log({ icpname });
    const filterEdit = async () => {
        console.log("Filter");

        if (data === undefined) {
            try {
                await axios.get('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/' + icpname).then((result) => {
                    setData(result.data);
                    //console.log(result.data);
                    icpNameParticular = result.data.id.filterName;
                    currentICPFilterlen = result.data.filterCondition.length;
                    currentICPFilterlen = currentICPFilterlen;
                    console.log("ye chal raha hai ");
                    console.log(currentICPFilterlen);
                });

            } catch (err) {

                console.error(err.message);
            }
        }

    }

    useEffect(() => {
        console.log("useEffect");
        filterEdit()
    });

    //console.log(currentICPFilterlen);


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




    const onDelete = (filterRank, index, filter, filterId) => {
        console.log(filterRank);
        console.log(index);
        console.log(filter);
        console.log(filterId);
        var removed = filter.icpFilter.splice(index, 1);
        console.log(removed);
        console.log(filter);
        //var newFilter = filter;

        axios.delete('/filter/fd65777b-6182-459c-bb95-6432590bc3b4/' + icpname + '/' + filterId, { data: filter }).then((response) => {
            console.log(response);
            axios.get('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/' + icpname).then((result) => {
                setData(result.data);
                console.log(result.data);
            });
        });

    }

    const onConfigure =  (filterid) => {
        //console.log(icpname);
        props.history.push('/ICPconditions/' + icpname + '/' + filterid)
        };


    const onDeleteFilter = (filterId) => {
        console.log(filterId);
        axios.delete('/filter/fd65777b-6182-459c-bb95-6432590bc3b4/' + icpname + '/delete/' + filterId).then((response) => {
            console.log(response);
            axios.get('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/' + icpname).then((result) => {
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


    const onAddNewCondition = (filterName, icpFilterCon, filterId, name, type, value, relation) => {
        // console.log(filterNameCon);
        // console.log(filterRankCon);
        // console.log(icpFilterCon);
        var newFilterCondition = {
            "filterName": filterName,
            "filterRank": "",
            "icpFilter": icpFilterCon,
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

        console.log(newFilterCondition);
        newFilterCondition.icpFilter.push({ "name": name, "type": type, "value": value, "relation": relation });
        console.log(newFilterCondition);
        axios.post('/filter/fd65777b-6182-459c-bb95-6432590bc3b4/' + icpname + '/' + filterId, newFilterCondition).then((result) => {
            axios.get('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/' + icpname).then((result) => {
                setData(result.data);
            });
        });

    };


    const getKeys = () => {

        return Object.keys({ "name": "", "type": "", "relation": "", "value": "" });
    }

    const getData = async () => {
        console.log("get data chal raha hai ");
        await axios.get('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/' + icpname).then((result) => {
            setData(result.data);
            console.log(result.data);
        });
    }

    const getHeader = (vari) => {
        console.log("getHeader chal raha hai");
        var headerContent = [];
        var keys = getKeys();
        //console.log(vari);
        if (data.filterCondition[vari].icpFilter.length !== 0) {
            keys.map((key, index) => {
                headerContent.push(<StyledTableCell width="235px" align="left" key={key}> {key.toUpperCase()} </StyledTableCell>)
            })
            headerContent.push(<StyledTableCell width="130px" align="right"> ACTIONS </StyledTableCell>)
        }
        //console.log(headerContent);


        return <div>{headerContent}</div>
    }


    const RenderRow = (props) => {
        console.log(props);
        var rowContent = [];
        props.keys.map((key, index) => {
            rowContent.push(<StyledTableCell width="240px" align="left" key={props.rowData[key]}>
                {
                    props.rowData[key]
                }

            </StyledTableCell>
            )
        })

        rowContent.push(<StyledTableCell align="right">
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<Icon>delete</Icon>}
                onClick={() => onDelete(props.filterRank, props.index, props.filter, props.filterId)}
            >
                Delete
            </Button>
        </StyledTableCell>)

        return <div>{rowContent}</div>
    }

    const getRowsData = (vari) => {
        var getRowsDataContent = [];
        console.log(vari);

        //console.log(data[vari].filterCondition[vari].icpFilter)
        //console.log(data[vari]);
        // var accessData = data.icpConditions[vari];
        var filterId = vari.filterId;
        var items = vari.icpFilter;
        var filterRank = vari.filterRank;
        console.log(filterRank);
        //console.log(vari.icpFilter);
        var keys = getKeys();
        items.map((row, index) => {
            console.log(index);
            getRowsDataContent.push(
                <StyledTableRow key={index}><RenderRow index={index} rowData={row} name={row.name} keys={keys} filterRank={filterRank} filter={vari} filterId={filterId} /></StyledTableRow>
                // <StyledTableRow key={index}><RenderRow key={index} rowData={row} keys={keys} record={record} accessData={accessData} /></StyledTableRow>
            )
        })
        return getRowsDataContent
    }


    const RenderTable = () => {
        // console.log("RenderTable() Wala function chal raha hai");
        var i = 0;
        var j = 0;
        data.filterCondition.sort((a, b) => {
            return b.filterRank - a.filterRank;
        });
        var renderComponents = data.filterCondition.map(function (icpfilter) {
            return <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>{icpfilter.filterName.toUpperCase()}</h3>
                    {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}
                    {/* </div> */}
                    {/* <div style={{display: 'inline-block'}}>{icpfilter.filterName.toUpperCase()}</div> */}
                    <div style={{ display: 'flex' }}>
                        {icpfilter.filterName === "default" ? ("") :
                            // style={{ display: 'inline'}}
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {/* <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<Icon>add</Icon>}
                                onClick={() => onAddNewCondition(icpfilter.filterName, icpfilter.filterRank, icpfilter.icpFilter)}
                            >
                                Add New Condition
                    </Button> */}
                                <AddNewFilterCondition filterName={icpfilter.filterName} onAddNewCondition={onAddNewCondition} filterId={icpfilter.filterId} icpFilter={icpfilter.icpFilter} />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<Icon>delete</Icon>}
                                    onClick={() => onDeleteFilter(icpfilter.filterId)}
                                >
                                    Delete filter
                    </Button></div>

                        }

                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<Icon>edit</Icon>}
                            onClick={() => onConfigure(icpfilter.filterId)}
                        >
                            Configure ICP
                    </Button>

                    </div>


                </div>
                <Table style={{ tableLayout: 'auto' }} className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {data === undefined ? <div></div> :
                                // getHeader(i)
                                <div></div>

                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data === undefined ?
                            (<div>undefinedData</div>) : (
                                // <div>rows data</div>
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
            <FormDialog previousICP={noICP} content={num3} currentICPFilterlength={currentICPFilterlen} ICPconditionsData={data} getData={getData} />
        </div>
    );
}

export default FilterEdit 