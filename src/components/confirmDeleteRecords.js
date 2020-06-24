import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleDeleteRecord } from '../reducers/lists';

function ConfirmDeleteRecords({open, listId, rows, toggleDialog, handleDeleteRecord}) {
    const onConfirm = () => {
        handleDeleteRecord(listId, rows.map(x => x.plid))
        toggleDialog(null)
    }
    return (
        <Dialog
            open={open}
            onClose={() => toggleDialog(null)}
            >
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete {rows.length} records from this list?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => toggleDialog(null)} variant="contained" style={{backgroundColor: 'black', color: '#FFF'}}>
                    CANCEL
                </Button>
                <Button onClick={onConfirm} variant="contained" style={{backgroundColor: 'red', color: '#FFF'}}>
                    DELETE
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        handleDeleteRecord
    }, dispatch)
}
  
export default connect(mapStateToProps, mapDispatch)(ConfirmDeleteRecords)
  