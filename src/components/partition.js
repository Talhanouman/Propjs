import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
const styles = theme => ({
    partition: {
        color: '#aaa',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    text: {
        overflow: 'hidden',
        textAlign: 'left',
        '&:before, &:after': {
            backgroundColor: '#aaa',
            content: "close-quote",
            display: 'inline-block',
            height: "1px",
            position: 'relative',
            verticalAlign: 'middle',
            width: '50%'
        },
        '&:before': {
            right: '0.5em',
            marginLeft: '-50%'
        },
        '&:after': {
            left: '1.5em',
            marginRight: '-50%',
            width: '90%'
        }
    },
    centertext: {
        overflow: 'hidden',
        textAlign: 'center',
        '&:before, &:after': {
            backgroundColor: '#aaa',
            content: "close-quote",
            display: 'inline-block',
            height: "1px",
            position: 'relative',
            verticalAlign: 'middle',
            width: '50%'
        },
        '&:before': {
            right: '0.5em',
            marginLeft: '-50%'
        },
        '&:after': {
            left: '0.5em',
            marginRight: '-50%',
        }
    }
})

const Partition = props => (
    <div className={props.classes.partition}>
        <Typography component="div" className={props.center ? props.classes.centertext : props.classes.text} variant='body1'>{props.text}</Typography>
    </div>
)

export default withStyles(styles)(Partition)
