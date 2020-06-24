import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import withSearchHandler from '../../components/withSearchHandler'
import { handleGetAvailableStates } from '../../reducers/locations'
import { handleUpdateRecordsRequested } from '../../reducers/search'
import ListBuilderView from './listBuilderView'

function ListBuilderContainer(props) {
  const { selectedPlanType, addDefaultCriteria, defaultCriteria, addCriteriaItem, handleGetAvailableStates } = props
  React.useEffect(() => {
    handleGetAvailableStates(selectedPlanType)
  }, [handleGetAvailableStates, selectedPlanType]);
  React.useEffect(() => {
    if (addDefaultCriteria) {
      Object.keys(defaultCriteria).map(section => {
          Object.keys(defaultCriteria[section]).map(group => {
              const selectedValue = defaultCriteria[section][group]
              addCriteriaItem({section: section, group: group, data: { value: selectedValue, label: selectedValue }})
              return true
          })
          return true
      })
    }
  }, [addDefaultCriteria, defaultCriteria, addCriteriaItem]);
  return (
    <div style={{position: 'relative'}}>
      <ListBuilderView {...props} />
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
      addDefaultCriteria: state.search.addDefaultCriteria,
      defaultCriteria: state.search.defaultCriteria,
      criteria: state.search.criteria,
      searchResults: state.search.searchResults,
      recordsRequested: state.search.recordsRequested,
      isLoading: state.search.isLoading,
      selectedPlanType: state.search.selectedPlanType,
    }
}

const mapDispatch = (dispatch) => {
  return bindActionCreators({
      handleUpdateRecordsRequested,
      handleGetAvailableStates
  }, dispatch )
}

export default connect(mapStateToProps, mapDispatch)(withSearchHandler(ListBuilderContainer))
