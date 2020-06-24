import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleSendServiceRequest } from '../reducers/support';

function MarketRequestDialog({open, toggleDialog, handleSendServiceRequest}) {
    const [ market, setMarket ] = React.useState(null)
    const handleConfirm = () => {
        handleSendServiceRequest(market)
        toggleDialog()
        setMarket(null)
    }
    return (
        <Dialog
            open={open}
            onClose={() => toggleDialog()}
            maxWidth="sm"
            >
            <DialogTitle>Request a Market</DialogTitle>
            <DialogContent style={{minWidth: 320, marginBottom: 32}}>
                <TextField
                    label="Market"
                    value={market || ''}
                    fullWidth
                    onChange={(event) => setMarket(event.target.value)}
                    margin="dense"
                    variant="outlined"
                />                
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { toggleDialog()}} variant="contained">
                    CANCEL
                </Button>
                <Button disabled={!market} onClick={handleConfirm} variant="contained" color="primary">
                    SEND
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
        handleSendServiceRequest
    }, dispatch)
}
  
export default connect(mapStateToProps, mapDispatch)(MarketRequestDialog)
