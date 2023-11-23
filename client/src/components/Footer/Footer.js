import React from "react";
import ItemsContainer from "./ItemsContainer";
import SocialIcons from "../Footer/SocialIcons";
import { Icons } from "../Footer/Menus";

const Footer = () => {
  return (
    <footer className="footers">
      <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0
      text-center pt-2 text-sm pb-8 footerTexts"
      >
        <span>© 2023 Hiring Shala. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <SocialIcons Icons={Icons} />
      </div>
    </footer>
  );
};

export default Footer;