import { Checkbox, IconButton, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TrackIcon from '@material-ui/icons/TrackChanges';
import ViewColumnsIcon from '@material-ui/icons/ViewColumn';
import React from 'react';
import ConfirmDeleteRecords from '../../components/confirmDeleteRecords';
import CriteriaMap from '../../components/criteriaMap';
import DataColumnSelection from '../../components/dataColumnSelection';
import DataTable from '../../components/dataTable';
// import ListRecordMenu from '../../components/listRecordMenu';
import { parser } from '../../utils/parser';
import DeleteConfirmationDialog from '../listManager/deleteConfirmation';
import { formatCriteriaForMap } from '../listManager/formatCriteriaForMap';

const ListViewTable = ({list, data, onSkipTraceEvent, handleUpdateList, handleDeleteList, onDownloadList}) => {
  const [ deleteList, setDeleteList ] = React.useState(null)
  const [showDetail, setShowDetail] = React.useState(false)
  const [confirmDelete, setConfirmDelete] = React.useState(false)
  const [selectedRows, setSelectedRows] = React.useState([]);

  const [records, setRecords] = React.useState([])
  // const [recordActionItem, setRecordActionItem] = React.useState()
  const [showColumnSelection, setShowColumnSelection]  = React.useState(false)
  const [ columns, setColumns ] = React.useState([])
  React.useEffect(() => {
    if (!list) return
    const unselected = list.excluded_fields || []
    const columns = data.headers.filter(name => !unselected.includes(name)).map(field  => {
      const col = { Header: field, accessor: field, filter: 'fuzzyText' }
      if (field.indexOf('First Name') === 0) { col.sticky = 'left' }
      if (field.indexOf('Last Name') === 0) { col.sticky = 'left' }
      if (field.indexOf('Property Address') === 0) { col.sticky = 'left' }
      return col
    })
    columns.unshift({
      id: "selection",
      sticky: 'left',
      width: 50,
      Header: ({ getToggleAllRowsSelectedProps }) => {
        return (<Checkbox {...getToggleAllRowsSelectedProps()} />)
      },
      Cell: ({ row }) => {
        return (<Checkbox {...row.getToggleRowSelectedProps()} />)
      }
    })
    setColumns(columns)
    const items = data.rows.map(item =>  {
      let obj = {}
      item.forEach((record, idx) => {
        obj[data.headers[idx]] = getRecordValue(record)
      })
      return obj
    })
    setRecords(items)
  }, [data, list]);
  const getRecordValue = (record) => {
    if (Array.isArray(record)) {
      return record.join(', ')
    }
    if (record !== null && typeof record === 'boolean') {
      return record ? 'true' : 'false'
    }
    return record
  }
  const onDataColumnSelection = newArray => {
    handleUpdateList({list_uuid: list.list_uuid, excluded_fields: newArray})
  }
  if (!data || !data.headers || !data.rows) { return <div /> }
  return (
    <div id='datatable'>
      <DataColumnSelection
        open={showColumnSelection}
        setOpen={setShowColumnSelection}
        columns={data.headers}
        disabledHeaders={list && list.excluded_fields ? list.excluded_fields : []}
        onHeaderClick={onDataColumnSelection}
      />
      {/* <ListRecordMenu
        target={recordActionItem && recordActionItem.target}
        listId={list && list.list_uuid ? list.list_uuid : ''}
        recordId={recordActionItem && recordActionItem.recordId}
        onClose={() => setRecordActionItem(null)}
      /> */}
      <DeleteConfirmationDialog
        list={deleteList}
        toggleDialog={setDeleteList}
        handleConfirmation={handleDeleteList}
      />
      <ConfirmDeleteRecords
        open={confirmDelete}
        listId={list && list.list_uuid ? list.list_uuid : ''}
        rows={selectedRows}
        toggleDialog={() => setConfirmDelete(false)}
      />
      <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: 8}}>
        <div  style={{textAlign: 'left'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Typography variant="subtitle1" style={{fontSize: 18}}>{data.display_fields.list_name}</Typography>
            <div onClick={() => setDeleteList(list)} style={{color: '#2783D4', marginLeft: 16, fontSize: 10, textDecoration: 'underline', cursor: 'pointer'}}>Delete List</div>
          </div>
          <Typography variant="body2">{data.display_fields.list_description}</Typography>
          <Typography variant="body2">Record count: {data.num_records}</Typography>
          <Typography variant="body2">Last Viewed: {parser.shortDateTime(data.display_fields.last_viewed_ts) }</Typography>
          <Typography variant="body2"
            onClick={() => setShowDetail(!showDetail)} 
            style={{display: 'flex', cursor: 'pointer', alignItems: 'center'}}>
              List Detail {showDetail ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </Typography>
          {showDetail && <div style={{width: '100%', padding: '0 8px'}}>
            {/* <div>OG: {JSON.stringify(list.list_criteria)}</div>
            <div>Formatted: {JSON.stringify(formatListCriteria(list.list_criteria))}</div> */}
            <CriteriaMap criteria={formatCriteriaForMap(data.list_criteria)} readonly  />
          </div>}
        </div>
        <div style={{display: 'flex', alignItems: 'flex-end', marginRight: 8}}>
          <IconButton onClick={() => setConfirmDelete(true)} disabled={selectedRows.length === 0} title="Remove selected items" style={{padding: 4, marginRight: 16}}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => setShowColumnSelection(true)} title="Select columns to display" style={{padding: 4, marginRight: 16}}>
            <ViewColumnsIcon />
          </IconButton>
          <IconButton style={{padding: 4, marginRight: 16}} title='Download' onClick={() => onDownloadList(list)}>
            <DownloadIcon />
          </IconButton>
          <IconButton style={{padding: 4}} title="Skip Trace" onClick={onSkipTraceEvent}>
            <TrackIcon />
          </IconButton>
        </div>
      </div>
      <DataTable 
        data={records} 
        columns={columns} 
        onSelectedRowsChange={setSelectedRows}
      />
    </div>
    )
 
}

export default ListViewTable
