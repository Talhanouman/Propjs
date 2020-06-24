// import { IconButton, Typography } from '@material-ui/core';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import DownloadIcon from '@material-ui/icons/CloudDownload';
// import DeleteIcon from '@material-ui/icons/Delete';
// // import namor from "namor";
// import EditIcon from '@material-ui/icons/Edit';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import TrackIcon from '@material-ui/icons/TrackChanges';
// import ViewColumnsIcon from '@material-ui/icons/ViewColumn';
// import React from 'react';
// import ReactTable from "react-table";
// import withFixedColumns from "react-table-hoc-fixed-columns";
// import "react-table-hoc-fixed-columns/lib/styles.css";
// // import SelectTableHOC from 'react-table/lib/hoc/selectTable';
// import "react-table/react-table.css";
// import ConfirmDeleteRecords from '../../components/confirmDeleteRecords';
// import CriteriaMap from '../../components/criteriaMap';
// import DataColumnSelection from '../../components/dataColumnSelection';
// import ListRecordMenu from '../../components/listRecordMenu';
// import { parser } from '../../utils/parser';
// import DeleteConfirmationDialog from '../listManager/deleteConfirmation';
// import { formatCriteriaForMap } from '../listManager/formatCriteriaForMap';

// const ReactTableFixedColumns = withFixedColumns(ReactTable)

// const ListViewTable = ({list, data, onSkipTraceEvent, handleUpdateList, handleDeleteList, onDownloadList}) => {
//   const [tableRef, setTableRef] = React.useState()
//   const [ deleteList, setDeleteList ] = React.useState(null)
//   const [showDetail, setShowDetail] = React.useState(false)
//   const [confirmDelete, setConfirmDelete] = React.useState(false)
//   const [records, setRecords] = React.useState([])
//   const [recordActionItem, setRecordActionItem] = React.useState()
//   const [selectedRows, setSelectedRows] = React.useState([])
//   const [showColumnSelection, setShowColumnSelection]  = React.useState(false)
//   const [columnsLeft, setColumnsLeft] = React.useState([])
//   const [columnsMain, setColumnsMain] = React.useState([])
//   React.useEffect(() => {
//     if (!list) return
//     const unselected = list.excluded_fields || []
//     const left = data.headers.filter(name => !unselected.includes(name) && name.indexOf('Property ') === 0).map(field  => {
//       return { Header: field, accessor: field }
//     })
//     const main = data.headers.filter(name => !unselected.includes(name) && name.indexOf('Property ') !== 0).map(field  => {
//       return { Header: field, accessor: field }
//     })
//     setColumnsLeft(left)
//     setColumnsMain(main)
//     const items = data.rows.map(item =>  {
//       let obj = {}
//       item.forEach((record, idx) => {
//         obj[data.headers[idx]] = getRecordValue(record)
//       })
//       obj.action = <div style={{margin: 'auto'}}>
//         <IconButton onClick={(evt) => setRecordActionItem({recordId: obj.plid, target: evt.target})} style={{padding: 4, margin: 2}}>
//           <EditIcon style={{fontSize: 16}} />
//         </IconButton>
//       </div>
//       return obj
//     })
//     setRecords(items)
//     setSelectedRows([])
//   }, [data, list]);
//   const getRecordValue = (record) => {
//     if (Array.isArray(record)) {
//       return record.join(', ')
//     }
//     if (record !== null && typeof record === 'boolean') {
//       return record ? 'true' : 'false'
//     }
//     return record
//   }
//   const onDataColumnSelection = newArray => {
//     handleUpdateList({list_uuid: list.list_uuid, excluded_fields: newArray})
//   }
//   const getVisibleRows = () => {
//     if (tableRef && tableRef.wrappedInstance) {
//       const st = tableRef.wrappedInstance.getResolvedState()
//       const allData = st.sortedData
//       const startIdx = st.page * st.pageSize;
//       return allData.slice(startIdx, startIdx + st.pageSize);
//     }
//     return records
//   }
//   const onToggleAll = () => {
//     const viewedRows = getVisibleRows()
//     if (selectedRows.length === viewedRows.length) {
//       setSelectedRows([])
//     } else {
//       setSelectedRows(viewedRows.map(x => x.plid))
//     }
//   }
//   const onToggleSelection = (key) => {
//     const plid = key.split('-')[1]
//     if (!selectedRows.includes(Number(plid))) { 
//       setSelectedRows([...selectedRows, Number(plid)])
//     } else {
//       const newArray = [...selectedRows]
//       newArray.splice(newArray.indexOf(Number(plid)), 1)
//       setSelectedRows([...newArray])
//     }
//   }
//   if (!data || !data.headers || !data.rows) { return <div /> }
//   return (
//     <div id='datatable'>
//       <DataColumnSelection
//         open={showColumnSelection}
//         setOpen={setShowColumnSelection}
//         columns={data.headers}
//         disabledHeaders={list && list.excluded_fields ? list.excluded_fields : []}
//         onHeaderClick={onDataColumnSelection}
//       />
//       <ListRecordMenu
//         target={recordActionItem && recordActionItem.target}
//         listId={list && list.list_uuid ? list.list_uuid : ''}
//         recordId={recordActionItem && recordActionItem.recordId}
//         onClose={() => setRecordActionItem(null)}
//       />
//       <DeleteConfirmationDialog
//         list={deleteList}
//         toggleDialog={setDeleteList}
//         handleConfirmation={handleDeleteList}
//       />
//       <ConfirmDeleteRecords
//         open={confirmDelete}
//         listId={list && list.list_uuid ? list.list_uuid : ''}
//         rows={selectedRows}
//         toggleDialog={() => setConfirmDelete(false)}
//       />
//       <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: 8}}>
//         <div  style={{textAlign: 'left'}}>
//           <div style={{display: 'flex', alignItems: 'center'}}>
//             <Typography variant="subtitle1" style={{fontSize: 18}}>{data.display_fields.list_name}</Typography>
//             <div onClick={() => setDeleteList(list)} style={{color: '#2783D4', marginLeft: 16, fontSize: 10, textDecoration: 'underline', cursor: 'pointer'}}>Delete List</div>
//           </div>
//           <Typography variant="body2">{data.display_fields.list_description}</Typography>
//           <Typography variant="body2">Record count: {data.num_records}</Typography>
//           <Typography variant="body2">Last Viewed: {parser.shortDateTime(data.display_fields.last_viewed_ts) }</Typography>
//           <Typography variant="body2"
//             onClick={() => setShowDetail(!showDetail)} 
//             style={{display: 'flex', cursor: 'pointer', alignItems: 'center'}}>
//               List Detail {showDetail ? <ExpandMoreIcon /> : <ChevronRightIcon />}
//           </Typography>
//           {showDetail && <div style={{width: '100%', padding: '0 8px'}}>
//             {/* <div>OG: {JSON.stringify(list.list_criteria)}</div>
//             <div>Formatted: {JSON.stringify(formatListCriteria(list.list_criteria))}</div> */}
//             <CriteriaMap criteria={formatCriteriaForMap(data.list_criteria)} readonly  />
//           </div>}
//         </div>
//         <div style={{display: 'flex', alignItems: 'flex-end', marginRight: 8}}>
//           <IconButton onClick={() => setConfirmDelete(true)} disabled={selectedRows.length === 0} title="Remove selected items" style={{padding: 4, marginRight: 16}}>
//             <DeleteIcon />
//           </IconButton>
//           <IconButton onClick={() => setShowColumnSelection(true)} title="Select columns to display" style={{padding: 4, marginRight: 16}}>
//             <ViewColumnsIcon />
//           </IconButton>
//           <IconButton style={{padding: 4, marginRight: 16}} title='Download' onClick={() => onDownloadList(list)}>
//             <DownloadIcon />
//           </IconButton>
//           <IconButton style={{padding: 4}} title="Skip Trace" onClick={onSkipTraceEvent}>
//             <TrackIcon />
//           </IconButton>
//         </div>
//       </div>
//       <ReactTableFixedColumns
//         innerRef={(ref) => { setTableRef(ref) }}
//         data={records}
//         keyField={'plid'}
//         selectType="checkbox"
//         isSelected={plid => selectedRows.includes(Number(plid)) }
//         selectAll={selectedRows.length > 0 && getVisibleRows().length === selectedRows.length}
//         toggleAll={onToggleAll}
//         toggleSelection={onToggleSelection}
//         onPageChange={() => setSelectedRows([])}
//         onPageSizeChange={() => setSelectedRows([])}
//         onSortedChange={() => setSelectedRows([])}
//         onFilteredChange={() => setSelectedRows([])}
//         filterable={true}
//         columns={[
//           {
//             // Header: "Property Address",
//             // fixed: "left",
//             columns: columnsLeft
//             // columns: [
//             //   {
//             //     Header: "Address",
//             //     accessor: "property_addr",
//             //     width: columnWidth
//             //   },
//             // ]
//           },
//           {
//               // Header: "Info",
//               columns: columnsMain
//               // columns: [
//               //   {
//               //     Header: "Mailing Address",
//               //     accessor: "mailing_addr",
//               //     // width: columnWidth,
//               //     // Footer: row => {
//               //     //   const length = row.data.length;
//               //     //   const ageSum = row.data
//               //     //     .map(({ age }) => age)
//               //     //     .reduce((a, b) => a + b, 0);
//               //     //   const average = Math.round(ageSum / length);
//               //     //   return <div>Average: {average}</div>;
//               //     // }
//               //   }
//               // ]
//             },
//             {
//               // Header: "",
//               // fixed: "right",
//               columns: [
//                 {
//                   Header: "Action",
//                   accessor: "action"
//                 }
//               ]
//             }
//           ]}
//           defaultPageSize={50}
//           style={{ height: 600, fontSize: 11 }}
//           className="-striped"
//         />
//         </div>
//     )
 
// }

// export default ListViewTable
