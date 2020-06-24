import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTargetedSearchCount, handleUpdateCriteria, loadingTargetedSearch } from '../reducers/search';

export default function withSearchHandler(WrappedComponent) {
    class withSearchHandler extends React.Component {
        constructor(props) {
            super(props);
            this.addCriteriaItem = this.addCriteriaItem.bind(this);
            this.state = {
              isSearching: false
            };
        }
        handleOptions (item) {
            let newCriteria = {...this.props.criteria}
            newCriteria.options = {...this.props.criteria.options}
            if (item.data && (item.data.value || (Array.isArray(item.data) && item.data.length > 0))) {
                newCriteria.options[item.group] = item.data
            } else {
                delete newCriteria.options[item.group]
            }
            if (process.env.NODE_ENV === 'development') { 
                console.log('New Criteria', newCriteria)
            }
            this.props.handleUpdateCriteria({...newCriteria})
        }
        async addCriteriaItem (item) {
            const section = item.section
            const group = item.group
            const data = Array.isArray(item.data) ? item.data : [item.data]
            if (section === 'options') { return this.handleOptions(item) }
            const queries = data.map((element) => {
                let query = {}
                if (Array.isArray(item.data)) { element = [element] }
                if (section === 'locations') { query = { locations: { [group]: element }}}
                else {
                    query = { locations: this.props.criteria.locations, [section]: { [group]: element } }
                }
                return query
            })
            const token = this.props.token
            const selectedPlanType = this.props.selectedPlanType
            const motivations = this.props.userAccess.motivations || []
            this.props.loadingTargetedSearch()
            const dataset = await Promise.all(queries.map(async query => {
                const count = await getTargetedSearchCount(token, query, selectedPlanType, motivations)
                if (Array.isArray(item.data)) {
                    query[section][group][0].count = count
                    return { ...query[section][group][0] }
                } else {
                    query[section][group].count = count
                    return { ...query[section][group] }
                }
            }))
            if (process.env.NODE_ENV === 'development') { console.log('New dataset:', dataset) }
            // console.log('Initial Criteria', {...this.props.criteria})
            // console.log('Sectoin', section);
            
            let newCriteria = {...this.props.criteria}
            newCriteria[section] = {...this.props.criteria[section]} 
            if (section === 'motivations') {
                newCriteria[section] = { [group]: dataset[0] }    
                motivations.forEach(item => delete newCriteria[item.id])
            } else {
                newCriteria[section][group] = Array.isArray(item.data) ? dataset : dataset[0]
            }
            const motivation = motivations.find(x => x.id === section)
            if (motivation && motivation.id) {
                newCriteria['motivations'] = {}
                newCriteria[motivation.id] = { [group]: dataset[0] }
            }
            if (process.env.NODE_ENV === 'development') { console.log('New Criteria', newCriteria) }
            this.props.handleUpdateCriteria({...newCriteria})
        }
        render() {
            return <WrappedComponent
                    addCriteriaItem={this.addCriteriaItem}
                    isSearching={this.state.isSearching}
                    {...this.props}
                    />
        }
    }
    const mapStateToProps = (state) => {
        return {
            token: state.auth.token,
            criteria: state.search.criteria,
            selectedPlanType: state.search.selectedPlanType,
            defaultCriteria: state.search.defaultCriteria,
            userAccess: state.auth.user.user_access
        }
    }
    const mapDispatch = (dispatch) => {
        return bindActionCreators({
            loadingTargetedSearch: loadingTargetedSearch,
            handleUpdateCriteria: handleUpdateCriteria
        }, dispatch)
    }
    return connect(mapStateToProps, mapDispatch)(withSearchHandler)
}
