/* global TrelloPowerUp */

var WHITE_ICON = './images/icon-white.svg';
var GRAY_ICON = './images/icon-gray.svg';

var getBadges = function (t) {
    return t.card('attachments')
        .get('attachments')
        .then(function (attachments) {
            var cnt = 0;
            var len = attachments.length;
            for (var i = 0; i < len; i++) {
                var name = formatDrawUrl(null, attachments[i].url);
                if (name) {
                    cnt++;
                }
            }
            if (cnt > 0) {
                // return an array of badge objects
                return [{
                    text: cnt,
                    icon: WHITE_ICON, // for card front badges only
                    color: 'yellow'
                }];
            } else {
                return [];
            }
        });
};

var cardButtonCallback = function (t) {

    return t.popup({
        title: 'Draw in Trello',
        items: [
            {
                text: 'New Drawing',
                callback: function (t) {
                    return t.overlay({
                        url: '../index.html'
                    })
                        .then(function () {
                            return t.closePopup();
                        });
                }
            },
            {
                text: 'Attach from Link',
                callback: function (t) {

                    return t.popup({
                        title: 'Paste Drawing Link',
                        url: './paste.html',
                        height: 184
                    });
                }
            }
        ]
    });

};

TrelloPowerUp.initialize({
    'card-buttons': function (t, options) {
        return [{
            icon: GRAY_ICON,
            text: 'Draw in Trello',
            callback: cardButtonCallback
        }];
    },
    'attachment-sections': function (t, options) {
        var claimed = options.entries.filter(drawFilter);
        if (claimed && claimed.length > 0) {
            return [{
                claimed: claimed,
                icon: GRAY_ICON,
                title: 'Attached Drawings',
                content: {
                    type: 'iframe',
                    url: t.signUrl('./section.html', {arg: claimed}),
                    height: 230
                }
            }];
        } else {
            return [];
        }
    },
    'card-badges': function (t, card) {
        return getBadges(t);
    },
    'format-url': function (t, options) {
        var name = formatDrawUrl(t, options.url);
        if (name) {
            return {
                icon: GRAY_ICON,
                text: name
            };
        } else {
            throw t.NotHandled();
        }
    }
});
