const BASE_URL = "https://mehamasum.github.io/draw-power-up/editor.html";

function formatDrawUrl(t, url) {
    if (!/^https?:\/\/www\.mehamasum\.github\.io\/draw-power-up\/editor\.html/.test(url)) {
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
        return decodeURIComponent(result["filename"]);
    }

    else {
        return null;
    }
}

function makeDrawUrl(arg) {
    // arg is encoded here
    // this going to get attached to card
    var e_xml = encodeURIComponent(arg.xml);
    var e_name = encodeURIComponent(arg.name);
    return BASE_URL+ "?xml="+e_xml+"&filename="+e_name;
}

function makeParam(base, xml, name) {
    var e_name = encodeURIComponent(name);
    return base+ "?xml="+xml+"&filename="+e_name;
}

var drawFilter = function (attachment) {
    var name = formatDrawUrl(null, attachment.url);
    if(name) return true;
    return false;
};
