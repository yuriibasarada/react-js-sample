import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import Login from "../pages/Login";
import Posts from "../pages/Posts";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
  const {isAuth, setIsAuth, isLoading} = useContext(AuthContext)

  if(isLoading) {
    return (<Loader/>)
  }

  return (
      isAuth
          ? <Routes> {privateRoutes.map(r =>
              <Route key={r.path} path={r.path} element={r.element} exact={r.exact}/>
          )}
            <Route path='*' element={<Navigate to='/posts' replace  />} exact/>
          </Routes>
          :
          <Routes>
            {publicRoutes.map(r =>
                <Route key={r.path} path={r.path} element={r.element} exact={r.exact}/>
            )}
            <Route path='*' element={<Navigate to='/login' replace  />} exact/>
          </Routes>
  )
};

export default AppRouter;