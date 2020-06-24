import React from 'react'
import StyledButton from '../../components/styledButton'
import { Typography, TextField } from '@material-ui/core'
import ListSelection from '../../components/listSelection'

const CombineLists = () => {
    const handleCombine = () => {
    }
    return (
        <div style={{padding: 16, maxWidth: 800, width: '100%', margin: 'auto'}}>
            <Typography variant="h6">Select Lists to Combine:</Typography>
            <Typography variant="body1">Combined lists are ....  Compared to Stacked lists where...</Typography>
            <ListSelection hideLabel={true} />
            <Typography variant="h6">Name your Combined List:</Typography>
            <TextField
                placeholder="List Name"
                margin="normal"
                variant="outlined"
            />
            <div>
                <StyledButton
                    handleButtonClick={handleCombine}
                    label="Combine"
                    style={{margin: '16px 0', padding: '4px 16px'}}
                />
            </div>
        </div>
    )
}

export default CombineLists
