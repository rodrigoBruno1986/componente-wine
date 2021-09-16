import React, {useContext} from 'react'
import {ProductContext} from 'vtex.product-context'
import styles from './style.css'


const FilterDetails = (props) => {
    
   

    const {product} = useContext(ProductContext);
    
   
    let grupoName = product.properties;
    console.log(grupoName);
    return (
    <div>
        {grupoName.map((el)=>(
            <div className={styles.FilterDetailsContainer}>
                <span>{el.name}</span>
                <span>{el.values[0]}</span>
           </div>
           
          
               
            
            
        ))}
    </div>);
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