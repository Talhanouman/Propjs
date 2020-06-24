import { Typography } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MainContentContainer from '../../components/mainContentContainer'
import { handleGetSignedUrl } from '../../reducers/skiptracing'
import SkipTracingView from './skipTracingView'

function SkipTracingContainer({ history, approval, handleGetSignedUrl }) {
  React.useEffect(() => {
    handleGetSignedUrl()
  }, [handleGetSignedUrl]);
  React.useEffect(() => {
    if (approval) {
      history.push('/my-lists')
    }
  }, [history, approval]);
  return (
    <MainContentContainer>
      <Typography variant="h6">Skip Tracing</Typography>
      <SkipTracingView />
    </MainContentContainer>
  )
}

const mapStateToProps = (state) => {
  return { 
    approval: state.payment.approval
  }
}
const mapDispatch = (dispatch) => {
  return bindActionCreators({
    handleGetSignedUrl
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(SkipTracingContainer)
