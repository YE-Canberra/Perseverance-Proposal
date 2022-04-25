const timelinePg = document.getElementsByClassName("timelinePage")[0];
const dates = document.getElementsByClassName("timeline")[0].getElementsByTagName("span");
const title = document.getElementsByClassName("title")[0];
const body = document.body;
const toTop = document.getElementsByClassName("toTop")[0];

const maxLax = 100;
const titleH = 50 + 16*2;

const parallaxScroll = () => {
  const fullScroll = body.scrollHeight - document.body.clientHeight;
  const scrollFrac = body.scrollTop / fullScroll;
  body.style.backgroundPositionY = `-${scrollFrac * maxLax}px`;

  if (body.scrollTop < titleH) {
    if (document.getElementsByClassName("hiddenTitle").length) {
      title.classList.remove("hiddenTitle");
      toTop.classList.add("hiddenToTop");
    }
  } else if (!document.getElementsByClassName("hiddenTitle").length) {
    title.classList.add("hiddenTitle");
    toTop.classList.remove("hiddenToTop");
  }

  if (isInVertView(timelinePg, 300)) {
    for (i=0; i<dates.length; i++) {
      dates[i].classList.remove('hiddenDate');
    }
  }
};

const isInVertView = (elem, margin = 0) => {
  const rect = elem.getBoundingClientRect();
  return (
    ( rect.top >= 0 && rect.top < (window.innerHeight - margin || document.documentElement.clientHeight - margin) ) ||
    ( rect.bottom >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) )
  );
}

const setupPage = () => {
  for (i=0; i<dates.length; i++) {
    dates[i].classList.add('hiddenDate');
  }
};

setupPage();
document.body.addEventListener('scroll', parallaxScroll, {passive: true});