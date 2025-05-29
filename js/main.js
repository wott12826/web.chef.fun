
var lastScroll = 0;
var isFirefox = typeof InstallTrigger !== 'undefined';

var filmstrip,
    inner,
    position,
    filmstripStart;

$(document).ready(function () {

    // Expandable elements (e.g. accordion)
    $('.btn-expandable').click(function () {
        var target = $(this).attr('data-target');
        var h = $(target).find('.expandable-body').outerHeight();
        var state = $(this).attr('aria-expanded');
        if (state == 'false') {
            $(this).attr('aria-expanded', true);
            $(target).css('height', h + 'px');
            if ($(this).attr('data-text-expanded') != '') {
                $(this).text($(this).attr('data-text-expanded'));
            }
        } else {
            $(this).attr('aria-expanded', false);
            if ($(this).attr('data-text-collapsed') != '') {
                $(this).text($(this).attr('data-text-collapsed'));
            }
            setTimeout(function () {
                $(target).attr('style', '');
            }, 10);
        }
        $(target).toggleClass('collapsed');
        $(this).toggleClass('collapsed');
    })

    // Filmstrip - adjust scrollbar width
    makeFilmstrip();

    // Filmstrip - adjust scrollbar position
    $('.filmstrip .row').scroll(function (e) {
        position = $(this).parent().find('.scroll-position-inner');
        position.css('left', $(this).scrollLeft() / ($(this).get(0).scrollWidth) * 100 + '%');

        var positionLeft = $(this).parent().find('.scroll-position-inner').position().left,
            positionWidth = $(this).parent().find('.scroll-position-inner').width();
        // Visibility of next button
        if (Math.round(positionLeft + positionWidth) >= $(this).parent().find('.scroll-position').width()) {
            $(this).parent().find('.scroll-btn.next').removeClass('enabled')
        } else {
            $(this).parent().find('.scroll-btn.next').addClass('enabled')
        }
        // Visbility of prev bnutton
        if (positionLeft == 0) {
            $(this).parent().find('.scroll-btn.prev').removeClass('enabled')
        } else {
            $(this).parent().find('.scroll-btn.prev').addClass('enabled')
        }
    })

    if ($('.scroller').length > 0) {
        makeScroller();
    }
})

$(window).resize(function () {
    makeFilmstrip();
})

function makeFilmstrip() {
    $('.filmstrip').each(function () {
        filmstrip = $(this);
        inner = $(this).find('.row');
        position = $(this).find('.scroll-position-inner');
        filmstripStart = $(this).attr('data-filmstrip-start');
        // Check when filmstrip should be made
        if (typeof filmstripStart !== 'undefined' && filmstripStart != '') {
            if ($(window).width() < filmstripStart) {
                inner.css('flex-wrap', 'nowrap');
            } else {
                inner.css('flex-wrap', 'wrap');
            }
        }
        // Check if scrollbar should be shown
        if ((filmstrip.outerWidth() + 10) < inner.get(0).scrollWidth) {
            position.parent().show();
            position.parent().next().addClass('enabled');
            position.css('width', filmstrip.outerWidth() / (inner.get(0).scrollWidth) * 100 + '%');
        } else {
            position.parent().hide();
            position.parent().next().removeClass('enabled');
        }
    });
}

function makeScroller() {
    $('.scroller').each(function () {
        $(this).attr('data-animate', true);

        const scrollerInner = $(this).find('.scroller-inner');
        const scrollerContent = Array.from(scrollerInner.children());

        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            scrollerInner.append(duplicatedItem);
        });
    });
}

// window.onload = function () {
//     const url = 'https://api.chef.fun/api/stats';

//     // Perform a GET request
//     fetch(url)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok ' + response.statusText);
//             }
//             return response.json();
//         })
//         .then(data => {
//             // Display the data on the page
//             const dataContainer = document.getElementById('data-container');
//             dataContainer.innerHTML = `
//                 <h2>${data.title}</h2>
//                 <p>${data.body}</p>
//             `;
//         })
//         .catch(error => {
//             console.error('There has been a problem with your fetch operation:', error);
//             const dataContainer = document.getElementById('data-container');
//             dataContainer.innerHTML = 'Error loading data.';
//         });
// };

const BEARER_TOKEN = "Bearer AUTHENTICATION_KEY";


window.onload = function () {
    const url = 'https://api.chef.fun/api/stats';

    const imagesPreviewDiv = document.querySelector('.imagesPreviewDiv');
    imagesPreviewDiv.style.display = 'none';

    const launchedTokensWithTitle = document.querySelector('.launchedTokensWithTitle');
    launchedTokensWithTitle.style.display = 'none';

    const noOfChains = document.querySelector('.noOfChains');
    noOfChains.style.display = 'none';

    const launchedTokens = document.querySelector('.launchedTokens');
    launchedTokens.style.display = 'none';

    const top3Tokens = document.querySelector('.top3Tokens');
    top3Tokens.style.display = 'none';

    const potentialGains = document.querySelector('.potentialGains');
    potentialGains.style.display = 'none';

    // Perform a GET request
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: BEARER_TOKEN,
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {

            console.log(data);

            const imagesPreviewDivSkeleton = document.querySelector('.imagesPreviewDivSkeleton');
            imagesPreviewDivSkeleton.style.display = 'none';
            const launchedTokensWithTitleSkeleton = document.querySelector('.launchedTokensWithTitleSkeleton');
            launchedTokensWithTitleSkeleton.style.display = 'none';
            const noOfChainsSkeletons = document.querySelectorAll('.noOfChainsSkeleton');
            noOfChainsSkeletons.forEach((element) => {
                element.style.display = 'none';
            });
            const texth2Skeletons = document.querySelectorAll('.texth2Skeleton');
            texth2Skeletons.forEach((element) => {
                element.style.display = 'none';
            });
            const top3TokensSkeleton = document.querySelector('.top3TokensSkeleton');
            top3TokensSkeleton.style.display = 'none';
            const potentialGainSkeleton = document.querySelector('.potentialGainSkeleton');
            potentialGainSkeleton.style.display = 'none';



            imagesPreviewDiv.style.display = 'flex';
            launchedTokensWithTitle.style.display = 'block';
            noOfChains.style.display = 'block';
            launchedTokens.style.display = 'block';
            top3Tokens.style.display = 'flex';
            potentialGains.style.display = 'block';


            const chainsElements = document.querySelectorAll('.noOfChains');

            chainsElements.forEach((element) => {
                element.textContent = data.chains;
            });

            const launchedTokensElements = document.querySelectorAll('.launchedTokens');
            launchedTokensElements.forEach((element) => {
                element.textContent = data.launchedTokens;
            });

            const launchedTokensElementWithTitle = document.querySelectorAll('.launchedTokensWithTitle');
            launchedTokensElementWithTitle.forEach((element) => {
                element.textContent = `${data.launchedTokens} launched tokens`;
            });

            const launchedTokensWithPlusElement = document.querySelectorAll('.launchedTokensWithPlus');
            const formattedLaunchedTokensWithPlus = numeral(data.launchedTokens).format('+0,0');
            launchedTokensWithPlusElement.forEach((element) => {
                element.textContent = `+${data.launchedTokens}`;
            });

            const totalVolumeElements = document.querySelectorAll('.totalVolume');
            const formattedTotalVolume = numeral(data.totalVolume).format('0.0a');

            totalVolumeElements.forEach((element) => {
                element.textContent = `$${formattedTotalVolume}`;
            });

            const dailyUsersElements = document.querySelectorAll('.dailyUsers');
            const formattedDailyUsers = numeral(data.noOfUsers).format('0,0a');
            dailyUsersElements.forEach((element) => {
                element.textContent = formattedDailyUsers;
            });

            const potentialGainsElements = document.querySelectorAll('.potentialGains');
            const formattedPotentialGains = numeral(data.potentialGains).format('0,0a');

            console.log("formattedPotentialGains", formattedPotentialGains);
            potentialGainsElements.forEach((element) => {
                element.textContent = `$${formattedPotentialGains}`;
            });

            if (data.top3Tokens && data.top3Tokens.length >= 3) {
                // Set the values for each token
                const tokens = document.querySelectorAll('.top3Tokens > div');

                tokens.forEach((tokenDiv, index) => {
                    if (data.top3Tokens[index]) {
                        const amountElement = tokenDiv.querySelector('.tokenSymbol');
                        const symbolElement = tokenDiv.querySelector('.xAmount');

                        if (amountElement && symbolElement) {
                            amountElement.textContent = `${data.top3Tokens[index].xAmount}x`;
                            symbolElement.textContent = data.top3Tokens[index].symbol;
                        }
                    }
                });
            }

            if (data.top3Tokens && data.top3Tokens.length >= 3) {
                // Set the values for each token
                const images = document.querySelectorAll('.imagesPreviewDiv > img');

                images.forEach((imageEl, index) => {
                    if (data.top3Tokens[index]) {

                        if (imageEl) {
                            imageEl.src = data.top3Tokens[index].logoUrl;
                        }
                    }
                });
            }



        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
};