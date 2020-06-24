import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import StyledButton from './styledButton';

const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: theme.spacing(1),
    }
}))

const DateRangeComponent = ({criteria, section, name, addCriteriaItem}) => {
    const classes = useStyles();
    const [ values, setValues ] = React.useState({})
    const min = name + "_min"
    const max = name + "_max"
    React.useEffect(() => {
        const item = criteria && criteria[section] ? criteria[section][name] : null
        setValues(item
            ? {
                [min]: item['min'],
                [max]: item['max'],
            }
            : {}
        )
    }, [criteria, section, name, min, max]); 
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setValues(oldValues => ({ ...oldValues, [name]: value }))
    };
    const handleAdd = () => {
        addCriteriaItem({section: section, group: name, data: {'min': values[min], 'max': values[max] }})
    }
    return (
        <React.Fragment>
            <TextField
                id={min}
                name={min}
                label="Min."
                type="date"
                value={values[min] || ''}
                InputLabelProps={{ shrink: true }} 
                onChange={handleChange}
                margin="none"
                variant="outlined"
                style={{marginRight: '24px'}}
                className={classes.textField}
            />
            <TextField
                id={max}
                name={max}
                label="Max."
                value={values[max] || ''}
                type="date"
                InputLabelProps={{ shrink: true }} 
                onChange={handleChange}
                margin="none"
                variant="outlined"
                className={classes.textField}
            />
            <StyledButton
                disabled={!values[min] || !values[max]}
                handleButtonClick={handleAdd}
            />
        </React.Fragment>
    )
}

export default DateRangeComponent
