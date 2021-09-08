import React, { useState, useEffect } from 'react';
import AsideNav from './AsideNav/AsideNav';
import SubMenu from './SubMenu/SubMenu';
import ImageMenu from './ImageMenu/ImageMenu';
import { useCssHandles } from "vtex.css-handles";
import './styles.css'

const CSS_HANDLES = ["MenuHorizontal"];

const MenuHorizontal = (props) => {
    const handles = useCssHandles(CSS_HANDLES);
    const [menu, setMenu] = useState([]);
    const [activeItem, setActiveItem] = useState({})
    useEffect(() => {
        setMenu(props.items)
    }, [])

    //seteo el primer item del array como el activo
    useEffect(() => {
        menu?.length && setActiveItem(menu[0])
    }, [props.items])

    return (
        <div className={`${handles.MenuHorizontal}`}>
            {menu &&
                <>
                    <AsideNav
                        menu={menu}
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                    ></AsideNav>
                    {activeItem.children && <SubMenu subMenu={activeItem.children} activeItem={activeItem}></SubMenu>}
                    {activeItem.image && <ImageMenu src={activeItem.image} alt={activeItem.alt} />}
                </>
            }
        </div>
    )
}

MenuHorizontal.getSchema = props => {
    return {
        title: 'Menu Desktop',
        type: 'object',
        properties: {
            items: {
                title: 'Items Menu',
                type: 'array',
                items: {
                    properties: {
                        __editorItemTitle: {
                            title: "Nombre Item Padre" ,
                            type: 'string'
                        },
                        image: {
                            title: 'Seleccionar imagen',
                            type: 'string',
                            default: '',
                            widget: {
                                'ui:widget': 'image-uploader'
                            }
                        },
                        alt: {
                            title: 'Alt imagen',
                            type: 'string',
                            default: ''
                        },
                        url: {
                            title: 'Url del item',
                            type: 'string',
                            default: '',
                        },
                        children: {
                            title: 'Menu children Items',
                            type: 'array',
                            items: {
                                properties: {
                                    __editorItemTitle: {
                                        title: "Nombre Item Hijo",
                                        type: 'string'
                                    },
                                    url: {
                                        title: 'Link',
                                        type: 'string',
                                        default: ''
                                    },
                                    children: {
                                        title: 'SubMenu children Items',
                                        type: 'array',
                                        items: {
                                            properties: {
                                                __editorItemTitle: {
                                                    title: "Nombre Item Nieto",
                                                    type: 'string'
                                                },
                                                url: {
                                                    title: 'Link',
                                                    type: 'string',
                                                    default: ''
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
export default MenuHorizontal;
