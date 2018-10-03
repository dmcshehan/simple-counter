import React, { Component } from 'react';
import './App.css';
import { createStore } from 'redux';
import { Provider, connect} from 'react-redux';

//action types
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

//action creator
const incrementNum = () =>{
  return{
    type : INCREMENT
  }
}
const decrementNum = () =>{
  return{
    type : DECREMENT
  }
}

//reducer
const counterAction = (state = 0,action) =>{

  switch(action.type){
    case INCREMENT :
      return state+1;

    case DECREMENT :
      return state-1;

    default:
      return state;
  }

}


const store = createStore(counterAction);

const mapStateToProps =(state) =>{
  return {
    count : state
  }
}

const mapDispatchToProps =(dispatch) =>{

    return {
      incrementCounter: () => {
        dispatch(incrementNum())
      },
      decrementCounter: () => {
        dispatch(decrementNum())
      }
    }

}

class Counter extends Component {

  constructor(props){
    super(props);

    this.drcrementHandler = this.drcrementHandler.bind(this);
    this.incrementHandler = this.incrementHandler.bind(this);
  }

  incrementHandler(){
    this.props.incrementCounter();
  }

  drcrementHandler(){
    this.props.decrementCounter();
  }

  render() {
    return (
      <div className="counter">
        <button onClick={this.incrementHandler}>Increment</button>
        <h1>{this.props.count}</h1>
        <button onClick={this.drcrementHandler}>Decrement</button>
      </div>
    );
  }
}


const Container = connect(mapStateToProps, mapDispatchToProps)(Counter);



class CounterWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container/>
      </Provider>
    );
  }
};


export default CounterWrapper;
