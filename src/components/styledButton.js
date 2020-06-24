import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
    buttonStyle: {
        margin: theme.spacing(2.5, 2),
        padding: 2,
        alignSelf: 'center',
        fontSize: '16px',
        fontWeight: 600,
        backgroundColor: theme.palette.primary.main,
        color: '#FFF',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    }
}))

const StyledButton = ({ handleButtonClick, disabled, label, ...other }) => {
    const classes = useStyles()
    return (
        <Button
            variant="outlined"
            size="small"
            color="primary"
            className={classes.buttonStyle}
            onClick={handleButtonClick}
            disabled={disabled}
            {...other}
        >
            {label || 'Add'}
        </Button>
    )
}


export default StyledButton
