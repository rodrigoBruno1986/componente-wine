import React from 'react';
import styles from "./styles.css";
import Links from './../../common/Links/Links';

const SubmenuHeading = ({ activeItem }) => { 
    return (
        <div className={`${styles.SubMenuHeading}`}>
            <h4 className={styles.SubMenuTitle}>{activeItem.__editorItemTitle}</h4>
            {activeItem.url && <span className={styles.SubMenuHeadingLinkContainer}>
                <Links hasArrow customClass={styles.SubMenuHeadingLink} url={activeItem.url}>ver toda la categoría</Links>
            </span>}
        </div>
    )
}

export default SubmenuHeading;