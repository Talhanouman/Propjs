import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Typography } from '@material-ui/core';
import { handleUpdateMapping } from '../reducers/skiptracing'
import PlainSelect from './plain_select';

const SkiptraceMapping = ({matchingFields, columns, mapping, handleUpdateMapping}) => {
    const handleChange = (event) => {
        handleUpdateMapping({...mapping, [event.target.id]: event.target.value})
    }
    return (
        <React.Fragment>
            {Object.keys(columns).length === 0 || matchingFields.length === 0 ? ''
            : <div style={{width: 600, margin: '40px auto', textAlign: 'center'}}>
                <Typography variant="h5" style={{marginBottom: 48}}>Field Mapping</Typography>
                <Grid container spacing={6}>
                    { Object.keys(columns).map((key, idx) => {
                        const item = columns[key]
                        return (
                            <React.Fragment key={idx}>
                                <Grid item xs={6} style={{textAlign: 'right', borderBottom: 'solid 1px #ddd'}}>
                                    <Typography variant="h6">{key}</Typography>
                                    <div>{item.samples ? <div><strong>Sample:</strong>{item.samples.map((el, i) => <div key={i}>{el}</div>)}</div> : ''}</div>
                                </Grid>
                                <Grid item xs={6} style={{textAlign: 'left', borderBottom: 'solid 1px #ddd'}}>
                                    <PlainSelect
                                        id={key}
                                        name={key}
                                        options={matchingFields.map(el => ({
                                            value: el,
                                            label: el
                                        }))}
                                        value={mapping[key]}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </React.Fragment>
                        )
                    })}
                </Grid>
            </div>
            }
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    return {
      columns: state.skiptracing.columns || {},
      matchingFields: state.skiptracing.matchingFields || [],
      mapping: state.skiptracing.mapping || {}
    }
  }
  const mapDispatch = (dispatch) => ({
    ...bindActionCreators(
      { handleUpdateMapping }, dispatch
    )
  })
  
  export default connect(mapStateToProps, mapDispatch)(SkiptraceMapping)
  