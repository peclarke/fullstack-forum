import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';

import Register from './Register';
import Login from './Login';
import Homepage from './Homepage';
import NoPage from './NoPage';
import Test from './Test';
import ThreadBody from './ThreadBody';
import WriteThread from './WriteThread';

/**
 * Currently using this library of componenets (mui):
 * https://mui.com/components/
 */


function App() {
  /*const threadsAtom = atom({
    0: { title: 'My first thread!', author: 'filezdude', fav: false, replies: 5, seen: true, date: '2021-03-31' },
    1: { title: 'My pet dog is very cute', author: 'haze', fav: true, replies: 2, seen: false, date: '2021-03-30' },
    2: { title: 'Timeline on next project', author: 'desmondthemoonbear', fav: false, replies: 0, seen: false, date: '2021-03-30' },
    3: { title: 'Taking some leave...', author: 'bob', fav: false, replies: 3, seen: true, date: '2021-03-29' }
  });

  const [threads, setThreads] = useAtom(threadsAtom);*/

  /*const [threads, setThreads] = useState({

    0: { title: 'My first thread!', author: 'filezdude', fav: false, replies: 5, seen: true, date: '2021-03-31'},
    1: { title: 'My pet dog is very cute', author: 'haze', fav: true, replies: 2, seen: false, date: '2021-03-30' },
    2: { title: 'Timeline on next project', author: 'desmondthemoonbear', fav: false, replies: 0, seen: false, date: '2021-03-30' },
    3: {title: 'Taking some leave...', author: 'bob', fav: false, replies: 3, seen: true, date: '2021-03-29'}
  })

  function favClick(id) {
    setThreads(
      threads[id]['fav'] = !threads[id]['fav']
    );
    console.log(id);
  }*/

  return (
    <Provider store={store}>
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Homepage />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="test" element={<Test />} />
            <Route path="*" element={<NoPage />} />
            <Route path="threads/:id" element={<ThreadBody />}/>
            <Route path="new" element={<WriteThread />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
      </header>
    </div>
    </Provider>
  );
}

export default App;
