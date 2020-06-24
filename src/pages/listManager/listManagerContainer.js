import { CircularProgress, Collapse, IconButton, InputAdornment, List, TextField, Typography } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/HighlightOff'
import StackListsIcon from '@material-ui/icons/ViewQuilt'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MainContentContainer from '../../components/mainContentContainer'
import StackListsDialog from '../../components/stackListsDialog'
import { handleGetLists } from '../../reducers/lists'
import ListManagementView from './listManagementView'

function ListManagerContainer({lists, isLoading, handleGetLists}) {
  const [filteredLists, setFilteredLists] = React.useState([])
  const [listFilter, setListFilter] = React.useState({})
  const [showFilter, toggleFilter] = React.useState(false)
  const [ open, setOpen ] = React.useState(false)
  React.useEffect(() => {
    handleGetLists()
  }, [handleGetLists]);
  React.useEffect(() => {
    setFilteredLists([...lists])
  }, [lists]);
  const handleFilter = (event) => {
    const name = event.target.name
    const value = event.target.value
    setListFilter(oldValues => ({...oldValues, [name]: value}))
    if (!value) {
      setFilteredLists([...lists])
    } else {
      setFilteredLists(lists.filter(x => x[name].toLowerCase().indexOf(value.toLowerCase()) >= 0))
    }
  }
  return (
    <MainContentContainer>
      <StackListsDialog
          open={open}
          allowMultipleSelections={true}
          handleCancel={() => setOpen(false)}
      />
      <div>
        <div style={{display: 'flex', width: '100%', alignItems: 'center'}}>
          <Typography variant="h6">My Lists</Typography>
          <Typography onClick={() => toggleFilter(!showFilter)} variant="body2" style={{marginLeft: 64, cursor: 'pointer', textDecoration: 'underline', color: 'blue'}}>
            Filter
          </Typography>
          <div style={{flexGrow: 1}} />
          {lists && lists.length > 0 && <div style={{padding: '0 8px'}}>
            <IconButton onClick={() => setOpen(true)} title="Stack Lists">
              <StackListsIcon />
            </IconButton>
          </div>}
        </div>
        <div style={{display: 'flex', width: '100%', marginBottom: 4, borderBottom: 'solid 1px #ccc'}}>
          <Collapse in={showFilter} timeout="auto" unmountOnExit>
            <TextField
              name="list_name"
              margin="dense"
              variant="outlined"
              label="Search by List Name"
              type="text"
              value={listFilter['list_name'] || ''}
              onChange={handleFilter}
              fullWidth
              style={{paddingRight: 0}}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                    <IconButton onClick={() => handleFilter({target: {name: 'list_name', value: ''}})}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
              }}
            />
          </Collapse>
        </div>
        {isLoading ? <div style={{width: '100%', padding: 16, textAlign: 'center', margin: 'auto'}}>
              <CircularProgress size={96} /> 
            </div>
        : (filteredLists && filteredLists.length === 0 ?
            <div style={{width: '100%', margin: 'auto', padding: '24px 0', textAlign: 'center'}}>
              <Typography variant="h6">No Lists to display<br />Use the List Builder to add a List</Typography>
            </div> 
            :     
            <List style={{padding: 0}}>
              {filteredLists && filteredLists.map((list, idx) => (
                <ListManagementView key={idx} list={list} />
                ))}
            </List>
          )
        }
      </div>
    </MainContentContainer>
  )
}

const mapStateToProps = (state) => {
    return {
      lists: state.lists.lists,
      isLoading: state.lists.isLoading,
    }
}
const mapDispatch = (dispatch) => {
  return bindActionCreators({
    handleGetLists
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(ListManagerContainer)
