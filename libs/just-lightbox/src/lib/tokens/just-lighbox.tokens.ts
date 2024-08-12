import {InjectionToken} from '@angular/core';
import {IJustLightboxOptions} from '../models';

export const JUST_LIGHTBOX_OPTIONS: InjectionToken<IJustLightboxOptions> = new InjectionToken<IJustLightboxOptions>(
    'JUST_LIGHTBOX_OPTIONS',
);
