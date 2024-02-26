import { gql } from 'graphql-tag'

export default gql`
  mutation createUrl($url: String!, $slug: String!, $AuthorId: String!) {
    createUrl(input: { url: $url, slug: $slug, AuthorId: $AuthorId }) {
      id
    }
  }
`
