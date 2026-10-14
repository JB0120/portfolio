if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

$(window).on("load", function() { 
    // 새로고침 시 최상단으로 이동
    window.scrollTo(0, 0);

    // 랜딩 화면 초기 상태 설정
    $("body").addClass("landing");
    $("#landingContainer").removeClass("is-disappeared");
    $("header").removeClass("on scroll-up scroll-down");
    $(".scroll_down").removeClass("on");

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

function gitAnimation() {
    const $dots = $(".git_dot");
    const $boxs = $(".git_box");

    $dots.removeClass("check loading");
    $boxs.removeClass("on");


    // 두 번째 로딩
    setTimeout(() => {
        $dots.eq(0).addClass("check");
        $dots.eq(1).addClass("loading");
        $boxs.eq(0).addClass("on");
        $boxs.eq(1).addClass("on");
    }, 2000);

    // 두 번째 완료
    setTimeout(() => {
        $dots.eq(1).removeClass("loading").addClass("check");
        $dots.eq(2).addClass("check");
        $boxs.eq(2).addClass("on");
    }, 4000);

    // 잠시 유지 후 반복
    setTimeout(gitAnimation, 6000);
}

gitAnimation();


function aboutBtnAnimation() {
    const $btn = $(".animate_btn > .about_btn");
    const $txt = $btn.find(".btn_txt");

    // 초기화
    $btn.removeClass("loading check");
    $txt.text("Creative");

    setTimeout(function() {
        $btn.addClass("loading");
        $txt.text("Crafting...");
    }, 2000);

    setTimeout(function() {
        $btn.removeClass("loading").addClass("check");
        $txt.text("Complete");
    }, 4500);

    setTimeout(function() {
        $btn.removeClass("check");
        $txt.text("Creative");
    }, 8000);

    setTimeout(aboutBtnAnimation, 10000);
}

aboutBtnAnimation();



$(function () {
    const $slider = $(".animate_slide");
    const $wrap = $slider.find(".slide_wrap");

    const $original = $wrap.children(".slide_box").clone();
    const originalCount = $original.length;

    const duration = 500;
    const interval = 2000;

    let currentIndex = 2;
    let isMoving = false;

    $wrap.prepend($original.clone());
    $wrap.append($original.clone());

    const $slides = $wrap.children(".slide_box");

    function moveTo(index, animate = true) {
        const $active = $slides.eq(index + originalCount);

        const targetX =
            $slider.innerWidth() / 2 -
            ($active[0].offsetLeft + $active.outerWidth() / 2);

        $wrap.css({
            transition: animate
                ? `transform ${duration}ms ease-in-out`
                : "none",
            transform: `translate3d(${targetX}px, 0, 0)`
        });
    }

    function setActive(index) {
        $slides.removeClass("on");

        // 동일한 슬라이드의 복제본도 활성화
        $slides.eq(index).addClass("on");
        $slides.eq(index + originalCount).addClass("on");
        $slides.eq(index + originalCount * 2).addClass("on");
    }

    function nextSlide() {
        if (isMoving) return;

        isMoving = true;
        currentIndex++;

        setActive(currentIndex % originalCount);
        moveTo(currentIndex, true);
    }

    $wrap.on("transitionend", function (e) {
        if (e.target !== $wrap[0] ||
            e.originalEvent.propertyName !== "transform") return;

        if (currentIndex >= originalCount) {
            currentIndex = 0;

            // 같은 모양의 원본 위치로 즉시 이동
            moveTo(currentIndex, false);
        }

        isMoving = false;
    });

    setActive(currentIndex);
    moveTo(currentIndex, false);

    setInterval(nextSlide, interval);

    $(window).on("resize", function () {
        moveTo(currentIndex, false);
    });
});

$(function () {
    const $modal = $(".contact_modal");
    let $lastFocused = null;

    function closeModal() {
        $modal.removeClass("on").attr("aria-hidden", "true");
        $("body").css("overflow", "");

        if ($lastFocused) {
            $lastFocused.trigger("focus");
        }
    }

    $(".contact_btn").on("click", function (e) {
        e.preventDefault();

        $lastFocused = $(this);
        $modal.addClass("on").attr("aria-hidden", "false");
        $("body").css("overflow", "hidden");

        $modal.find(".modal_close").trigger("focus");
    });

    $(".modal_close").on("click", closeModal);

    // 모달 바깥 영역 클릭
    $modal.on("click", function (e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // ESC 키로 닫기
    $(document).on("keydown", function (e) {
        if (!$modal.hasClass("on")) return;

        if (e.key === "Escape") {
            closeModal();
        }

        // 모달 안에서 Tab 포커스 유지
        if (e.key === "Tab") {
            const $focusable = $modal.find(
                'a[href], button:not(:disabled), input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
            ).filter(":visible");

            if (!$focusable.length) return;

            const first = $focusable[0];
            const last = $focusable[$focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });
}); 

$(function () {
    let copyTimer;

    $(".email_copy").on("click", async function () {
        const $btn = $(this);
        const email = $btn.closest(".contact_email")
                          .find(".email_address")
                          .text().trim();

        try {
            await navigator.clipboard.writeText(email);

            clearTimeout(copyTimer);

            $btn.addClass("copied");
            $btn.find(".copy_txt").text("복사됨!");

            copyTimer = setTimeout(function () {
                $btn.removeClass("copied");
                $btn.find(".copy_txt").text("복사");
            }, 2000);

        } catch (error) {
            $btn.find(".copy_txt").text("FAILED");

            clearTimeout(copyTimer);
            copyTimer = setTimeout(function () {
                $btn.removeClass("copied");
                $btn.find(".copy_txt").text("복사");
            }, 2000);
        }
    });
});
