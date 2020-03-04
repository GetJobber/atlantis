import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

// Note: We are using react-helmet-async here instead of react-helmet
// https://github.com/nfl/react-helmet/issues/426
// https://www.docz.site/docs/add-favicon-and-metadata

// eslint-disable-next-line import/no-internal-modules,no-restricted-imports
import "../../../packages/design/src/foundation.css";

// The doc prop contains some metadata about the page being rendered that you can use.
const Wrapper = ({ children }) => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <link
        rel="icon"
        type="image/png"
        href="//public/assets/favicon.png"
      ></link>
      <link
        type="text/css"
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700,700i"
      ></link>
      <link
        type="text/css"
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Anonymous+Pro:400,400i,700,700i"
      ></link>
      <link
        type="text/css"
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i"
      ></link>
    </Helmet>
    {children}
  </>
);

Wrapper.propTypes = {
  children: PropTypes.children,
};

// eslint-disable-next-line import/no-default-export
export default Wrapper;
