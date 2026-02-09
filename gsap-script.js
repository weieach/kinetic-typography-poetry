
document.addEventListener("DOMContentLoaded", (event) => {
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText);

let smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 2,
  effects: true,
});
let footstepBlur = document.querySelector(".footstep-blur");
let footstepTl = gsap.timeline();
if (footstepBlur) {
  footstepBlur.addEventListener("mouseenter", () => {
    footstepTl
      .to(".footstep-blur", {
        filter: "blur(0px)",
      })
      .to(".screen-1-canvas", {
        delay: 0.5,
        filter: "blur(50px)",
        scale: 1.5,
        duration: 2,
      })
      // .to(".screen-1-canvas", {
      //   scale: 2,
      //   duration: 2,
      // })
      .set(".canvas-array", {
        height: "fit-content",
        overflow: "auto",
      })
      .to(".tooltip", {
        opacity: 1,
        filter: "blur(0px)",
      });
  });

  const poemTitle = document.querySelectorAll(".poem-title-lines");

  for(let line of poemTitle){
    gsap.from(line, {
      // opacity: 0,
      filter: "blur(40px)",
      duration: 1.5,
      delay: 0.75,
    })};

    const poemInfo = document.querySelectorAll(".poem-info");
    for(let info of poemInfo){
      gsap.from(info, {
        opacity: 0,
        duration: 1,
        delay: 2,
      })
    };

    const tags = document.querySelectorAll(".tag");
    for(let tag of tags){
      gsap.from(tag, {
        opacity: 0,
        duration: 1,
        delay: 3,
      })
    };

    const titlepg = document.querySelector(".title-pg");
    if (titlepg) {
      const hideTitle = () => {
        gsap.to(titlepg, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            titlepg.style.display = "none";
          },
        });
        window.removeEventListener("wheel", hideTitle);
        window.removeEventListener("touchstart", hideTitle);
        window.removeEventListener("keydown", onKeyScroll);
      };

      const onKeyScroll = (event) => {
        if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "].includes(event.key)) {
          hideTitle();
        }
      };

      window.addEventListener("wheel", hideTitle, { passive: true });
      window.addEventListener("touchstart", hideTitle, { passive: true });
      window.addEventListener("keydown", onKeyScroll);
    }

  gsap.to(".tooltip", {
    scrollTrigger: {
      trigger: ".tooltip",
      start: "top 80%",
      end: "top 60%", //start value % should always exceed end value %
      scrub: 1,
      // markers: true,
    },
    opacity: 0,
  });
}

// speed up for preview
// footstepTl.timeScale(10);

let splitP2 = SplitText.create(".screen-2-p", {
  type: "chars, words, lines",
  wordsClass: "word++",
  onSplit: (self) => {
    gsap.from(self.chars, {
      scrollTrigger: {
        trigger: ".screen-2",
        start: "top 70%",
        end: "top 0%", //start value % should always exceed end value %
        scrub: true,
      },
      autoAlpha: 0,
      stagger: {
        amount: 1,
        from: "0",
      },
    });
  },
});



// gsap.from(".screen-2-p", {
//   scrollTrigger: {
//     trigger: ".screen-2",
//     start: "top 20%",
//     end: "top 0%", //start value % should always exceed end value %
//     scrub: true,
//   },
//   opacity: 0,
//   // duration: 2,
// });

gsap.from(".screen-3-p", {
  scrollTrigger: {
    trigger: ".screen-3",
    start: "top 20%",
    end: "top 0%", //start value % should always exceed end value %
    scrub: true,
    pin: true,
    //   markers: true,
  },
  opacity: 0,
  // duration: 2,
});

gsap.from(".screen-4-p", {
  scrollTrigger: {
    trigger: ".screen-4",
    start: "top 10%",
    end: "top 0%", //start value % should always exceed end value %
    scrub: true,
    pin: true,
    // markers: true,
  },
  opacity: 0,
  // duration: 2,
});

let paleTextTl = gsap.timeline();
paleTextTl.to(".screen-1-p, .screen-2-p, .screen-3-p", {
  scrollTrigger: {
    trigger: ".screen-4",
    start: "top 30%",
    end: "top 0%",
    scrub: true,
  },
  color: "#68ADAB",
});

// ScrollTrigger.create({
//   animation: paleTextTl,

// })

//stanza 2
gsap.from(".screen-5-p", {
  scrollTrigger: {
    trigger: ".screen-5",
    start: "top 20%",
    end: "top 0%",
    scrub: true,
    pin: true,
    //   markers: true,
  },
  opacity: 0,
});

gsap.from(".screen-6-p", {
  scrollTrigger: {
    trigger: ".screen-6",
    start: "top 10%",
    end: "top 0%",
    scrub: true,
    pin: true,
    //   markers: true,
  },
  opacity: 0,
});

gsap.to(".screen-5-canvas", {
  scrollTrigger: {
    trigger: ".screen-6",
    start: "top 40%",
    end: "top 20%",
    scrub: true,
  },
  filter: "blur(70px)"
});

gsap.from(".screen-7-p", {
  scrollTrigger: {
    trigger: ".screen-7",
    start: "top 20%",
    end: "top 0%",
    scrub: true,
    pin: true,
    pinSpacing: false,
    //   markers: true,
  },
  opacity: 0,
});


//   ending stanza
gsap.to(".stanza-1", {
  scrollTrigger: {
    trigger: ".screen-5",
    start: "top 30%",
    end: "top 0%",
    scrub: true,
  },
  yPercent: -50,
  color: "#68ADAB",
  opacity: 0.7,
  // duration: 2,
});
gsap.to(".stanza-1", {
  scrollTrigger: {
    trigger: ".screen-7",
    start: "top 40%",
    end: "top 20%",
    scrub: true,
    pinSpacing: false,
  },
  yPercent: -140,
});

gsap.to(".stanza-2", {
  yPercent: -75,
});

gsap.to(".stanza-3", {
  yPercent: -260,
});

gsap.to(".stanza-2", {
  scrollTrigger: {
    trigger: ".screen-7",
    start: "top 40%",
    end: "top 20%",
    scrub: true,
    pinSpacing: false,
  },
  yPercent: -180,
  color: "#68ADAB",
  opacity: 0.7,
  // duration: 2,
});

});


