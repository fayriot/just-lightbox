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
import {DOCUMENT} from '@angular/common';
import {JUST_LIGHTBOX_OPTIONS} from '../../tokens';
import {IJustLightboxOptions} from '../../models';

const DOCUMENT_CLASS_OPEN = 'j-lightbox__open';
const DOCUMENT_SCROLL_EVENTS = ['touchmove', 'DOMMouseScroll', 'wheel'];

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
    private _document?: HTMLDocument;

    @ViewChild('lightboxImage') lightboxImage: ElementRef;

    close$ = new EventEmitter();

    imageSrc: string;
    labelledby: string;
    describedby: string;

    loaded: boolean;

    constructor(
        @Inject(DOCUMENT) public document: any,
        @Inject(JUST_LIGHTBOX_OPTIONS) private options: IJustLightboxOptions,
    ) {
        this._document = document as HTMLDocument;
    }

    @HostListener('click') onClick() {
        this.close();
    }

    @HostListener('document:keyup.escape') onKeyupEscape() {
        this.close();
    }

    ngOnInit() {
        this.disableScroll();
    }

    onImageLoad(event) {
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
        this.close$.next();
    }

    ngOnDestroy() {
        this.enableScroll();
    }

    private renderImage(width: number, height: number) {
        if (!width) {
            return;
        }

        const clientWidth = this._document.documentElement.clientWidth;
        const clientHeight = this._document.documentElement.clientHeight;
        const lightboxImageStyle = this.lightboxImage.nativeElement.style;
        const widthOffset = this.options.containerOffset.horizontal * 2;
        const heightOffset = this.options.containerOffset.vertical * 2;

        // TODO parse relative units
        if (width >= clientWidth - widthOffset || height >= clientHeight - heightOffset) {
            lightboxImageStyle.maxWidth = `calc(100vw - ${widthOffset}px)`;
            lightboxImageStyle.maxHeight = `calc(100vh - ${heightOffset}px)`;
        }

        lightboxImageStyle.backgroundImage = this.imageSrc;
        lightboxImageStyle.display = 'block';
    }

    private disableScroll() {
        // Disable scrolling in Safari
        DOCUMENT_SCROLL_EVENTS.forEach(event => {
            this._document.addEventListener(event, this.preventDefault, {passive: false});
        });

        this._document.body.classList.add(DOCUMENT_CLASS_OPEN);
    }

    private enableScroll() {
        DOCUMENT_SCROLL_EVENTS.forEach(event => {
            this._document.removeEventListener(event, this.preventDefault);
        });

        this._document.body.classList.remove(DOCUMENT_CLASS_OPEN);
    }

    private preventDefault(rawEvent: TouchEvent) {
        rawEvent.preventDefault();
        return false;
    }
}
