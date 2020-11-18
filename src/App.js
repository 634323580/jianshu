import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './common/header'
import Home from './pages/home'
import Detail from './pages/detail/loadable'
import Login from './pages/login'
import Wirte from './pages/wirte'
import store from './store'
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Header/>
          <Route path="/" exact component={Home}></Route>
          <Route path="/detail/:id" exact component={Detail}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/wirte" exact component={Wirte}></Route>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
