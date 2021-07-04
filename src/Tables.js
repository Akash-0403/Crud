import React, {Component} from 'react';
import axios from 'axios';

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      click: 'false',
    }
  }
  render() {
    return(
      <button onClick={()=>this.props.func(this.props.id)}>{this.props.name}</button>

    )
  }
}
class Cols extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: this.props.data,
    }
  }
  render() {
    return(
      <td onKeyUp={(event) => {
          this.setState({data: event.target.textContent});
          this.props.returnData(this.props.name, event.target.textContent);
        }}
          contenteditable={this.props.editable}
          className={this.props.class}>
        {this.props.data}</td>
    );
  }
}
class CreateTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameEditButton: "Edit",
      classes: "class1",
      editable: "false",
      text: "",
      sendingData: {
        name: this.props.dbString.data?.name,
        email: this.props.dbString.data?.email,
        phone: this.props.dbString.data?.phone},
    }
  }
  isCoolDown = false;
  /**
   * param {id} String;
   * param {name} String ;
   * param {mail} String ;
   * param {phone} String ;
   * Update DataBase and show information.
   */
  makeDataForSend = (key,input) => {
    switch(key) {
      case "name":
        this.setState({sendingData: {
          name: input,
          email: this.state.sendingData.email,
          phone: this.state.sendingData.phone,
        }});
        break;
      case "email":
        this.setState({sendingData: {
          name: this.state.sendingData.name,
          email: input,
          phone: this.state.sendingData.phone,
        }});
        break;
      case "phone":
        this.setState({sendingData: {
          name: this.state.sendingData.name,
          email: this.state.sendingData.email,
          phone: input,
        }});
        break;
    }
  }
  updateDb = (id,name,email,phone) => {
    axios.post(`http://178.128.196.163:3000/api/records/${id}`, {data:
      {
        name,
        email,
        phone,
      }
    }
    )
  .then(res => {
    console.log(res);
    console.log(res.data);
  })
    this.props.updater();
  }

  setEdit = (id) => {
    if(!this.isCoolDown){
      this.setState({nameEditButton: "Save"});
      this.setState({editable: "true"});
      this.setState({classes: "class2"});
      this.isCoolDown = true;
    } else {
      this.setState({nameEditButton: "Edit"});
      this.setState({editable: "false"});
      this.setState({classes: "class1"});
      this.isCoolDown = false;
      this.updateDb(id,this.state.sendingData.name,this.state.sendingData.email,this.state.sendingData.phone);
    }
  }

  render(){
    return(
      <>
      <tr>
      <Cols class={this.state.classes}
            name = "id"
            returnData = {this.makeDataForSend}
            data={this.props.dbString?._id ? this.props.dbString._id : ``}
            maxLength="11"
            editable= "false"
            />
      <Cols class={this.state.classes}
            name = "name"
            returnData = {this.makeDataForSend}
            data={this.props.dbString.data?.name ? this.props.dbString.data.name : ``}
            maxLength="11"
            editable={this.state.editable}
            />
      <Cols class={this.state.classes}
            name = "email"
            returnData = {this.makeDataForSend}
            data={this.props.dbString.data?.email ? this.props.dbString.data.email : ``}
            maxLength="11"
            editable={this.state.editable}
                  />
      <Cols class={this.state.classes}
            name = "phone"
            returnData = {this.makeDataForSend}
            data={this.props.dbString.data?.phone ? this.props.dbString.data.phone : ``}
            maxLength="11"
            editable={this.state.editable}
                  />
        <div>
          {this.props.remove}
          <Buttons name={this.state.nameEditButton}
                   id={this.props.dbString._id}
                   func={this.setEdit} />
        </div>
      </tr>
      </>
    );
  }
}
class MainTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tables: this.props.table,
      editable: "false",
      classes: "class1",
    }
}
  names = []
  render() {
    /**
     * param {id} String;
     * Remove record from DataBase.
     */
    const remover = (id) => {
        fetch(`http://178.128.196.163:3000/api/records/${id}`,{
          method: `DELETE`,
        }).then(res => {
          if(!res.ok) throw Error(res.statusText);
          return res.json();
        }).then(data=>console.log(`All Rigth! Delete: ${data}`)).catch(error => console.log(error));
    }
    /**
     * param {id} String;
     * Edit DataBase
     */
    const buttonRemove = function(id) {
      return (<button onClick={()=>remover(id)}>Remove</button>);
    }
    this.props.updater();
      return(
        <>
        <table>
          <tbody>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>EMail</td>
            <td>Phone</td>
          </tr>
          {
            this.props.table.map((element,index) => <CreateTable updater={this.props.updater}
            id = {element._id}
            classes = {this.state.classes}
            dbString = {element}
            remove = {buttonRemove(element._id)}
            edit = ''/>
          )
          }
          </tbody>
       </table>
       </>
     );
  }
}

export default MainTable;
