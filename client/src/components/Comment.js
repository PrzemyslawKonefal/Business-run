import React, {useState} from 'react';
import styled from 'styled-components';
import { ListItem, ListItemAvatar, ListItemText, Divider, Button, Collapse } from '@material-ui/core';
import UserAvatar from "./UserAvatar";
import CommentOperations from "./CommentOperations";

const CommentFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ToggleAnswersButton = styled(Button)`
  font-size: 12px;
`;

const CommentBody = styled(ListItem)`
  position: relative;
`

const NestedCommentWrapper = styled(CommentBody)`
  && {
    margin-left: 25px;
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
        <UserAvatar small type={`${answer.author.gender}-${answer.author.imgNumber}`} />
      </ListItemAvatar>
      <ListItemText secondary={answer.content} />
    </NestedCommentWrapper>
  ));


  return (
    <React.Fragment>
      <CommentBody alignItems="flex-start">
        <ListItemAvatar>
          <UserAvatar small type={`${comment.author.gender}-${comment.author.imgNumber}`} />
        </ListItemAvatar>
        <ListItemText secondary={comment.content} />
        <CommentOperations comment={comment}/>
      </CommentBody>
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
