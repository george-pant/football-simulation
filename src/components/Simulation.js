import React, { PureComponent } from "react";
import SimulationButton from "./SimulationButton";
import SimulationResults from "./SimulationResults";

export default class Simulation extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            status: 'waiting',
            second:-1,
            totalSeconds:90,
            updateEvery:10,
            totalGoals:0,
            intervalId:null
        };
        this.results=[];
      }
      
      componentDidMount() {
          this.init();
      }

      init = () =>{
        fetch('data.json',{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }).then((response) => response.json()).then((result) => {
          this.results=result;
          this.setState({
            second: 0,
            totalGoals: 0,
          });
        }).catch((error) => {
            console.log(error);
        });
      }

      startSimulation = () => {
        const intervalId = setInterval(() => {
            let currentSecond = this.state.second + this.state.updateEvery;
            this.updateSimulation(currentSecond);
            this.setState({ second:currentSecond });
          },this.state.updateEvery*1000);
        this.setState({ intervalId :intervalId });
        this.setState({ status: 'running' });
      }
      
      updateSimulation = (second) => {
        let randomGame= Math.floor(Math.random() * this.results.length);
        let randomTeam= Math.random() < 0.5?'home':'away';
        this.results[randomGame].score.fulltime[randomTeam]++;
        this.setState({ totalGoals: this.state.totalGoals + 1 });
        
        if(second === this.state.totalSeconds){
          this.stopSimulation();
        }

      }

      stopSimulation = () => {
        clearInterval(this.state.intervalId);
        this.setState({ status: 'finished' });
      }

      restartSimulation = () => {
        this.init();
        this.startSimulation();
      }

      handleSimulationChange = event => {

        if(this.state.status ==='waiting'){
          this.startSimulation();
        }

        if(this.state.status === 'finished'){
          this.restartSimulation();
        }

        if(this.state.status === 'running'){
          this.stopSimulation();
        }
      };

      getButtonText = () => {
        const buttonTexts = {
          'waiting': 'Start', 
          'running': 'Finish',
          'finished': 'Restart',
        };

        return buttonTexts[this.state.status];
      }

      componentWillUnmount(){
        if(this.state.intervalId) clearInterval(this.state.intervalId);
      }
    
render() {
    return (
      <div className='simulationContainer'>
        <SimulationButton
        onClickSimulate={this.handleSimulationChange}
        text={ this.getButtonText() }
        />
        <SimulationResults 
        results={ this.results } 
        totalGoals= { this.state.totalGoals }
        />
      </div>
    );
  }

}
