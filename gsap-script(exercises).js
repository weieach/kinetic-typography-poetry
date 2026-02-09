document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText);
  let smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 2,
    effects: true,
  });

  let split = SplitText.create(".text-split", {
    type: "chars, words, lines",
    wordsClass: "word++",
    onSplit: (self) => {
      gsap.from(self.chars, {
        yPercent: "random([-100, 100])",
        rotation: "random(-30, 30)",
        autoAlpha: 0,
        smartWrap: true,
        repeat: -1,
        // yoyo: true,
        repeatDelay: 3,
        stagger: {
          amount: 1,
          from: "random",
        },
      });
    },
  });

  let floatTween;

  SplitText.create(".text-float", {
    type: "lines",
    autoSplit: true,
    smartWrap: true,
    onSplit: (self) => {
      floatTween = gsap.from(self.lines, {
        stagger: 0.1,
        opacity: 0,
        yPercent: 60,
        duration: 2,
        paused: true,
        // repeat: -1,
        // yoyo: true,
      });
      return floatTween;
    },
  });

  if (floatTween) {
    ScrollTrigger.create({
      trigger: ".text-float-section",
      start: "top bottom",
      end: "bottom top",
      onEnter: () => gsap.delayedCall(1.5, () => floatTween.play()),
      onEnterBack: () => gsap.delayedCall(2, () => floatTween.play()),
      onLeaveBack: () => floatTween.pause(0),
    });
  }
});
