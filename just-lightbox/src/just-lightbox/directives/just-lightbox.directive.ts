import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {JustLightboxService} from '../services';

@Directive({
    selector: '[jLightbox]',
})
export class JustLightboxDirective {
    /**
     * Image source
     *
     * @example
     * // Pass image source to directive input
     * <div sLightbox="path.to.image"></div>
     * // Or use with href or src params
     * <a href="path.to.image" sLightbox></a>
     * <img src="path.to.image" sLightbox>
     * @type {string}
     */
    @Input('jLightbox')
    srcUrl: string;

    /**
     * aria-labelledby attribute
     *
     * @type {string}
     */
    @Input()
    labelledby: string;

    /**
     * aria-describedby attribute
     *
     * @type {string}
     */
    @Input()
    describedby: string;

    constructor(private el: ElementRef, private lightbox: JustLightboxService) {}

    @HostListener('click', ['$event']) onClick(e: any) {
        e.preventDefault();

        this.lightbox.open({
            imageSrc: this.srcUrl || this.el.nativeElement.href || this.el.nativeElement.src,
            labelledby: this.labelledby,
            describedby: this.describedby,
        });
    }
}
