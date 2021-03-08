import React, {useEffect, useState} from 'react';
import AddButton from "./AddButton"
const API_HOST = "http://localhost:3000";
const HEADER_API_URL = `${API_HOST}/header`;

const ScoringSectionHeader = () => {
const [data, setData] = useState([]);

const fetchHeader = () => {
    fetch(`${HEADER_API_URL}`)
        .then(res => res.json())
        .then(json => {  
            setData(json)
            console.log(json)});
}

useEffect(() => {
    fetchHeader();
}, []);



// const [inEditMode, setInEditMode] = useState({
//     status: false,
//     rowKey: null
// });

// const [unitPrice, setUnitPrice] = useState(null);
// const [product_name, setProduct_name] = useState(null);
// const [product_category, setProduct_category] = useState(null);


// /**
//  *
//  * @param id - The id of the product
//  * @param currentUnitPrice - The current unit price of the product
//  */
// const onEdit = ({id, currentUnitPrice,currentProduct_name,currentProduct_category}) => {
//     setInEditMode({
//         status: true,
//         rowKey: id
//     })
//     setUnitPrice(currentUnitPrice);
//     setProduct_name(currentProduct_name);
//     setProduct_category(currentProduct_category);
// }

// /**
//  *
//  * @param id
//  * @param newUnitPrice
//  */
// const updateHaeder = ({id, newUnitPrice, newProduct_name, newProduct_category}) => {
//     fetch(`${HEADER_API_URL}/${id}`, {
//         method: "PATCH",
//         body: JSON.stringify({
//             unit_price: newUnitPrice,
//             product_name: newProduct_name,
//             product_category: newProduct_category
//         }),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         }
//     })
//         .then(response => response.json())
//         .then(json => {
//             // reset inEditMode and unit price state values
//             onCancel();

//             // fetch the updated data
//             fetchHeader();
//         })
// }

// /**
//  *
//  * @param id -The id of the product
//  * @param newUnitPrice - The new unit price of the product
//  */
// const onSave = ({id, newUnitPrice, newProduct_name, newProduct_category}) => {
//     updateHeader({id, newUnitPrice, newProduct_name, newProduct_category});
// }

// const onCancel = () => {
//     // reset the inEditMode state value
//     setInEditMode({
//         status: false,
//         rowKey: null
//     })
//     // reset the unit price state value
//     setUnitPrice(null);
//     setProduct_name(null);
//     setProduct_category(null);
// }

return (
    <div className="container">
        <h1>Simple Header Table</h1>
        <table>
            {/* <thead>
            <tr>
                <th>Product Name</th>
                <th>Product Category</th>
                <th>Unit Price</th>
                <th>Action</th>
            </tr>
            </thead> */}
            <tbody>
            {
                data.map((item) => (
                    <tr key={item.id}>
                        <td>{
                                // inEditMode.status && inEditMode.rowKey === item.id ? (
                                //     <input value={product_name}
                                //            onChange={(event) => setProduct_name(event.target.value)}
                                //     />
                                // ) : (
                                //     item.product_name
                                // )
                                item.name
                            }</td>
                        <td>{
                                // inEditMode.status && inEditMode.rowKey === item.id ? (
                                //     <input value={product_category}
                                //            onChange={(event) => setProduct_category(event.target.value)}
                                //     />
                                // ) : (
                                //     item.product_category
                                // )
                                <AddButton />
                            }</td>
                        {/* <td>
                            {
                                inEditMode.status && inEditMode.rowKey === item.id ? (
                                    <input value={unitPrice}
                                           onChange={(event) => setUnitPrice(event.target.value)}
                                    />
                                ) : (
                                    item.unit_price
                                )
                            }
                        </td>
                        <td>
                            {
                                inEditMode.status && inEditMode.rowKey === item.id ? (
                                    <React.Fragment>
                                        <button
                                            className={"btn-success"}
                                            onClick={() => onSave({id: item.id, newUnitPrice: unitPrice, newProduct_name: product_name, newProduct_category: product_category})}
                                        >
                                            Save
                                        </button>

                                        <button
                                            className={"btn-secondary"}
                                            style={{marginLeft: 8}}
                                            onClick={() => onCancel()}
                                        >
                                            Cancel
                                        </button>
                                    </React.Fragment>
                                ) : (
                                    <button
                                        className={"btn-primary"}
                                        onClick={() => onEdit({id: item.id, currentUnitPrice: item.unit_price, currentProduct_name: item.product_name, currentProduct_category: item.product_category})}
                                    >
                                        Edit
                                    </button>
                                )
                            }
                        </td> */}
                    </tr>
                ))
            }
            </tbody>
        </table>
    </div>
);
        }

export default ScoringSectionHeader