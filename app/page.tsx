import { MdAdminPanelSettings } from "react-icons/md";
import Card from "./ui/dashboard/card/card";
import "./ui/globals.css";

export default function Home() {
  return (
    <main>
      <h2>
        Mtoto<span>Sharp</span> <span>foundation</span>
      </h2>
      <div>
        <Card title="Admin" icon={<MdAdminPanelSettings />} />
        <Card title="customer Support" icon={<MdAdminPanelSettings />} />
        <Card title="Author" icon={<MdAdminPanelSettings />} />
        <Card title="marketting" icon={<MdAdminPanelSettings />} />
        <Card title="Editor" icon={<MdAdminPanelSettings />} />
        <Card title="Finance" icon={<MdAdminPanelSettings />} />
        <Card title="Sales" icon={<MdAdminPanelSettings />} />
      </div>
    </main>
  );
}
