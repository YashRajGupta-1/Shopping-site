import React from 'react';
import './footer.css';
import { useLocation } from 'react-router-dom';
const Footer = () => {
  const path=useLocation().pathname;
  return (
    <>
   { path==='/login'?<></>:<footer className='footer'>
      <p>© 2026 Product Catalog. All Rights Reserved.</p>
    </footer>}
    </>
  );
};

export default Footer;
