import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import cl from './ItemCard.module.css';
import { useDispatch, useSelector } from 'react-redux';

export const ItemCard = ({ item, style }) => {
  return (
    <div className={cl.item__card}>
      <div className={cl.item__image}>
        <img src={item.images} alt={item.name} />
      </div>
      <div className={cl.item__text}>
        <div className={cl.top}>
          <div className={cl.item__title}>{item.title}</div>
          <div className={cl.item__subtitle} style={style}>
            {item.description}
          </div>
        </div>

        <div className={cl.item__other}>
          <div className={cl.item__price}>
            {item.price.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{' '}
            ₸
          </div>
          <div className={cl.item__links}></div>
        </div>
      </div>
    </div>
  );
};