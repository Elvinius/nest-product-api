import React from 'react';
import { Table } from 'reactstrap';

const ProductTable = (props) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.products}
            </tbody>
        </Table>
    )
}

export default ProductTable;