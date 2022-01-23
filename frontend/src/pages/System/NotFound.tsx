import { ArrowBackOutlined } from '@material-ui/icons';
import React from 'react';
import { withRouter } from 'react-router-dom';
import colors from '@styles/colors.modules.scss';
import {useHistory} from 'react-router-dom';

const NotFound: React.FC = () => {
  const history = useHistory();
  return (
    <div className="maxSize Auth notFound">
      <a className="goBack" onClick={() => { history.push('/'); }}>
        <ArrowBackOutlined style={{ color: colors.black }} fontSize="large" />
      </a>
      <form>
        <h1>
          404!
        </h1>
        <span className="logo">Извините, такой страницы не существует</span>
        <div className="inputForm">
          <button type="button" onClick={() => history.push('/')}>Перейти на главную страницу</button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(NotFound);
