import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import MainContentContainer from '../../components/mainContentContainer';
import PlanTypeToggle from '../../components/planTypeToggle';
import RecordCountSelector from '../../components/recordCountSelector';
import SearchCriteria from '../../components/searchCriteriaSidebar';
import SearchLocations from '../../components/searchLocations';
import SearchMotivationIndicators from '../../components/searchMotivationIndicators';
import SearchOptions from '../../components/searchOptions';
import SearchPropertyInfo from '../../components/searchPropertyInfo';

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex'
  },
  leftSide: {
    position: 'relative', 
    marginRight: theme.spacing(3), 
    minWidth: theme.spacing(31)
  }
}));

function ListBuilderView({ 
  criteria,
  searchResults,
  recordsRequested,
  isLoading,
  handleUpdateRecordsRequested,
  }) {
  const classes = useStyles();
  const [currentTabIndex, selectTabIndex] = React.useState(0)
  const [locationSelected, setLocationSelected] = React.useState(false)
  React.useEffect(() => {
    const hasLocation = Boolean((criteria.locations.cities && criteria.locations.cities.length > 0) ||
                      (criteria.locations.states && criteria.locations.states.length > 0) ||
                      (criteria.locations.zipcodes && criteria.locations.zipcodes.length > 0) ||
                      (criteria.locations.counties && criteria.locations.counties.length > 0))
    if (!hasLocation) {
      selectTabIndex(0)
      window.scroll(0, 0)
    }
    setLocationSelected(hasLocation)
  }, [criteria]);
  function onTabSelected(newValue) {
    selectTabIndex(newValue);
  }
  const menuItems = [
    { id: 'locations', disabled: false, title: 'Location Selection', component: <SearchLocations /> },
    { id: 'parcels', disabled: !locationSelected, title: 'Property Information', component: <SearchPropertyInfo /> },
    { id: 'motivations', disabled: !locationSelected, title: 'Motivation Indicators', component: <SearchMotivationIndicators /> },
    { id: 'options', disabled: !locationSelected, title: 'Options', component: <SearchOptions /> }
  ]
  return <MainContentContainer menuItems={menuItems} tabSelected={currentTabIndex} onTabSelected={onTabSelected}>
    <div className={classes.content}>
      <div className={classes.leftSide}>
        <PlanTypeToggle />
        <SearchCriteria locationSelected={locationSelected} />
        
        {(isLoading || locationSelected) && 
          <div>
            <RecordCountSelector
              recordCount={searchResults ? searchResults.count : 0}
              recordsRequested={recordsRequested}
              handleUpdateRecordsRequested={handleUpdateRecordsRequested}
              isLoading={isLoading}
            />
          </div>
        }
      </div>
      <div style={{width: '100%'}}>
        {menuItems && menuItems.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              {currentTabIndex === idx && item.component }
            </React.Fragment>
          )
        })}
      </div>
    </div>
  </MainContentContainer>
}

export default ListBuilderView;
