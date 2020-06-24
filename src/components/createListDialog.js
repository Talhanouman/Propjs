import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleCombineLists, handleCreateList } from '../reducers/lists';
import { handleClearError } from '../reducers/search';
import { parser } from '../utils/parser';
import ListSelection from './listSelection';
import StyledButton from './styledButton';

function CreateListDialog({open, criteria, user, userLoading, searchResults, selectedPlanType, filepath, listId, comboId, toggleDialog, handleCreateList, handleCombineLists}) {
    const [ action, setAction ] = React.useState()
    const [ numRecords, setNumRecords ] = React.useState(0)
    const [ recordError, setRecordError ] = React.useState(false)
    const [ spinner, showSpinner ] = React.useState(false)
    const [ listName, setListName ] = React.useState('')
    const [ listDescription, setListDescription ] = React.useState('')
    const [ selectedList, setSelectedList ] = React.useState()
    const [ userPlan, setUserPlan ] = React.useState()
    const [ remainingRecords, setRemainingRecords ] = React.useState(0)
    React.useEffect(() => {
        if (searchResults) {
            setNumRecords(searchResults.count || 0)
        }
        if (user && user.user_access && selectedPlanType) {
            const selectedPlan = (user.user_access.plans || []).find(x => x.type === selectedPlanType)
            setUserPlan(selectedPlan)
            if (selectedPlan) {
                const remaining = selectedPlanType === 'regional' ? 99999999999 : Number(selectedPlan.allowance) - Number(selectedPlan.allowance_used)
                setRemainingRecords(remaining)
                if (remaining < searchResults.count) {
                    setNumRecords(remaining)
                }
            }
        }
    }, [user, selectedPlanType, searchResults]);
    React.useEffect(() => {
        if (action === 'create' && spinner && listId) {
            showSpinner(false)
        }
        if (action === 'add' && spinner && comboId) {
            showSpinner(false)
        }
    }, [action, spinner, filepath, listId, comboId]);
    const saveList = () => {
        if (!listName) { return }
        if (!numRecords) { return setRecordError(true) }
        handleCreateList(listName, listDescription || '', criteria, selectedPlanType, numRecords)
        showSpinner(true)
        setListName('')
        setListDescription('')
    }
    const combineLists = () => {
        if (!numRecords) { return setRecordError(true) }
        showSpinner(true)
        handleCombineLists(selectedList.value, criteria, selectedPlanType, numRecords)
    }
    const handleNumericChange = (event) => {
        const value = event.target.value
        if (value && !parser.isNumeric(value)) { return }
        handleClearError()
        setNumRecords(value)
        setRecordError(false)
    }
    const closeDialog = () => {
        handleClearError()
        setRecordError(false)
        showSpinner(false)
        setListName('')
        setListDescription('')
        setSelectedList(null)
        toggleDialog(false)
    }
    return (
        <Dialog
            open={open}
            onClose={() => closeDialog()}
            maxWidth={'md'}
            >
            <DialogTitle>Create A New List or Add Records To An Existing List</DialogTitle>
            <DialogContent style={{minHeight: 400, margin: '0 16px'}}>
                {searchResults && userPlan && <div>
                    <Typography style={{marginBottom: 8}} variant="subtitle1">{searchResults.count} records were found.</Typography>
                    {selectedPlanType === 'regional' ? 
                        <Typography style={{marginBottom: 8}} variant="subtitle1">You have unlimited records for this region.</Typography> :
                        <Typography style={{marginBottom: 8}} variant="subtitle1">
                            You have {spinner || userLoading ? <CircularProgress style={{width: 20, height: 20, margin: '0 8px'}} /> : remainingRecords } records remaining of your {userPlan.allowance} exports allowed for this billing period.
                        </Typography>
                    }
                    <Typography style={{marginBottom: 8}} variant="subtitle1">How many would you like to get?</Typography>
                    <TextField
                        label="Records Requested"
                        type="number"
                        value={numRecords}
                        error={recordError}
                        InputProps={{ inputProps: { min: 0, max: (searchResults.count && searchResults.count < remainingRecords ? searchResults.count : remainingRecords) } }}
                        InputLabelProps={{ shrink: true }} 
                        onChange={handleNumericChange}
                        onBlur={() => { if (numRecords > remainingRecords) { handleNumericChange({target: { value: remainingRecords }})}}}
                        style={{minWidth: 150}}
                        margin="none"
                        variant="outlined" />
                </div>}
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-evenly'}}>
                    <StyledButton
                        handleButtonClick={() => setAction('create')}
                        style={{padding: '4px 16px'}}
                        label="Create New List" />
                    <StyledButton
                        handleButtonClick={() => setAction('add')}
                        style={{padding: '4px 16px'}}
                        label="Add to Existing List" />
                </div>
                {spinner && <CircularProgress size={96} /> }
                {action === 'create' && listId && <div>
                    <Typography variant='subtitle1'>List successfully created!</Typography>
                </div>}
                {action === 'create' && !spinner && !listId && <div>
                    <TextField
                        autoFocus
                        margin="normal"
                        variant="outlined"
                        label="List Name"
                        type="text"
                        required
                        value={listName || ''}
                        onChange={(event) => setListName(event.target.value)}
                        fullWidth
                    />
                    <TextField
                        margin="normal"
                        variant="outlined"
                        label="List Description (optional)"
                        type="text"
                        value={listDescription || ''}
                        onChange={(event) => setListDescription(event.target.value)}
                        fullWidth
                    />
                    <StyledButton 
                        style={{padding: '4px 16px', margin: '24px 0'}}
                        label="Save" 
                        handleButtonClick={() => saveList()} /> 
                </div>}
                {action === 'add' && comboId && <div>
                    <Typography variant='subtitle1'>List successfully combined!</Typography>
                </div>}
                {action === 'add' && !spinner && !comboId && <div>
                    <ListSelection onSelect={setSelectedList} />
                    <StyledButton 
                        style={{padding: '4px 16px', margin: '24px 0'}}
                        label="Save" 
                        disabled={!selectedList}
                        handleButtonClick={() => combineLists()} /> 
                </div>}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => closeDialog()} variant="contained" style={{backgroundColor: 'black', color: '#FFF'}}>
                    CLOSE
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        userLoading: state.auth.isLoading,
        criteria: state.search.criteria,
        filepath: state.search.filepath,
        selectedPlanType: state.search.selectedPlanType,
        searchResults: state.search.searchResults,
        listId: state.lists.listId,
        comboId: state.lists.comboId
    }
} 
const mapDispatch = (dispatch) => ({
    ...bindActionCreators({
        handleCreateList,
        handleCombineLists,
        handleClearError
    }, dispatch)
})

export default connect(mapStateToProps, mapDispatch)(CreateListDialog)
