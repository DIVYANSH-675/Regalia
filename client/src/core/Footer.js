import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footerLeft">
        <div className="footerMenu">
          <h1 className="fMenuTitle">About Us</h1>
          <ul className="fList">
            <li className="fListItem">Company</li>
            <li className="fListItem">Contact</li>
            <li className="fListItem">Careers</li>
            <li className="fListItem">Affiliates</li>
            <li className="fListItem">Stores</li>
          </ul>
        </div>
        <div className="footerMenu">
          <h1 className="fMenuTitle">Useful Links</h1>
          <ul className="fList">
            <li className="fListItem">Support</li>
            <li className="fListItem">Refund</li>
            <li className="fListItem">FAQ</li>
            <li className="fListItem">Feedback</li>
            <li className="fListItem">Stories</li>
          </ul>
        </div>
        <div className="footerMenu">
          <h1 className="fMenuTitle">Products</h1>
          <ul className="fList">
            <li className="fListItem">Rings</li>
            <li className="fListItem">Ear rings</li>
            <li className="fListItem">Anklets</li>
            <li className="fListItem">Bangles</li>
            <li className="fListItem">Bracelet</li>
          </ul>
        </div>
      </div>
      <div className="footerRight">
        <div className="footerRightMenu">
          <h1 className="fMenuTitle">Subscribe to our newsletter</h1>
          <div className="fMail">
            <input type="text" placeholder="your@email.com" className="fInput" />
            <button className="fButton">Join!</button>
          </div>
        </div>
        <div className="footerRightMenu">
          <h1 className="fMenuTitle">Follow Us</h1>
          <div className="fIcons">
            <img src="./image/fb.jpg" alt="Facebook" className="fIcon" />
            <img src="./image/twitter.jpg" alt="Twitter" className="fIcon" />
            <img src="./image/instagram.jpg" alt="Instagram" className="fIcon" />
            <img src="./image/whatsapp.jpg" alt="WhatsApp" className="fIcon" />
          </div>
        </div>
        <div className="footerRightMenu">
          <span className="copyright">@RegeliaGems. All rights reserved. 2024.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
