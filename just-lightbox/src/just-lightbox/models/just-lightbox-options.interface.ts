export interface IJustLightboxOptions {
    containerOffset?: IJustLightboxContainerOffset;
    gesturesEnabled?: boolean;
    wheelEnabled?: boolean;
    wheelSensitivity?: IJustLightboxWheelSensitivity;
}

export interface IJustLightboxContainerOffset {
    vertical?: number;
    horizontal?: number;
}

export interface IJustLightboxWheelSensitivity {
    zoom: number;
    pan: number;
}
