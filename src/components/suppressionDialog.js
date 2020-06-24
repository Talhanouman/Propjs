// import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
// import React from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import ListSelection from './listSelection';

// function SuppressionDialog({open, handleConfirm, handleCancel}) {
//     const [ suppressionList, setSuppressionList ] = React.useState([])
//     return (
//         <Dialog
//             open={open}
//             onClose={() => handleCancel()}
//             >
//             <DialogTitle>Select Lists to suppress against</DialogTitle>
//             <DialogContent style={{padding: '0 32px 32px', minHeight: 400}}>
//                 <ListSelection isMultiSelect onSelect={setSuppressionList} />
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={() => handleCancel()} variant="contained" style={{backgroundColor: 'black', color: '#FFF'}}>
//                     CANCEL
//                 </Button>
//                 <Button onClick={() => handleConfirm(suppressionList)} variant="contained" color="primary">
//                     SAVE
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// }

// const mapStateToProps = (state) => {
//     return {
//         lists: state.lists.lists
//     }
//   }
//   const mapDispatch = (dispatch) => {
//     return bindActionCreators({
//     }, dispatch)
//   }
  
// export default connect(mapStateToProps, mapDispatch)(SuppressionDialog)
