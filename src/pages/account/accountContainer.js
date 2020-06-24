import React from 'react'
import MainContentContainer from '../../components/mainContentContainer'
import AccountDetails from './accountDetails'
import Billing from './billing'
import Subscriptions from './subscriptions'

export default function AccountContainer () {
  const [ tabIndex, setTabIndex ] = React.useState(0)
  const menuItems = [
    { id: 'account', title: 'Account Details', component: <AccountDetails /> },
    { id: 'subscription', title: 'Subscriptions', component: <Subscriptions /> },
    { id: 'billing', title: 'Billing Details', component: <Billing /> }
  ]
  return (
    <MainContentContainer menuItems={menuItems} tabSelected={tabIndex} onTabSelected={setTabIndex} >
      <div style={{width: '100%'}}>
        {menuItems && menuItems.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              {tabIndex === idx && item.component }
            </React.Fragment>
          )
        })}
      </div>
    </MainContentContainer>
  )
}
