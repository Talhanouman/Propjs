import { IconButton, ListItem, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BlockIcon from '@material-ui/icons/Block';
import CheckIcon from '@material-ui/icons/CheckCircle';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import CriteriaMap from '../../components/criteriaMap';
import { handleDeleteList, handleDownloadList, handleFileDownloaded, handleUpdateList } from '../../reducers/lists';
import { parser } from '../../utils/parser';
import DeleteConfirmationDialog from './deleteConfirmation';
import DownloadOptionsDialog from './downloadOptionsDialog';
import { formatCriteriaForMap } from './formatCriteriaForMap';
// const dateFns = require('date-fns')

const useStyles = makeStyles(theme => ({
  listitem: {
    display: 'flex', 
    padding: 8, 
    margin: '2px 0', 
    '&:hover': { backgroundColor: '#fafafa'}
  },
  success: {
    '&:hover': { color: 'green' }
  },
  warning: {
    '&:hover': { color: 'red' }
  }
}))

const ListManagementView = ({list, filepath, handleUpdateList, handleDeleteList, handleDownloadList, handleFileDownloaded}) => {
  const [ deleteList, setDeleteList ] = React.useState(null)
  const [ downloadList, setDownloadList ] = React.useState(null)
  const [ listDetailId, setListDetailId ] = React.useState()
  const [ editId, setEditId ] = React.useState()
  const [ listName, setListName ] = React.useState('')
  const [ listDescription, setListDescription ] = React.useState('')
  const classes = useStyles()
  React.useEffect(() => {
    if (filepath) {
        window.open(filepath)
        handleFileDownloaded()
    }
  }, [filepath, handleFileDownloaded]);
  const toggleListDetail = (item) => {
    if (item.list_uuid === listDetailId) {
      setListDetailId(null)
    } else {
      setListDetailId(item.list_uuid)
    }
  }
  const saveChanges = (item) => {
    // console.log('ITEM', { ...item, list_name: listName, list_description: listDescription });
    handleUpdateList({ ...item, list_name: listName, list_description: listDescription || ' ' })
    setEditId(null)
  }
  const deleteConfirmed = (id) => {
    handleDeleteList(id)
    setEditId(null)
  }
  const downloadConfirmed = (id, removeDupes) => {
    handleDownloadList(id, removeDupes)
  }
  const editListItem = (item) => {
    setListName(item.list_name)
    setListDescription(item.list_description)
    setEditId(item.list_uuid)
  }

  if (!list || !list.list_uuid) { return <div /> }
  return (
    <div style={{width: '100%', margin: 'auto'}}>
      <DeleteConfirmationDialog
        list={deleteList}
        toggleDialog={setDeleteList}
        handleConfirmation={(uuid) => deleteConfirmed(uuid)}
      />
      <DownloadOptionsDialog
        list={downloadList}
        toggleDialog={setDownloadList}
        handleConfirmation={(uuid, removeDupes) => downloadConfirmed(uuid, removeDupes)}
      />
      <ListItem component="div" divider={true} alignItems="flex-start" className={classes.listitem}>
        <div>
          {editId === list.list_uuid
            ? <React.Fragment>
              <TextField
                autoFocus
                margin="dense"
                variant="outlined"
                label="List Name"
                type="text"
                value={listName || ''}
                onChange={(event) => setListName(event.target.value)}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                variant="outlined"
                label="List Description"
                type="text"
                value={listDescription || ''}
                onChange={(event) => setListDescription(event.target.value)}
                fullWidth
              />
              </React.Fragment>
            : <React.Fragment>
              <Typography variant="subtitle1" style={{fontSize: 18}}>{list.list_name}</Typography>
              <Typography variant="body2">{list.list_description}</Typography>
              </React.Fragment>
            }
          <Typography variant="body2">Record count: {list.num_records}</Typography>
          <Typography variant="body2">Last Viewed: {parser.shortDateTime(list.last_viewed_ts) }</Typography>
          <Typography variant="body2" onClick={() => toggleListDetail(list)} style={{display: 'flex', cursor: 'pointer', alignItems: 'center'}}>List Detail {listDetailId === list.list_uuid ? <ExpandMoreIcon /> : <ChevronRightIcon />}</Typography>
          {listDetailId === list.list_uuid && <div style={{width: '100%', padding: '8px 0'}}>
            <CriteriaMap criteria={formatCriteriaForMap(list.list_criteria)} readonly  />
          </div>}
        </div>
        <div style={{display: 'flex', marginLeft: 'auto', alignItems: 'flex-start'}}>
        {editId === list.list_uuid
        ? <React.Fragment>
            <IconButton title='Save' onClick={() => saveChanges(list)}>
              <CheckIcon className={classes.success} />
            </IconButton>
            <IconButton title='Close' onClick={() => setEditId(null)}>
              <BlockIcon className={classes.warning} />
            </IconButton>
          </React.Fragment>
        : <React.Fragment>
            <IconButton title='Edit' onClick={() => editListItem(list)}>
              <EditIcon />
            </IconButton>
            <Link to={`/list/${list.list_uuid}`}>
              <IconButton title='View'>
                <ViewIcon />
              </IconButton>
            </Link>
            <IconButton title='Download' onClick={() => setDownloadList(list)}>
              <DownloadIcon />
            </IconButton>
            <IconButton title='Delete' onClick={() => setDeleteList(list)}>
              <DeleteIcon />
            </IconButton>
          </React.Fragment>
        }
        </div>
      </ListItem>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filepath: state.lists.filepath,
  }
}
const mapDispatch = (dispatch) => {
  return bindActionCreators({
    handleUpdateList,
    handleDeleteList,
    handleDownloadList,
    handleFileDownloaded
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(ListManagementView)
