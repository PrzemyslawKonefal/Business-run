import React from 'react';
import { graphql } from 'react-apollo';
import lodash from 'lodash';
import styled from 'styled-components';
import { getPostsQuery } from '../queries';

import Post from './Post';

const PostWrapper = styled.main`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0 1em;
  
  @media screen and (max-width: 1210px) {
    justify-content: space-between;
  }
`;

const Posts = (props) => {
  return (
    <PostWrapper>
    </PostWrapper>
  );
};

export default lodash.flowRight(
  graphql(getPostsQuery, { name: 'posts' }),
)(Posts);
