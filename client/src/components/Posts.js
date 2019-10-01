import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import lodash from 'lodash';
import styled from 'styled-components';
import {getPostsQuery} from '../queries/queries';

import Post from './Post';

const PostWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0 1em;
  @media screen and (max-width: 1210px) {
    justify-content: space-between;
  }
`;

const Posts  = (props) => {
    const displayPosts = () => {
        const { getPostsQuery } = props;
        if (getPostsQuery.loading){
            return( <div>Loading books...</div> );
        } else {
            return getPostsQuery.ideas.map(idea => {
                return(
                  <Post key={idea.id} idea={idea} />
                );
            })
        }
    }
  return(
      <main>
          <PostWrapper>
              { displayPosts() }
          </PostWrapper>
      </main>
  );
}

export default lodash.flowRight(
  graphql(getPostsQuery, { name: "getPostsQuery" })
)(Posts)

