import React from 'react';
import { Link } from "vtex.render-runtime";
import Arrow from '../Arrow/Arrow';
import { useCssHandles } from "vtex.css-handles";
import "./styles.css";
/* import { substrUrl } from "./../../../utils/functions"; */

const CSS_HANDLES = ["linkContainer", "linkText", "underlineAnimation"];

const Links = ({ url, customClass, children, hasArrow, underlined }) => {
    const handles = useCssHandles(CSS_HANDLES);

    /*     const itemUrl = url && substrUrl(url);   */
    return (
        <>
            <div className={`${customClass && customClass} ${handles.linkContainer}`}>
                <Link to={url} className={`${underlined ? handles.underlineAnimation : ""} ${handles.linkText}`}>{children}</Link>
                {hasArrow && <Arrow />}
            </div>
        </>
    )
}

export default Links;