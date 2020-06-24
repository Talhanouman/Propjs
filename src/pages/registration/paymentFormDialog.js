import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import PaymentForm from './paymentForm';

function PaymentFormDialog({selectedPlan, metro, listId, open, toggleDialog}) {
    return (
        <Dialog
            open={open}
            onClose={() => toggleDialog(false)}
            >
            <DialogTitle>Payment Form</DialogTitle>
            <DialogContent>
                <PaymentForm
                    planType={metro ? 'regional' : null}
                    plan={selectedPlan}
                    metro={metro}
                    listId={listId}
                    onCancel={() => toggleDialog(false)}  
                /> 
            </DialogContent>
            <DialogActions>
                {/* <Button onClick={() => toggleDialog(false)} variant="contained" style={{backgroundColor: 'black', color: '#FFF'}}>
                    CANCEL
                </Button>
                <Button onClick={() => saveList()} variant="contained" color="primary">
                    SUBMIT
                </Button> */}
            </DialogActions>
        </Dialog>
    );
}

export default PaymentFormDialog
