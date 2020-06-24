import React from 'react';
import {Dialog, Button, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField} from '@material-ui/core';

function DeleteConfirmationDialog({list, toggleDialog, handleConfirmation}) {
    const [ text, setText ] = React.useState('')
    React.useEffect(() => {
        setText('')
    }, [list]);
    const handleConfirm = () => {
        if (handleConfirmation) { handleConfirmation(list.list_uuid) }
        toggleDialog(null)
    }
    if (!list) { return <div /> }
    return (
        <Dialog
            open={list ? true : false}
            onClose={() => toggleDialog(null)}
            >
            <DialogTitle>Delete the list: {list.list_name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This action is final and the list cannot be recovered.
                    To delete <strong>{list.list_name}</strong> type the word "DELETE" in the space below.  
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    variant="outlined"
                    label="DELETE"
                    type="text"
                    value={text || ''}
                    onChange={(event) => setText(event.target.value)}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => toggleDialog(null)} variant="contained" style={{backgroundColor: 'black', color: '#FFF'}}>
                    CANCEL
                </Button>
                <Button disabled={text !== 'DELETE'} onClick={handleConfirm} variant="contained" style={{backgroundColor: (text === 'DELETE' ? 'red' : '#ccc'), color: '#FFF'}}>
                    DELETE
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteConfirmationDialog
