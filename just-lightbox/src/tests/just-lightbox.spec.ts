import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { JustLightboxModule } from '../just-lightbox/just-lightbox.module';
import {LightboxComponent} from '../just-lightbox/components/lightbox/lightbox.component';

const DEFAULT_LIGHTBOX_IMAGE_SELECTOR = '.j-lightbox__image';

@Component({
    template: `
        <img class="image" src="https://placehold.co/400" jLightbox="https://placehold.co/400">
        <a class="anchor" href="https://placehold.co/400" jLightbox>
            <img src="https://placehold.co/400">
        </a>
    `, // FIXME local images
})
class LightboxTestComponent {
}

describe('Just Lightbox', () => {
    let component: LightboxComponent;
    let componentDe: DebugElement;
    let fixture: ComponentFixture<LightboxComponent>;
    let el: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [JustLightboxModule.forRoot()],
            declarations: [LightboxTestComponent],
            providers: [{provide: ComponentFixtureAutoDetect, useValue: true}],
        }).compileComponents();

        fixture = TestBed.createComponent(LightboxComponent);
        component = fixture.componentInstance;
        componentDe = fixture.debugElement;
        el = componentDe.nativeElement;
    });

    it('should create instance', () => {
        expect(component).toBeTruthy();
    });

    it('should open from image', () => {
        const fixtureTest = TestBed.createComponent(LightboxTestComponent);
        const target = fixtureTest.debugElement.nativeElement.querySelector('.image');
        target.click();
        fixtureTest.detectChanges();
        expect(el.querySelector(DEFAULT_LIGHTBOX_IMAGE_SELECTOR)).toBeTruthy();
    });

    it('should open from anchor', () => {
        const fixtureTest = TestBed.createComponent(LightboxTestComponent);
        const target = fixtureTest.debugElement.nativeElement.querySelector('.anchor');
        target.click();
        fixtureTest.detectChanges();
        expect(el.querySelector(DEFAULT_LIGHTBOX_IMAGE_SELECTOR)).toBeTruthy();
    });
});
