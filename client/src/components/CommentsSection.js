import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { Divider } from "@material-ui/core";

const CommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentsSection  = (props) => {
  const computeComments = () => {
    const topLayerComments = props.comments.filter(comment => !comment.responseId)
    const nestedComments = props.comments.filter(comment => comment.responseId)
    console.log(topLayerComments, nestedComments)
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
      </section>
  );
};

export default CommentsSection

