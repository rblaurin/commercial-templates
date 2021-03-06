import { getIframeId, sendMessage, resizeIframeHeight, reportClicks } from '../../_shared/js/messages';
import { enableToggles } from '../../_shared/js/ui';
import { write, div } from '../../_shared/js/dom';

getIframeId()
.then(() => {
    reportClicks();
    handleBackground();
    handleToggle();
});

function handleBackground() {
    let isMobile = window.matchMedia('(max-width: 739px)').matches;
    let isTablet = window.matchMedia('(min-width: 740px) and (max-width: 979px)').matches;
    let scrollType = '[%ScrollType%]';
    let backgroundColour = '[%BackgroundColour%]';
    let [ backgroundImage, backgroundPosition, backgroundRepeat, creativeLink ] = isMobile ?
        ['[%MobileBackgroundImage%]', '[%MobileBackgroundImagePosition%]', '[%MobileBackgroundImageRepeat%]', document.getElementById('linkMobile')] :
        ['[%BackgroundImage%]', '[%BackgroundImagePosition%]', '[%BackgroundImageRepeat%]', document.getElementById('linkDesktop')];

    if (backgroundColour) {
        document.documentElement.style.backgroundColor = backgroundColour;
    }

    if( !backgroundImage ) return;

    if( scrollType === 'none' ) {
        write(() => {
            Object.assign(creativeLink.style, {
                backgroundImage: `url('${backgroundImage}')`,
                backgroundPosition,
                backgroundRepeat
            });
        });
    } else {
        sendMessage('background', {
            scrollType: scrollType === 'parallax' && (isMobile || isTablet) ? 'fixed' : scrollType,
            backgroundColour,
            backgroundImage: `url('${backgroundImage}')`,
            backgroundRepeat,
            backgroundPosition
        });
    }
}

function handleToggle() {
    Array.from(document.getElementsByClassName('js-container')).forEach(root => enableToggles(root, true, onToggle));
}

function onToggle(isOpen) {
    resizeIframeHeight(isOpen ? 500 : 250);
}
