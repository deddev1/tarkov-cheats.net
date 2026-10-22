export const HERO_AUTOPLAY_MS = 4800;

type EmblaApi = {
  selectedScrollSnap: () => number;
  scrollTo: (n: number) => void;
  on: (event: string, cb: () => void) => void;
};

type AutoplayPlugin = {
  stop: () => void;
  play: () => void;
  reset?: () => void;
};

function restartProgress(progressEl: HTMLElement) {
  progressEl.style.animation = 'none';
  void progressEl.offsetWidth;
  progressEl.style.animation = `hero-embla-progress ${HERO_AUTOPLAY_MS}ms linear forwards`;
}

function bindHeroDots(wrapper: HTMLElement, api: EmblaApi, autoplay: AutoplayPlugin) {
  const dotsRoot = wrapper.querySelector('[data-hero-embla-dots]');
  if (!dotsRoot) return;

  const dots = Array.from(dotsRoot.querySelectorAll<HTMLButtonElement>('[data-hero-embla-dot]'));

  const syncProgress = () => {
    const index = api.selectedScrollSnap();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    dots.forEach((dot, i) => {
      const progress = dot.querySelector<HTMLElement>('[data-hero-embla-progress]');
      if (!progress) return;

      progress.style.animation = 'none';
      progress.style.width = i === index && reducedMotion ? '100%' : '0%';

      if (i === index && !reducedMotion) {
        restartProgress(progress);
      }
    });
  };

  const setActive = () => {
    const index = api.selectedScrollSnap();
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.dataset.active = active ? 'true' : 'false';
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    syncProgress();
  };

  dots.forEach((dot) => {
    const index = Number(dot.getAttribute('data-hero-embla-dot'));
    dot.addEventListener('click', () => {
      api.scrollTo(index);
      autoplay.reset?.();
      autoplay.play();
    });
  });

  api.on('select', setActive);
  api.on('reInit', setActive);
  setActive();
}

async function initHeroCarousels(root: ParentNode = document) {
  const nodes = [...root.querySelectorAll<HTMLElement>('[data-hero-embla]')].filter(
    (node) => node.dataset.heroEmblaReady !== 'true',
  );
  if (!nodes.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [{ createCarousel }, { default: Autoplay }] = await Promise.all([
    import('@starwind-ui/runtime/carousel'),
    import('embla-carousel-autoplay'),
  ]);

  nodes.forEach((carouselRoot) => {
    const wrapper = carouselRoot.closest('[data-hero-embla-wrap]');
    if (!wrapper) return;

    carouselRoot.dataset.heroEmblaReady = 'true';

    const autoplay = Autoplay({
      delay: HERO_AUTOPLAY_MS,
      playOnInit: !reducedMotion,
      // Keep looping after drag/dot/focus — homepage scroller should not die on first click.
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: false,
    });

    const instance = createCarousel(carouselRoot, {
      opts: { loop: true, align: 'start', duration: 20 },
      plugins: [autoplay],
    });

    bindHeroDots(wrapper as HTMLElement, instance.api as EmblaApi, autoplay);

    if (reducedMotion) {
      autoplay.stop();
      return;
    }

    const resumeIfVisible = () => {
      if (document.hidden) return;
      const rect = carouselRoot.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      if (inView) autoplay.play();
    };

    const pauseWhenHidden = () => {
      if (document.hidden) autoplay.stop();
      else resumeIfVisible();
    };
    document.addEventListener('visibilitychange', pauseWhenHidden);

    // Resume after hover pause (plugin stops on enter; we restart on leave).
    wrapper.addEventListener('mouseleave', resumeIfVisible);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && !document.hidden) autoplay.play();
        else autoplay.stop();
      },
      { threshold: 0, rootMargin: '80px 0px' },
    );
    io.observe(carouselRoot);

    requestAnimationFrame(resumeIfVisible);
  });
}

export function setupHeroEmbla() {
  const run = () => {
    void initHeroCarousels();
  };

  run();
  document.addEventListener('astro:page-load', run);
}
