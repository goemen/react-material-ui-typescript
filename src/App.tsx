import * as React from 'react';
import './App.css';
import AppNavBar from './navigation/App.Bar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import blue from '@material-ui/core/colors/blue';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { ActionType } from './actions/Helpers';
import { IUser, ADMIN_ROLE } from './state/User';
import Loading from './components/Loading';
import { UserClaims } from './state/Claims';
import { initializeStore } from './store/Store';
import { firebaseApp } from './firebase-init';
import { TicketDraw } from './state/TicketDraw';
import { Map, List } from 'immutable';
import { groupBy, keys } from 'lodash';
import { ISearchQuery, SearchQuery } from './state/SearchQuery';
import { setDate } from './helpers/misc';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: blue,
    secondary: pink
  }
});

const store = initializeStore(firebaseApp());

class App extends React.Component<{}, { loading: boolean }> {
  public removeAuthListener: firebase.Unsubscribe;
  public removeReservationsListener: firebase.Unsubscribe;
  public state = { loading: true };

  public componentWillMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged(async user => {

      if (user && user.emailVerified) {
        const identity = await user.getIdTokenResult(true);
        const userInfo: IUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          roles: [],
        };

        if (identity && identity.claims) {
          const claims = identity.claims;
          userInfo.claims = new UserClaims(claims);
          if (claims.admin) {
            userInfo.roles.push(ADMIN_ROLE);
          }
        }
        store.dispatch({ type: ActionType.CURRENT_USER, payload: userInfo });
        firebase.firestore().collection('users').doc(user.uid).onSnapshot(snapshot => {
          const data: ISearchQuery = snapshot.data().searchQuery;
          data.fromDate = setDate(data.fromDate);
          data.toDate = setDate(data.toDate);
          console.log(data)
          store.dispatch({type: ActionType.SET_QUERY, payload: new SearchQuery(data)});
        });
        firebase.firestore().collection('draws')
        .where('userId', '==', user.uid).onSnapshot(snapshot => {
          const draws = groupBy(snapshot.docs.map(x => new TicketDraw({id: x.id, ...x.data()})), d => d.eventId);
          const eventIds = keys(draws);
          store.dispatch({type: ActionType.DRAWS, payload: eventIds.reduce(
            (acc: Map<string, List<TicketDraw>>, value: string) => acc.set(value, List<TicketDraw>(draws[value])),
            Map<string, List<TicketDraw>>())})
        });
      }
      setTimeout(() =>
        this.setState({ loading: false }), 2000
      );
    });
  }

  public componentWillUnmount() {
    if (this.removeAuthListener) {
      this.removeAuthListener();
    }
  }

  public render() {
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={theme}>
            {this.state.loading ? (<Loading />) : (<AppNavBar />)}
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
