import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import YouTube from 'react-youtube';
import MainContentContainer from '../../components/mainContentContainer';

const videoList = [
  { id: '7FPELc1wEvk' },
  { id: 'ZtYU87QNjPw' },
]
const Videos = () => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  }
  // const handleReady = (event) => {
  //   event.target.pauseVideo()
  // }
  return (
    <MainContentContainer>
      <Typography variant="h6" gutterBottom>Video Tutorials</Typography>
      <Grid container spacing={3}>
        {videoList.map(item => (
          <Grid key={item.id} item xs={12}>
            <YouTube videoId={item.id} opts={opts} />
          </Grid>
        ))}
      </Grid>
    </MainContentContainer>
  )
}

export default Videos
