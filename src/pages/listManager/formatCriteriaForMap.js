
const formatListCriteriaElement = (oldList) => {
  // console.log('Old list', oldList)
  const newList = {}
  const minMaxItem = {}
  let hasSuffix = false
  Object.keys(oldList).map(item => {
    // console.log('ITEM', item)
    const suffixes = ['min', 'max', 'none']
    
    suffixes.forEach(suffix => {
      if (item.indexOf('_' + suffix) > 0) {
        const pieces = item.split('_' +  suffix)
        minMaxItem[suffix] = oldList[item]
        newList[pieces[0]] = minMaxItem
        hasSuffix = true
      }
    })
    if (!hasSuffix) { 
      newList[item] = { value: oldList[item], label: oldList[item] }
    } 
    return true
  })
  // console.log('New List', newList)
  return newList
}

export const formatCriteriaForMap = (criteria) => {
  const formattedObject = {}
  const newLocations = {...criteria.locations}
  Object.keys(newLocations).map(locationType => {
    newLocations[locationType] = newLocations[locationType].map(locality => {
      return {
        value: locality.fips,
        label: locality.locality || locality.city,
        disabled: false
      }
    })
    return true
  })
  formattedObject.locations = {...newLocations}
  if (criteria.motivations && Object.keys(criteria.motivations).length > 0) {
    // console.log('MOTIVATIONS',  {...criteria.motivations})
    const oldMotivations = {...criteria.motivations}
    const newMotivations = {}
    Object.keys(oldMotivations).map(item => {
      if (!criteria[item] && Object.keys(oldMotivations[item]).length === 0) {
        // const motivation = motivations.find(x => x.id === item)
        newMotivations[item] = { value: {} }
        formattedObject.motivations = newMotivations
      } else {
        const newItem = formatListCriteriaElement(oldMotivations[item])
        // console.log('NEW ITEM', item, newItem)
        formattedObject[item] = newItem
      }
      return true
    })
  }
  if (criteria.property_info && Object.keys(criteria.property_info).length > 0) {
    formattedObject.property_info = formatListCriteriaElement({...criteria.property_info})
  }
  // console.log('FORMATTED',  {...formattedObject})
  return formattedObject
}