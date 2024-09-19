import React from 'react';
import { Link } from 'react-router-dom'; 
import css from "./NotFoundPage.module.css"

const NotFoundPage = () => {
  return (
      <div className={css.notfound}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link className={css.link} to="/">Go to Home Page</Link>
      </div>
  )
}

export default NotFoundPage