const BASE_URL = "https://www.drawintrello.com/draw";

function formatDrawUrl(t, url) {
    if (!/^https?:\/\/www\.drawintrello\.com\/draw/.test(url)) {
        return null;
    }


    var result = {};
    var idx = url.lastIndexOf('?');

    if (idx > 0)
    {
        var params = url.substring(idx + 1).split('&');

        for (var i = 0; i < params.length; i++)
        {
            idx = params[i].indexOf('=');

            if (idx > 0)
            {
                result[params[i].substring(0, idx)] = params[i].substring(idx + 1);
            }
        }
        return result["filename"];
    }

    else {
        return null;
    }
}

function makeDrawUrl(arg) {
    return BASE_URL+ "?xml="+arg.xml+"&filename="+arg.name;
}

var drawFilter = function (attachment) {
    return attachment.url.indexOf(BASE_URL) == 0;
};
