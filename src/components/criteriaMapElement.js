import { IconButton, List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  iconButton: {
    padding: theme.spacing(0)
  },
}))

const CriteriaMapElement = ({userAccess, title, element, updateElement}) => {
  const classes = useStyles();    
  if (!title || !element) { return null }
  const handleDelete = (group, id) => {
    let newSection = null
    let newData = null
    const oldSection = element
    const oldData = element[group]
    if (Array.isArray(oldData)) {
      const currentIndex = oldData.map(e => e.value).indexOf(id);
      newData = [...oldData]
      if (currentIndex >= 0) {
        newData.splice(currentIndex, 1)
      }
      newSection = {...oldSection, [group]: newData}
      if (newData.length === 0) {
        delete newSection[group]
      }
    } else {
      newSection = {...oldSection}
      delete newSection[group]
    }
    updateElement(title, newSection)
  }
  const getTitle = (title) => {
    const motivation = (userAccess.motivations || []).find(x => x.id === title)
    if (motivation && motivation.id) {
      return 'Motivations'
    } else {
      return title.replace(/_/g, ' ')
    }
  }
  const getGroupName = (title, group) => {
    const titleMotivation = (userAccess.motivations || []).find(x => x.id === title)
    const groupMotivation = (userAccess.motivations || []).find(x => x.id === group)
    if (groupMotivation && groupMotivation.id) {
      return groupMotivation.label
    } else if (titleMotivation && titleMotivation.id) {
      return titleMotivation.label + ' - ' + group.toString().replace(/_/g, ' ')
    } else {
      return group.toString().replace(/_/g, ' ')
    }
  }
  const formatMinMaxLabel = (min, max)  => {
    if (min && max) { return (min + ' - ' + max) }
    if (min) { return 'Min of ' + min }
    if (max) { return 'Max of ' + max }
  }
  return (
      <div>
        <Typography variant="subtitle1" style={{textTransform: 'capitalize'}}>{getTitle(title)}</Typography>
        {Object.keys(element).map((group, idx) => {
          const items = element[group]
          // console.log('ITEMS', title, group, items)
          if (!items || items.length === 0) { return <div key={idx} /> }
          let list = []
          if (element[group]['min'] || element[group]['max']) {
            const data = element[group]
            list.push({
              value: group,
              label: formatMinMaxLabel(data.min, data.max),
              count: data.count
            })
          }
          if (element[group]['none']) {
            const data = element[group]
            list.push({
              value: group,
              label: 'Unknown',
              count: data.count
            })
          }
          if (list.length === 0) {
            list = Array.isArray(items) ? items : [items]
          }
          return (
            <div key={idx}>
                <Typography variant="body2" style={{marginLeft: 6, textTransform: 'capitalize'}}>{getGroupName(title, group)}</Typography>
                <List style={{paddingTop: 0}}>
                  {list.map((item, index) => {
                    // console.log('ITEM', item)
                    return (
                      <ListItem key={index} style={{paddingBottom: 0}}>
                        <div>
                          {title === 'options' && group !== 'suppressed_list_uuids' ? <div />
                          : <div style={{width: '100%', fontSize: 12}}>
                              {item.label}
                            </div>
                          }
                          {item.count && item.count >= 0 && <Typography style={{marginLeft: 6}} variant='caption'>count: {item.count}</Typography>}
                        </div>
                        <div className={classes.grow} />
                        {updateElement && title !== 'options' && <IconButton onClick={() => handleDelete(group, item.value)} className={classes.iconButton} ><DeleteIcon/></IconButton>}
                      </ListItem>
                    )
                  })}
                </List>
            </div>
          )
        })}
      </div>
  )
}

const mapStateToProps = (state) => {
    return {
      userAccess: state.auth.user.user_access
    }
  }
  const mapDispatch = (dispatch) => {
    return bindActionCreators({
    }, dispatch)
  }
  
export default connect(mapStateToProps, mapDispatch)(CriteriaMapElement)
