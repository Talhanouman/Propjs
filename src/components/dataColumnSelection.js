import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, FormControlLabel} from '@material-ui/core';
import StyledButton from './styledButton';

function DataColumnSelection({open, setOpen, columns, disabledHeaders, onHeaderClick }) {
    const [unchecked, setUnchecked] = React.useState([])
    React.useEffect(() => {
        setUnchecked([...disabledHeaders])
    }, [disabledHeaders]);
    const onCheckChange = event => {
        let newArray = unchecked || []
        if (event.target.checked) {
          newArray = newArray.filter(x => x !== event.target.value)
        }  else {
          newArray.push(event.target.value)
        } 
        setUnchecked([...newArray])
    }
    const onResetSelections = () => {
        setUnchecked([...disabledHeaders])
        setOpen(false)
    }
    const onSave = () => {
        onHeaderClick([...unchecked])
        setOpen(false)
    }
    return (
        <Dialog
            open={open}
            onClose={() => onResetSelections()}
            >
            <DialogTitle>Select columns to display</DialogTitle>
            <DialogContent>
                {columns && columns.map((header, idx) => {
                    return (
                        <div key={idx}>
                            <FormControlLabel
                                style={{textTransform: 'capitalize'}}
                                control={
                                    <Checkbox
                                        style={{padding: 6}}
                                        checked={unchecked && !unchecked.includes(header)}
                                        onChange={onCheckChange} 
                                        name={header} 
                                        value={header}
                                    /> 
                                }
                                label={header.replace(/_/g, ' ')}
                            />
                        </div>
                    )
                })}
            </DialogContent>
            <DialogActions>
                <StyledButton
                    handleButtonClick={() => onResetSelections()}
                    label="CANCEL"
                    style={{margin: 4, padding: '2px 8px', backgroundColor: '#000'}}
                />
                <StyledButton
                    handleButtonClick={() => onSave()}
                    label="SAVE"
                    style={{margin: 4}}
                />
            </DialogActions>
        </Dialog>
    );
}

export default DataColumnSelection
