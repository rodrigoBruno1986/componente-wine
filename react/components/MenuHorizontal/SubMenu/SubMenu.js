import React from 'react';
import styles from './styles.css';
import SubmenuHeading from "./../SubmenuHeading/SubmenuHeading"
import Links from '../../common/Links/Links';



const SubMenu = ({ activeItem, subMenu }) => {
    return (
        <section className={styles.SubMenuContainer}>
            <SubmenuHeading activeItem={activeItem} />
            <ul className={`${styles.SubMenuItemWrapper} ${activeItem.children?.length > 1 && styles.hasChildren}`}>
                {activeItem.children && activeItem.children.map((subMenuItem, index) => {
                    return (
                        <li className={`${styles.subMenuItem} `} key={index}>
                            <Links underlined customClass={styles.subMenuItemTitle} url={subMenuItem.url}>{subMenuItem.__editorItemTitle}</Links>
                            {subMenuItem.children &&
                                <ul className={styles.subMenuChildrenContainer}>
                                    {subMenuItem.children.map((item) => {
                                        return (
                                            <li className={styles.subMenuChildrenItem}>
                                                <Links customClass={styles.subMenuChildrenItemText} underlined url={item.url}>{item.__editorItemTitle}</Links>
                                            </li>
                                        )
                                    })}
                                </ul>
                            }
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default SubMenu;