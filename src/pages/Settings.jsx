import Nav from "../components/organisms/Nav/Nav";
import SettingsPanel from "../components/organisms/SettingsPanel/SettingsPanel";
export default function Settings() {
    return <>
    <Nav text="Settings" inner={true}></Nav>
    <SettingsPanel type="account"></SettingsPanel>
    <SettingsPanel type="app"></SettingsPanel>
    <SettingsPanel type="others"></SettingsPanel>
    </>
}