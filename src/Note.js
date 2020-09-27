import React from 'react';
import './Note.css';

function getLast4Digits(text){
	let result = "";
	for(let i = text.length - 1; result.length < 4 && i >= 0; i--){
		if(!isNaN(text.charAt(i))){
			result = text.charAt(i) + result;
		}
	}
	return result;
}

class Note extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			answered: props.answered,
			likes: 0,
			likeAlready: false
		}

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event){
		event.preventDefault();
		if(this.state.likeAlready) return;
		this.setState((state, props) => ({
			likes: state.likes + 1,
			likeAlready: true
		}));
	}

	render(){
		let answered = this.state.answered ? "Answered" : "";
		return (
	    <div className={"Note " + answered}>
	      <div className="Nid">{getLast4Digits(this.props.id)}</div>
	      <div className="Item">{this.props.item}</div>
	      <button className="Likes" onClick={this.handleClick}>{this.state.likes}</button>
	    </div>
	  )
	}

}

export default Note;