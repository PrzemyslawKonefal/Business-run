import React, {useState} from 'react';
import styled from 'styled-components';
import { ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Button, Collapse } from '@material-ui/core'
import CommentsSection from "./CommentsSection";
import UserAvatar from "./UserAvatar";

const CommentFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ToggleAnswersButton = styled(Button)`
  font-size: 12px;
`;

const NestedCommentWrapper = styled(ListItem)`
  && {
    margin-left: 25px;
  }
`;
const NestedCommentAvatar = styled(Avatar)`
  && {
    width: 30px;
    height: 30px;
  }
`;

const Comment = ({comment, nestedComments}) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const toggleAnswersButton = nestedComments.length > 0 && !showAnswers && (
    <ToggleAnswersButton onClick={() => setShowAnswers(!showAnswers)}>
      {`Pokaż odpowiedzi (${nestedComments.length})`}
    </ToggleAnswersButton>
  );
  const nestedComms = showAnswers && nestedComments.map(answer => (
    <NestedCommentWrapper alignItems="flex-start" key={answer.id}>
      <ListItemAvatar>
        <UserAvatar small type={`${comment.author.gender}-${comment.author.imgNumber}`} />
      </ListItemAvatar>
      <ListItemText secondary={answer.content} />
    </NestedCommentWrapper>
  ))
  return (
    <React.Fragment>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <UserAvatar small type={`${comment.author.gender}-${comment.author.imgNumber}`} />
        </ListItemAvatar>
        <ListItemText secondary={comment.content} />
      </ListItem>
      <CommentFooter>
        {toggleAnswersButton}
      </CommentFooter>
      <Collapse in={showAnswers} timeout="auto" unmountOnExit>
        {nestedComms}
      </Collapse>
      <Divider variant="middle" />
    </React.Fragment>
  );
};

export default Comment;
