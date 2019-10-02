import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

const getPostsQuery = gql`
    {
        ideas {
            id
            title
            description
            category
            author {
                id
                name
                imgUrl
            }
            comments {
                id
                content
                responseId
                author {
                    id
                    name
                    imgUrl
                }
            }
            stars {
                id
                name
            }
            creationDate
            lastUpdateDate
        }
    }
`;

const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;

const getBookQuery = gql`
    query GetBook($id: ID){
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
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

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery, getPostsQuery, login };
