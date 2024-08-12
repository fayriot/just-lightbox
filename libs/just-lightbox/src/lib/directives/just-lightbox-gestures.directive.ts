import { Directive, ElementRef, HostListener, Inject } from '@angular/core';
import { IJustLightboxOptions, UserAgentEnum } from '../models';
import { JUST_LIGHTBOX_OPTIONS } from '../tokens';
import { getUserAgent } from '../utils';

@Directive({
    selector: '[jLightboxGestures]',
})
export class JustLightboxGesturesDirective {
    tx = 0;
    ty = 0;
    scale = 1;
    lastGestureX = 0;
    lastGestureY = 0;
    lastGestureScale = 1.0;
    initialTouches: any = null;

    constructor(
        @Inject(JUST_LIGHTBOX_OPTIONS) private options: IJustLightboxOptions,
        private el: ElementRef,
    ) {}

    @HostListener('gesturestart', ['$event'])
    @HostListener('gesturechange', ['$event'])
    @HostListener('gestureend', ['$event'])
    handleGesture(event: any) {
        if (
            this.options.gesturesEnabled &&
            getUserAgent() === UserAgentEnum.Ios
        ) {
            this.onGesture(event);
        }
    }

    @HostListener('touchstart', ['$event']) handleTouch(event: any) {
        if (
            this.options.gesturesEnabled &&
            getUserAgent() === UserAgentEnum.Android &&
            event.touches.length === 2
        ) {
            this.initialTouches = event.touches;
        }
    }

    @HostListener('touchmove', ['$event']) handleTouchMove(event: any) {
        if (
            this.options.gesturesEnabled &&
            getUserAgent() === UserAgentEnum.Android
        ) {
            this.touchMove(event);
        }
    }

    @HostListener('wheel', ['$event']) handleWheel(event: any) {
        if (this.options.wheelEnabled) {
            event.preventDefault();

            if (event.ctrlKey) {
                const s = Math.exp(
                    -event.deltaY / (this.options.wheelSensitivity!.zoom * 100),
                );
                this.scale *= s;
            } else {
                const direction = event.checked ? 1 : -1;

                this.tx +=
                    (event.deltaX / this.options.wheelSensitivity!.pan) *
                    direction;
                this.ty +=
                    (event.deltaY / this.options.wheelSensitivity!.pan) *
                    direction;
            }

            this.transformImage();
        }
    }

    private onGesture(event: any) {
        event.preventDefault();

        if (event.type === 'gesturestart') {
            this.lastGestureX = event.screenX;
            this.lastGestureY = event.screenY;
            this.lastGestureScale = event.scale;
        }

        if (event.type === 'gesturechange') {
            const dx = event.screenX - this.lastGestureX;
            const dy = event.screenY - this.lastGestureY;

            this.tx += dx;
            this.ty += dy;
        }

        this.scale *= 1.0 + (event.scale - this.lastGestureScale);

        this.lastGestureX = event.screenX;
        this.lastGestureY = event.screenY;
        this.lastGestureScale = event.scale;

        this.transformImage();
    }

    private touchMove(event: any) {
        if (event.touches.length === 2) {
            event.preventDefault();

            const initialMidpoint = this.getMidpoint(this.initialTouches);
            const currentMidpoint = this.getMidpoint(event.touches);

            this.tx = currentMidpoint.x - initialMidpoint.x;
            this.ty = currentMidpoint.y - initialMidpoint.y;

            this.scale =
                this.getDistance(event.touches) /
                this.getDistance(this.initialTouches);

            this.transformImage();
        }
    }

    private transformImage() {
        this.el.nativeElement.style.transform = `translate(${this.tx}px, ${this.ty}px) scale(${this.scale})`;
    }

    private getMidpoint(touches: any): { x: any; y: any } {
        return {
            x: (touches[0].clientX + touches[1].clientX) / 2,
            y: (touches[0].clientY + touches[1].clientY) / 2,
        };
    }

    private getDistance(touches: any): number {
        return Math.hypot(
            touches[0].pageX - touches[1].pageX,
            touches[0].pageY - touches[1].pageY,
        );
    }
}
