import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Note from './Note.js'
import './Pinboard.css';


class Pinboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      note: "",
      notelist: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAllNotes = this.getAllNotes.bind(this);

  }

  componentDidMount(){
    this.getAllNotes();
  }

  getAllNotes(){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(process.env.REACT_APP_PINBOARD_API, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        var json = JSON.parse(result);
        if(Array.isArray(json)){
          this.setState({notelist: json});
        }
      })
      .catch(error => {
        console.log('error', error)
      });  
  }

  handleChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event){
    event.preventDefault();
    if(this.state.note.length <= 3) return;
    let id = uuidv4();
    let note = {id: id, note: this.state.note, likes: 0, answered: false};
    this.setState((state, props) => ({
      notelist: state.notelist.concat(note),
      note: ""
    }));
  }

  render(){
    return (
      <div className="PinBoard">
        <h2>{this.props.name}</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="note" value={this.state.note} onChange={this.handleChange} />
        </form>
        <div className="NoteList">
          {this.state.notelist.map((item) => 
            <Note key={item.id} 
              id={item.id} 
              item={item.note} 
              like={item.likes} 
              answered={item.answered} 
            />
          )}
        </div>
      </div>
    );
  }
}

export default Pinboard;
