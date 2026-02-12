
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText);

  const pageLoader = document.querySelector(".page-loader");
  if (pageLoader) {
    window.addEventListener("load", () => {
      pageLoader.classList.add("is-hidden");
    });
  }

  let smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 2,
    effects: true,
  });
  const audio = document.querySelector("header audio");
  const audioButton = document.querySelector(".btn-music");
  if (audio && audioButton) {
    const updateAudioIcon = () => {
      audioButton.innerHTML = audio.muted
        ? '<i class="ph-fill ph-speaker-simple-x"></i>'
        : '<i class="ph-fill ph-speaker-simple-high"></i>';
    };

    updateAudioIcon();

    audioButton.addEventListener("click", () => {
      audio.muted = !audio.muted;
      if (audio.muted) {
        audio.setAttribute("muted", "");
      } else {
        audio.removeAttribute("muted");
      }
      updateAudioIcon();
    });
  }


gsap.to(".ph-fill.ph-caret-left", {
  opacity: 1,
  // xPercent: 15,
  duration: 0.8,
  repeat: -1,
  yoyo: true,
  ease: "power2.inOut",
});

  let footstepBlur = document.querySelector(".footstep-blur");
  let footstepTl = gsap.timeline();
  if (footstepBlur) {
    footstepBlur.addEventListener("mouseenter", () => {
      footstepTl
        .to(".screen-1-p .ph-fill.ph-caret-left", {
          display: "none",
        })
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

    for (let line of poemTitle) {
      gsap.from(line, {
        // opacity: 0,
        filter: "blur(40px)",
        duration: 1.5,
        delay: 0.75,
      })
    };

    const poemInfo = document.querySelectorAll(".poem-info");
    for (let info of poemInfo) {
      gsap.from(info, {
        opacity: 0,
        duration: 1,
        delay: 2,
      })
    };

    const tags = document.querySelectorAll(".tag");
    for (let tag of tags) {
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
    rotateY: 50,
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

  gsap.from(".screen-8-p", {
    scrollTrigger: {
      trigger: ".screen-8",
      start: "top 25%",
      end: "top 15%",
      scrub: true,
      pin: true,
      pinSpacing: false,
      //   markers: true,
    },
    opacity: 0,
  });

  gsap.from(".screen-9-p", {
    scrollTrigger: {
      trigger: ".screen-9",
      start: "top 10%",
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
  gsap.to(".stanza-1, .stanza-2", {
    scrollTrigger: {
      trigger: ".screen-7",
      start: "top 40%",
      end: "top 20%",
      scrub: true,
      pinSpacing: false,
    },
    y: -80,
  });
  // gsap.to(".stanza-1", {
  //   scrollTrigger: {
  //     trigger: ".screen-8",
  //     start: "top 40%",
  //     end: "top 20%",
  //     scrub: true,
  //     pinSpacing: false,
  //   },
  //   yPercent: -200,
  // });



  const stanza2Trigger = gsap.to(".stanza-2", {
    scrollTrigger: {
      trigger: ".screen-7",
      start: "top 40%",
      end: "top 20%",
      scrub: true,
      pinSpacing: false,
    },
    // yPercent: -180,
    color: "#68ADAB",
  });



  const stanzaFadeTrigger = gsap.to(".stanza-1, .stanza-2, .stanza-3", {
    scrollTrigger: {
      trigger: ".screen-8",
      start: "top 40%",
      end: "top 20%",
      scrub: true,
      pinSpacing: false,
    },
    y: -220,
    // opacity: 0,
  });


  const stanza3Trigger = gsap.to(".stanza-3", {
    scrollTrigger: {
      trigger: ".screen-8",
      start: "top 40%",
      end: "top 20%",
      scrub: true,
      pinSpacing: false,
    },
    y: -130,
    color: "#68ADAB",
  });



  gsap.to(".stanza-2", {
    yPercent: -75,
  });

  gsap.to(".stanza-3", {
    yPercent: -280,
  });

  gsap.to(".stanza-4", {
    yPercent: -520,
  });

  const screen8Video = document.querySelector(".screen-8-video");
  const brushBlur = document.querySelector(".brush-blur");
  if (screen8Video) {
    screen8Video.removeAttribute("autoplay");
    screen8Video.removeAttribute("loop");
  }
  if (brushBlur) {
    brushBlur.addEventListener("mouseenter", () => {
      gsap
        .timeline()
        .to(".blur-text.brush-blur", {
          filter: "blur(0px)",
        })
        .set(".screen-9-p .ph-caret-left", {
          display: "none",
        })
        .to(".stanza-1, .stanza-2, .stanza-3", {
          delay: 1.5,
          opacity: 1,
          duration: 0.6,
          overwrite: "auto",
        })
      if (screen8Video) {
        screen8Video.setAttribute("autoplay", "");
        screen8Video.setAttribute("loop", "");
        screen8Video.play();
      }
      

    });
  }

});
