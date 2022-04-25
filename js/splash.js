const splash = () => {
  const splash = document.getElementsByClassName("splash")[0];
  setTimeout(() => {
    splash.style.opacity = 0;
      document.body.style.overflowY = "scroll";
    setTimeout(() => {
      document.getElementsByClassName("title")[0].style.zIndex = 0;
      splash.style.display = "none";
    }, 800);
  }, 1800);
};

window.addEventListener("load", splash, {once: true});