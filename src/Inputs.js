import React, {Component} from 'react';

class Form extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      }
    }
    render() {
      /**
       * param {e} Object;
       */
      const makeJSON = (e) => {
        e.preventDefault();
        fetch(`${this.props.ip}`,{
          method: `PUT`,
          headers: {
          'Content-type': 'application/json; charset=UTF-8' 
          },
          body: JSON.stringify({
            data: {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            }
          })
        }).then(res => {
          if(!res.ok) throw Error(res.statusText);
          return res.json();
        }).then(data => console.log(data)).catch(error => console.log("ERROR!"));
        this.props.updater();
      }

      return(
        <form>
           <p> Name / Email / Phone </p>
           <Input id='name'
                  value={this.state.name}
                  changed={(event) => this.setState({ name : event.target.value })}
                  type='text'
                  maxLength='10'/>
           <Input id='email'
                  value={this.state.email}
                  changed={(event) => this.setState({ email : event.target.value })}
                  type='text'
                  maxLength='10'/>
           <Input id='phone'
                  value={this.state.phone}
                  changed={(event) => this.setState({ phone : event.target.value })}
                  type='text'
                  maxLength='11'/>
           <button onClick={makeJSON}>{this.props.nameButton}</button>
        </form>
      );
    }
  }

class Input extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return(
      <input id={this.props.id}
             maxLength={this.props.maxLength}
             onChange={this.props.changed}
             type={this.props.type}></input>

    );
  }
}

export default Form;
