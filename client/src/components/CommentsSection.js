import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo'
import Comment from './Comment';
import { Divider } from "@material-ui/core";

import CommentInput from "./CommentInput";
import {UserDataContext} from "../hoc/Authentication";
import { addComment } from "../queries/queries";

const CommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentsSection  = ({comments, addComment, ideaId}) => {
  const { content } = useContext(UserDataContext);
  const [ commentValue, setCommentValue ] = useState('');

  const handleCommentSubmit = () => {
    addComment({ variables: {
       content: commentValue,
       postId: ideaId
      }})
  };
  const commentInput = content._id && (
    <CommentInput
      avatarId={`${content.gender}-${content.imgNumber}`}
      value={commentValue}
      onChange={({target}) => setCommentValue(target.value)}
      submitComment={handleCommentSubmit}
    />
  );
  const computeComments = () => {
    const topLayerComments = comments.filter(comment => !comment.responseId);
    const nestedComments = comments.filter(comment => comment.responseId);

    return topLayerComments.map((comment) => (
      <Comment
        key={comment.id}
        comment={comment}
        nestedComments={nestedComments.filter(c => c.responseId === comment.id)}
      />
    ));
  };

  return(
      <section>
        <Divider variant="middle" />
          <CommentsWrapper>
              { computeComments() }
          </CommentsWrapper>
        {commentInput}
      </section>
  );
};

export default graphql(addComment, { name: 'addComment' })(CommentsSection)

