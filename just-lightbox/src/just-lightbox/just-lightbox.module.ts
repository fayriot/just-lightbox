import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JustLightboxService} from './services';
import {JustLightboxDirective} from './directives';
import {JUST_LIGHTBOX_OPTIONS} from './tokens';
import {LightboxComponent} from './components/lightbox/lightbox.component';
import {justLightboxDefaults} from './constants';
import {IJustLightboxOptions} from './models';

@NgModule({
    imports: [CommonModule],
    declarations: [LightboxComponent, JustLightboxDirective],
    exports: [LightboxComponent, JustLightboxDirective],
    entryComponents: [LightboxComponent],
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
                    },
                },
            ],
        };
    }
}
