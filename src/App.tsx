import React, {useEffect, useState} from 'react';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
// import Money from 'views/Money';
// import Money from 'components/NewMoney';
// import Statistics from 'views/Statistics';
// import Tags from 'views/Tags';
import NoMatch from 'views/NoMatch';
// import {Tag} from 'views/Tag';
import theme from 'theme';
import Summary from 'views/Summary';
import Settings from 'views/Settings';
import Analysis from 'views/Analysis';
import EditRecord from './views/EditRecord';

type TAppWrapper = {
  height: number
}

const AppWrapper = styled.div<TAppWrapper>`
  position: relative;
  max-width: 480px;
  margin: 0 auto;
  background: #EDEDED;
  height: ${props => props.height + 'px'};
`;

const App: React.FC = () => {
  const [height, setHeight] = useState(window.innerHeight);

  const onResize = () => {
    setHeight(window.innerHeight * 0.01);
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return window.removeEventListener('resize', onResize);
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppWrapper height={height}>
          <Switch>
            {/*<Route exact path="/tags">*/}
            {/*  <Tags/>*/}
            {/*</Route>*/}
            {/*<Route exact path="/tags/:id">*/}
            {/*  <Tag/>*/}
            {/*</Route>*/}
            <Route exact path="/">
              <Summary/>
            </Route>
            <Route exact path="/analysis">
              <Analysis/>
            </Route>
            <Route exact path="/settings">
              <Settings/>
            </Route>
            <Route exact path="/record/:id">
              <EditRecord/>
            </Route>
            {/*<Route exact path="/statistics">*/}
            {/*  <Statistics/>*/}
            {/*</Route>*/}
            {/*<Redirect exact from="/" to="/summary"/>*/}
            <Route path="*">
              <NoMatch/>
            </Route>
          </Switch>
        </AppWrapper>
      </Router>
    </ThemeProvider>
  );
};

export default App;
