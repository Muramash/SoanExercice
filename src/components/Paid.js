import React, { Component } from "react";

import axios from 'axios';

class Paid extends Component {
    state = {
        result: []
      }
      
    componentDidMount() {
          axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

          axios.get('https://app.soan-test.net/test_front/datas', {
            headers: {

            },
            }).then(function (response) {
              console.log('response is : ' + response.data);
            }).catch(function (error) {
              if (error.response) {
                console.log(error.response.headers);
              } 
              else if (error.request) {
                  console.log(error.request);
              } 
              else {
                console.log(error.message);
              }
            console.log(error.config);
          });
      }

    render() {
        return (
        <div>
            <ul>
                { this.state.result.map(result => <li>{result}</li>)}
            </ul>
        </div>
        );
    }

}


export default Paid;