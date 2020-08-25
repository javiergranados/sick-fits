import withApollo from 'next-with-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { endpoint, prodEndpoint } from '../config';
import { GET_LOCAL_STATE } from '../graphql/query';

function createClient() {
  const link = ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          // eslint-disable-next-line no-console
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
      if (networkError) {
        // eslint-disable-next-line no-console
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    new HttpLink({
      uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
      credentials: 'include',
    }),
  ]);

  const appCache = new InMemoryCache();
  appCache.writeData({
    data: {
      cartOpen: false,
    },
  });

  const resolvers = {
    Mutation: {
      toggleCart(_, variables, { cache }) {
        const { cartOpen } = cache.readQuery({ query: GET_LOCAL_STATE });
        const data = { cartOpen: !cartOpen };

        cache.writeData({ data });
        return data.cartOpen;
      },
    },
  };

  return new ApolloClient({
    link,
    cache: appCache,
    resolvers,
    connectToDevTools: process.env.NODE_ENV === 'development',
  });
}

export default withApollo(createClient);
