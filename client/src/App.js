import "./App.css";

import React, { Component } from "react";

import StaticPage from "./screen/StaticPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <StaticPage />
      </div>
    );
  }

  // render() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <h1 className="App-title">React Express Starter</h1>
  //       </header>
  //       <Customers />
  //     </div>
  //   );
  // }
}

export default App;
