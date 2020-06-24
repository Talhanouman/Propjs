
// import React from 'react';
// import { connect } from 'react-redux';
// import { useBlockLayout, useTable } from 'react-table';
// import { useSticky } from 'react-table-sticky';
// import { bindActionCreators } from 'redux';
// import styled from 'styled-components';

// const Styles = styled.div`
//   .table {
//     border: 1px solid #ddd;

//     .tr {
//       :last-child {
//         .td {
//           border-bottom: 0;
//         }
//       }
//     }

//     .th,
//     .td {
//       padding: 5px;
//       border-bottom: 1px solid #ddd;
//       border-right: 1px solid #ddd;
//       background-color: #fff;
//       overflow: hidden;

//       :last-child {
//         border-right: 0;
//       }
//     }

//     &.sticky {
//       overflow: scroll;
//       .header,
//       .footer {
//         position: sticky;
//         z-index: 1;
//         // width: fit-content;
//       }

//       .header {
//         top: 0;
//         box-shadow: 0px 3px 3px #ccc;
//       }

//       .footer {
//         bottom: 0;
//         box-shadow: 0px -3px 3px #ccc;
//       }

//       .body {
//         position: relative;
//         z-index: 0;
//       }

//       [data-sticky-td] {
//         position: sticky;
//       }

//       [data-sticky-last-left-td] {
//         box-shadow: 2px 0px 3px #ccc;
//       }

//       [data-sticky-first-right-td] {
//         box-shadow: -2px 0px 3px #ccc;
//       }
//     }
//   }
// `;

// function MetroDataTable({metroData}) {
//   const columns = React.useMemo(() =>  [
//     {
//         Header: "City",
//         accessor: "city"
//     },
//     {
//         Header: "Locality",
//         accessor: "locality"
//     },
//     {
//         Header: "Motivation",
//         accessor: "motivation"
//     },
//     {
//         Header: "Record Count",
//         accessor: "number_of_records"
//     },
//     {
//         Header: "Last Updated",
//         accessor: "last_update_completion_time"
//     }
//   ], [])

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable(
//     {
//       columns,
//       data: metroData,
//     },
//     useBlockLayout,
//     useSticky,
//   );

//   return (
//     <Styles>
//       <div {...getTableProps()} className="table sticky" style={{ height: 500 }}>
//         <div className="header">
//           {headerGroups.map((headerGroup) => (
//             <div {...headerGroup.getHeaderGroupProps()} className="tr">
//               {headerGroup.headers.map((column) => (
//                 <div {...column.getHeaderProps()} className="th">
//                   {column.render('Header')}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//         <div {...getTableBodyProps()} className="body">
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <div {...row.getRowProps()} className="tr">
//                 {row.cells.map((cell) => (
//                   <div {...cell.getCellProps()} className="td">
//                     {cell.render('Cell')}
//                   </div>
//                 ))}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </Styles>
//   );
// }

// // const MetroDataTable = ({ metroData }) => {

// //     const {
// //         getTableProps,
// //         getTableBodyProps,
// //         headerGroups,
// //         rows,
// //         prepareRow,
// //     } = useTable({ columns, data: metroData })
// //     return (
// //         <table {...getTableProps()}>
// //           <thead>
// //             {headerGroups.map(headerGroup => (
// //               <tr {...headerGroup.getHeaderGroupProps()}>
// //                 {headerGroup.headers.map(column => (
// //                   <th
// //                     {...column.getHeaderProps()}
// //                     style={{
// //                       background: 'aliceblue',
// //                       color: 'black',
// //                       fontWeight: 'bold',
// //                     }}
// //                   >
// //                     {column.render('Header')}
// //                   </th>
// //                 ))}
// //               </tr>
// //             ))}
// //           </thead>
// //           <tbody {...getTableBodyProps()}>
// //             {rows.map(row => {
// //               prepareRow(row)
// //               return (
// //                 <tr {...row.getRowProps()}>
// //                   {row.cells.map(cell => {
// //                     return (
// //                       <td
// //                         {...cell.getCellProps()}
// //                         style={{
// //                           padding: '10px',
// //                           border: 'solid 1px gray',
// //                         }}
// //                       >
// //                         {cell.render('Cell')}
// //                       </td>
// //                     )
// //                   })}
// //                 </tr>
// //               )
// //             })}
// //           </tbody>
// //         </table>
// //     )
// // }

// const mapStateToProps = (state) => {
//     return {
//         metroData: state.payment.metroData || [],
//     }
// }
// const mapDispatch = (dispatch) => {
//     return bindActionCreators({
//     }, dispatch)
// }

// export default connect(mapStateToProps, mapDispatch)(MetroDataTable)
