/* ════════════════════════════════════════════════════════════
   LOVE MAGAZINE — Main Script
   lovemagazine.net-inspired full-bleed editorial experience
════════════════════════════════════════════════════════════ */

// ─── SECTION NAVIGATOR ──────────────────────────────────────
class SectionNavigator {
  constructor(onSectionChange) {
    this.track    = document.getElementById('mag-track');
    this.sections = document.querySelectorAll('.mag-section');
    this.navEl    = document.getElementById('section-nav');
    this.progress = document.getElementById('progress-fill');
    this.pgLabel  = document.getElementById('issue-tag');
    this.total    = this.sections.length;
    this.current  = 0;
    this.onSectionChange = onSectionChange;

    this.buildDots();
    this.bindScroll();
    this.bindSwipe();
    this.bindKeyboard();
    this.update(0);
  }

  buildDots() {
    if (!this.navEl) return;
    for (let i = 0; i < this.total; i++) {
      const d = document.createElement('button');
      d.className = 'sn-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Section ${i + 1}`);
      d.addEventListener('click', () => this.goTo(i));
      this.navEl.appendChild(d);
    }
  }

  goTo(index) {
    if (!this.track) return;
    const n = Math.max(0, Math.min(this.total - 1, index));
    const section = this.sections[n];
    if (section) {
      this.track.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
    }
  }

  update(index) {
    this.current = index;

    // update dots
    document.querySelectorAll('.sn-dot').forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });

    // update progress bar
    const pct = this.total > 1 ? (index / (this.total - 1)) * 100 : 0;
    if (this.progress) this.progress.style.width = pct + '%';

    // visible class for photo zoom
    this.sections.forEach((s, i) => {
      s.classList.toggle('visible', i === index);
    });

    this.onSectionChange(index);
  }

  bindScroll() {
    if (!this.track) return;
    let ticking = false;
    this.track.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = this.track.scrollTop;
          const vh = window.innerHeight;
          const idx = Math.round(scrollTop / vh);
          if (idx !== this.current) this.update(idx);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  bindSwipe() {
    if (!this.track) return;
    let sy = 0;
    this.track.addEventListener('touchstart', e => { sy = e.touches[0].clientY; }, { passive: true });
    this.track.addEventListener('touchend', e => {
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dy) > 40) {
        dy < 0 ? this.goTo(this.current + 1) : this.goTo(this.current - 1);
      }
    }, { passive: true });
  }

  bindKeyboard() {
    document.addEventListener('keydown', e => {
      const modOpen = !document.getElementById('story-modal').classList.contains('hidden') ||
                      !document.getElementById('lightbox').classList.contains('hidden') ||
                      document.getElementById('side-menu').classList.contains('open');
      if (modOpen) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); this.goTo(this.current + 1); }
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   { e.preventDefault(); this.goTo(this.current - 1); }
    });
  }
}

// ─── SIDE MENU ───────────────────────────────────────────────
class SideMenu {
  constructor(navigator) {
    this.menu    = document.getElementById('side-menu');
    this.overlay = document.getElementById('menu-overlay');
    this.btn     = document.getElementById('menu-btn');
    this.closeX  = document.getElementById('menu-close');
    this.nav     = navigator;

    this.bind();
  }

  open()  { this.menu.classList.add('open'); this.overlay.classList.add('active'); }
  close() { this.menu.classList.remove('open'); this.overlay.classList.remove('active'); }

  bind() {
    if (this.btn)    this.btn.addEventListener('click', () => this.open());
    if (this.closeX) this.closeX.addEventListener('click', () => this.close());
    if (this.overlay) this.overlay.addEventListener('click', () => this.close());

    document.querySelectorAll('.sm-links a').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const idx = parseInt(a.dataset.section);
        if (!isNaN(idx)) this.nav.goTo(idx);
        this.close();
      });
    });

    // home logo
    const logo = document.getElementById('home-logo');
    if (logo) logo.addEventListener('click', e => { e.preventDefault(); this.nav.goTo(0); });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.close();
    });
  }
}

// ─── COVER BUTTON ────────────────────────────────────────────
class CoverButton {
  constructor(navigator) {
    const btn = document.getElementById('cover-open');
    if (btn) btn.addEventListener('click', () => navigator.goTo(1));
  }
}

// ─── LOVE LETTER ─────────────────────────────────────────────
class LoveLetter {
  constructor() {
    this.seal   = document.getElementById('wax-seal');
    this.body   = document.getElementById('env-body');
    this.wrap   = document.getElementById('env-wrap');
    this.letter = document.getElementById('open-letter');
    this.twEl   = document.getElementById('tw-out');
    this.opened = false;
    this.timer  = null;

    const TEXT = "From the moment you entered my life, you've turned the ordinary into something extraordinary. Every smile you share, every warm embrace, and every quiet moment together has become a treasured memory I hold close. You are my anchor in the storm, my partner in laughter, and the love of my life. Thank you for being exactly who you are — and for making my world so incredibly beautiful. I love you, now and for all the pages yet to come.";

    if (this.seal) {
      this.seal.addEventListener('click', () => {
        if (this.opened) return;
        this.opened = true;
        if (this.body) this.body.classList.add('opened');
        setTimeout(() => {
          if (this.wrap)   this.wrap.style.display   = 'none';
          if (this.letter) this.letter.style.display = 'block';
          this.typewrite(TEXT);
        }, 900);
      });
    }
  }

  typewrite(text) {
    if (!this.twEl) return;
    this.twEl.textContent = '';
    let i = 0;
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (i < text.length) this.twEl.textContent += text[i++];
      else clearInterval(this.timer);
    }, 28);
  }

  reset() {
    this.opened = false;
    clearInterval(this.timer);
    if (this.wrap)   this.wrap.style.display   = 'block';
    if (this.letter) this.letter.style.display = 'none';
    if (this.body)   this.body.classList.remove('opened');
    if (this.twEl)   this.twEl.textContent = '';
  }
}

// ─── MOMENTS MODAL ───────────────────────────────────────────
class MomentsModal {
  constructor() {
    this.modal   = document.getElementById('story-modal');
    this.content = document.getElementById('modal-content');
    this.closeX  = document.getElementById('modal-x');

    this.stories = {
      travel: {
        title: '✈️ Wanderlust Together',
        text: 'Our wanderlust has taken us to breathtaking shorelines, winding mountain paths, and unfamiliar city streets. But no matter where we explore on this earth, the best view is always you — hand-in-hand, next to me. Here is to our future travels and the endless stamps on our hearts.'
      },
      food: {
        title: '🍔 Midnight Food Runs',
        text: 'From fancy candlelight dinners to late-night fast-food runs at 2:00 AM, sharing food with you is my favorite pastime. The laughter over messy burgers and secret snack hoards makes every bite taste like heaven. Food simply tastes better when shared with you.'
      },
      movies: {
        title: '🎬 Cozy Movie Nights',
        text: 'Snuggled under a mountain of blankets, whispering commentary during the scary scenes, and crying together at the romantic climaxes. Half the time I am watching your face light up from the screen\'s glow instead of the movie itself. You are my favorite cinema.'
      },
      laughter: {
        title: '😂 Our Inside Jokes',
        text: 'The secret glances, the silly code names, and the sudden bursts of laughter that nobody else understands. We have created a language of our own — built on absolute silliness and deep, joyful connection. Laughing with you is the sound of my home.'
      }
    };

    this.bind();
  }

  bind() {
    document.querySelectorAll('.story-card').forEach(card => {
      card.addEventListener('click', () => {
        const key = card.dataset.story;
        const s = this.stories[key];
        if (!s || !this.content) return;
        this.content.innerHTML = `<h3>${s.title}</h3><p>${s.text}</p>`;
        this.modal.classList.remove('hidden');
      });
    });

    const hide = () => this.modal.classList.add('hidden');
    if (this.closeX) this.closeX.addEventListener('click', hide);
    if (this.modal)  this.modal.addEventListener('click', e => { if (e.target === this.modal) hide(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
  }
}

// ─── LIGHTBOX ────────────────────────────────────────────────
class Lightbox {
  constructor() {
    this.lb    = document.getElementById('lightbox');
    this.img   = document.getElementById('lb-img');
    this.closeX = document.getElementById('lb-x');

    document.querySelectorAll('.lb-trigger').forEach(el => {
      el.addEventListener('click', () => {
        if (!this.img || !this.lb) return;
        this.img.src = el.src;
        this.lb.classList.remove('hidden');
      });
    });

    const hide = () => this.lb.classList.add('hidden');
    if (this.closeX) this.closeX.addEventListener('click', hide);
    if (this.lb) this.lb.addEventListener('click', e => { if (e.target === this.lb) hide(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
  }
}

// ─── MUSIC PLAYER ────────────────────────────────────────────
class MusicPlayer {
  constructor() {
    this.audio   = document.getElementById('bg-audio');
    this.musicBtn = document.getElementById('music-btn');
    this.playBtn = document.getElementById('play-btn');
    this.vinyl   = document.getElementById('vinyl');
    this.arm     = document.getElementById('vinyl-arm');
    this.npTitle = document.getElementById('np-title');
    this.eqBars  = document.querySelectorAll('.eq-b');
    this.rows    = document.querySelectorAll('.pl-row');
    this.eqTimer = null;
    this.playing = false;

    if (this.audio) this.audio.volume = 0.4;
    this.bind();
  }

  bind() {
    if (this.musicBtn) this.musicBtn.addEventListener('click', () => this.toggle());
    if (this.playBtn)  this.playBtn.addEventListener('click', () => this.toggle());

    this.rows.forEach(row => {
      row.addEventListener('click', () => {
        this.rows.forEach(r => r.classList.remove('pl-active'));
        row.classList.add('pl-active');
        if (this.audio) {
          this.audio.src = row.dataset.src;
          this.audio.play().catch(() => {});
        }
        if (this.npTitle) this.npTitle.textContent = row.dataset.title;
        this.setPlaying(true);
      });
    });

    if (this.audio) {
      this.audio.addEventListener('play',  () => this.setPlaying(true));
      this.audio.addEventListener('pause', () => this.setPlaying(false));
    }
  }

  toggle() {
    if (!this.audio) return;
    this.audio.paused ? this.audio.play().catch(() => {}) : this.audio.pause();
  }

  setPlaying(on) {
    this.playing = on;
    if (this.vinyl)   this.vinyl.classList.toggle('playing', on);
    if (this.arm)     this.arm.classList.toggle('playing', on);
    if (this.playBtn) this.playBtn.textContent = on ? '⏸ Pause Record' : '▶ Play Record';
    if (this.musicBtn) this.musicBtn.textContent = on ? '♫' : '♪';
    on ? this.startEq() : this.stopEq();
  }

  startEq() {
    if (this.eqTimer) return;
    this.eqTimer = setInterval(() => {
      this.eqBars.forEach(b => { b.style.height = (Math.random() * 42 + 6) + 'px'; });
    }, 110);
  }

  stopEq() {
    clearInterval(this.eqTimer); this.eqTimer = null;
    this.eqBars.forEach(b => { b.style.height = '4px'; });
  }
}

// ─── FILM PLAYER ─────────────────────────────────────────────
class FilmPlayer {
  constructor() {
    this.screen = document.getElementById('film-screen');
    if (!this.screen) return;
    this.screen.addEventListener('click', () => {
      if (this.screen.querySelector('video')) return;
      const a = document.getElementById('bg-audio');
      if (a && !a.paused) a.pause();
      const v = document.createElement('video');
      v.src = 'video.mp4';
      v.autoplay = true; v.loop = true; v.controls = true;
      v.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:10;border-radius:inherit;';
      this.screen.appendChild(v);
    });
  }
}

// ─── FINALE HEARTS ───────────────────────────────────────────
class FinaleHearts {
  constructor() {
    this.layer = document.getElementById('hearts-rain');
    this.btn   = document.getElementById('fin-btn');
    if (this.btn) this.btn.addEventListener('click', () => this.burst(30));
  }

  burst(n) {
    if (!this.layer) return;
    const em = ['❤️','💖','💝','💗','🌸','✨','💕','🌹'];
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        const h = document.createElement('span');
        h.textContent = em[Math.floor(Math.random() * em.length)];
        const dur = Math.random() * 3 + 3.5;
        h.style.cssText = `
          position:absolute;
          left:${Math.random() * 94 + 3}%;
          top:-40px;
          font-size:${Math.random() * 1.5 + 0.7}rem;
          pointer-events:none;
          animation:heartRain ${dur}s linear forwards;
          animation-delay:${Math.random() * 0.4}s;
        `;
        this.layer.appendChild(h);
        setTimeout(() => h.remove(), (dur + 1) * 1000);
      }, i * 90);
    }
  }
}

// ─── MEM CELL LIGHTBOX ────────────────────────────────────────
class MemoryLightbox {
  constructor(lb) {
    document.querySelectorAll('.mem-cell img, .essay-cell img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        const lbEl = document.getElementById('lightbox');
        const lbImg = document.getElementById('lb-img');
        if (lbEl && lbImg) {
          lbImg.src = img.src;
          lbEl.classList.remove('hidden');
        }
      });
    });
  }
}

// ─── SECTION CHANGE HANDLER ──────────────────────────────────
let _letter, _hearts;

function onSectionChange(index) {
  // Reset letter when leaving section 4
  if (index !== 4 && _letter) {
    // Don't auto-reset so user can come back to read
  }
  // Trigger hearts on finale
  if (index === 9 && _hearts) {
    setTimeout(() => _hearts.burst(16), 600);
  }
}

// ─── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const nav = new SectionNavigator(onSectionChange);

  new SideMenu(nav);
  new CoverButton(nav);

  _letter = new LoveLetter();
  _hearts = new FinaleHearts();

  new MomentsModal();
  new Lightbox();
  new MemoryLightbox();
  new MusicPlayer();
  new FilmPlayer();
});
