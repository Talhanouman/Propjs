import { CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SkiptraceMapping from '../../components/skiptraceMapping';
import { handleUpdateMapping, handleUploadFile } from '../../reducers/skiptracing';
import PaymentForm from '../registration/paymentForm';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

function SkipTracingView({
  isLoading,
  signedUrl, 
  error, 
  mapping,
  totalCount, 
  plans,
  handleUploadFile, 
  handleUpdateMapping }) {
  const classes = useStyles();
  const [showColumns, setShowColumns] = React.useState(false)
  const maxSize = Number(process.env.REACT_APP_CSV_MAX_SIZE || 5000000)
  const uploadFile = (file) => {
    handleUpdateMapping({})
    if (!file || file.length < 1) {
      setShowColumns(false)
      return
    }
    setShowColumns(true)
    handleUploadFile(signedUrl, file[0])
  }
  return ( <div className={classes.root}>
    <div style={{width: '60%', minWidth: 400, marginTop: 8}}>
      <DropzoneArea 
        onChange={uploadFile}
        dropzoneText='Drag and drop a CSV file or click here to select a file'
        filesLimit={1}
        acceptedFiles={['application/csv', 'text/csv', 'application/vnd.ms-excel']}
        maxFileSize={maxSize}
        />
    </div>
    {showColumns && <React.Fragment>
      <div style={{width: '100%', textAlign: 'center'}}>
        {error && <Typography variant="h5">{error}</Typography>}
        {isLoading && <CircularProgress size={96} style={{marginTop: 100}} />}
      </div>
      <SkiptraceMapping />
      {Object.keys(mapping).length > 0 && totalCount &&
        <div style={{maxWidth: 400, margin: 'auto'}}>
        <Typography variant="subtitle1" style={{textAlign: 'center'}} gutterBottom>{totalCount || 0} records found!</Typography>
        <PaymentForm
            recordCount={totalCount}
            plan={plans.find(x => x.id === 'skiptrace')}
        /> 
        </div>
      }
    </React.Fragment>
    }
    </div>
  )  
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.skiptracing.isLoading,
    signedUrl: state.skiptracing.signedUrl,
    error: state.skiptracing.error,
    mapping: state.skiptracing.mapping,
    totalCount: state.skiptracing.totalCount,
    plans: state.payment.plans
  }
}
const mapDispatch = (dispatch) => ({
  ...bindActionCreators(
    {
      handleUploadFile,
      handleUpdateMapping
    },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatch)(SkipTracingView)
