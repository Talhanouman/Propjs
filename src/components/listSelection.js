import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AutoSelect from './auto_select';

const ListSelection = ({hideLabel, lists, isMultiSelect, onSelect}) => {
    const [ values, setValues ] = React.useState([])
    const handleListItemChange = (name) => list => {
        setValues(list)
        onSelect(list)
    }
    const formatForAutoSelect = (data) => {
        if (!data || data.length === 0) { return [] }
        if (!Array.isArray(data)) { return data }
        return data.map((item) => ({
            value: item.list_uuid || item,
            label: item.list_name || item,
        }));
    }
    return (
            <AutoSelect
                textFieldProps={{
                    label: hideLabel ? '' : 'Select Lists'
                }}
                name="list_selection"
                margin="none"
                isMulti={isMultiSelect}
                options={formatForAutoSelect(lists)}
                selectedValue={values || []}
                handleAutoSelectChange={handleListItemChange}
            />
    )
}

const mapStateToProps = (state) => {
    return {
      lists: state.lists.lists
    }
  }
  const mapDispatch = (dispatch) => {
    return bindActionCreators({
    }, dispatch)
  }
  
export default connect(mapStateToProps, mapDispatch)(ListSelection)
