import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Label } from 'reactstrap';

const AddTitle = (props) => {
    return (
        <AvForm >
            <Label for="title">Title</Label>
            <AvField id="title" name="title" value={props.value} required onChange={props.onChange} />
        </AvForm>
    )
}

export default AddTitle;