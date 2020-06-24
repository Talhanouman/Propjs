import React from 'react'
import StyledButton from './styledButton'
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core'

const RadioComponent = ({criteria, section, name, listItems, addCriteriaItem}) => {
    const [ selectedValue, setValue ] = React.useState()
    React.useEffect(() => {
        setValue(criteria && criteria[section] && criteria[section][name] && criteria[section][name].value)
    }, [criteria, name, section]); 
    const handleAdd = () => {
        addCriteriaItem({section: section, group: name, data: { value: selectedValue, label: selectedValue }})
    }
    const handleRadioChange = (event) => {
        const value = event.target.value
        setValue(value)
    }
    return (
    <div style={{display: 'flex'}}>
        <div>
            <RadioGroup
                name={name}
                value={selectedValue || ''}
                onChange={handleRadioChange} 
                row>
                { listItems.map((item, idx) => {
                    return <FormControlLabel
                        key={idx}
                        value={item}
                        control={<Radio color="primary" />}
                        label={item}
                        labelPlacement="top"
                    />
                })}
            </RadioGroup>
        </div>
        <div style={{marginLeft: 8}}>
            <StyledButton handleButtonClick={handleAdd} />
        </div>
    </div>
    )
}

export default RadioComponent
