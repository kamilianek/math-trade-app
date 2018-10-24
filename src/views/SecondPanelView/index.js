import React from 'react';
import MainContainer from '../../components/MainContainer';

class SecondPanelView extends React.Component {
  render() {
    console.log('now inside Second');
    return (
      <MainContainer>
        <h1>Inside SeconPanel</h1>
      </MainContainer>
    );
  }
}

export default SecondPanelView;
