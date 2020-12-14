import fetch from 'cross-fetch';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://graphql-pokeapi.vercel.app/api/graphql', fetch }),
  cache: new InMemoryCache()
});