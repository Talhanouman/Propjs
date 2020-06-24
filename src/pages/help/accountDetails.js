import { CircularProgress, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import StyledButton from '../../components/styledButton'
import { handleUpdateUserInfo } from '../../reducers/auth'

const AccountDetails = ({user, isLoading, handleUpdateUserInfo}) => {
  const [ values, setValues ] = React.useState({})
  React.useEffect(() => {
    setValues(user)
  }, [user]);
  const handleChange = (event) => {
    const targetName = event.target.name
    const value = event.target.value
    setValues(oldValues => ({ ...oldValues, [targetName]: value }))
  }
  const onResetSelections = () => {
    setValues(user)
  }
  const onSave = () => {
    const newAccount = {company: values.company || null, first_name: values.first_name || null, last_name: values.last_name || null, phone: values.phone || null}
    handleUpdateUserInfo(newAccount)
  }
  return (
    <div>
        <Typography variant="h6">Account Details</Typography>
        <div style={{width: '60%', minWidth: 400, marginTop: 8}}>
          <TextField
            margin="dense"
            variant="outlined"
            label="Email Address"
            name="user_name"
            disabled
            type="text"
            value={values['user_name'] || ''}
            fullWidth
          />
          <TextField
            margin="dense"
            variant="outlined"
            label="First Name"
            name="first_name"
            type="text"
            value={values['first_name'] || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            variant="outlined"
            label="Last Name"
            name="last_name"
            type="text"
            value={values['last_name'] || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            variant="outlined"
            label="Company"
            name="company"
            type="text"
            value={values['company'] || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            variant="outlined"
            label="Phone"
            name="phone"
            type="text"
            value={values['phone'] || ''}
            onChange={handleChange}
            fullWidth
          />
          <div style={{display: 'flex',  justifyContent: 'space-between', marginTop: 8}}>
            <StyledButton
                handleButtonClick={() => onResetSelections()}
                label="CANCEL"
                style={{margin: 4, padding: '2px 8px', backgroundColor: '#000'}}
            />
            {isLoading ? <CircularProgress /> : <StyledButton
                handleButtonClick={() => onSave()}
                label="SAVE"
                style={{margin: 4, padding: '2px 8px'}}
                />
            }
          </div>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
      user: state.auth.user,
      isLoading: state.auth.isLoading
    }
}
const mapDispatch = (dispatch) => {
  return bindActionCreators({
    handleUpdateUserInfo
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(AccountDetails)
