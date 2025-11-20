import React from "react";
import { Button } from "../../ui/button";
import { BarChart, Users, FileText, Settings } from "lucide-react";

interface SideBarProps {
    activeTab: string;
    onTabChange: (tab:string) => void;
}

const sideBar: React.FC<SideBarProps> = ({ activeTab, onTabChange }) => {
    const menuItems = [
        { name: "Dashboard", icon: <BarChart />, key: "dashboard" },
        { name: "Users", icon: <Users />, key: "users" },
        { name: "Pages", icon: <FileText />, key: "reports" },
        { name: "Settings", icon: <Settings />, key: "settings" },
    ];
    return (
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Admin Panel</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Button
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => onTabChange(item.id)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  };

  export default sidebar;
