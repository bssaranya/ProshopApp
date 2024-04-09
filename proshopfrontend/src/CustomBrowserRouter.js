import React from 'react';
import { BrowserRouter as ReactBrowserRouter } from 'react-router-dom';

const CustomBrowserRouter = ({ children }) => {
  // You can add any additional logic or configuration here
  return (
    <ReactBrowserRouter>
      {children}
    </ReactBrowserRouter>
  );
};

export default CustomBrowserRouter;
