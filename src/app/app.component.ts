import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CUSTOM_IMAGE_SOURCE, DEFAULT_IMAGES, LINKS, CODE_EXAMPLES} from '../constants';

interface IImages {
    customImageSource: IImage[];
    default: IImage[];
    links: IImage[];
}

interface IImage {
    describedby?: string;
    labelledby?: string;
    thumb?: string;
    src: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    codeExamples = CODE_EXAMPLES;

    images: IImages = {
        customImageSource: CUSTOM_IMAGE_SOURCE,
        default: DEFAULT_IMAGES,
        links: LINKS,
    };
}
