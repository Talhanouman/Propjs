// import React from 'react'
// import { TextField, MenuItem } from '@material-ui/core'

// const FilterOptions = ({name, label, optionList}) => {
//     const [value, setValue] = React.useState()
//     const handleSelection = (event) => {
//         setValue(event.target.value)
//     }
//     return (
//         <TextField
//             id={name}
//             name={name}
//             color='primary'
//             label={label}
//             inputProps={{ name: name, id: name }}
//             select
//             variant="outlined"
//             fullWidth
//             value={value || ''}
//             onChange={handleSelection}
//             style={{margin: '0 4px'}}
//             >
//                 {optionList.map((item, idx) => (
//                     <MenuItem key={idx} value={item.value}>{item.label}</MenuItem>
//                 ))}
//             </TextField>
//     )
// }

// export default FilterOptions
