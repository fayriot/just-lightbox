import {IJustLightboxOptions} from '../models';

export const justLightboxDefaults: IJustLightboxOptions = {
    containerOffset: {
        vertical: 0,
        horizontal: 0,
    },
    gesturesEnabled: true,
    wheelEnabled: false,
    wheelSensitivity: {
        zoom: 10,
        pan: 5,
    },
};
