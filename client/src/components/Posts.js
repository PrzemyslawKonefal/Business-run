import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import lodash from 'lodash'
import {getPostsQuery} from '../queries/queries';

import Post from './Post';

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
      <div>
          <ul id="book-list">
              { displayPosts() }
          </ul>
      </div>
  );
}

export default lodash.flowRight(
  graphql(getPostsQuery, { name: "getPostsQuery" })
)(Posts)

