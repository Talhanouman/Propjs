import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';

export default function SkiptraceCompleteDialog({ open, toggleDialog}) {
    return (
        <Dialog
            open={open}
            onClose={() => toggleDialog(false)}
            >
            <DialogTitle>Skiptrace Complete</DialogTitle>
            <DialogContent>
                This list has already been skiptraced.
            </DialogContent>
            <DialogActions>
                <Button onClick={() => toggleDialog(false)} variant="contained" color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}
