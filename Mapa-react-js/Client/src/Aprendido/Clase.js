import { Component } from "react";

export default class Clase extends Component {

    constructor(props) {
        super(props)
        this.state ={
            name : ''
        };
        console.log(this.props.paramInventado);
    }

    componentDidMount () {
        this.setState({
            name: 'texto despues del render(): '+this.props.paramInventado
        })
    }

    render(){
        return (
            <h1 id="h11">{this.state.name}</h1>
        );
    }
}