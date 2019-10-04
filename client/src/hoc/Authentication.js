import React, {useEffect, useState} from 'react';
import lodash from "lodash";
import {graphql} from "react-apollo";
import {getUserData, login} from "../queries/queries";
import {setCookie, getCookie, eraseCookie} from "../utils/functions";

export const UserDataContext = React.createContext({});

const Authentication = (props) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (getCookie('access_token')) {
      handleGettingUserData()
    }
  }, []);

  const handleLogin = ({email, password}) => {
    props.login({ variables: {
        email,
        password
      }}).then(({ data }) => {
      setCookie('access_token', data.login.token, 7);
      handleGettingUserData()
    })
  };
  const handleLogout = () => {
    eraseCookie('access_token');
    setUserData({});
  };
  const handleGettingUserData = () => {
    props.getUserData().then(({data}) => {
      setUserData(data.getUserData);
    });
  };

  return (
    <UserDataContext.Provider value={{content: userData, handleLogin, handleLogout}}>
      {props.children}
    </UserDataContext.Provider>
  );
};

export default lodash.flowRight(
  graphql(login, { name: "login" }),
  graphql(getUserData, { name: "getUserData" })
)(Authentication);
