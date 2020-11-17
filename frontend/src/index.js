import React from 'react';
import ReactDOM from 'react-dom';
import Personal from './components/Personal';
import Home from './components/Home';
import Work from './components/Work';
import './index.css';
import './style.css';
import { url } from './components/constants';

ReactDOM.render(
  <React.StrictMode>
    <Title />
    <div className="container">
      <Personal />
      <Work />
      <Home />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

function Title(){
  const [stats, setStats] = React.useState({});
  React.useEffect(() => {
    fetch(`${url}`).then(response => response.json()).then(data => setStats(data));
  })
  return <h1>Total {stats.total} Tasks | Completed {stats.completed} | Pending {stats.inCompleted}</h1>;
}