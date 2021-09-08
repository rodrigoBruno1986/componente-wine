import React from 'react';
import Expandable from '../common/Expandable/Expandable'
import './styles/style'
import { Link } from 'vtex.render-runtime';
import { useCssHandles } from 'vtex.css-handles';

const ExpandableMenu = ({ items }) => {

    const CSS_HANDLES = [
        'wrapperAccordion',
        'accordion',
        'menu--wrapper',
        'ExpandableMenu-wrapperLink',
        'menu--subcategory',
        'menu--father',
        'menu--category',
    ]
    const handles = useCssHandles(CSS_HANDLES)

    return (
        items?.map(({ __editorItemTitle, subitems, link }, i) => {
            return (
                <>
                    {
                        subitems ?
                            <>
                                <li className={handles['wrapperAccordion']}>
                                    <Expandable
                                        title={__editorItemTitle}
                                        open={false}
                                        customClass={handles['menu--father']}
                                        content={
                                            <>
                                                {subitems?.map(
                                                    ({ link, __editorItemTitle, subitems }, i) =>
                                                        subitems &&
                                                        <>
                                                            <li key={i} className={handles['menu-category--wrapper']}>
                                                                <Link to={link} className={handles['menu--category']}>{__editorItemTitle}</Link>
                                                                <ul className={handles['menu--wrapper']}>
                                                                    {subitems?.map(
                                                                        ({ link, __editorItemTitle }, i) =>
                                                                            <li key={i}>
                                                                                <Link to={link} className={handles['menu--subcategory']}>{__editorItemTitle}</Link>
                                                                            </li>
                                                                    )}
                                                                </ul>
                                                            </li>

                                                        </>
                                                )}
                                                <li>
                                                    <Link to={link} className={handles['menu--subcategory']}>ver todo</Link>
                                                </li>
                                            </>
                                        }
                                        iconTrigger={'›'}
                                    />
                                </li>

                            </>
                            :
                            <>
                                <li key={i} className={handles['wrapperAccordion']}>
                                    <Link to={link} className={handles['menu--father']}>{__editorItemTitle}</Link>
                                </li>
                            </>
                    }
                </>
            )
        })
    )
}

ExpandableMenu.getSchema = props => {
    return {
        title: 'Menu Mobile',
        type: 'object',
        properties: {
            items: {
                title: 'Container of links',
                type: 'array',
                items: {
                    properties: {
                        __editorItemTitle: {
                            title: "Nombre Item Padre" ,
                            type: 'string'
                        },
                        link: {
                            title: 'Link',
                            description: 'para que no tenga link dejar vacío',
                            type: 'string',
                            default: null
                        },
                        subitems: {
                            title: 'Sub-links',
                            type: 'array',
                            items: {
                                properties: {
                                    __editorItemTitle: {
                                        title: "Nombre Item Hijo" ,
                                        type: 'string'
                                    },
                                    link: {
                                        title: 'Link',
                                        type: 'string'
                                    },
                                    subitems: {
                                        title: 'Sub-links',
                                        type: 'array',
                                        items: {
                                            properties: {
                                                __editorItemTitle: {
                                                    title: "Nombre Item Nieto" ,
                                                    type: 'string'
                                                },
                                                link: {
                                                    title: 'Link',
                                                    type: 'string'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

ExpandableMenu.defaultProps = {
    items: [
        {
            title: 'Prevención covid',
            link: '',
            subitems: [
                {
                    __editorItemTitle: 'Limpieza',
                    link: '#',
                    subitems: [
                        {
                            __editorItemTitle: 'Desinfectante',
                            link: '#',
                            subitems: [
                                {
                                    __editorItemTitle: 'Cif',
                                    link: "#"
                                }
                            ]
                        },
                        {
                            __editorItemTitle: 'Jabón',
                            link: '#'
                        }
                    ]
                },
                {
                    __editorItemTitle: 'Bebes',
                    link: '#',
                    subitems: [
                        {
                            __editorItemTitle: 'Pañales',
                            link: '#'
                        }
                    ]
                }
            ]
        }
    ],
    textOpened: '<',
    textClosed: '>'
}

export default ExpandableMenu