import React from "react";
import "./styles.css";
import { SidebarItem } from "../Sidebar/SidebarItem";

export const Sidebar = () => {
  const items = [
    {
      title: "Опросы",
      icon: "",
    },
    {
      title: "Тесты",
      icon: "",
    },
    {
      title: "Статистика",
      icon: "",
    },
  ];

  return (
    <div className="sidebar">
      {items.map((item) => (
        <SidebarItem title={item.title} />
      ))}
    </div>
  );
};
