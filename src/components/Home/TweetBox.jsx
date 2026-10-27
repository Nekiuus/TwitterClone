import React from 'react';
import avatar from '../../assets/avatar.jpeg';
import { TweetBoxContainer, Div, Avatar, Form, DivBox } from './styled';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import GifIcon from '@mui/icons-material/Gif';
import SortIcon from '@mui/icons-material/Sort';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Button } from '@mui/material';

export const TweetBox = () => {
  return (
    <TweetBoxContainer>
      <Form>
      <Div>
        <Avatar src={avatar} alt="User Avatar" />
        <div className="columns">
          <input type="text" placeholder="What is happening?" />
          <input type="text" placeholder="User" />
        </div>
      </Div>
      <Div>
        <DivBox>
            <CropOriginalIcon />
            <GifIcon />
            <SortIcon />
            <SentimentSatisfiedAltIcon />
            <CalendarTodayIcon />
        </DivBox>
        <input type="text" placeholder="Opcional: Url de la imagen" />
        <Button variant="contained" color="primary">
          Post
        </Button>
      </Div>
      
      </Form>
    </TweetBoxContainer>

  )
}
