// import React from 'react';
// import { connect } from 'react-redux';
// import MUIDataTable from "mui-datatables";

// const options = {
//   filterType: 'dropdown',
//   selectableRows: 'none',
//   rowHover: false,
//   print: false,
//   download: false,
//   fixedHeader: false,
//   responsive: 'scroll',
//   textLabels: {
//     body: {
//       noMatch: " No data available. "
//     }
//   }
// };
// const parseColumns = headers => {
//   if (headers && Object.keys(headers).length > 0) {
//     return Object.keys(headers).map((item, idx) => {
//       return {
//         name: item,
//         label: headers[item],
//         options: { filter: true, sort: true  }
//       }
//     })
//   }
// }
// function SearchResults({ searchResults }) {
  
//   return (
//     <div>
//       <MUIDataTable 
//         title='Property Leads'
//         data={searchResults.sample_rows} 
//         columns={parseColumns(searchResults.headers) || []} 
//         options={options} 
//       />
//     </div>
//   );
// }

// const mapState = (state) => {
//   return {
//     searchResults: state.search.searchResults
//   }
// }

// export default connect(mapState)(SearchResults);
