
import React, {Context, useEffect} from 'react';

import {FileManager, FileNavigator} from '@opuscapita/react-filemanager';

import connectorNodeV1 from '@opuscapita/react-filemanager-connector-node-v1';
let apiOptions = {
    ...connectorNodeV1.apiOptions,
    apiRoot: process.env.FILE_SERVER_ENDPOINT || 'http://localhost:3020'
}

interface InterfaceFM {
    id: string;
}

export function startPreviewListeners() {
    setTimeout(() => {
        const container = document.querySelector('#filemanager-1')
        container.addEventListener("mouseover", (e) => {
            if (e.target.classList.contains('oc-fm--name-cell__title')) {
                let path = '';
                document.querySelectorAll('.oc-fm--location-bar__item-name').forEach((value, key) => {
                    if (key === 0) return
                    path += path ? '/' + value.textContent : value.textContent;
                });

                if (!path | !e.target.textContent.includes('.')) return;

                path += '/' + e.target.textContent;

                const img = `<img class="imgPreview" src=${process.env.FILE_CLIENT_SRC + path} width="300" style="position: fixed; right: 0; max-height: 300px; z-index: 200;"/>`;

                container.insertAdjacentHTML('beforeend', img);
            }
        });

        container.addEventListener("mouseout", (e) => {
            document.querySelectorAll('.imgPreview').forEach(e => e.remove())
        });
    }, 2500);

}

const FileManagerPage = () => {

    useEffect(() => {
        startPreviewListeners();
    })

    return <div style={{ height: '480px' }}>
    <FileManager>
        <FileNavigator
            id="filemanager-1"
    api={connectorNodeV1.api}
    apiOptions={apiOptions}
    capabilities={connectorNodeV1.capabilities}
    listViewLayout={connectorNodeV1.listViewLayout}
    viewLayoutOptions={connectorNodeV1.viewLayoutOptions}
    />
    </FileManager>
    </div>
}

export default FileManagerPage;
