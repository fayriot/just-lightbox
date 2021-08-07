import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Inject,
    Injectable,
    Injector,
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {LightboxComponent} from '../components/lightbox/lightbox.component';
import {IJustLightbox} from '../models';

@Injectable({
    providedIn: 'root',
})
export class JustLightboxService {
    private _lightbox: ComponentRef<any>;
    private _document?: HTMLDocument;
    private _isOpen: boolean;

    constructor(
        private appRef: ApplicationRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector,
        // workaround https://github.com/angular/angular/issues/20351#issuecomment-446025223
        @Inject(DOCUMENT) public document: any,
    ) {
        this._document = document as HTMLDocument;
    }

    open(params: IJustLightbox): LightboxComponent {
        if (this._isOpen) {
            return;
        }

        const wrapper = this.componentFactoryResolver
            .resolveComponentFactory<LightboxComponent>(LightboxComponent)
            .create(this.injector);

        if (!params.imageSrc) {
            throw new Error('Image source undefined');
        }

        wrapper.instance.imageSrc = params.imageSrc;
        wrapper.instance.labelledby = params.labelledby;
        wrapper.instance.describedby = params.describedby;

        wrapper.instance.close$.subscribe(_ => {
            this._lightbox.destroy();
            this._isOpen = !this._isOpen;
        });

        this._lightbox = wrapper;

        this.appRef.attachView(wrapper.hostView);

        const domElem = (wrapper.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        this._document.body.appendChild(domElem);

        this._isOpen = !this._isOpen;

        return wrapper.instance;
    }
}
