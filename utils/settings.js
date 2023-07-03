import ChangeAddressInfo from "../components/Profile/Settings/ChangeAddressInfo";
import ChangePersonalInfo from "../components/Profile/Settings/ChangePersonalInfo";
import ChangePreferences from "../components/Profile/Settings/ChangePreferences";

export default [
  {
    category: "Personal Info",
    component: <ChangePersonalInfo />,
  },
  {
    category: "Preferences",
    component: <ChangePreferences />,
  },
  {
    category: "Address Information",
    component: <ChangeAddressInfo />,
  },
];
