import React, { useState } from 'react';
import styled from 'styled-components';
import {Card, CardHeader, CardActions, Collapse, Avatar, Chip, IconButton} from '@material-ui/core'
import {NavLink} from 'react-router-dom';
import Dotdotdot from 'react-dotdotdot'
import {Favorite, Share, Comment} from '@material-ui/icons'
import CommentsSection from './CommentsSection'
import UserAvatar from "./UserAvatar";

const PostWrapper = styled(Card)`
  && {
    position: relative;
    max-width: 375px;
    min-width: 300px;
    margin: 0 1em 1em 0;
    &:nth-of-type(3n) {
      margin-right: 0;
    }
    @media screen and (max-width: 1210px) {
      max-width: 380px;
      &:nth-of-type(2n) {
        margin-right: 0;
      }
      &:nth-of-type(3n) {
        margin-right: 1em;
      }
    }
  }
  
`;

const CategoryChip = styled(Chip)`
&& {
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  height: 20px;
  border-radius: 0 0 0 16px;
  text-transform: capitalize;
  
}
`;

const PostDescription = styled.p`
  color: #5f5f5f;
  line-height: 16px;
  min-height: 65px;
`;

const PostContent = styled.div`
  padding: 0 16px;
`;

const IconNumber = styled.span`
  padding: 0 8px;
`


const Post = ({idea}) => {
  const [commentsOpen, setCommentsOpen] = useState(false);
  return (
    <PostWrapper>
      <CategoryChip label={idea.category} color="primary"/>
      <CardHeader
        avatar={<NavLink to={`/users/${idea.author._id}`}><UserAvatar type={`${idea.author.gender}-${idea.author.imgNumber}`} small/></NavLink>}
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
          <IconNumber>{idea.stars.length}</IconNumber>
          <Favorite />
        </IconButton>
        <IconButton aria-label="share" size="small">
          <Share />
        </IconButton>
        <IconButton aria-label="share" size="small" onClick={() => setCommentsOpen(!commentsOpen)}>
          <IconNumber>{idea.comments.length}</IconNumber>
          <Comment color={commentsOpen ? 'primary' : 'inherit'}/>
        </IconButton>
      </CardActions>
      <Collapse in={commentsOpen} timeout="auto" unmountOnExit>
        <PostContent>
          <CommentsSection comments={idea.comments} ideaId={idea.id}/>
        </PostContent>
      </Collapse>
    </PostWrapper>
  );
};

export default Post;
