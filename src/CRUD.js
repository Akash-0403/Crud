import React, { Component } from 'react';
import './CRUD.css';
import MainTable from './Tables';
import Form from './Inputs';

const ipConnect = `http://178.128.196.163:3000/api/records/`;
let dataBase = [];
class CRUD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: [],
    }
  }
  /**
   * No param.
   * Function for update component and get information from DataBase
   */
   showAll = () => {
    fetch(ipConnect,{
      method: 'GET',
    }).then(res => {
      if(!res.ok) throw Error(res.statusText);
      return res.json();
    }).then(json => {
      dataBase = json;
      this.setState(({tables}) => ({tables: dataBase.map(item=>item)}));
    })
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="mainTable">
          <div className="inputConteiner">
              <Form ip={ipConnect} nameButton="Create" updater={this.showAll}/>
          </div>
          <div className="tableConteiner">
            <h2 className="tableName">Users from DataBase</h2>
            <MainTable ipConnect={ipConnect} updater={this.showAll} table={this.state.tables} />
          </div>
      </div>
      );
    }
  }

export default CRUD;
