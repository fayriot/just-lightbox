import {UserAgentEnum} from '../models';

export function getUserAgent() {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/android/i.test(userAgent)) {
        return UserAgentEnum.Android;
    }

    if (/iPad|iPhone|iPod/.test(userAgent)) {
        return UserAgentEnum.Ios;
    }

    return null;
}
