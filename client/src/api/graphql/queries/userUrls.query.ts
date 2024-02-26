import gql from 'graphql-tag'

export default gql`
  query userUrls($AuthorId: String!) {
    userUrls(AuthorId: $AuthorId) {
      slug
      id
      updatedAt
      url
      visits
    }
  }
`
