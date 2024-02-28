import gql from 'graphql-tag'

export default gql`
  mutation deleteUrl($id: Int!) {
    deleteUrl(id: $id) {
      id
    }
  }
`
