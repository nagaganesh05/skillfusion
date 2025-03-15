// src/components/Breadcrumbs.jsx
import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

const BreadCrumbsType = ({ items = [] }) => {
  return (
    <Breadcrumb>
      {items.map((item, index) => (
        <Breadcrumb.Item
          key={index}
          href={item.href}
          active={!item.href}
          onClick={item.onClick}
        >
          {item.text}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumbsType;



