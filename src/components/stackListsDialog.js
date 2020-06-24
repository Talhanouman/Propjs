import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleClearListId, handleStackLists } from '../reducers/lists';
import ListSelection from './listSelection';
 
function StackListsDialog({open, listId, isLoading, handleStackLists, handleCancel, handleClearListId}) {
    const [ selectedLists, setSelectedLists ] = React.useState([])
    const [ listName, setListName ] = React.useState('')
    React.useEffect(() => {
        handleClearListId()
        setListName('')
        setSelectedLists([])
    }, [open, handleClearListId]);
    React.useEffect(() => {
        if (listId) {
            handleCancel()
        }
    }, [listId, handleCancel]);
    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            maxWidth="sm"
            >
            <DialogTitle><div>Select Multiple Lists to Stack<div style={{fontSize: 14}}>Select at least two lists</div></div></DialogTitle>
            <DialogContent style={{padding: '0 32px 32px', minHeight: 500, minWidth: 400}}>
                <ListSelection isMultiSelect={true} onSelect={setSelectedLists} />
                <TextField
                    margin="dense"
                    variant="outlined"
                    label="List Name"
                    type="text"
                    value={listName}
                    onChange={(event) => setListName(event.target.value)}
                    fullWidth
                />
                {listId && !isLoading && <Typography>List successfully created!</Typography>}
            </DialogContent>
            <DialogActions>
                {isLoading ? <CircularProgress width={24} /> :
                <React.Fragment>
                <Button onClick={handleCancel} variant="contained" style={{backgroundColor: 'black', color: '#FFF'}}>
                    CANCEL
                </Button>
                <Button disabled={!selectedLists || selectedLists.length < 2 || !listName} onClick={() => handleStackLists(selectedLists, listName)} variant="contained" color="primary">
                    SAVE
                </Button>
                </React.Fragment>
                }
            </DialogActions>
        </Dialog>
    );
}

const mapStateToProps = (state) => {
    return {
        lists: state.lists.lists,
        listId: state.lists.listId,
        isLoading: state.lists.isLoading
    }
  }
  const mapDispatch = (dispatch) => {
    return bindActionCreators({
        handleStackLists,
        handleClearListId
    }, dispatch)
  }
  
export default connect(mapStateToProps, mapDispatch)(StackListsDialog)
