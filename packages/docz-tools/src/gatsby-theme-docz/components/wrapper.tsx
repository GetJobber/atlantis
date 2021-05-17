import React, { PropsWithChildren } from "react";
import { useConfig, useCurrentDoc } from "docz";
import { Helmet } from "react-helmet";

const Wrapper = ({ children }: PropsWithChildren<unknown>) => {
  const { title, description } = useConfig();
  const { name, route } = useCurrentDoc();
  const isHomePage = route === "/";
  const hasName = name !== "";
  const showName = hasName && !isHomePage;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        {showName ? (
          <title>
            {name} | {title}
          </title>
        ) : (
          <title>{title}</title>
        )}
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      {children}
    </>
  );
};

export default Wrapper;
