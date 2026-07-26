"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const routeName = (pathname) => {
  const path = pathname?.replace(/^\/en(?=\/|$)/, "") || "/";
  if (path === "/") return "home";
  if (path.startsWith("/about")) return "about";
  if (path.startsWith("/projects")) return "projects";
  if (path.startsWith("/articles/")) return "article";
  if (path.startsWith("/articles")) return "articles";
  if (path.startsWith("/contact")) return "contact";
  return "default";
};

export default function SiteMotion() {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => {
    document.body.dataset.route = routeName(pathname);
  }, [pathname]);

  useLayoutEffect(() => {
    if (reduced) return undefined;

    let context;
    const frame = requestAnimationFrame(() => {
      context = gsap.context(() => {
        gsap.utils.toArray(".jre-reveal").forEach((item) => {
          gsap.fromTo(
            item,
            {
              autoAlpha: 0,
              y: 76,
              clipPath: "inset(0 0 18% 0)",
            },
            {
              autoAlpha: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 88%",
                once: true,
              },
            },
          );
        });

        const indexLinks = gsap.utils.toArray(".jre-index a");
        if (indexLinks.length) {
          gsap.fromTo(
            indexLinks,
            { autoAlpha: 0, x: 50 },
            {
              autoAlpha: 1,
              x: 0,
              duration: .72,
              stagger: .09,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".jre-index nav",
                start: "top 85%",
                once: true,
              },
            },
          );
        }

        gsap.utils.toArray(".jre-section-title h2").forEach((heading) => {
          gsap.fromTo(
            heading,
            { autoAlpha: 0, yPercent: 72, rotate: 1.5 },
            {
              autoAlpha: 1,
              yPercent: 0,
              rotate: 0,
              duration: 1.05,
              ease: "power4.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 90%",
                once: true,
              },
            },
          );
        });

        const benefitCards = gsap.utils.toArray(".jre-benefit__content article");
        benefitCards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              autoAlpha: 0,
              x: index % 2 ? 80 : -80,
              rotate: index % 2 ? 1.2 : -1.2,
            },
            {
              autoAlpha: 1,
              x: 0,
              rotate: 0,
              duration: 1.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 86%",
                once: true,
              },
            },
          );
        });

        const workRows = gsap.utils.toArray(".jre-work-row");
        if (workRows.length) {
          gsap.fromTo(
            workRows,
            { autoAlpha: 0, x: -70 },
            {
              autoAlpha: 1,
              x: 0,
              duration: .9,
              stagger: .12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".jre-work__list",
                start: "top 84%",
                once: true,
              },
            },
          );
        }

        const imageMarquee = document.querySelector(".jre-image-marquee");
        if (imageMarquee) {
          gsap.fromTo(
            imageMarquee,
            { clipPath: "inset(0 100% 0 0)", scale: .94 },
            {
              clipPath: "inset(0 0% 0 0)",
              scale: 1,
              duration: 1.25,
              ease: "power4.inOut",
              scrollTrigger: {
                trigger: imageMarquee,
                start: "top 86%",
                once: true,
              },
            },
          );
        }

        const careerTimeline = document.querySelector(".jre-about-timeline");
        const careerLine = gsap.utils
          .toArray(".jre-about-timeline__line")
          .find((line) => window.getComputedStyle(line).display !== "none");
        const careerRoute = careerLine?.querySelector(".jre-about-timeline__route");
        const careerProgress = careerLine?.querySelector(".jre-about-timeline__progress");
        const careerTrain = document.querySelector(".jre-about-timeline__train");
        const careerStops = gsap.utils.toArray(".jre-career-stop");

        if (careerTimeline && careerRoute && careerProgress && careerTrain && careerStops.length) {
          const routeLength = careerProgress.getTotalLength();
          gsap.set(careerProgress, {
            strokeDasharray: routeLength,
            strokeDashoffset: routeLength,
          });

          gsap.to(
            careerProgress,
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: careerTimeline,
                start: "top 68%",
                end: "bottom 70%",
                scrub: .55,
              },
            },
          );

          gsap.set(careerTrain, { autoAlpha: 1 });
          gsap.to(careerTrain, {
            ease: "none",
            motionPath: {
              path: careerRoute,
              align: careerRoute,
              alignOrigin: [.5, .5],
              start: 0,
              end: 1,
            },
            scrollTrigger: {
              trigger: careerTimeline,
              start: "top 68%",
              end: "bottom 70%",
              scrub: .45,
            },
          });

          const mobileTimeline = window.matchMedia("(max-width: 820px)").matches;
          careerStops.forEach((stop, index) => {
            const card = stop.querySelector(".jre-about-job__card");
            const meta = stop.querySelector(".jre-about-job__meta");
            const station = stop.querySelector(".jre-about-job__station");

            gsap.fromTo(
              card,
              {
                autoAlpha: 0,
                x: mobileTimeline ? 34 : 72,
                rotate: mobileTimeline ? .4 : .8,
              },
              {
                autoAlpha: 1,
                x: 0,
                rotate: 0,
                duration: .95,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: stop,
                  start: "top 82%",
                  once: true,
                },
              },
            );

            gsap.fromTo(
              meta,
              {
                autoAlpha: 0,
                x: mobileTimeline ? 24 : -48,
              },
              {
                autoAlpha: 1,
                x: 0,
                duration: .8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: stop,
                  start: "top 82%",
                  once: true,
                },
              },
            );

            gsap.fromTo(
              station,
              { scale: .45, rotate: -22 },
              {
                scale: 1,
                rotate: 0,
                duration: .65,
                ease: "back.out(2.4)",
                scrollTrigger: {
                  trigger: stop,
                  start: "top 82%",
                  once: true,
                },
              },
            );
          });
        }
      });
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(frame);
      context?.revert();
    };
  }, [pathname, reduced]);

  if (routeName(pathname) === "home") return null;

  return (
    <motion.div
      key={pathname}
      className="jre-route-wipe"
      aria-hidden="true"
      initial={reduced ? false : { scaleY: 1, transformOrigin: "top" }}
      animate={{ scaleY: 0, transformOrigin: "bottom" }}
      transition={{ duration: reduced ? 0 : 0.65, ease: [0.76, 0, 0.24, 1] }}
    />
  );
}
