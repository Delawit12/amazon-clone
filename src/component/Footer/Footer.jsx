import React from "react";
import { Link } from "react-router-dom";
import FooterLink from "./FooterLink";
import "./footer.css";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="foot">
      <div className="footer">
        <ul>
          <h3>Get to Know Us</h3>
          <FooterLink lists="Careers" />
          <FooterLink lists="Blog" />
          <FooterLink lists="About Amazon" />
          <FooterLink lists="Sustainability" />
          <FooterLink lists="Press Center" />
          <FooterLink lists="Investor Relations" />
          <FooterLink lists="Amazon Devices" />
          <FooterLink lists="Amazon Tours" />
        </ul>
        <ul>
          <h3>Make Money with Us</h3>
          <FooterLink lists="Sell products on Amazon" />
          <FooterLink lists="Sell apps on Amazon" />
          <FooterLink lists="Become an Affiliate" />
          <FooterLink lists="Advertise Your Products" />
          <FooterLink lists="Self-Publish with Us" />
          <FooterLink lists="Host an Amazon Hub" />
          <FooterLink lists="See More Make Money with Us" />
        </ul>
        <ul>
          <h3>Amazon Payment Products</h3>
          <FooterLink lists="Amazon Rewards Visa Signature Cards" />
          <FooterLink lists="Amazon.com Store Card" />
          <FooterLink lists="Amazon Business Card" />
          <FooterLink lists="Amazon Business Line of Credit" />
          <FooterLink lists="Shop with Points" />
          <FooterLink lists="Credit Card Marketplace" />
          <FooterLink lists="Reload Your Balance" />
          <FooterLink lists="Amazon Currency Converter" />
        </ul>
        <ul>
          <h3>Let Us Help You</h3>
          <FooterLink lists="Amazon and COVID-19" />
          <FooterLink lists="Your Account" />
          <FooterLink lists="Your Orders" />
          <FooterLink lists="Shipping Rates & Policies" />
          <FooterLink lists="Amazon Prime" />
          <FooterLink lists="Returns & Replacements" />
          <FooterLink lists="Manage Your Content and Devices" />
          <FooterLink lists="Amazon Assistant" />
          <FooterLink lists="Help" />
        </ul>
      </div>     
      

     
    </div>
  );
}

export default Footer;