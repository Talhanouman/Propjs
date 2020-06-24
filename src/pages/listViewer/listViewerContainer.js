import { CircularProgress, Typography } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import MainContentContainer from '../../components/mainContentContainer'
import { handleDeleteList, handleDownloadList, handleFileDownloaded, handleGetListRecords, handleUpdateList } from '../../reducers/lists'
import { handleGetCost } from '../../reducers/skiptracing'
import DownloadOptionsDialog from '../listManager/downloadOptionsDialog'
import PaymentFormDialog from '../registration/paymentFormDialog'
import SkiptraceCompleteDialog from '../skipTracing/skiptraceCompleteDialog'
import ListViewTable from './listViewTable'

function ListViewerContainer({history, match, lists, listCost, filepath, plans, approval, loadingRecords, listRecords, error, handleGetCost, handleGetListRecords, handleUpdateList, handleDeleteList, handleFileDownloaded, handleDownloadList}) {
  const [list, setList] = React.useState()
  const [ downloadList, setDownloadList ] = React.useState(null)
  const [ showPayment, setShowPayment ] = React.useState(false)
  const [ showSkiptraceComplete, setShowSkiptraceComplete ] = React.useState(false)
  React.useEffect(() => {
    if (match.params.uuid) {
      handleGetListRecords (match.params.uuid)
      handleGetCost(match.params.uuid)
    } else {
      history.push('/my-lists')
    }
  }, [history, match.params.uuid, handleGetCost, handleGetListRecords]);
  React.useEffect(() => {
    if (filepath) {
        window.open(filepath)
        handleFileDownloaded()
    }
  }, [filepath, handleFileDownloaded]);
  React.useEffect(() => {
    if (approval) {
      setShowPayment(false)
    }
  }, [approval]);
  React.useEffect(() => {
    const list = lists.find(x => x.list_uuid === match.params.uuid)
    setList(list)
    return () => {
      setList()
    };
  }, [lists, match.params.uuid]);
  const onDeleteConfirmed = (id) => {
    handleDeleteList(id)
    history.push('/my-lists')
    
  }
  const onDownloadList = (list) => {
    setDownloadList(list)
  }
  const onDownloadConfirmed = (id, removeDupes) => {
    handleDownloadList(id, removeDupes)
  }
  return (
    <MainContentContainer>
    <div id='filter-lists' style={{width: '100%', margin: 'auto', padding: 16}}>
      <DownloadOptionsDialog
        list={downloadList}
        toggleDialog={setDownloadList}
        handleConfirmation={(uuid, removeDupes) => onDownloadConfirmed(uuid, removeDupes)}
      />
      <div>
        {error && <Typography variant="h6">We had an issue loading these records</Typography>}
        {listRecords && listRecords.length === 0 && !loadingRecords && !error && <Typography variant="h6">No records found for this list.</Typography>}
        {listRecords && listRecords.headers && listRecords.headers.length > 0 &&
        <React.Fragment>
          <PaymentFormDialog
            selectedPlan={plans.find(x => x.id === 'skiptrace')}
            open={showPayment}
            listId={list ? list.list_uuid : ''}
            toggleDialog={() => setShowPayment(false)} />
          <SkiptraceCompleteDialog
            open={showSkiptraceComplete}
            toggleDialog={() => setShowSkiptraceComplete(false)} />
          <ListViewTable 
            list={list} 
            data={listRecords}
            handleUpdateList={handleUpdateList}
            handleDeleteList={onDeleteConfirmed}
            onDownloadList={onDownloadList}
            onSkipTraceEvent={() => listCost && listCost.records_without_phones === 0 ? setShowSkiptraceComplete(true) : setShowPayment(true)}
            />
          </React.Fragment>
        }
        {(loadingRecords || !list) && <div style={{width: '100%', padding: 16, textAlign: 'center', margin: '60px auto'}}>
          <CircularProgress size={48} /> 
        </div>}
      </div>
    </div>
    </MainContentContainer>
  )
}

const mapStateToProps = (state) => {
    return {
      lists: state.lists.lists,
      filepath: state.lists.filepath,
      loadingRecords: state.lists.loadingRecords || state.lists.isLoading,
      listCost: state.skiptracing.listCost,
      listRecords: state.lists.listRecords,
      error: state.lists.error,
      plans: state.payment.plans,
      approval: state.payment.approval
    }
}
const mapDispatch = (dispatch) => ({
    ...bindActionCreators(
      {
        handleGetListRecords,
        handleUpdateList,
        handleDeleteList,
        handleDownloadList,
        handleFileDownloaded,
        handleGetCost,
      },
      dispatch
    )
})

export default withRouter(connect(mapStateToProps, mapDispatch)(ListViewerContainer))
