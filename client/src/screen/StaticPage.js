import "antd/lib/date-picker/style/css";

import React from "react";

import { Col, Row } from "react-flexbox-grid";
import { Input, Button, Card } from "antd";

import ReactList from "react-list";

const { TextArea } = Input;
export default class StaticPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      message: "",
      selectedIndex: 0,
      open: false,
      threadbits: [],
      desc: "",
      name: ""
    };
  }

  componentDidMount() {
    this.getAllTaksApi();
  }

  _getData(_numbers) {
    return (
      <p className="App-intro">
        {_numbers.map((item, i) => (
          <li className="item" key={i}>
            {item}
          </li>
        ))}
      </p>
    );
  }

  _handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  getAllTaksApi() {
    var urlAllTodos = "http://localhost:5000/todos#";
    console.log(urlAllTodos);
    fetch(urlAllTodos)
      .then(res => res.json())
      .then(res => {
        console.log(JSON.stringify(res));

        this.setState({
          loading: false,
          threadbits: [...this.state.threadbits, ...res]
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  _renderItem(index) {
    // console.log("list", index);
    let _thread = this.state.threadbits[index];

    return (
      <Card style={{ margin: 5 }} key={_thread._id}>
        <p>
          {_thread.name} => {_thread.description}
        </p>
      </Card>
    );
  }

  _onCreate1() {
    console.log(this.state.name);
    console.log(this.state.desc);
  }

  _onCreate() {
    if (this.state.name === "") return;
    if (this.state.desc === "") return;

    let params = {
      name: this.state.name,
      description: this.state.desc,
      completed: false
    };

    var formBody = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    let fetchData = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: formBody
    };

    var urlAllTodos = "http://localhost:5000/todos";

    fetch(urlAllTodos, fetchData)
      .then(res => res.json())
      .then(res => {
        console.log(res);

        this.setState({
          loading: false,
          threadbits: [...this.state.threadbits, res]
        });

        this.setState({ name: "" });
        this.setState({ desc: "" });
      })
      .catch(error => {
        console.log(error);
      });
  }

  _addNewTodoUI() {
    return (
      <Card style={{ margin: 10 }}>
        <div style={{ margin: 10 }}>
          <Row style={{ margin: 10 }}>
            <Input
              id="name"
              placeholder="name"
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
              margin="normal"
            />
          </Row>

          <Row style={{ margin: 10 }}>
            <TextArea
              rows={4}
              id="desc"
              placeholder="description"
              value={this.state.desc}
              onChange={event => this.setState({ desc: event.target.value })}
            />
          </Row>
          <Row style={{ margin: 10 }}>
            <Button type="primary" onClick={this._onCreate.bind(this)}>
              Create
            </Button>
          </Row>
        </div>
      </Card>
    );
  }

  render() {
    // console.log(JSON.stringify(this.state.message));
    return (
      <div>
        <Row>
          <Col xs>{this._addNewTodoUI()}</Col>
          <Col xs>
            <ReactList
              itemRenderer={(column, key) => this._renderItem(column)}
              length={this.state.threadbits.length}
              type="uniform"
              pageSize={1}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
