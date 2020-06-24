import { Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/Chat';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ReceiptIcon from '@material-ui/icons/Receipt';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import React from 'react';
import { withRouter } from 'react-router-dom';
import StyledButton from '../../components/styledButton';

const useStyles = makeStyles(theme => ({
  cardContent: {
    minHeight: theme.spacing(18),
    textAlign: 'center'
  },
  cardAction: {
    minHeight: theme.spacing(6),
    display: 'flex', 
    justifyContent: 'center'
  }
}))
const SupportOverview = ({history}) => {
  const classes = useStyles()
  return (
    <div>
      <Typography variant="h6" gutterBottom>Help & Support Overview</Typography>
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <Card>
            <CardContent className={classes.cardContent}>
              <Typography id='title' gutterBottom variant="h6">FAQs</Typography>
              <QuestionAnswerIcon style={{fontSize: 64}} />
            </CardContent>
            <CardActions className={classes.cardAction}>
              <StyledButton
                  handleButtonClick={() => history.push('/faqs')}
                  label="View FAQs"
                  style={{margin: 0, fontSize: 14, padding: '2px 8px'}}
              />
            </CardActions>
          </Card>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Card>
            <CardContent className={classes.cardContent}>
              <Typography id='title' gutterBottom variant="h6">Video Tutorials</Typography>
              <VideoLibraryIcon style={{fontSize: 64}} />
            </CardContent>
            <CardActions className={classes.cardAction}>
              <StyledButton
                  handleButtonClick={() => history.push('/videos')}
                  label="Get Started"
                  style={{margin: 0, fontSize: 14, padding: '2px 8px'}}
              />
            </CardActions>
          </Card>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Card>
            <CardContent className={classes.cardContent}>
              <Typography id='title' gutterBottom variant="h6">Create a Ticket</Typography>
              <ReceiptIcon style={{fontSize: 64}} />
            </CardContent>
            <CardActions className={classes.cardAction}>
              <StyledButton
                  handleButtonClick={() => history.push('/support-tickets')}
                  label="Email Us"
                  style={{margin: 0, fontSize: 14, padding: '2px 8px'}}
              />
            </CardActions>
          </Card>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Card>
            <CardContent className={classes.cardContent}>
              <Typography id='title' gutterBottom variant="h6">Live Chat</Typography>
              <ChatIcon style={{fontSize: 64}} />
            </CardContent>
            <CardActions className={classes.cardAction}>
              <StyledButton
                  handleButtonClick={() => console.warn('chat')}
                  label="Talk with Support"
                  style={{margin: 0, fontSize: 14, padding: '2px 8px'}}
              />
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default withRouter(SupportOverview)
