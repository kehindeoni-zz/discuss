import React, { Component } from 'react';
import HomePageContainer from './containers/HomePageContainer';
import CampaignChatPageContainer from './containers/CampaignChatPageContainer';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={HomePageContainer} />
            <Route path="/discussion/:id" component={CampaignChatPageContainer} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
