import React from 'react';
import {Dialog, Button, DialogActions, DialogContent, DialogTitle, FormControlLabel, Checkbox} from '@material-ui/core';

function DownloadOptionsDialog({list, toggleDialog, handleConfirmation}) {
    const [ removeDupes, setRemoveDupes ] = React.useState(false)
    const handleConfirm = () => {
        if (handleConfirmation) { handleConfirmation(list.list_uuid, removeDupes) }
        toggleDialog(null)
        setRemoveDupes(false)
    }
    if (!list) { return <div /> }
    return (
        <Dialog
            open={list ? true : false}
            onClose={() => toggleDialog(null)}
            >
            <DialogTitle>Download {list.list_name}</DialogTitle>
            <DialogContent>
                <FormControlLabel
                    control={<Checkbox checked={removeDupes} onChange={() => setRemoveDupes(!removeDupes)} value='remove_duplicates' /> }
                    label={"Remove Duplicate Owners"}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => toggleDialog(null)} variant="contained" style={{backgroundColor: 'black', color: '#FFF'}}>
                    CANCEL
                </Button>
                <Button onClick={handleConfirm} variant="contained" color="primary">
                    DOWNLOAD
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DownloadOptionsDialog
