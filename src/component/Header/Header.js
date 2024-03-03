import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../utility/fireBase";

const Header = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <>
      <section className={classes.fixed}>
        <section>
          <div className={classes.header_container}>
            {/* logo */}
            <div className={classes.logo_container}>
              <Link to="/">
                <img
                  src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                  alt="amazon-logo"
                />
              </Link>
              <div className={classes.delivery}>
                {/* location pointer */}
                <span>
                  <IoLocationOutline />
                </span>
                <div>
                  {/* delivery */}
                  <p>Delivery to</p>
                  <span>Ethiopia</span>
                </div>
              </div>
            </div>
            {/* search  section*/}
            <div className={classes.search}>
              <select name="" id="">
                <option value="">All</option>
                {/* <option value="">select specific</option> */}
              </select>
              {/* input filed */}
              <div className={classes.search_input}>
                <input
                  type="text"
                  placeholder="Search your item here"
                  name="Search"
                  id=""
                />
                {/* search icon */}
                <FaSearch size={38} />
              </div>
            </div>
            {/* other section */}
            <div className={classes.oreder_container}>
              {/* language choose */}
              <Link to="/" className={classes.language}>
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png" />
                <select name="">
                  <option value="">EN</option>
                </select>
              </Link>
              {/* Sign In And accounts */}
              <Link to={!user && "/auth"}>
                <div>
                  {user ? (
                    <>
                      <p>Hello,{user ? user.email.split("@")[0] : "Sign in"}</p>
                      <h3 onClick={() => auth.signOut()}> SignOut </h3>
                    </>
                  ) : (
                    <div>
                      <p>Hello,Sign in</p>
                      <span>Account & Lists</span>
                    </div>
                  )}
                </div>
              </Link>

              {/* order */}
              <Link to="/order">
                <p>returns</p>
                <span>& Order</span>
              </Link>
              {/* cart */}
              <Link to="/cart" className={classes.cart}>
                <MdOutlineShoppingCart size={35} />
                <span>{totalItem}</span>
              </Link>
            </div>
          </div>
        </section>
        <LowerHeader />
      </section>
    </>
  );
};

export default Header;
