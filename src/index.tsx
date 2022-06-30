import ReactDOM from 'react-dom/client';
import Router from './routes';
import './styles/global.scss';
import { client, ApolloProvider } from './service/apolloConfig';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <Router/>
  </ApolloProvider>    
  // </React.StrictMode>
);