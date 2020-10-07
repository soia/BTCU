import React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { compose } from '../../../../utils';
import style from './personal-area.module.scss';

const PersonalAreaView = () => (
    <div className={style.container}>
        <div className={style.wrapper}>
            <Switch>

            </Switch>
        </div>
    </div>
);

export default compose(withRouter)(PersonalAreaView);
