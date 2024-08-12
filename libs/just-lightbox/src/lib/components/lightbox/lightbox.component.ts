import { DOCUMENT } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { IJustLightboxOptions } from '../../models';
import { JUST_LIGHTBOX_OPTIONS } from '../../tokens';

const DOCUMENT_CLASS_OPEN = 'j-lightbox__open';
const DOCUMENT_SCROLL_EVENTS = ['touchMove', 'DOMMouseScroll', 'wheel'];

@Component({
    selector: 'app-lightbox',
    templateUrl: './lightbox.component.html',
    styleUrls: ['./lightbox.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'j-lightbox',
    },
})
export class LightboxComponent implements OnInit, OnDestroy {
    private _document?: Document;

    @ViewChild('lightboxImage') image: ElementRef | undefined;

    close$ = new EventEmitter();

    imageSrc: string | undefined;
    labelledby: string | undefined;
    describedby: string | undefined;

    loaded: boolean = false;

    constructor(
        @Inject(DOCUMENT) public document: any,
        @Inject(JUST_LIGHTBOX_OPTIONS) private options: IJustLightboxOptions,
    ) {
        this._document = document as Document;
    }

    @HostListener('click')
    @HostListener('document:keyup.escape')
    onClose() {
        this.close();
    }

    ngOnInit() {
        this.disableScroll();
    }

    onImageLoad(event: any) {
        if (event?.target) {
            const x = event.target.x;
            const y = event.target.y;
            if (x === 0 && y === 0) {
                // const width = event.target.width;
                // const height = event.target.height;
                // const portrait = height > width;
                // console.log('Loaded: ', width, height, 'portrait: ', portrait);

                this.loaded = true;
                this.renderImage(event.target.width, event.target.height);
            }
        }
    }

    close() {
        this.close$.next(true);
    }

    ngOnDestroy() {
        this.enableScroll();
    }

    private renderImage(width: number, height: number) {
        if (!width) {
            return;
        }

        const clientWidth = this._document?.documentElement.clientWidth;
        const clientHeight = this._document?.documentElement.clientHeight;
        const lightboxImageStyle = this.image?.nativeElement.style;
        const widthOffset = this.options.containerOffset!.horizontal! * 2;
        const heightOffset = this.options.containerOffset!.vertical! * 2;

        // TODO parse relative units
        if (
            width >= clientWidth! - widthOffset ||
            height >= clientHeight! - heightOffset
        ) {
            lightboxImageStyle.maxWidth = `calc(100vw - ${widthOffset}px)`;
            lightboxImageStyle.maxHeight = `calc(100vh - ${heightOffset}px)`;
        }

        lightboxImageStyle.backgroundImage = this.imageSrc;
        lightboxImageStyle.display = 'block';
    }

    private disableScroll() {
        // Disable scrolling in Safari
        DOCUMENT_SCROLL_EVENTS.forEach((event) => {
            //@ts-ignore
            this._document.addEventListener(event, this.preventDefault, {
                passive: false,
            });
        });

        this._document?.body.classList.add(DOCUMENT_CLASS_OPEN);
    }

    private enableScroll() {
        DOCUMENT_SCROLL_EVENTS.forEach((event) => {
            //@ts-ignore
            this._document.removeEventListener(event, this.preventDefault);
        });

        this._document?.body.classList.remove(DOCUMENT_CLASS_OPEN);
    }

    private preventDefault(rawEvent: TouchEvent) {
        rawEvent.preventDefault();
        return false;
    }
}
