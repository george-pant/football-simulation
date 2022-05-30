import React from "react";
import PropTypes from "prop-types";


const SimulationButton = (props) => {

    return(
    <div className='simulationButtonContainer'>
        <button 
            className="simulationButton"
            onClick={ props.onClickSimulate }>
            { props.text }
        </button>
     </div>
    )
}


SimulationButton.propTypes = {
    onClickSimulate: PropTypes.func
  };


export default SimulationButton;
