import React, { useState } from 'react';
import styled from 'styled-components';
import {Card, CardHeader, CardActions, Button, Avatar, Chip, IconButton} from '@material-ui/core'
import {NavLink} from 'react-router-dom';
import Dotdotdot from 'react-dotdotdot'
import {Favorite, Share, Comment} from '@material-ui/icons'

const PostWrapper = styled(Card)`
  && {
    z-index: 5;
    position: relative;
    max-width: 375px;
    margin-bottom: 1em;
  }
  
`;

const CategoryChip = styled(Chip)`
&& {
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  border-radius: 0 0 0 16px;
  height: 20px;
  text-transform: capitalize;
}
`;

const PostDescription = styled.p`
  color: #5f5f5f;
  line-height: 16px;
`;

const PostContent = styled.div`
  padding: 0 16px;
`;


const Post = ({idea}) => {
  const [commentsOpen, setCommentsOpen] = useState(false);
  return (
    <PostWrapper>
      <CategoryChip label={idea.category} color="primary"/>
      <CardHeader
        avatar={<NavLink to={`/users/${idea.author.id}`}><Avatar src={idea.author.imgUrl} title={idea.author.name}> {idea.author.name[0]} </Avatar></NavLink>}
        title={idea.title}
      >
      </CardHeader>
      <PostContent>
        <Dotdotdot clamp={4}>
          <PostDescription>
            {idea.description}
          </PostDescription>
        </Dotdotdot>
      </PostContent>
      <CardActions>
        <IconButton aria-label="add to favorites" size="small">
          {idea.stars.length}
          <Favorite />
        </IconButton>
        <IconButton aria-label="share" size="small">
          <Share />
        </IconButton>
        <IconButton aria-label="share" size="small" onClick={() => setCommentsOpen(!commentsOpen)}>
          {idea.comments.length}
          <Comment color={commentsOpen ? 'primary' : 'inherit'}/>
        </IconButton>
      </CardActions>
    </PostWrapper>
  );
};

export default Post;
