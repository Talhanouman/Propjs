import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AutoSelect from '../../components/auto_select';
import DataTable from '../../components/dataTable';
import StyledButton from '../../components/styledButton';
import { handleGetMetroData, handleGetMetrosByState } from '../../reducers/payment';
import PaymentFormDialog from './paymentFormDialog';

const RegionalOptions = ({ plans, metroStates, metros,metroData, isLoadingStates, isLoadingMetros, isLoadingData, handleGetMetroData, handleGetMetrosByState }) => {
    const [ values, setValues ] = React.useState({})
    const [ openPayment, setOpenPayment ] = React.useState(false)
    const handleChange = (name) => item => {
        if (item && name === 'states') {
            setValues({'states': item })
            handleGetMetrosByState(item.value)
        }
        if (item && name === 'metros') {
            setValues(oldValues => ({ ...oldValues, [name]: item }))
            handleGetMetroData(item.value)
        }
    }
    const formatStates = (data) => {
        if (!data) { data = {} }
        return data.map(x => { return {value: x.name, label: x.display_name}})
    }
    const formatMetros = (data) => {
        if (!data) { data = {} }
        // const selected = getSelected()
        var options = Object.keys(data).reduce((result, key) => {
            result.push({
                value: data[key].metro,
                label: data[key].metro,
                // disabled: selected.indexOf(data[key].name) >= 0
            });
            return result;
        }, []);
        return options
    }
    const columns = React.useMemo(() =>  [
        {
            Header: "City",
            accessor: "city"
        },
        {
            Header: "Locality",
            accessor: "locality"
        },
        {
            Header: "Motivation",
            accessor: "motivation"
        },
        {
            Header: "Record Count",
            accessor: "number_of_records"
        },
        {
            Header: "Last Updated",
            accessor: "last_update_completion_time"
        }
      ], [])
    return (
    <div>
        <PaymentFormDialog
            selectedPlan={plans.find(x => x.id === 'pro')}
            open={openPayment}
            metro={values.metros ? values.metros.value : ''}
            toggleDialog={() => setOpenPayment(false)} />
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div>
                    {isLoadingStates ? <CircularProgress size={24} /> :
                    <AutoSelect
                        textFieldProps={{
                            label: 'Select State'
                        }}
                        name='states'
                        margin="none"
                        options={formatStates(metroStates || [])}
                        selectedValue={values.states || []}
                        handleAutoSelectChange={handleChange}
                    />}
                </div>
                {values.states && <div>
                {/* {values.states && !values.metros && isLoading && <CircularProgress size={24} /> }
                    {values.states && metros && !isLoading && <AutoSelect */}
                    {isLoadingMetros ? <CircularProgress size={24} /> :
                    <AutoSelect
                        textFieldProps={{
                            label: 'Select Market'
                        }}
                        name='metros'
                        margin="none"
                        options={formatMetros(metros || [])}
                        selectedValue={values.metros || []}
                        handleAutoSelectChange={handleChange}
                    />}
                </div>}
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={5}>
                {values.metros && 
                <div style={{display: 'flex', height: '100%', paddingBottom: 8, flexDirection: 'column', justifyContent: 'flex-end'}}>
                    <StyledButton style={{margin: 0, padding: '2px 12px'}} handleButtonClick={() => setOpenPayment(true)} label={"Select " + values.metros.label}></StyledButton>
                </div>}
            </Grid>
        </Grid>
        {values.states && values.metros && <div>
            {isLoadingData ? <CircularProgress size={24} /> :
                <DataTable
                    data={metroData} 
                    columns={columns} />
            }
        </div>}
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        plans: state.payment.plans,
        metroStates: state.payment.metroStates,
        metros: state.payment.metros,
        metroData: state.payment.metroData || [],
        isLoadingStates: state.payment.isLoadingStates,
        isLoadingMetros: state.payment.isLoadingMetros,
        isLoadingData: state.payment.isLoadingData
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        handleGetMetrosByState,
        handleGetMetroData
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(RegionalOptions)
