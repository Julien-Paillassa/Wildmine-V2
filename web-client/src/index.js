import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import createUploadLink from "apollo-upload-client/public/createUploadLink.js";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: '/graphql'
  })
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
