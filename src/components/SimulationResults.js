import PropTypes from "prop-types";

const SimulationResults = (props) => (

    <div className='simulationResults'>
        {
        Object.keys(props.results).map( (key,index) => 
        <div className='resultRow'>
            { props.results[key]['teams']['home']['name'] } vs { props.results[key]['teams']['away']['name'] }
            <span className='gameScore'>
            { props.results[key]['score']['fulltime']['home'] } - { props.results[key]['score']['fulltime']['away'] }
            </span>
        </div>)
        }
        <div className='totalGoals'> Total Goals: { props.totalGoals }</div>
     </div>
);

SimulationResults.propTypes = {
    results: PropTypes.array
  };

export default SimulationResults;
