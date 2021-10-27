'use strict';

const e = React.createElement;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return e('h1', {},'cluutch prices')
  }
}

const domContainer = document.querySelector('#home_page_container');
ReactDOM.render(e(HomePage), domContainer);