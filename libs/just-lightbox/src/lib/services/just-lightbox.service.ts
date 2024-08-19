import { DOCUMENT } from '@angular/common';
import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Inject,
    Injectable,
    Injector,
} from '@angular/core';
import { LightboxComponent } from '../components/lightbox/lightbox.component';
import { IJustLightbox } from '../models';

@Injectable({
    providedIn: 'root',
})
export class JustLightboxService {
    private _lightbox: ComponentRef<any> | undefined;
    private _document?: Document;
    private _isOpen: boolean = false;

    constructor(
        private appRef: ApplicationRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector,
        @Inject(DOCUMENT) public document: Document,
    ) {
        this._document = document;
    }

    open(params: IJustLightbox): LightboxComponent | undefined {
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

        wrapper.instance.close$.subscribe((_: any) => {
            this._lightbox?.destroy();
            this._isOpen = !this._isOpen;
            wrapper.instance.close$.unsubscribe();
        });

        this._lightbox = wrapper;

        this.appRef.attachView(wrapper.hostView);

        const domElem = (wrapper.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        this._document?.body.appendChild(domElem);

        this._isOpen = !this._isOpen;

        return wrapper.instance;
    }
}
