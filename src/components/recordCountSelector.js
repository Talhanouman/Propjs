import { Button, Checkbox, CircularProgress, FormControlLabel, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleClearCombinedListId, handleClearListId, handleFileDownloaded } from '../reducers/lists';
import CreateListDialog from './createListDialog';
import SuppressionDialog from './listSelectionDialog';
import withSearchHandler from './withSearchHandler';

const RecordCountSelector = ({criteria, filepath, isLoading, recordCount, addCriteriaItem, handleFileDownloaded, handleClearListId, handleClearCombinedListId}) => {
    const [ openCreateList, setOpenCreateList ] = React.useState(false)
    const [showSuppression, setShowSuppression] = React.useState(false)
    React.useEffect(() => {
        if (filepath) {
            window.open(filepath)
        }
    }, [filepath]);
    const submitClick = () => {
        handleFileDownloaded()
        handleClearListId()
        handleClearCombinedListId()
        setOpenCreateList(true)
    }
    const handleSuppressionChecked = (checked) => {
        setShowSuppression(checked)
        if (!checked && criteria.options.suppressed_list_uuids) {
            addCriteriaItem({section: 'options', group: 'suppressed_list_uuids', data: []})
        }
    }
    const handleSetSuppression = (list) => {
        setShowSuppression(false)
        addCriteriaItem({section: 'options', group: 'suppressed_list_uuids', data: list})
    }
    return (
        <div style={{marginTop: '20px', width: '100%', textAlign: 'center'}}>
            <CreateListDialog
                open={openCreateList}
                toggleDialog={setOpenCreateList}
            />
            <SuppressionDialog
                open={showSuppression}
                title={'Select Lists to suppress against'}
                allowMultipleSelections={true}
                handleCancel={() => handleSuppressionChecked(false)}
                handleConfirm={(list) => handleSetSuppression(list)}
            />
            {isLoading
            ? <CircularProgress size={48} />
            :   <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={criteria.options && criteria.options.suppressed_list_uuids ? true : false}
                            onChange={(event) => handleSuppressionChecked(event.target.checked)}
                            name="suppression"
                            value="suppression"
                            color="primary"
                        />
                        }
                        label="Include Suppression"
                    />
                    <Typography variant="subtitle1" gutterBottom>{recordCount || 0} records found!</Typography>
                    {recordCount > 0 &&
                        // {/* <TextField
                        //     id="record_count"
                        //     name="record_count"
                        //     label="Records Requested"
                        //     type="number"
                        //     value={recordsRequested}
                        //     InputProps={{ inputProps: { min: 1, max: (recordCount || 5000000) } }}
                        //     InputLabelProps={{ shrink: true }} 
                        //     onChange={handleNumericChange}
                        //     style={{minWidth: 150}}
                        //     margin="none"
                        //     variant="outlined" /> */}
                        <Button
                            onClick={submitClick}
                            color="primary"
                            style={{minWidth: 100, maxWidth: 150, margin: '16px 0'}}
                            variant="contained">
                            View {recordCount || 0} records</Button>
                        // {/* {paymentLink} */}
                    }
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        criteria: state.search.criteria,
        filepath: state.search.filepath,
    }
} 
const mapDispatch = (dispatch) => ({
    ...bindActionCreators({
        handleFileDownloaded, handleClearListId, handleClearCombinedListId
    }, dispatch)
})

export default withSearchHandler(connect(mapStateToProps, mapDispatch)(RecordCountSelector))
