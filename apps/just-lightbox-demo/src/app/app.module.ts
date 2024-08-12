import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { JustLightboxModule } from 'just-lightbox';
import { HighlightModule, provideHighlightOptions } from 'ngx-highlightjs';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        JustLightboxModule.forRoot({ wheelEnabled: true }),
        HighlightModule,
    ],
    providers: [
        provideHighlightOptions({
            fullLibraryLoader: () => import('highlight.js'),
        }),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
