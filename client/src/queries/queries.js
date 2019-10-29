import { gql } from 'apollo-boost';

const getPostsQuery = gql`
    {
        ideas {
            id
            title
            description
            category
            author {
                _id
                name
                imgNumber
                gender
            }
            comments {
                id
                content
                responseId
                author {
                    _id
                    name
                    imgNumber
                    gender
                }
            }
            stars {
                _id
                name
            }
            creationDate
            lastUpdateDate
        }
    }
`;

const login = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            userId,
            token
        }
    }
`;

const getUserData = gql`
    mutation GetUserData {
        getUserData {
            _id,
            email,
            name,
            birthDate,
            imgNumber,
            gender,
            starredPostIds
        }
    }
`;

const createUser = gql`
    mutation CreateUser($email: String!, $password: String!, $name: String!, $birthDate: String!, $imgNumber: Int!, $gender: String!) {
        createUser(email: $email, password: $password, name: $name, birthDate: $birthDate, gender: $gender, imgNumber: $imgNumber)
    }
`;

const addComment = gql`
  mutation AddComment($content: String!, $postId: ID!, $responseId: ID) {
      addComment(content: $content, postId: $postId, responseId: $responseId) {
          postId
      }
  }
`;

const addIdea = gql`
    mutation AddIdea($title: String!, $description: String!, $category: String!) {
        addIdea(title: $title, description: $description, category: $category) {
            id
            title
            description
            authorId
            category
            starsUserIds
            creationDate
            lastUpdateDate
        }
    }
`;

export {
  getPostsQuery, login, getUserData, createUser, addComment, addIdea,
};
