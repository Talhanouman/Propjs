// import { Typography } from '@material-ui/core';
// import React from 'react';
// import { connect } from 'react-redux';
// import ReactTable from "react-table";
// import { bindActionCreators } from 'redux';

// const MetroDataTable = ({ metroData }) => {
//     return (
//         <React.Fragment>
//             {metroData && metroData.length > 0 ? 
//                 <ReactTable
//                 data={metroData}
//                 getTheadThProps={(state, rowInfo, column) => {
//                     return {
//                       style: {
//                         textAlign: 'left'
//                       }
//                     };
//                   }
//                 }
//                 columns={[
//                     {
//                         Header: "City",
//                         accessor: "city"
//                     },
//                     {
//                         Header: "Locality",
//                         accessor: "locality"
//                     },
//                     {
//                         Header: "Motivation",
//                         accessor: "motivation"
//                     },
//                     {
//                         Header: "Record Count",
//                         accessor: "number_of_records"
//                     },
//                     {
//                         Header: "Last Updated",
//                         accessor: "last_update_completion_time"
//                     }
//                 ]}
//                 defaultPageSize={30}
//                 className="-striped -highlight"
//             />
//             : <Typography variant="subtitle1">Data not found</Typography>
//             }
//         </React.Fragment>
//     )
// }

// const mapStateToProps = (state) => {
//     return {
//         metroData: state.payment.metroData,
//         isLoadingData: state.payment.isLoadingData
//     }
// }
// const mapDispatch = (dispatch) => {
//     return bindActionCreators({
//     }, dispatch)
// }

// export default connect(mapStateToProps, mapDispatch)(MetroDataTable)
