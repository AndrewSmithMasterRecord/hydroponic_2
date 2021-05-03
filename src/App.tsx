import React from 'react';
import {Switch, Route} from "react-router-dom";
import Hello from "./components/HelloComponent/hello";
import MainContainer from "./components/mainContainer/mainContainer";
import DevicesContainer from "./components/devicesContainer/devicesContainer";
import UsersContainer from "./components/usersContainer/usersContainer";


const App: React.FunctionComponent = () => {
  return (
      <>
        <Switch>
          <Route exact path={"/hello"} component={Hello}/>
          <MainContainer>
            <Route path={"/devices"} component={DevicesContainer}/>
            <Route path={"/users"} component={UsersContainer}/>
          </MainContainer>
        </Switch>
      </>
  );
}

export default App;
