import type {
    RequestSignatures,
    TransportRequestMessage,
} from 'metadot-extension-base/background/types';
import type { Message } from 'metadot-extension-base/types';

import { MESSAGE_ORIGIN_CONTENT } from 'metadot-extension-base/defaults';
import {
    enable,
    handleResponse,
    redirectIfPhishing,
} from 'metadot-extension-base/page';
import { injectExtension } from '@polkadot/extension-inject';

// setup a response listener
// (events created by the loader for extension responses)
window.addEventListener('message', ({ data, source }: Message): void => {
    // only allow messages from our window, by the loader
    if (source !== window || data.origin !== MESSAGE_ORIGIN_CONTENT) {
        return;
    }

    if (data.id) {
        handleResponse(
            data as TransportRequestMessage<keyof RequestSignatures>
        );
    } else {
        console.error('Missing id for response.');
    }
});

function inject(): void {
    injectExtension(enable, {
        name: 'polkadot-js',
        version: process.env.PKG_VERSION as string,
    });
}

redirectIfPhishing()
    .then((gotRedirected) => {
        if (!gotRedirected) {
            inject();
        }
    })
    .catch((e) => {
        console.warn(
            `Unable to determine if the site is in the phishing list: ${
                (e as Error).message
            }`
        );
        inject();
    });
