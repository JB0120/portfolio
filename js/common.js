$(window).on("load", function() { 
    const $btn = $("#landingBtn"); 
    const $container = $("#landingContainer"); 
    const $imgs = $(".landing_img"); 
    const $typingText = $("#typingText");
    const $titles = $("#main .tit_box h2");

    let orbitTimers = []; 

    /* 타이핑 효과 */
    function typeText($target, text, speed = 100, cursor = false) {
        let index = 0;
        const firstSpan = $target.find("span").first();
        const firstClass = firstSpan.length ? firstSpan.attr("class") : "";

        $target.text("");

        function typing() {
            if (index < text.length) {
                if (index === 0 && firstSpan.length) {
                    const $span = $("<span>").text(text[index]);

                    if (firstClass) {
                        $span.addClass(firstClass);
                    }

                    $target.append($span);
                } else {
                    $target.append(text[index]);
                }

                index++;
                setTimeout(typing, speed);
            } else if (cursor) {
                $target.append('<span class="typing_cursor">_</span>');
            }
        }

        typing();
    }

    typeText($typingText, "웹 포트폴리오 둘러보기", 150, true);

    function updateExplodeOrigin() { 
        if (!$btn.length || !$container.length) return; 
         
        const offset = $btn.offset(); 
        const btnWidth = $btn.outerWidth(); 
        const btnHeight = $btn.outerHeight(); 
        const winWidth = $(window).width(); 
        const winHeight = $(window).height(); 
 
        const centerXPercent = ((offset.left + btnWidth / 2) / winWidth) * 100; 
        const centerYPercent = ((offset.top + btnHeight / 2) / winHeight) * 100; 
 
        $container.css({ 
            "--explode-origin-dx": (centerXPercent - 50) + "vw", 
            "--explode-origin-dy": (centerYPercent - 40) + "vh" 
        }); 
    } 
 
    updateExplodeOrigin(); 
     
    let resizeTimer; 

    $(window).on("resize", function() { 
        clearTimeout(resizeTimer); 
        resizeTimer = setTimeout(updateExplodeOrigin, 50); 
    }); 

    $btn.on("mouseenter", function() { 
        orbitTimers.forEach(clearTimeout); 
        orbitTimers = []; 
        updateExplodeOrigin(); 
 
        $imgs.each(function(index, el) { 
            const $img = $(el); 

            $img.css({ 
                "animation": "", 
                "translate": "", 
                "transform": "" 
            }).removeClass("is-orbiting").addClass("is-gathered"); 
 
            const cardDelay = parseFloat($img.css("--orbit-delay")) || 0; 
            const finalDelay = Math.max(0, cardDelay * 1000) + 600; 
 
            const timer = setTimeout(function() { 
                $img.removeClass("is-gathered").addClass("is-orbiting"); 
            }, finalDelay); 
 
            orbitTimers.push(timer); 
        }); 
    }); 

    $btn.on("mouseleave", function() { 
        orbitTimers.forEach(clearTimeout); 
        orbitTimers = []; 
 
        $imgs.each(function(index, el) { 
            const $img = $(el); 
             
            if ($img.hasClass("is-orbiting")) { 
                const computedStyle = window.getComputedStyle(el); 
                const currentTranslate = computedStyle.translate; 
                const currentTransform = computedStyle.transform; 
 
                $img.css({ 
                    "animation": "none", 
                    "translate": currentTranslate, 
                    "transform": currentTransform 
                }); 
 
                void el.offsetWidth; 
 
                $img.removeClass("is-gathered is-orbiting"); 
 
                setTimeout(function() { 
                    $img.css({ 
                        "translate": "", 
                        "transform": "" 
                    }); 
                }, 10); 
            } else { 
                $img.css("animation", "none")
                    .removeClass("is-gathered is-orbiting"); 

                void el.offsetWidth; 

                $img.css("animation", ""); 
            } 
        }); 
    }); 

    /* 랜딩페이지 버튼 클릭시 */
    $btn.on("click", function(e) { 
        e.preventDefault(); 

        $container.addClass("is-disappeared");

        /*
        setTimeout(function() {
            
        }, 7000);
         */

        $("body").removeClass("landing");
        $(".scroll_down").addClass("on");
        $("header").addClass("on");

        setTimeout(function() {
            typeText($(".tit_box h2").eq(0), "Bring ideas to life.", 80);

            setTimeout(function() {
                typeText($(".tit_box h2").eq(1), "Own every detail.", 80);
            }, 2000);

            setTimeout(function() {
                typeText($(".tit_box h2").eq(2), "Keep creating", 80, true);
            }, 4000);
        }, 800);

    });
});

let lastScrollTop = 0;
let isNavClick = false;

$(".gnb a").on("click", function() {
    isNavClick = true;

    const target = $(this).attr("href");

    $("html, body").animate({
        scrollTop: $(target).offset().top
    }, 700, function() {
        lastScrollTop = $(window).scrollTop();

        setTimeout(function() {
            isNavClick = false;
        }, 100);
    });
});

/* Scroll Animations */

$(window).on("scroll", function() {

    handleMainScroll();
    handleArchScroll();

    if (isNavClick) return;

    const scrollTop = $(this).scrollTop();

    if (scrollTop <= 0) {
        $("header").removeClass("scroll-up scroll-down");
        lastScrollTop = 0;
        return;
    }

    if (scrollTop > lastScrollTop) {
        $("header")
            .removeClass("scroll-up")
            .addClass("scroll-down");
    } else if (scrollTop < lastScrollTop) {
        $("header")
            .removeClass("scroll-down")
            .addClass("scroll-up");
    }

    lastScrollTop = scrollTop;
});

function handleMainScroll() {
    const scrollTop = $(window).scrollTop();
    const triggerPoint = $(window).height() * 1.6;

    /* main section font-size 줄이기 */
    $(".tit_box").each(function() {
        const $this = $(this);

        const minSize = 40;
        const maxSize = 56;

        const size = Math.max(
            minSize,
            maxSize - scrollTop * 0.03
        );

        $this.css("font-size", size + "px");
    });

    /* 트리거보다 더 내리면 main 숨기기 */
    if (scrollTop >= triggerPoint) {
        $("#main").addClass("is-hidden");
    } else {
        $("#main").removeClass("is-hidden");
    }

    if (scrollTop >= 500) {
        // 500px 이상일 때 실행
    }
}

function handleArchScroll() {
    const $svg = $("svg.arch");

    if (!$svg.length) return;

    const top = $svg[0].getBoundingClientRect().top;

    const start = 860;
    const end = 160;

    const progress = Math.min(
        Math.max((start - top) / (start - end), 0),
        1
    );

    $svg.css(
        "transform",
        `translate3d(0px, 0px, 0px) scale(1, ${progress})`
    );
}

function updateTermTitle() {
    const $onBtn = $(".list_btn.on");

    const icon = $onBtn.find(".list_icon").text();
    const text = $onBtn.find(".list_txt").text();

    $(".term_table_tit .list_icon").text(icon);
    $(".term_table_tit .list_txt").text(text);
}

$(".list_btn").on("click", function() {
    const content = $(this)
        .attr("id")
        .replace("Term", "")
        .toLowerCase();

    $(".list_btn").removeClass("on");
    $(this).addClass("on");

    $(".term_grid").removeClass("on");
    $(`.term_grid[data-content="${content}"]`).addClass("on");

    updateTermTitle();
});

updateTermTitle();

$(".table_drag").on("mousedown", function(e) {

    if ($(e.target).closest("a").length) return;

    const $drag = $(this);
    const $inner = $drag.find(".table_inner");

    let startX = e.pageX;
    let startLeft = $inner.position().left;
    let isDragging = false;

    function move(e) {
        const diff = e.pageX - startX;

        if (Math.abs(diff) > 5) {
            isDragging = true;
            $drag.addClass("dragging");
        }

        if (!isDragging) return;

        let newLeft = startLeft + diff;

        const maxLeft = 0;
        const minLeft = $drag.width() - $inner.outerWidth();

        newLeft = Math.min(maxLeft, newLeft);
        newLeft = Math.max(minLeft, newLeft);

        $inner.css("left", newLeft + "px");
    }

    function stop() {
        $drag.removeClass("dragging");

        $(document).off("mousemove", move);
        $(document).off("mouseup", stop);
    }

    $(document).on("mousemove", move);
    $(document).on("mouseup", stop);
});