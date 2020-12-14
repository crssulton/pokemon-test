import { client } from '../config/apiConfig';
import { gql } from '@apollo/client';

async function FetchApi(query, params = {}) {
  return await client.query({ query: gql`${query}`, variables: params })
  .then((response) => {
    return {status: true, data: response.data}
  })
  .catch((error) => {
    return {status: false, message: error.networkError.result.errors[0].message}
  })
}

export default FetchApi;