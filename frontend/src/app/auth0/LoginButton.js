import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;

// console.log

// const LoginButton = () => {
//   const { loginWithRedirect, isAuthenticated, user } = useAuth0();
//
//   useEffect(() => {
//     if (isAuthenticated) {
//       console.log(user);
//     }
//   }, [isAuthenticated, user]);
//
//   return <button onClick={() => loginWithRedirect()}>Log In</button>;
// };
//
// export default LoginButton;
