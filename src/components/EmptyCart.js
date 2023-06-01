import React from 'react';
import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="cart cart--empty">
          <h2>Your cart is empty <i>😕</i></h2>
          <p>
            Unfortunately, you have not ordered a bouquet yet.<br />
            To order a bouquet, go to the main page.
          </p>
          <img src='/assets/img/empty-cart.png' alt="Empty cart" />
          <Link to="/" className="button button--black">
            <span>Go back</span>
          </Link>
     </div>
  )
}

export default EmptyCart