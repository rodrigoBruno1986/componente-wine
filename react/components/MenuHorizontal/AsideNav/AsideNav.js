import React, { useEffect } from 'react';
import styles from './styles.css';
import Links from './../../common/Links/Links';
import { useCssHandles, applyModifiers } from "vtex.css-handles";

const CSS_HANDLES = ["AsideNav", "menuItemContainer", "menuItemLink", "isActive"];


const AsideNav = ({ menu, setActiveItem, activeItem }) => {
    const handles = useCssHandles(CSS_HANDLES);

    const hoverHandler = (itemMenu) => {
        setActiveItem(itemMenu)
    };
    return (
        <ul className={`${handles.AsideNav}`}>
            {menu.map((itemMenu, index) => {
                itemMenu.id = index;
                return (
                    <>
                        <li
                            key={index}
                            onMouseEnter={() => hoverHandler(itemMenu)}
                            className=
                            {`
                                ${handles.menuItemContainer}
                                ${activeItem.id === itemMenu.id ? handles.isActive : ""}
                            `}
                        >
                            <Links underlined customClass={`${handles.menuItemLink}`} hasArrow url={itemMenu.url}>{itemMenu.__editorItemTitle}</Links>
                        </li>
                    </>
                )
            })}
        </ul>
    )
}

export default AsideNav;