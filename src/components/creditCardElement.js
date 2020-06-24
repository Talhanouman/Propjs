/* globals Stripe */
import { Button, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cls from 'classnames';
import React from 'react';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    cardBox: {
        width: '100%',
        border: 'solid 1px #888',
        borderRadius: theme.spacing(1),
        margin: '8px 0',
        padding: theme.spacing(1),
        '&.hide': {
            display: 'none'
        }
    },
    submit: {
        marginTop: theme.spacing(0)
    },
}))

const CreditCardElement = ({ isLoading, paymentError, approval, handleSubmit }) => {
    const classes = useStyles()
    const [error, setError] = React.useState()
    const [stripe, setStripe] = React.useState()
    const [card, setCard] = React.useState()
    React.useEffect(() => {
        let st = Stripe(process.env.REACT_APP_STRIPE)
        let el = st.elements()
        let ca = el.create('card', { style: { base: {fontSize: '16px'}}})
        ca.mount('#card-element')
        ca.addEventListener('change', cardListener)
        setStripe(st)
        setCard(ca)
    }, [handleSubmit])
    const cardListener = (event) => {
        if (!event.error) {
          setError(null)
        }
    }
    const clickSubmit = (event) => {
        event.preventDefault()
        setError(null)
        stripe.createToken(card, {currency: 'usd'}).then(function (result) {
            if (result.error) { return setError(result.error.message) }
            // console.warn('STRIPE', result)
            handleSubmit(result.token.id)
        })
    }
    const processError = (msg) => {
        if (!msg) { return '' }
        return <div style={{textTransform: 'capitalize'}}>{msg.replace(/_/g, ' ')}</div>
    }
    return (
        <form onSubmit={clickSubmit} style={{width: '100%'}}>
            <div className={cls(classes.cardBox)}>
                <div id='card-element' />
            </div>
            <Typography color="error" variant="subtitle1" style={{textAlign: 'left'}}>
                {processError(error || paymentError)}
            </Typography>
            {isLoading ? <CircularProgress /> :
                <Button 
                    className={classes.submit} 
                    disabled={Boolean(approval && approval.stripe_obj)}
                    type="submit" 
                    variant="outlined" 
                    name="submit" 
                    color="primary">Submit</Button>
            }
        </form>
    )
}
const mapStateToProps = (state) => {
    return {
        paymentError: state.payment.error,
        isLoading: state.payment.isLoading,
        approval: state.payment.approval,
    }
}

export default connect(mapStateToProps)(CreditCardElement)
