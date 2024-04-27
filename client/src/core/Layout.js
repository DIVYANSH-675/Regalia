import React from 'react';
import Menu from './Menu';
import '../styles.css';

const Layout = ({ className, children }) => (
  <div>
    <Menu />
    <div className='jumbotron mt-[-20]'></div> 
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
