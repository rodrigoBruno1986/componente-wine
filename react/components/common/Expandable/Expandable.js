import React, {useEffect} from 'react';
import useCollapse from 'react-collapsed';
import { useCssHandles } from 'vtex.css-handles';
import './styles.css';

const CSS_HANDLES = [
    "accordion",
    'accordionPrevencion',
    "triggerAccordion",
    "triggerAccordionChild",
    "titleAccordion",
    "contentAccordion",
    "accordionIsOpen",
    "accordionIsClosed",
    'isActive'
];
const Expandable = ({ open, title, iconOpened, iconClosed, iconTrigger, content, customClass }) => {
    const handles = useCssHandles(CSS_HANDLES);
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
        defaultExpanded: open,
    });
    return (
        <>
            <div {...getToggleProps()} className={`${handles.accordion} ${customClass ? customClass : ""} ${isExpanded ? handles.isActive : ""}`}>
                {title && <p className={handles.titleAccordion}>{title}</p>}
                <div className={`${handles.triggerAccordion} ${isExpanded ? handles.accordionIsOpen : handles.accordionIsClosed}`}>
                    {iconOpened ?
                        <img
                            className={handles.triggerAccordionChild}
                            alt="arrow"
                            width={12}
                            src={isExpanded ? iconOpened : iconClosed}
                        />
                        :
                        <span className={` ${handles.triggerAccordionChild}`}>
                            {iconTrigger}
                        </span>
                    }
                </div>
            </div>
            <ul {...getCollapseProps()} className={`${handles.contentAccordion} `}>
                {content}
            </ul>
        </>
    )
}

export default Expandable;