import "./App.css";
import { useEffect } from "react";
import { Power2, TimelineMax } from "gsap/all";

function App() {
  useEffect(() => {
    const overlay = document.querySelector(".shape-overlays");
    const paths = document.querySelectorAll(".shape-overlays__path");

    let numPoints = 10;
    let numPaths = paths.length;
    let delayPointsMax = 0.3;
    let delayPerPath = 0.25;
    let duration = 0.9;
    let isOpened = false;
    let pointsDelay = [];
    let allPoints = [];
    let ease = Power2.easeInOut;

    const tl = new TimelineMax({ onUpdate: render });

    for (let i = 0; i < numPaths; i++) {
      let points = [];
      allPoints.push(points);
      for (let j = 0; j < numPoints; j++) {
        points.push(100);
      }
    }

    overlay.addEventListener("click", onClick);
    toggle();

    function onClick() {
      if (!tl.isActive()) {
        isOpened = !isOpened;
        toggle();
      }
    }

    function toggle() {
      tl.progress(0).clear();

      for (let i = 0; i < numPoints; i++) {
        pointsDelay[i] = Math.random() * delayPointsMax;
      }

      for (let i = 0; i < numPaths; i++) {
        let points = allPoints[i];
        let pathDelay = delayPerPath * (isOpened ? i : numPaths - i - 1);

        for (let j = 0; j < numPoints; j++) {
          let config = {
            ease: ease,
          };
          config[j] = 0;
          let delay = pointsDelay[j];

          tl.to(points, duration, config, delay + pathDelay);
          // tl.to(points, duration - delay, config, delay + pathDelay);
        }
      }
    }

    function render() {
      for (let i = 0; i < numPaths; i++) {
        let path = paths[i];
        let points = allPoints[i];

        let d = "";
        d += isOpened ? `M 0 0 V ${points[0]} C` : `M 0 ${points[0]} C`;

        for (let j = 0; j < numPoints - 1; j++) {
          let p = ((j + 1) / (numPoints - 1)) * 100;
          let cp = p - ((1 / (numPoints - 1)) * 100) / 2;
          d += ` ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${
            points[j + 1]
          }`;
        }

        d += isOpened ? ` V 100 H 0` : ` V 0 H 0`;
        path.setAttribute("d", d);
      }
    }
  }, []);
  return (
    <div className="App">
      <svg
        className="shape-overlays"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#00c99b" />
            <stop offset="100%" stop-color="#ff0ea1" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffd392" />
            <stop offset="100%" stop-color="#ff3898" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#110046" />
            <stop offset="100%" stop-color="#32004a" />
          </linearGradient>
        </defs>
        <path className="shape-overlays__path" fill="url(#gradient1)"></path>
        <path className="shape-overlays__path" fill="url(#gradient2)"></path>
        <path className="shape-overlays__path" fill="url(#gradient3)"></path>
      </svg>
    </div>
  );
}

export default App;
