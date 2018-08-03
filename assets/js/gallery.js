$(function() {
  var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

// execute above function
initPhotoSwipeFromDOM('.cottage-gallery-img');


var	$body = $('body');


// Gallery.
$('.gallery')
    .wrapInner('<div class="inner"></div>')
    .prepend(browser.mobile ? '' : '<div class="forward"></div><div class="backward"></div>')
    .scrollex({
        top:		'30vh',
        bottom:		'30vh',
        delay:		50,
        initialize:	function() {
            $(this).addClass('is-inactive');
        },
        terminate:	function() {
            $(this).removeClass('is-inactive');
        },
        enter:		function() {
            $(this).removeClass('is-inactive');
        },
        leave:		function() {

            var $this = $(this);

            if ($this.hasClass('onscroll-bidirectional'))
                $this.addClass('is-inactive');

        }
    })
    .children('.inner')
        //.css('overflow', 'hidden')
        .css('overflow-y', browser.mobile ? 'visible' : 'hidden')
        .css('overflow-x', browser.mobile ? 'scroll' : 'hidden')
        .scrollLeft(0);

// Style #1.
    // ...

// Style #2.
    $('.gallery')
        .on('wheel', '.inner', function(event) {

            var	$this = $(this),
                delta = (event.originalEvent.deltaX * 10);

            // Cap delta.
                if (delta > 0)
                    delta = Math.min(25, delta);
                else if (delta < 0)
                    delta = Math.max(-25, delta);

            // Scroll.
                $this.scrollLeft( $this.scrollLeft() + delta );

        })
        .on('mouseenter', '.forward, .backward', function(event) {

            var $this = $(this),
                $inner = $this.siblings('.inner'),
                direction = ($this.hasClass('forward') ? 1 : -1);

            // Clear move interval.
                clearInterval(this._gallery_moveIntervalId);

            // Start interval.
                this._gallery_moveIntervalId = setInterval(function() {
                    $inner.scrollLeft( $inner.scrollLeft() + (5 * direction) );
                }, 10);

        })
        .on('mouseleave', '.forward, .backward', function(event) {

            // Clear move interval.
                clearInterval(this._gallery_moveIntervalId);

        });

// Lightbox.
    $('.gallery.lightbox')
        .on('click', 'a', function(event) {

            var $a = $(this),
                $gallery = $a.parents('.gallery'),
                $modal = $gallery.children('.modal'),
                $modalImg = $modal.find('img'),
                href = $a.attr('href');

            // Not an image? Bail.
                if (!href.match(/\.(jpg|gif|png|mp4)$/))
                    return;

            // Prevent default.
                event.preventDefault();
                event.stopPropagation();

            // Locked? Bail.
                if ($modal[0]._locked)
                    return;

            // Lock.
                $modal[0]._locked = true;

            // Set src.
                $modalImg.attr('src', href);

            // Set visible.
                $modal.addClass('visible');

            // Focus.
                $modal.focus();

            // Delay.
                setTimeout(function() {

                    // Unlock.
                        $modal[0]._locked = false;

                }, 600);

        })
        .on('click', '.modal', function(event) {

            var $modal = $(this),
                $modalImg = $modal.find('img');

            // Locked? Bail.
                if ($modal[0]._locked)
                    return;

            // Already hidden? Bail.
                if (!$modal.hasClass('visible'))
                    return;

            // Lock.
                $modal[0]._locked = true;

            // Clear visible, loaded.
                $modal
                    .removeClass('loaded')

            // Delay.
                setTimeout(function() {

                    $modal
                        .removeClass('visible')

                    setTimeout(function() {

                        // Clear src.
                            $modalImg.attr('src', '');

                        // Unlock.
                            $modal[0]._locked = false;

                        // Focus.
                            $body.focus();

                    }, 475);

                }, 125);

        })
        .on('keypress', '.modal', function(event) {

            var $modal = $(this);

            // Escape? Hide modal.
                if (event.keyCode == 27)
                    $modal.trigger('click');

        })
        .prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
            .find('img')
                .on('load', function(event) {

                    var $modalImg = $(this),
                        $modal = $modalImg.parents('.modal');

                    setTimeout(function() {

                        // No longer visible? Bail.
                            if (!$modal.hasClass('visible'))
                                return;

                        // Set loaded.
                            $modal.addClass('loaded');

                    }, 275);

                });

});