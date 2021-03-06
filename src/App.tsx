import React from 'react';
import {Switch, Route, useHistory} from "react-router-dom";
import Hello from "./components/HelloComponent/hello";
import MainContainer from "./components/mainContainer/mainContainer";
import DevicesContainer from "./components/devicesContainer/devicesContainer";
import UsersContainer from "./components/usersContainer/usersContainer";
import {useSelector} from "react-redux";
import {RootState} from "./redux/store";
import SettingsContainer from "./components/settings/settingsContainer";
import TrendsContainer from "./components/trends/trendsContainer";


const App: React.FunctionComponent = () => {
  const user = useSelector((state: RootState) => state.auth.user )
  const history = useHistory();
  if(!user) {
    history.push("/");
  }
  return (
      <>
        <Switch>
          <Route exact path={"/"} component={Hello}/>
          <MainContainer>
            <Route path={"/devices"} component={DevicesContainer}/>
            <Route path={"/users"} component={UsersContainer}/>
            <Route path={"/settings"} component={SettingsContainer}/>
            <Route path={"/trends"} component={TrendsContainer}/>
          </MainContainer>
        </Switch>
      </>
  );
}

export default App;
