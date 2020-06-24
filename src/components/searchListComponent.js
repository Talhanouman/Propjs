import React from 'react'
import AutoSelect from './auto_select'
import StyledButton from './styledButton'

const SearchListComponent = ({criteria, section, name, listItems, addCriteriaItem}) => {
    const [ values, setValues ] = React.useState({})
    React.useEffect(() => {
        setValues(criteria && (criteria[section] || {}))
    }, [criteria, section]); 
    const handleAdd = () => {
        if (!values[name] || values[name].length === 0) { return }
        addCriteriaItem({section: section, group: name, data: values[name]})
    }
    const handleListItemChange = (name) => item => {
        setValues(oldValues => ({ ...oldValues, [name]: item }))
    }
    return (
        <React.Fragment>
            <AutoSelect
                textFieldProps={{
                    label: 'Select multiple items',
                }}
                name={name}
                margin="normal"
                isMulti
                options={listItems}
                selectedValue={values ? values[name] : []}
                handleAutoSelectChange={handleListItemChange}
            />
            <div style={{margin: '16px'}}>
                <StyledButton
                    handleButtonClick={handleAdd}
                />
            </div>
        </React.Fragment>
    )
}

export default SearchListComponent
