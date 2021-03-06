import { write } from '../../_shared/js/dom';
import { getIframeId, getWebfonts, resizeIframeHeight, reportClicks, onViewport } from '../../_shared/js/messages';
import { getApiBaseUrl } from '../../_shared/js/dev';
import { formatPrice, formatDuration, hideOnError, URLSearchParams } from '../../_shared/js/utils';

let container = document.getElementsByClassName('adverts__row')[0];

let ids = '[%IDs%]'.trim();
let params = new URLSearchParams();
if( ids.length ) {
    ids.split(',').forEach(id => params.append('t', id.trim()));
}

reportClicks();
getIframeId()
.then(({ host, preview }) => fetch(`${getApiBaseUrl(host, preview)}/commercial/travel/api/offers.json?${params}`))
.then(response => response.json())
.then(offers => offers.slice(0, '[%NumberofCards%]').map(createAdvert).join(''))
.then(html => Promise.all([getWebfonts(), write(() => container.innerHTML = html)]))
.then(() => {
    let lastWidth;
    onViewport(({ width }) => {
        if( width !== lastWidth ) {
            lastWidth = width;
            resizeIframeHeight();
        }
    });
})
.catch( error => hideOnError(error, 'travel'));

/* Outputs the HTML for a travel advert */
function createAdvert(offer, index) {
    return `<a class="blink advert advert--travel advert--prominent-${ index === 0 ? '[%IsProminent%]' : 'false'} ${ index > 1 ? 'hide-until-tablet' : '' }" href="%%CLICK_URL_UNESC%%${offer.offerUrl}" data-link-name="Offer ${index + 1} | ${offer.title}" target="_top">
        <div class="advert__image-container">
            <img class="advert__image" src="${offer.imageUrl}">
        </div>
        <div class="advert__text">
            <h2 class="blink__anchor advert__title" itemprop="name">${offer.title}</h2>
            <div class="advert__meta">
                ${formatDuration(offer.duration)} from <strong class="advert__price">${formatPrice(offer.fromPrice)}</strong>
            </div>
            <span class="advert__more button button--small">
                See more
                ${arrowRight}
            </span>
        </div>
    </a>`;
}
