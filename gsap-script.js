// document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText)
    
    let smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 2, 
        effects: true,
    })
    let footstepBlur = document.querySelector(".footstep-blur")
    let footstepTl = gsap.timeline();
    if (footstepBlur) {
        footstepBlur.addEventListener('mouseenter', () => {
            footstepTl.to(".footstep-blur", {
                filter: "blur(0px)"
            })
            .to(".screen-1-canvas", {
                delay: 0.5,
                filter: "blur(60px)",
                duration: 2,
            })
            .set(".canvas-array", {
              height: "fit-content", 
              overflow: "auto"
            })
        })
    }

    gsap.from(".screen-2-p", {
        scrollTrigger: {
          trigger: ".screen-2",
          start: "top 20%", 
          end: "top 0%", //start value % should always exceed end value %
          scrub: true,
        //   pin: true,
        //   markers: true,
        },
        opacity: 0,
        // duration: 2,
      });

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
          start: "top 20%", 
          end: "top 0%", //start value % should always exceed end value %
          scrub: true,
          pin: true,
        //   markers: true,
        },
        opacity: 0,
        // duration: 2,
      });

      
    //   ending stanza
    gsap.to(".stanza-1", {
        scrollTrigger: {
          trigger: ".screen-3",
          start: "top 20%", 
          end: "top 0%", //start value % should always exceed end value %
          scrub: true,
        },
        yPercent: -100,
        opacity: 0.5,
        // duration: 2,
      });

      gsap.to(".stanza-2", {
        yPercent: -100,
      })

    
// });