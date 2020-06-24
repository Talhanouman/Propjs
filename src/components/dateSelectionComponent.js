import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import StyledButton from './styledButton';

const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: theme.spacing(1),
    }
}))

export default function DateSelectionComponent ({criteria, section, name, addCriteriaItem}) {
    const classes = useStyles();
    const [ selectedDate, setSelectedDate ] = React.useState('')
    React.useEffect(() => {
        setSelectedDate(criteria && criteria[section] && criteria[section][name] ? criteria[section][name].value : '')
    }, [criteria, section, name]); 
    const handleChange = (event) => {
        const value = event.target.value
        setSelectedDate(value)
    };
    const handleAdd = () => {
        addCriteriaItem({section: section, group: name, data: { value: selectedDate, label: selectedDate } })
    }
    return (
        <React.Fragment>
            <TextField
                name={name}
                label="Select Date"
                type="date"
                value={selectedDate}
                InputLabelProps={{ shrink: true }} 
                onChange={handleChange}
                margin="none"
                variant="outlined"
                className={classes.textField}
            />
            <StyledButton
                style={{margin: '12px 20px'}}
                disabled={!selectedDate}
                handleButtonClick={handleAdd}
            />
        </React.Fragment>
    )
}
