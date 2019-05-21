const init = () => {
    $(".countup").each(function() {
        var options = {
            useEasing: true, 
            useGrouping: true, 
            separator: '.', 
            decimal: ','
        };
        let node = $(this);
        let anim = new CountUp(node.attr("id"), 0, Number(node.text()), 0, 3, options);
        anim.start();
    });

    $(".dt").each(function() {
        $(this).DataTable();
    });
    
    $("progress").hide();
};

/*$(document).pjax('a', '#wrapper', {
    timeout: 200000
});

$(document).on("pjax:send", _ => $("progress").show());

$(document).on("ready pjax:end", init);*/

$("progress").hide();
init();

$(document.body).bind("keypress", e => {
    if(!e.shiftKey) return;
	if(document.activeElement instanceof HTMLInputElement) return;

    switch(e.which) {
        case 65:
            window.location.assign("/hub/attacks/create");
        break;
        case 88:
            window.location.assign("/hub/attacks/mine");
        break;
        case 36:
            window.location.assign("/hub?from=shortcut");
        break;
        case 81:
            window.location.assign("/logout");
        break;
        case 9:
            window.location.assign("/vitactl");
        break;
    }
});