import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import MainContentContainer from '../../components/mainContentContainer';
const useStyles = makeStyles(theme => ({
  heading: {
    fontWeight: 500
  }
}))
const questions = [
  { question: 'What is your name?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'},
  { question: 'What is your favorite color?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'},
  { question: 'What is the airspeed velocity of an unladen swallow?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'},
]
const FAQs = () => {
  const classes = useStyles()
  return (
    <MainContentContainer>
      <Typography variant="h6" gutterBottom>FAQs</Typography>
      {questions.map((item, idx) => {
        return <ExpansionPanel key={idx}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{item.question}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {item.answer}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      })}
    </MainContentContainer>
  )
}

export default FAQs
