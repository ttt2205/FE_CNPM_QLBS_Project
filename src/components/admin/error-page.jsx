import { useRouteError } from "react-router-dom";

export default function ErrorPage({ children, otherError }) {
  // console.log(otherError);
  const routerError = useRouteError();
  let error = routerError || otherError;
  // console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      {children}
    </div>
  );
}
