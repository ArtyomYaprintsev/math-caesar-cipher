import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <span className='title'>Шифр Цезаря</span>

      <nav>
        <Link to='/break'>Взломать</Link>
        <Link to='/decode'>Расшифровать</Link>
        <Link to='/encode'>Зашифровать</Link>
      </nav>
    </header>
  );
};

export default Header;
