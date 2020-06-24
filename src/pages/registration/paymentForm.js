
import { Button, CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AntSwitch from '../../components/antSwitch';
import CreditCardElement from '../../components/creditCardElement';
import TermsContractDialog from '../../components/termsContractDialog';
import { handleApplyCoupon, handleSubmitCharge, handleSubmitSkipTraceCharge } from '../../reducers/payment';
import { parser } from '../../utils/parser';

const PaymentForm = ({
    plan,
    planType, 
    metro,  
    coupon, 
    couponChecked,  
    onCancel, 
    signedUrl, 
    isLoading,
    listId,
    mapping,
    listCost,
    paymentMethod,
    handleApplyCoupon,
    handleSubmitSkipTraceCharge, 
    handleSubmitCharge}) => { 
    const [couponCode, setCouponCode] = React.useState('')
    const [stripeId, setStripeId] = React.useState()
    const [annually, setAnnually] = React.useState(false)
    const [showTerms, setShowTerms] = React.useState(false)
    const [recordCount, setRecordCount] = React.useState()

    const clickSubmit = (token) => {
        setStripeId(token)
        setShowTerms(true)
    }
    const submitCharge = () => {
        if (planType) {
            handleSubmitCharge(planType, plan.id, stripeId, annually ? 'annually' : 'monthly', metro, couponCode)
        } else {
            handleSubmitSkipTraceCharge(signedUrl, mapping, stripeId, couponCode, listId, recordCount)
        }
    }
    const getCost = (cost, coupon) => {
        if (!coupon || !coupon.code) { return cost }
        if (planType) {
            const formatDiscount = 1 - (coupon.discount / 100)
            return parser.roundTo(formatDiscount * cost, 2)
        } else {
            return (cost - Number(coupon.skiptrace_discount))
        }
    }
    const getRecordCount = (records, coupon) => {
        if (!coupon || !coupon.record_increase) { return records }
        return parseInt(Number(records) + Number(coupon.record_increase), 10)
    }
    const getRecordCountCost = (records, cost, coupon) => {
        const recordCost = getCost(cost, coupon)
        return parser.roundTo(records * recordCost, 2)
    }
    const getCouponMessage = (coupon) =>  {
        if (!couponChecked) { return }
        if (!coupon) { return <Typography color="error" variant="subtitle1">Coupon code is not valid</Typography> }
        let text = ''
        if (planType) {
            text = parseInt(coupon.discount) + '% coupon applied'
        } else {
            text = 'Coupon applied: $' + coupon.skiptrace_discount + ' per record'
        }
        return <div>
            {(coupon.discount || coupon.skiptrace_discount) && <div><Typography style={{color: '#00b200'}} variant="subtitle1">{text}</Typography></div>}
            {planType && coupon.record_increase && <div><Typography style={{color: '#00b200'}} variant="subtitle1">{parseInt(coupon.record_increase) + ' records added'}</Typography></div>}
        </div>
    }
    const handleChange = (event) => {
        const value = event.target.value
        setCouponCode(value)
    }
    const handleToggleCost = (event) => {
        const value = event.target.checked
        setAnnually(value)
    }
    const handleNumericChange = (event) => {
        const value = event.target.value
        if (value && !parser.isNumeric(value)) { return }
        if (listCost && listCost.records_without_phones && value > listCost.records_without_phones) {
            setRecordCount(listCost.records_without_phones)
        } else {
            setRecordCount(value)
        }
    }
    return (
        <React.Fragment>
            <TermsContractDialog
                open={showTerms}
                toggleDialog={() => setShowTerms(false)}
                handleConfirmation={submitCharge}
            />
            {planType && plan && plan.monthly && <Typography component="div" gutterBottom>
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Monthly</Grid>
                    <Grid item>
                        <AntSwitch
                        checked={annually}
                        onChange={handleToggleCost}
                        value="annually"
                        />
                    </Grid>
                    <Grid item>Annually</Grid>
                </Grid>
            </Typography>}
            {planType && plan && plan.monthly && <Typography variant="subtitle1" style={{textAlign: 'left'}} gutterBottom>
                {getRecordCount(plan.records, coupon) + ' records per month for $' + getCost(annually ? plan.annually : plan.monthly, coupon) + (annually ? ' annually' : ' monthly')}
            </Typography> }
            {planType && plan && !plan.monthly && <Typography variant="subtitle1" style={{textAlign: 'left'}} gutterBottom>
                {'Unlimited regional and national records for $' + getCost(plan.annually, coupon)}
            </Typography> }
            {!planType && listCost && listCost.cost_per_record && <div>
                <Typography variant="subtitle1" style={{textAlign: 'left'}} gutterBottom>
                    {'Cost is $' + getCost(listCost.cost_per_record, coupon) + ' per record identified.  Payment will be charged after records are processed. You will not be charged for records not identified.'}
                </Typography>
                <Typography variant="subtitle1" style={{textAlign: 'left'}} gutterBottom>
                    {'Maximum payment is $' + getRecordCountCost(recordCount || listCost.records_without_phones, listCost.cost_per_record, coupon)}
                </Typography>
                <TextField
                    id="recordCount"
                    name="recordCount"
                    label="Records Requested"
                    type="number"
                    value={recordCount || listCost.records_without_phones || 1}
                    InputProps={{ inputProps: { min: 1, max: (listCost.records_without_phones || 1) } }}
                    InputLabelProps={{ shrink: true }} 
                    onChange={handleNumericChange}
                    style={{minWidth: 150}}
                    margin="none"
                    variant="outlined" />
            </div>}
            {!planType && !listCost && <div style={{width: '100%', minWidth: 500, textAlign: 'center', padding: 16}}><CircularProgress /></div> }

            <div style={{display: 'flex', marginTop: 24, width: '100%'}}>
                <TextField
                    placeholder="Discount Code"
                    margin="none"
                    variant="outlined"
                    style={{width: '72%', marginRight: 8}}
                    value={couponCode || ''}
                    onChange={handleChange}
                />
                <Button color="primary" onClick={() => handleApplyCoupon(couponCode)} variant="contained" style={{flex: 'auto'}}>Apply</Button>
            </div>
            <div>
                {couponChecked && getCouponMessage(coupon)}
            </div>
            {paymentMethod && paymentMethod.id && paymentMethod.last4
                ? <div style={{margin: '16px 0'}}>
                    <Typography style={{margin: '8px 0'}}>Payment Method: Card ending in {paymentMethod.last4}</Typography>
                    {isLoading ? <CircularProgress /> : <Button color="primary" variant="outlined"  onClick={() => clickSubmit()}>Submit</Button>}
                </div>
                : <CreditCardElement handleSubmit={clickSubmit} />
            }
            {onCancel && <div style={{width: '100%', textAlign: 'right'}}>
                <div onClick={() => onCancel()} style={{cursor: 'pointer', fontSize: '10px'}}>Cancel</div>
            </div>}
        </React.Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        coupon: state.payment.coupon,
        couponChecked: state.payment.couponChecked,
        isLoading: state.payment.isLoading,
        signedUrl: state.skiptracing.signedUrl,
        mapping: state.skiptracing.mapping,
        listCost: state.skiptracing.listCost,
        paymentMethod: state.payment.payment_method
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
      handleApplyCoupon,
      handleSubmitCharge,
      handleSubmitSkipTraceCharge,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(PaymentForm)
