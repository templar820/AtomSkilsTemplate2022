import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { inject, observer } from 'mobx-react';
import {StoresNames} from "@/stores/StoresNames";

const Loader: React.FC<any> = (props) => {
    const loaderStore = props[StoresNames.LoaderStore];

    return loaderStore.isLoader
      ? <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
        <CircularProgress size={80} />
      </div>
      : props.children;
}

export default inject(StoresNames.LoaderStore, 'services')(observer(Loader));
