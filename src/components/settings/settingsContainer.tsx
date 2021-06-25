import React from "react";
import {NavLink, Route} from "react-router-dom";
import GlobalSettings from "./globalSettings/globalSettings";
import Flow1Settings from "./flow1/flow1";


const SettingsContainer: React.FunctionComponent = () => {
  return <div className="settings">
    <div className="settings__links">
      <NavLink to={"/settings/global"}  className="settings__linkItem" activeClassName="settings__linkItem_aktiv">
        Общие
      </NavLink>
      <NavLink to={"/settings/flow"}  className="settings__linkItem" activeClassName="settings__linkItem_aktiv">
        Поток
      </NavLink>


    </div>
    <div className="settings__container">
     <Route path={"/settings/global"} component={GlobalSettings} />
     <Route path={"/settings/flow"} component={Flow1Settings}/>
    </div>

  </div>
}

export default SettingsContainer;