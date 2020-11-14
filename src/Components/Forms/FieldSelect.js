import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
const useStyles = makeStyles((theme) => ({

    select: {
        width: 300,
        margin: 5
    }
  }));

function FieldSelect(props) {
    const classes = useStyles();
    const [dataField, setDataField] = useState('')
    const onSubmit = (event) =>{
        props.setField(event.target.value)
    }
    return (
        <div>
            <FormControl >
            <InputLabel>Data Field</InputLabel>
            <Select 
                value={dataField}
                onChange={onSubmit}
            >
                {props.fields.map(value => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </Select>
            <FormHelperText>Select a data range.  </FormHelperText>
</FormControl>
        </div>
    )
}
export default FieldSelect;