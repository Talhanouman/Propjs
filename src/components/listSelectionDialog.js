import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListSelection from './listSelection';

function ListSelectionDialog({open, title, allowMultipleSelections, handleConfirm, handleCancel}) {
    const [ selectedLists, setSelectedLists ] = React.useState([])
    return (
        <Dialog
            open={open}
            onClose={() => handleCancel()}
            >
            <DialogTitle>{title || 'Select List'}</DialogTitle>
            <DialogContent style={{padding: '0 32px 32px', minHeight: 500, minWidth: 400}}>
                <ListSelection isMultiSelect={allowMultipleSelections} onSelect={setSelectedLists} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCancel()} variant="contained" style={{backgroundColor: 'black', color: '#FFF'}}>
                    CANCEL
                </Button>
                <Button onClick={() => handleConfirm(selectedLists)} variant="contained" color="primary">
                    SAVE
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const mapStateToProps = (state) => {
    return {
        lists: state.lists.lists
    }
  }
  const mapDispatch = (dispatch) => {
    return bindActionCreators({
    }, dispatch)
  }
  
export default connect(mapStateToProps, mapDispatch)(ListSelectionDialog)
