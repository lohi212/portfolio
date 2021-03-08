import React, { useEffect, useState } from 'react';
import MultipleSelect from './MultipleSelect';
import axios from "axios";
const INVENTORY_API_URL = `/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/retail`;

var postRevenue = {

    "type": "Numeric",
    "name": "size",
    "subtype": "IndianNumeric",
    "comments": "",
    "parameters": null
}


const Geo = () => {
    const [data, setData] = useState(undefined);
    var rows;

    const fetchInventory = async () => {
        console.log("fetchinventory");

        if (data === undefined) {
            try {
                await axios.get('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/retail').then((result) => {
                    setData(result.data);
                    console.log(result.data);
                    postRevenue.parameters = result.data.icpConditions[0].parameters;
                });

            } catch (err) {

                console.error(err.message);
            }
        }
    }

    useEffect(() => {
        fetchInventory()
    });

    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

    const [importance, setimportance] = useState(null);
    const [valueMin, setvalueMin] = useState(null);
    const [valueMax, setvalueMax] = useState(null);
    const [value, setvalue] = useState(null);
    const [comments, setcomments] = useState(null);

    const onEdit = ({ rowid, currentimportance, currentvalueMin, currentvalueMax, currentvalue, currentcomments }) => {
        setInEditMode({
            status: true,
            rowKey: rowid
        })
        setimportance(currentimportance);
        setvalueMin(currentvalueMin);
        setvalueMax(currentvalueMax);
        setvalue(currentvalue);
        setcomments(currentcomments);
    }

    const onDelete = ({ rowid, newimportance, newvalueMin, newvalueMax, newvalue, newcomments }) => {
        setRow(noOfRows - 1);
        console.log({ rowid });
        axios.delete(`/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/retail/` + { rowid }).then((response) => {
            console.log(response);
        });
    }


    const updateInventory = ({ rowid, newimportance, newvalueMin, newvalueMax, newvalue, newcomments }) => {

        const article = {
            rowid: rowid,
            importance: newimportance,
            valueMin: Number(newvalueMin),
            valueMax: Number(newvalueMax),
            value: newvalue,
            comments: newcomments
        };

        console.log(postRevenue);
        postRevenue.parameters.push(article);
        console.log(postRevenue);

        axios.put('/scoredefinition/40', postRevenue)
            .then(response => {
                setData(undefined);
                onCancel();
                fetchInventory();
            })

            .catch(error => {
                console.error('There was an error!', error);
            });
        // fetch(`${INVENTORY_API_URL}/${rowid}`, {
        //     method: "PATCH",
        //     body: JSON.stringify({
        //         importance: Number(newimportance),
        //         valueMin: Number(newvalueMin),
        //         valueMax: Number(newvalueMax),
        //         value: newvalue,
        //         comments: newcomments
        //     }),
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8"
        //     }
        // })
        //     .then(response => response.json())
        //     .then(json => {
        //         // reset inEditMode and unit price state values
        //         onCancel();

        //         // fetch the updated data
        //         fetchInventory();
        //     })
    }

    const [noOfRows, setRow] = useState(0);
    const fetchRow = async () => {
        try {
            await axios.get('/scoredefinition/fd65777b-6182-459c-bb95-6432590bc3b4/retail').then((result) => {
                setRow(result.data.icpConditions[0].parameters.length)
                console.log(noOfRows);
            });

        } catch (err) {
            console.error(err.message);
        }


    }


    useEffect(() => {
        fetchRow();
    }, [noOfRows]);




    //const [articleId, setarticleId] = useState(0);
    const AddInventory = ({ newrowid, newimportance, newvalueMin, newvalueMax, newvalue, newcomments }) => {
        rows = (newrowid.noOfRows) + 1;
        setRow(noOfRows + 1);
        onEdit({ rows, newimportance, newvalueMin, newvalueMax, newvalue, newcomments })
        const article = {
            rowid: 10,
            importance: 9,
            valueMin: Number(newvalueMin),
            valueMax: Number(newvalueMax),
            value: newvalue,
            comments: newcomments
        };

        console.log(postRevenue);
        postRevenue.parameters.push(article);
        console.log(postRevenue);

        axios.put('/scoredefinition/40', postRevenue)
            .then(response => {
                setData(undefined);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        // fetch(`${INVENTORY_API_URL}`, {
        //     method: "POST",
        //     body: JSON.stringify({
        //         rowid: rows,
        //         importance: newimportance,
        //         valueMin: newvalueMin,
        //         valueMax: newvalueMax,
        //         value: newvalue,
        //         comments: newcomments
        //     }),
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8"
        //     }
        // })
        //     .then(response => response.json())
        //     .then(json => {
        //         // reset inEditMode and unit price state values
        //         onCancel();
        //         console.log(newrowid);
        //         // fetch the updated data
        //         fetchInventory();

        //     })


    }

    const onSave = ({ rowid, newimportance, newvalueMin, newvalueMax, newvalue, newcomments }) => {
        updateInventory({ rowid, newimportance, newvalueMin, newvalueMax, newvalue, newcomments });
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })

        setimportance(null);
        setvalueMin(null);
        setvalueMax(null);
        setvalue(null);
        setcomments(null);
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {/* <th>Value Min</th> */}
                        <th>Geograhical Area</th>
                        <th>Importance</th>
                        <th>Value</th>
                        <th>Comments</th>
                        <th>
                            <button
                                className={"btn-secondary"}
                                style={{ marginLeft: 8 }}
                                onClick={() => AddInventory({ newrowid: { noOfRows }, newimportance: "", newvalueMin: "", newvalueMax: "", newvalue: "", newcomments: "" })}
                            >
                                AddInventory
                            </button>
                            {/* {
                                inEditMode.status && inEditMode.rowKey === rows ? (
                                    <React.Fragment>

                                        <button
                                            className={"btn-success"}
                                            onClick={() => onSave({ rowid: rows, newimportance: "", newvalueMin: "", newvalueMax: "" })}
                                        >
                                            Save
                                        </button>

                                        <button
                                            className={"btn-secondary"}
                                            style={{ marginLeft: 8 }}
                                            onClick={() => onCancel()}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            className={"btn-secondary"}
                                            style={{ marginLeft: 12 }}
                                            onClick={() => onDelete({ rowid: rows, newimportance: "", newvalueMin: "", newvalueMax: "" })}
                                        >
                                            Delete
                                        </button>

                                    </React.Fragment>
                                ) : (
                                        <button
                                            className={"btn-primary"}
                                            onClick={() => onEdit({ rowid: rows, currentimportance: "", currentvalueMin: "", currentvalueMax: "" })}
                                        >
                                            Edit
                                        </button>
                                    )
                            } */}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data === undefined ?
                        (<div></div>) : (
                            data.icpConditions[0].parameters.map((item) => (
                                <tr key={item.rowid}>
                                    {
                                        <td>
                                            <MultipleSelect />
                                        </td>
                                    /* <td>{
                                        inEditMode.status && inEditMode.rowKey === item.rowid ? (
                                            <input value={valueMin}
                                                onChange={(event) => setvalueMin(event.target.value)}
                                            />
                                        ) : (
                                                item.valueMin
                                            )
                                    }</td> */}
                                    {/* <td>{
                                        inEditMode.status && inEditMode.rowKey === item.rowid ? (
                                            <input value={valueMax}
                                                onChange={(event) => setvalueMax(event.target.value)}
                                            />
                                        ) : (
                                                item.valueMax
                                            )
                                    }</td> */}
                                    <td>
                                        {
                                            inEditMode.status && inEditMode.rowKey === item.rowid ? (
                                                <input value={importance}
                                                    onChange={(event) => setimportance(event.target.value)}
                                                />
                                            ) : (
                                                    item.importance
                                                )
                                        }
                                    </td>
                                    <td>
                                        {
                                            inEditMode.status && inEditMode.rowKey === item.rowid ? (
                                                <input value={value}
                                                    onChange={(event) => setvalue(event.target.value)}
                                                />
                                            ) : (
                                                    item.value
                                                )
                                        }
                                    </td>
                                    <td>
                                        {
                                            inEditMode.status && inEditMode.rowKey === item.rowid ? (
                                                <input value={comments}
                                                    onChange={(event) => setcomments(event.target.value)}
                                                />
                                            ) : (
                                                    item.comments
                                                )
                                        }
                                    </td>
                                    <td>
                                        {
                                            inEditMode.status && inEditMode.rowKey === item.rowid ? (
                                                <React.Fragment>

                                                    <button
                                                        className={"btn-success"}
                                                        onClick={() => onSave({ rowid: item.rowid, newimportance: importance, newvalueMin: valueMin, newvalueMax: valueMax, newvalue: value, newcomments: comments })}
                                                    >
                                                        Save
                                        </button>

                                                    <button
                                                        className={"btn-secondary"}
                                                        style={{ marginLeft: 8 }}
                                                        onClick={() => onCancel()}
                                                    >
                                                        Cancel
                                        </button>

                                                    <button
                                                        className={"btn-secondary"}
                                                        style={{ marginLeft: 12 }}
                                                        onClick={() => onDelete({ rowid: item.rowid, newimportance: importance, newvalueMin: valueMin, newvalueMax: valueMax, newvalue: value, newcomments: comments })}
                                                    >
                                                        Delete
                                        </button>

                                                </React.Fragment>
                                            ) : (
                                                    <button
                                                        className={"btn-primary"}
                                                        onClick={() => onEdit({ rowid: item.rowid, currentimportance: item.importance, currentvalueMin: item.valueMin, currentvalueMax: item.valueMax, currentvalue: item.value, currentcomments: item.comments })}
                                                    >
                                                        Edit
                                                    </button>
                                                )
                                        }
                                    </td>
                                </tr>
                            ))
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default Geo;