import React from 'react';
import MainContainer from '../../components/MainContainer';

class MainPanelView extends React.Component {
  render() {
    console.log('now inside MainPanel');
    return (
      <MainContainer>
        <h1>Inside MainPanel</h1>
      </MainContainer>
    );
  }
}

export default MainPanelView;
