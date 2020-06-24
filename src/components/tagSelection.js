import React from 'react'
import AutoSelect from './auto_select'

const TagSelection = () => {
    const listItems = [
        { value: 'tagA', label: 'Tag A' },
        { value: 'tagB', label: 'Tag B' },
        { value: 'tagC', label: 'Tag C' },
    ]
    const [ values, setValues ] = React.useState([])
    const handleListItemChange = (name) => item => {
        setValues(item)
    }
    
    return (
            <AutoSelect
                textFieldProps={{
                    label: 'Select Tags'
                }}
                name="tag_selection"
                margin="none"
                isMulti
                options={listItems}
                selectedValue={values || []}
                handleAutoSelectChange={handleListItemChange}
            />
    )
}

export default TagSelection
