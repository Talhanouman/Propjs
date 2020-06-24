import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { parser } from '../utils/parser';
import StyledButton from './styledButton';

const styles = theme => ({
    textField: {
        width: '40%',
        minWidth: 180,
        marginTop: 8,
        [theme.breakpoints.down("xs")]: {
          width: '100%'
        }
    },
})

const MinMaxComponent = ({criteria, section, name, addCriteriaItem, InputProps, classes}) => {
    const [ values, setValues ] = React.useState({})
    const min = name + "_min"
    const max = name + "_max"
    const checkValue = name  + '_none'
    React.useEffect(() => {
        const item = criteria && criteria[section] ? criteria[section][name] : null
        setValues(item
            ? {
                [min]: item['min'],
                [max]: item['max'],
                [checkValue]: item['none']
            }
            : {}
        )
    }, [criteria, section, name, checkValue, min, max]); 
    const handleNumericChange = (event) => {
        const value = event.target.value
        if (value && !parser.isNumeric(value)) { return }
        handleChange({target: {name: event.target.name, value: value}})
    }
    const handleChange = (event) => {
        const targetName = event.target.name
        const value = event.target.value
        setValues(oldValues => ({ ...oldValues, [targetName]: value }))
    };
    const handleAdd = () => {
        addCriteriaItem({section: section, group: name, data: {'min': values[min], 'max': values[max], 'none': values[checkValue] }})
    }
    const handleChecked = (event) => {
        const isChecked = Boolean(event.target.checked)
        setValues(oldValues => ({ ...oldValues, [checkValue]: isChecked }))
        addCriteriaItem({section: section, group: name, data: {'min': values[min], 'max': values[max], 'none': isChecked }})
    };
    return (
        <React.Fragment>
            <div>
                <FormControlLabel
                    control={<Checkbox checked={values[checkValue] || false} onChange={handleChecked} name={checkValue} value={checkValue} /> }
                    label={"Include properties with unknown " + name.replace(/_/g, ' ')}
                />
            </div>
            <TextField
                id={min}
                name={min}
                label="Min."
                value={values[min] || ''}
                InputLabelProps={{ shrink: true }}
                InputProps={InputProps || {}}
                onChange={handleNumericChange}
                margin="none"
                variant="outlined"
                style={{marginRight: 8}}
                className={classes.textField} />
            <TextField
                id={max}
                name={max}
                label="Max."
                value={values[max] || ''}
                InputLabelProps={{ shrink: true }} 
                InputProps={InputProps || {}}
                onChange={handleNumericChange}
                margin="none"
                variant="outlined"
                className={classes.textField} />
            <StyledButton
                disabled={!values[checkValue] && !values[min] && !values[max]}
                handleButtonClick={handleAdd}
                style={{marginBottom: 0}}
            />
        </React.Fragment>
    )
}

export default withStyles(styles)(MinMaxComponent)
