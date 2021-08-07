import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JustLightboxService} from './services';
import {JustLightboxDirective, JustLightboxGesturesDirective} from './directives';
import {JUST_LIGHTBOX_OPTIONS} from './tokens';
import {LightboxComponent} from './components/lightbox/lightbox.component';
import {justLightboxDefaults} from './constants';
import {IJustLightboxOptions} from './models';

const COMPONENTS = [LightboxComponent];
const DIRECTIVES = [JustLightboxDirective, JustLightboxGesturesDirective];

@NgModule({
    imports: [CommonModule],
    declarations: [COMPONENTS, DIRECTIVES],
    exports: [COMPONENTS, DIRECTIVES],
    providers: [JustLightboxService],
})
export class JustLightboxModule {
    static forRoot(options: IJustLightboxOptions = {}): ModuleWithProviders<JustLightboxModule> {
        return {
            ngModule: JustLightboxModule,
            providers: [
                {
                    provide: JUST_LIGHTBOX_OPTIONS,
                    useValue: {
                        containerOffset:
                            options.containerOffset || justLightboxDefaults.containerOffset,
                        gesturesEnabled:
                            options.gesturesEnabled || justLightboxDefaults.gesturesEnabled,
                        wheelEnabled: options.wheelEnabled || justLightboxDefaults.wheelEnabled,
                        wheelSensitivity:
                            options.wheelSensitivity || justLightboxDefaults.wheelSensitivity,
                    },
                },
            ],
        };
    }
}
