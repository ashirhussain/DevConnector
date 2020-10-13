import React, { Fragment } from 'react'
import spinner from './200.gif'

const Spinner = () => {
    return (
        <Fragment>
       <img src={spinner} style={{width:'120px'}}/>
       </Fragment>
        )
}

export default Spinner;
