import React from 'react';
import { useCssHandles } from "vtex.css-handles";
import "./styles.css";

const CSS_HANDLES = ["ImageMenu", "ImageMenuContainer"];

const ImageMenu = ({ src, alt }) => {
    const handles = useCssHandles(CSS_HANDLES);

    return (
        <div className={handles.ImageMenuContainer}>
            <img className={handles.ImageMenu} alt={alt} src={src} />
        </div>
    )
}

export default ImageMenu;