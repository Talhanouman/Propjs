// import React from 'react';
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import { Menu, MenuItem } from '@material-ui/core';
// import { handleDeleteRecord } from '../reducers/lists';

// const ListRecordMenu = ({target, listId, recordId, onClose, handleDeleteRecord}) => {
// //   function handleClick(event) {
// //     setAnchorEl(event.currentTarget);
// //   }

//   function onDelete() {
//     handleDeleteRecord(listId, recordId)
//     onClose()
//   }

//   return (
//     <div>
//       {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
//         Open Menu
//       </Button> */}
//       <Menu
//         id="List-Record-Menu"
//         anchorEl={target}
//         keepMounted
//         open={Boolean(target)}
//         onClose={onClose}
//       >
//         <MenuItem onClick={onDelete}>Delete Record</MenuItem>
//       </Menu>
//     </div>
//   );
// }

// const mapStateToProps = (state) => {
//     return {
//     }
// }
// const mapDispatch = (dispatch) => {
//     return bindActionCreators({
//         handleDeleteRecord
//     }, dispatch)
// }
  
//   export default connect(mapStateToProps, mapDispatch)(ListRecordMenu)
  