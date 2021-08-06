import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {JustLightboxModule} from '../../just-lightbox';

import {HighlightModule, HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, JustLightboxModule.forRoot(), HighlightModule],
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                fullLibraryLoader: () => import('highlight.js'),
            },
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
