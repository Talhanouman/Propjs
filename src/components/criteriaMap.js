import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleUpdateCriteria } from '../reducers/search';
import CriteriaMapElement from './criteriaMapElement';

const CriteriaMap = ({criteria, updateCriteria, readonly}) => {
    const handleUpdateElement = (title, element) => {
        updateCriteria({...criteria, [title]: element})
    }
    // console.log('MAP CRITERIA', criteria)
    return <div>
        {Object.keys(criteria).map((keyName, idx) => {
            if (!criteria[keyName] || Object.keys(criteria[keyName]).length === 0) {
                return ''
            }
            return (
                <CriteriaMapElement
                key={idx}
                title={keyName}
                element={criteria[keyName]}
                updateElement={readonly ? null : handleUpdateElement}
                />
            )
        })}
    </div>
}

const mapStateToProps = (state) => {
    return {
    }
  }
  const mapDispatch = (dispatch) => {
    return bindActionCreators({
        updateCriteria: handleUpdateCriteria,
    }, dispatch)
  }
  
export default connect(mapStateToProps, mapDispatch)(CriteriaMap)
