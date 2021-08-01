export const CODE_EXAMPLES = {
    customImageSource: '<img src="path-to-thumbnail" jLightbox="path-to-full-image">',
    default: '<img src="path-to-full-image" jLightbox>',
    links: `<a href="path-to-full-image" jLightbox>
    <img src="path-to-thumbnail">
</a>`,
    installation:
        "import {JustLightboxModule} from 'just-lightbox';\n" +
        '\n' +
        '@NgModule({\n' +
        '    imports: [JustLightboxModule.forRoot()]\n' +
        '})',
    configuration:
        'JustLightboxModule.forRoot({\n' +
        '    containerOffset: { // image paddings in px\n' +
        '        vertical: 20,\n' +
        '        horizontal: 30,\n' +
        '    },\n' +
        '})',
    css:
        '--j-lightbox__z-index: 10000000;\n' +
        '--j-lightbox__overlay__background-color: rgba(0, 0, 0, 0.9);\n' +
        '--j-lightbox__loader__color--primary: rgba(255, 255, 255, 1);\n' +
        '--j-lightbox__loader__color--secondary: rgba(255, 255, 255, 0.2);\n' +
        '--j-lightbox__loader__animation-duration: 1.1s;\n' +
        '--j-lightbox__overlay__cursor: zoom-out;',
};
