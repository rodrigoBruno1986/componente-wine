import React, {useContext} from 'react'
import {useCssHandles} from 'vtex.css-handles'
import {ProductContext} from 'vtex.product-context'
import './style.css'

/// ACA SE ESTA CREANDO LAS CLASES DE CSS
const CSS_HANDLES = [
    'FilterDetails--container',
    'FilterDetails--detailsGroupOne',
    'FilterDetails--detailsGroupTwo',
    'FilterDetails--detailsItem',
    'FilterDetails--detailsItem-2',
    'FilterDetails--text-1',
    'FilterDetails--text-2'
];
const FilterDetails = (props) => {
    //// ESTA CONSTANTE HANDLES NOS ESTA TRAYENDO LAS CLASES DE CSS
    const handles = useCssHandles(CSS_HANDLES);

    const valuesFromContext = useContext(ProductContext);
    let product = valuesFromContext.product;

    // VARIABLE QUE NOES ESTA TRAYENDO LAS ESPECIFICACIONES DEL PRODUCTO
    let grupoName = product.specificationGroups[0]?.specifications;


    //// SEPARAMOS POR GRUPO 1 Y GRUPO 2
    function skfG(groupName, numeroDeGrupo) {
        if(groupName) {
            /// ESTE IF NOS ESTA MOSTRANDO LAS  ESPECIFICAIONES ESPECIALES QUE QUEREMOS SEPARAR DEL RESTO
            if(numeroDeGrupo === 1) {
                return groupName.map((valor, i) => (
                    (valor.name === 'Motor' || valor.name === 'Modelo' || valor.name === 'Año' || valor.name === 'Marca2' || valor.name === 'Marca' || valor.name === 'Código de Aplicación') && (
                        <div className={handles['FilterDetails--detailsItem']} key={`${valor.name}-${valor.value}-${i}`}>
                            <p className={handles['FilterDetails--text-1']}>{valor.name}</p>
                            <p className={handles['FilterDetails--text-2']}>{valor.values}</p>
                        </div>  
                    )
                ))
            }

            /// ESTE IF NOS ESTA MOSTRANDO EL RESTO DE LAS ESPECIFICACIONES DEL PRODUCTO
            if(numeroDeGrupo === 2) {
                return groupName.map((valor, i) => (
                    (valor.name !== 'Motor' && valor.name !== 'Modelo' && valor.name !== 'Año' && valor.name !== 'Marca2' && valor.name !== 'Marca' && valor.name !== 'Código de Aplicación') && (
                        <div className={handles['FilterDetails--detailsItem-2']} key={`${valor.name}-${valor.value}-${i}`}>
                            <p className={handles['FilterDetails--text-1']}>{valor.name}</p>
                            <p className={handles['FilterDetails--text-2']}>{valor.values}</p>
                        </div>  
                    )
                ))
            } 

        }

        return null
    }


}

FilterDetails.getSchema = props => {
    return {
        title: 'FilterDetails',
        type: 'object',
        properties: {
            blockClass:{
                title:'BlockClass (dev)',
                type:'object',
                default: props.blockClass,
                islayout:false,
            }

        }
    }
}


FilterDetails.defaultProps = {
    blockClass:""
}

export default FilterDetails