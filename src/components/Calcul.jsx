import React, { Component } from 'react'
import '../App.css';
export default class Calcul extends Component {

    state={
        distance:0,
        poids:0,
        mode_transport:"normal",
        cout_total:""
    }

    handleChange = (e) => {
      
      const name = e.target.name;
      const value = e.target.value;
      // const type = e.target.type;
      // const value = type === 'checkbox' ? e.target.checked : e.target.value;
      // this.setState({ [name]: type === 'checkbox' ? e.target.checked : value });
      this.setState({[name]:value})
    };

    handleOnchangeRadio = (e)=>
    {
      let cout =0;
      cout = this.state.poids<10? this.state.distance * 0.5: this.state.distance *0.3*this.state.poids/10

      if(e.target.value === "normal")
      {
        this.setState({cout_total:cout, mode:"normal"}); 
      }
      else
      {
        this.setState({cout_total:cout*1.2, mode:"express"});
        
      }
    }
    handleClick = (e) =>{
      e.preventDefault();
      if (e.target.type==='radio')
        this.handleChange(e);

      if (this.state.poids === 0 || this.state.distance === 0)
      {
        alert("Veuillez remplir tous les champs");
      }
      else if (this.state.poids < 10 && this.state.mode_transport=== 'normal')
      {
        this.setState({cout_total:(this.state.distance * 0.5,2).toFixed(2)});
      }
      else if (this.state.poids > 10 && this.state.mode_transport=== 'normal')
      {
        this.setState({cout_total:(this.state.distance*(this.state.poids/10)*0.3).toFixed(2)});
      }
      else if (this.state.poids < 10 && this.state.mode_transport=== 'express')
      {
        this.setState({cout_total:((this.state.distance * 0.5)+(this.state.distance * 0.5*0.2)).toFixed(2)});
      }
      else if (this.state.poids > 10 && this.state.mode_transport=== 'express')
      {
        this.setState({cout_total:((this.state.distance*(this.state.poids/10)*0.3)+((this.state.distance*(this.state.poids/10)*0.3)*0.2)).toFixed(2)});
      }

    }

  render() {
    return (
      <div> 
            <form action="" onSubmit={this.handleClick}>
                <label>
                        Distance en KM:
                        <input type="number" name="distance" value={this.state.distance}  onChange={this.handleChange}/> <br/>
                </label>
                <label>
                        Poids en KG:
                        <input type="number" name="poids" value={this.state.poids}  onChange={this.handleChange}/> <br/>
                </label>
                <label>
                        Mode de transport:
                        <input type="radio" name="mode_transport"  value="normal" onChange={this.handleOnchangeRadio} checked={this.state.mode_transport==="normal"} />Normal 
                        <input type="radio" name="mode_transport"  value="express" onChange={this.handleOnchangeRadio}  checked={this.state.mode_transport==="express"} />Express <br/>
                </label>
                <input type="submit" value='Calculer' onClick={this.handleClick} /> <br/>
                <label> 
                        Cout total en DH:
                        <input type="number" name="cout_total" value={this.state.cout_total} readOnly />
                </label>
            </form>
      </div>
    )
  }
}
