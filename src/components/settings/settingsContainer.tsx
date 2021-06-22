import React from "react";
import {NavLink} from "react-router-dom";


const SettingsContainer: React.FunctionComponent = () => {
  return <div className="settings">
    <div className="settings__links">
      <NavLink to={"/settings/global"}  className="settings__linkItem" activeClassName="settings__linkItem_aktiv">
        Общие
      </NavLink>
      <NavLink to={"/settings/flow1"}  className="settings__linkItem" activeClassName="settings__linkItem_aktiv">
        Поток 1
      </NavLink>
      <NavLink to={"/settings/flow2"}  className="settings__linkItem" activeClassName="settings__linkItem_aktiv">
        Поток 2
      </NavLink>

    </div>
    <div className="settings__container">
      Settings
    </div>

  </div>
}

export default SettingsContainer;