import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Card, CardContent, Typography } from '@material-ui/core';
import { handleUpdateCriteria } from '../reducers/search'

import CriteriaMap from './criteriaMap';

const SearchCriteriaSidebar = (props) => {
  const { criteria, locationSelected, totalCount, handleUpdateCriteria } = props
  return (
    <Card raised style={{minHeight: 360, width: 240, maxHeight:  500, overflowY: 'auto'}}>
      <CardContent style={{padding: 8}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <Typography variant="h6" component="h3">Search Criteria</Typography>
          {locationSelected && <div onClick={() => handleUpdateCriteria({})} style={{color: '#2783D4', fontSize: 10, textDecoration: 'underline', cursor: 'pointer'}}>Clear</div>}
        </div>
        <Typography style={{fontSize: 12}}>{locationSelected && totalCount !== null ? "Record Count: " + totalCount : ''}</Typography>
        { !locationSelected && <Typography>Select a location to begin...</Typography> }
        <CriteriaMap criteria={criteria} />
      </CardContent>
    </Card>
  )
}

const mapStateToProps = (state) => {
  return {
    criteria: state.search.criteria,
    totalCount: state.search.totalCount
  }
}
const mapDispatch = (dispatch) => {
  return bindActionCreators({
    handleUpdateCriteria: handleUpdateCriteria,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(SearchCriteriaSidebar)
