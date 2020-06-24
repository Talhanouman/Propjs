import React from 'react'
import MainContentContainer from '../../components/mainContentContainer'
import SupportOverview from './supportOverview'

export default function HelpContainer () {
  // const [ tabIndex, setTabIndex ] = React.useState(0)
  // const menuItems = [
  //   { id: 'overview', title: 'Support Overview', component: <SupportOverview /> },
  //   { id: 'faq', title: 'FAQs', component: <div /> },
  //   { id: 'video', title: 'Video Tutorials', component: <div /> },
  //   { id: 'ticket', title: 'Create a Ticket', component: <div /> },
  //   { id: 'chat', title: 'Live Chat', component: <div /> },
  // ]
  return (
    <MainContentContainer >
      <div style={{width: '100%'}}>
        <SupportOverview />
      </div>
    </MainContentContainer>
  )
}
