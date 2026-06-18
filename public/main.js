// Interactive Digital Love Magazine - Main JavaScript Logic
class StardustCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.active = true;
        this.resize();
        this.initParticles();
        this.bindEvents();
        this.animate();
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initParticles() {
        this.particles = [];
        const count = Math.min(60, Math.floor(window.innerWidth / 20));
        for (let i = 0; i < count; i++) {
            this.particles.push(this.createParticle(true));
        }
    }

    createParticle(randomY = false) {
        return {
            x: Math.random() * this.canvas.width,
            y: randomY ? Math.random() * this.canvas.height : this.canvas.height + 10,
            size: Math.random() * 2 + 0.5,
            speedY: Math.random() * 0.5 + 0.15,
            speedX: Math.random() * 0.3 - 0.15,
            opacity: Math.random() * 0.5 + 0.2,
            pulseSpeed: Math.random() * 0.02 + 0.005,
            pulseDir: 1
        };
    }

    animate() {
        if (!this.active || !this.canvas) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((p, idx) => {
            p.y -= p.speedY;
            p.x += p.speedX + Math.sin(p.y * 0.006) * 0.15; // wave drift
            
            // pulse opacity
            p.opacity += p.pulseSpeed * p.pulseDir;
            if (p.opacity > 0.8) {
                p.pulseDir = -1;
            } else if (p.opacity < 0.15) {
                p.pulseDir = 1;
            }

            // Draw glowing star particle
            this.ctx.beginPath();
            const glow = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
            glow.addColorStop(0, `rgba(223, 186, 92, ${p.opacity})`);
            glow.addColorStop(0.5, `rgba(223, 186, 92, ${p.opacity * 0.3})`);
            glow.addColorStop(1, 'rgba(223, 186, 92, 0)');
            this.ctx.fillStyle = glow;
            this.ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
            this.ctx.fill();

            // Reset particle when it leaves viewport
            if (p.y < -10 || p.x < -10 || p.x > this.canvas.width + 10) {
                this.particles[idx] = this.createParticle(false);
            }
        });

        requestAnimationFrame(() => this.animate());
    }

    stop() {
        this.active = false;
        if (this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}

class AmbientParticles {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.timer = null;
    }

    start() {
        if (!this.container) return;
        this.container.classList.remove('hidden');
        this.timer = setInterval(() => this.spawnParticle(), 2200);
        // pre-populate some
        for (let i = 0; i < 6; i++) {
            this.spawnParticle(true);
        }
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        if (this.container) {
            this.container.innerHTML = '';
            this.container.classList.add('hidden');
        }
    }

    spawnParticle(randomHeight = false) {
        if (!this.container) return;
        const particle = document.createElement('span');
        particle.className = 'ambient-float-particle';
        
        const size = Math.random() * 8 + 6;
        const isHeart = Math.random() > 0.55;
        particle.innerHTML = isHeart ? '❤️' : '✨';
        particle.style.fontSize = `${size}px`;
        particle.style.left = `${Math.random() * 95}%`;
        particle.style.top = randomHeight ? `${Math.random() * 80 + 10}%` : '105%';
        particle.style.opacity = `${Math.random() * 0.25 + 0.08}`;
        
        // CSS transitions for smooth GPU motion
        particle.style.transform = 'translate3d(0, 0, 0)';
        this.container.appendChild(particle);
        
        // Trigger float
        setTimeout(() => {
            const destX = Math.random() * 120 - 60;
            const destY = -(window.innerHeight + 150);
            const rot = Math.random() * 360;
            particle.style.transform = `translate3d(${destX}px, ${destY}px, 0) rotate(${rot}deg)`;
            particle.style.opacity = '0';
        }, 50);

        // Delete from DOM
        setTimeout(() => {
            particle.remove();
        }, 11000);
    }
}

class WowMomentsApp {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 12;
        this.typewriterTimer = null;
        this.eqInterval = null;
        this.lastPageTurnTime = 0;
        this.pageTurnCooldown = 1500; // Match slow transitions
        
        this.stardust = new StardustCanvas('stardust-canvas');
        this.ambient = new AmbientParticles('ambient-particles');

        this.letterText = "From the moment you entered my life, you've turned the ordinary into the extraordinary. Every smile you share, every warm embrace we compile, and every quiet moment we spend together has become a treasured memory. You are my anchor in the storm, my partner in laughter, and the love of my life. Thank you for being exactly who you are, and for making my world so incredibly beautiful. I love you, now and for all the pages yet to come.";

        this.momentStories = {
            travel: {
                title: "✈️ Travel Memories",
                text: "Our wanderlust has taken us to breathtaking shorelines, winding mountain paths, and unfamiliar city streets. But no matter where we explore on this earth, the best view is always you, hand-in-hand, next to me. Here is to our future travels and the endless stamps on our hearts."
            },
            food: {
                title: "🍔 Late Night Food Runs",
                text: "From fancy candlelight dinners to late-night fast-food runs at 2:00 AM, sharing food with you is my favorite pastime. The laughter over messy burgers and secret snack hoards makes every bite taste like heaven. Food tastes better when shared with you."
            },
            movies: {
                title: "🎬 Cozy Movie Nights",
                text: "Snuggled under a mountain of blankets, whispering commentary during the scary scenes, and crying at the romantic climaxes. Half the time, I'm watching your face light up from the screen's glow instead of the movie itself. You are my favorite cinema."
            },
            laughter: {
                title: "😂 Our Inside Jokes",
                text: "The secret glances, the silly code names, and the sudden bursts of laughter that nobody else understands. We have created a language of our own, built on absolute silliness and deep, joyful connection. Laughing with you is the sound of my home."
            }
        };

        this.setupExtraStyles();
        this.setupEventListeners();
        this.setupAudioSync();
        this.setupTimelineNodes();
        this.setupMomentsModal();
        this.setupVideoPlayer();
        this.setupTurntablePlaylist();
        this.setupPinterestLightbox();
    }

    setupExtraStyles() {
        // Append CSS rules for float particles and scrollbar custom hides
        const style = document.createElement('style');
        style.textContent = `
            .ambient-float-particle {
                position: absolute;
                pointer-events: none;
                z-index: 1;
                transition: transform 10.5s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 10.5s ease-out;
            }
            @keyframes fall {
                to {
                    transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        // Opening Curtain Enter Button
        const enterBtn = document.getElementById('enter-magazine-btn');
        if (enterBtn) {
            enterBtn.addEventListener('click', () => {
                const audio = document.getElementById('piano-music');
                if (audio) {
                    audio.play().catch(err => console.log("Audio autoplay restricted. Music toggle enabled."));
                }
                
                const curtain = document.getElementById('opening-screen');
                if (curtain) {
                    curtain.classList.add('fade-out');
                    setTimeout(() => {
                        curtain.style.display = 'none';
                        this.stardust.stop();
                    }, 1200);
                }

                // Show magazine screen & elements
                const magScreen = document.getElementById('magazine-screen');
                if (magScreen) {
                    magScreen.classList.add('active');
                }

                const musicToggle = document.getElementById('music-toggle-btn');
                if (musicToggle) {
                    musicToggle.classList.remove('hidden');
                }

                this.ambient.start();
                this.jumpToPage(1); // Set to cover page
            });
        }

        // Back/Home Button inside Magazine
        const backBtn = document.querySelector('.back-btn-magazine');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                const curtain = document.getElementById('opening-screen');
                if (curtain) {
                    curtain.style.display = 'flex';
                    curtain.classList.remove('fade-out');
                }
                this.stardust = new StardustCanvas('stardust-canvas');
                
                const magScreen = document.getElementById('magazine-screen');
                if (magScreen) {
                    magScreen.classList.remove('active');
                }

                const musicToggle = document.getElementById('music-toggle-btn');
                if (musicToggle) {
                    musicToggle.classList.add('hidden');
                }

                this.ambient.stop();
            });
        }

        // Magazine Nav Buttons
        const prevBtn = document.getElementById('prev-page-btn');
        const nextBtn = document.getElementById('next-page-btn');
        if (prevBtn) prevBtn.addEventListener('click', () => this.prevPage());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextPage());

        // Keyboard Arrow Navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevPage();
            } else if (e.key === 'ArrowRight') {
                this.nextPage();
            }
        });

        // Swipe Gestures for Mobile & Pointer Drag for Desktop
        const magazine = document.getElementById('magazine');
        if (magazine) {
            let startX = 0;
            let startY = 0;
            let isDragging = false;

            magazine.addEventListener('touchstart', (e) => {
                startX = e.changedTouches[0].clientX;
                startY = e.changedTouches[0].clientY;
            }, { passive: true });

            magazine.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                this.handleSwipe(startX, endX, startY, endY);
            }, { passive: true });

            magazine.addEventListener('mousedown', (e) => {
                // Ignore dragging inside interactive controls
                if (e.target.closest('button, input, a, .wax-envelope, .play-song-row, .moment-tile, .lightbox-trigger')) return;
                startX = e.clientX;
                startY = e.clientY;
                isDragging = true;
            });

            magazine.addEventListener('mouseup', (e) => {
                if (!isDragging) return;
                isDragging = false;
                this.handleSwipe(startX, e.clientX, startY, e.clientY);
            });

            magazine.addEventListener('mouseleave', () => {
                isDragging = false;
            });
        }

        // Throttled Mouse Wheel Scrolling
        window.addEventListener('wheel', (e) => {
            const magScreen = document.getElementById('magazine-screen');
            if (!magScreen || !magScreen.classList.contains('active')) return;

            // Only flip pages if lightbox/modals are not open
            if (!document.getElementById('memory-modal').classList.contains('hidden')) return;
            if (!document.getElementById('gallery-lightbox').classList.contains('hidden')) return;

            const now = Date.now();
            if (now - this.lastPageTurnTime < this.pageTurnCooldown) return;

            if (e.deltaY > 30) {
                // Scroll down -> Next Page
                if (this.nextPage()) this.lastPageTurnTime = now;
            } else if (e.deltaY < -30) {
                // Scroll up -> Prev Page
                if (this.prevPage()) this.lastPageTurnTime = now;
            }
        }, { passive: true });

        // Envelope Wax Seal Click Page 5
        const waxSeal = document.getElementById('wax-seal');
        const envelope = document.getElementById('wax-envelope');
        if (waxSeal && envelope) {
            waxSeal.addEventListener('click', (e) => {
                e.stopPropagation();
                envelope.classList.add('open');
                
                setTimeout(() => {
                    envelope.classList.add('hidden');
                    const letterBox = document.getElementById('lux-letter-content');
                    if (letterBox) {
                        letterBox.classList.remove('hidden');
                        this.typeWriter('typewriter-text', this.letterText, 35);
                    }
                }, 700);
            });
        }

        // Forever button click confetti Page 12
        const finalBtn = document.getElementById('final-forever-btn');
        if (finalBtn) {
            finalBtn.addEventListener('click', () => {
                this.createConfetti();
                this.spawnHeartsStorm();
            });
        }
    }

    setupAudioSync() {
        const audio = document.getElementById('piano-music');
        const musicToggle = document.getElementById('music-toggle-btn');
        const playVinylBtn = document.getElementById('play-vinyl-btn');
        const vinylNeedle = document.getElementById('vinyl-needle');
        const musicVinyl = document.getElementById('music-vinyl');

        if (!audio) return;

        // Global Music Toggle Button
        if (musicToggle) {
            musicToggle.addEventListener('click', () => {
                if (audio.paused) {
                    audio.play().catch(err => console.log("Play failed: ", err));
                } else {
                    audio.pause();
                }
            });
        }

        audio.addEventListener('play', () => {
            if (musicToggle) musicToggle.textContent = '🔊 Music On';
            if (playVinylBtn) playVinylBtn.textContent = 'Pause Record';
            if (this.currentPage === 9) {
                if (vinylNeedle) vinylNeedle.classList.add('playing');
                if (musicVinyl) musicVinyl.classList.add('playing');
                this.startEqualizer();
            }
        });

        audio.addEventListener('pause', () => {
            if (musicToggle) musicToggle.textContent = '🔇 Music Off';
            if (playVinylBtn) playVinylBtn.textContent = 'Play Record';
            if (vinylNeedle) vinylNeedle.classList.remove('playing');
            if (musicVinyl) musicVinyl.classList.remove('playing');
            this.stopEqualizer();
        });
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.jumpToPage(this.currentPage - 1);
            return true;
        }
        return false;
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.jumpToPage(this.currentPage + 1);
            return true;
        }
        return false;
    }

    jumpToPage(pageNum) {
        this.currentPage = pageNum;
        this.lastPageTurnTime = Date.now();

        // Update pages class stacks
        const pages = document.querySelectorAll('.magazine .page');
        pages.forEach(page => {
            const pageId = parseInt(page.getAttribute('data-page'));
            page.classList.remove('active', 'turn-left');
            if (pageId === this.currentPage) {
                page.classList.add('active');
            } else if (pageId < this.currentPage) {
                page.classList.add('turn-left');
            }
        });

        // Update UI Indicator
        const indicator = document.getElementById('current-page-num');
        if (indicator) {
            indicator.textContent = this.currentPage;
        }

        // Enable/Disable controls
        const prevBtn = document.getElementById('prev-page-btn');
        const nextBtn = document.getElementById('next-page-btn');
        if (prevBtn) prevBtn.disabled = this.currentPage === 1;
        if (nextBtn) nextBtn.disabled = this.currentPage === this.totalPages;

        // Context Trigger: Page 5 Love Letter typing reset
        if (this.currentPage === 5) {
            const envelope = document.getElementById('wax-envelope');
            if (envelope && envelope.classList.contains('open')) {
                this.typeWriter('typewriter-text', this.letterText, 35);
            }
        } else {
            // Cancel active typing when navigating away to keep page fast
            if (this.typewriterTimer) {
                clearInterval(this.typewriterTimer);
                this.typewriterTimer = null;
            }
        }

        // Context Trigger: Page 9 Music visualizer & vinyl arm rotation sync
        const audio = document.getElementById('piano-music');
        const vinylNeedle = document.getElementById('vinyl-needle');
        const musicVinyl = document.getElementById('music-vinyl');
        
        if (this.currentPage === 9) {
            if (audio && !audio.paused) {
                if (vinylNeedle) vinylNeedle.classList.add('playing');
                if (musicVinyl) musicVinyl.classList.add('playing');
                this.startEqualizer();
            }
        } else {
            this.stopEqualizer();
        }

        // Context Trigger: Page 12 Final Page Floating Heart flurry
        if (this.currentPage === 12) {
            setTimeout(() => this.spawnHeartsStorm(), 500);
        }
    }

    handleSwipe(startX, endX, startY, endY) {
        const diffX = endX - startX;
        const diffY = endY - startY;

        // Dominant horizontal swipe of at least 50px
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX < 0) {
                this.nextPage();
            } else {
                this.prevPage();
            }
        }
    }

    typeWriter(elementId, text, speed) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        element.innerHTML = '';
        let i = 0;
        
        if (this.typewriterTimer) {
            clearInterval(this.typewriterTimer);
        }

        this.typewriterTimer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                const scrollable = element.closest('.letter-scroll-content');
                if (scrollable) {
                    scrollable.scrollTop = scrollable.scrollHeight;
                }
            } else {
                clearInterval(this.typewriterTimer);
                this.typewriterTimer = null;
            }
        }, speed);
    }

    setupTimelineNodes() {
        const nodes = document.querySelectorAll('.t-node');
        const fill = document.getElementById('timeline-progress');
        const detailDate = document.getElementById('timeline-detail-date');
        const detailTitle = document.getElementById('timeline-detail-title');
        const detailDesc = document.getElementById('timeline-detail-desc');

        // Initialize progress line on page load
        if (fill && nodes.length > 0) {
            fill.style.width = '0%';
        }

        nodes.forEach(node => {
            node.addEventListener('click', () => {
                nodes.forEach(n => n.classList.remove('active'));
                node.classList.add('active');

                const idx = parseInt(node.getAttribute('data-node'));
                const percent = (idx / (nodes.length - 1)) * 100;
                if (fill) fill.style.width = `${percent}%`;

                // Swap Text Detail box with fade transition
                const detailBox = document.querySelector('.timeline-detail-box');
                if (detailBox) {
                    detailBox.style.animation = 'none';
                    // Trigger reflow to restart slide animations
                    void detailBox.offsetWidth; 
                    detailBox.style.animation = 'slideUpFade 0.6s ease-out';
                }

                if (detailDate) detailDate.textContent = node.getAttribute('data-date');
                if (detailTitle) detailTitle.textContent = node.getAttribute('data-title');
                if (detailDesc) detailDesc.textContent = node.getAttribute('data-desc');
            });
        });
    }

    setupMomentsModal() {
        const tiles = document.querySelectorAll('.moment-tile');
        const modal = document.getElementById('memory-modal');
        const modalBody = document.getElementById('modal-body-content');
        const closeBtn = document.getElementById('close-modal-btn');

        tiles.forEach(tile => {
            tile.addEventListener('click', () => {
                const key = tile.getAttribute('data-moment');
                const story = this.momentStories[key];
                if (story && modalBody && modal) {
                    modalBody.innerHTML = `
                        <div class="moment-detail-content">
                            <h3>${story.title}</h3>
                            <p>${story.text}</p>
                        </div>
                    `;
                    modal.classList.remove('hidden');
                }
            });
        });

        const hideModal = () => {
            if (modal) modal.classList.add('hidden');
        };

        if (closeBtn) closeBtn.addEventListener('click', hideModal);
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) hideModal();
            });
        }
    }

    setupVideoPlayer() {
        const frame = document.querySelector('.video-mock-frame');
        if (frame) {
            frame.addEventListener('click', () => {
                // Insert real video link if none exists
                if (!frame.querySelector('video')) {
                    // Mute background music to let the couple video play
                    const audio = document.getElementById('piano-music');
                    if (audio && !audio.paused) {
                        audio.pause();
                    }

                    frame.innerHTML = `
                        <video src="https://assets.mixkit.co/videos/preview/mixkit-holding-hands-of-a-couple-in-love-40005-large.mp4" 
                               autoplay loop controls style="width: 100%; height: 100%; object-fit: cover; position: absolute; z-index: 5; top: 0; left: 0;"></video>
                    `;
                }
            });
        }
    }

    setupTurntablePlaylist() {
        const audio = document.getElementById('piano-music');
        const songs = document.querySelectorAll('.play-song-row');
        const trackDisplay = document.getElementById('track-name-display');
        const playVinylBtn = document.getElementById('play-vinyl-btn');

        songs.forEach(song => {
            song.addEventListener('click', () => {
                songs.forEach(s => s.classList.remove('active'));
                song.classList.add('active');

                const title = song.getAttribute('data-title');
                const src = song.getAttribute('data-src');

                if (trackDisplay) trackDisplay.textContent = title;

                if (audio) {
                    audio.pause();
                    audio.src = src;
                    audio.play().catch(err => console.log("Play interrupted: ", err));
                }
            });
        });

        if (playVinylBtn) {
            playVinylBtn.addEventListener('click', () => {
                if (!audio) return;
                if (audio.paused) {
                    audio.play().catch(err => console.log("Play interrupted: ", err));
                } else {
                    audio.pause();
                }
            });
        }
    }

    startEqualizer() {
        const eqCols = document.querySelectorAll('.eq-col');
        if (eqCols.length === 0) return;

        if (this.eqInterval) clearInterval(this.eqInterval);

        this.eqInterval = setInterval(() => {
            eqCols.forEach(col => {
                // Random height up to 55px
                const val = Math.random() * 47 + 8;
                col.style.height = `${val}px`;
            });
        }, 120);
    }

    stopEqualizer() {
        if (this.eqInterval) {
            clearInterval(this.eqInterval);
            this.eqInterval = null;
        }
        const eqCols = document.querySelectorAll('.eq-col');
        eqCols.forEach(col => {
            col.style.height = '4px';
        });
    }

    setupPinterestLightbox() {
        const triggers = document.querySelectorAll('.lightbox-trigger');
        const lightbox = document.getElementById('gallery-lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.getElementById('close-lightbox-btn');

        triggers.forEach(img => {
            img.addEventListener('click', () => {
                if (lightbox && lightboxImg) {
                    lightboxImg.src = img.src;
                    lightbox.classList.remove('hidden');
                }
            });
        });

        const hideLightbox = () => {
            if (lightbox) lightbox.classList.add('hidden');
        };

        if (closeBtn) closeBtn.addEventListener('click', hideLightbox);
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) hideLightbox();
            });
        }
    }

    spawnHeartsStorm() {
        const parent = document.getElementById('ambient-particles');
        if (!parent) return;

        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('span');
                heart.innerHTML = '❤️';
                heart.style.position = 'fixed';
                heart.style.left = `${Math.random() * 90 + 5}%`;
                heart.style.bottom = '-50px';
                heart.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '99';
                heart.style.opacity = '0.9';
                
                // Add GPU float fall animation
                heart.style.animation = 'fall 3.8s cubic-bezier(0.1, 0.7, 0.4, 1) forwards';
                parent.appendChild(heart);

                setTimeout(() => heart.remove(), 4000);
            }, i * 150);
        }
    }

    createConfetti() {
        const colors = ['#ff69b4', '#e6b3ff', '#87ceeb', '#dfba5c', '#ff1493'];
        const parent = document.getElementById('ambient-particles') || document.body;
        for (let i = 0; i < 45; i++) {
            setTimeout(() => {
                const c = document.createElement('div');
                c.style.position = 'fixed';
                c.style.left = `${Math.random() * window.innerWidth}px`;
                c.style.top = '-10px';
                c.style.width = `${Math.random() * 6 + 6}px`;
                c.style.height = `${Math.random() * 6 + 6}px`;
                c.style.background = colors[Math.floor(Math.random() * colors.length)];
                c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                c.style.pointerEvents = 'none';
                c.style.zIndex = '999';
                
                c.style.animation = 'fall 3.2s linear forwards';
                parent.appendChild(c);
                
                setTimeout(() => c.remove(), 3500);
            }, i * 40);
        }
    }
}

// Initialize Application
window.addEventListener('DOMContentLoaded', () => {
    new WowMomentsApp();
});
