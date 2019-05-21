const parallax = new Parallax($("#wrapper").get(0));

const noise = new Howl({
    src: ['/assets/images/noise.wav'],
    autoplay: true,
    loop: true
})

noise.play()

$("html").click(_ => $("#wrapper").addClass("animated"));

$(".cup").each(function() {
    var options = {
        useEasing: false, 
        useGrouping: true, 
        separator: '.', 
        decimal: ','
    };
    let node = $(this);
    let anim = new CountUp(node.attr("id"), 0, Number(node.text()), 0, 2, options);
    anim.start();
});
