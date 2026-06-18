import React from 'react'

export default function Page() {
  return (
    <div id="app">
      {/* Question Screen */}
      <section id="question-screen" className="screen active">
        <div className="question-container">
          <div className="floating-hearts"></div>
          <img src="https://i.pinimg.com/736x/19/98/9d/19989d24e52cbdaa67220fdfd8509139.jpg" alt="Cute Boba Cat" className="boba-cat-img" />
          <h1>Will you let me shower you with amazing gifts?</h1>
          <div className="button-group">
            <button id="yes-btn" className="btn btn-yes">Yes, absolutely!</button>
            <button id="no-btn" className="btn btn-no">No</button>
          </div>
          <p className="subtitle">✨ Click "Yes" to discover romantic gift ideas ✨</p>
        </div>
      </section>

      {/* Magazine Screen */}
      <section id="magazine-screen" className="screen">
        <button className="back-btn-magazine">← Home</button>
        <div className="magazine-wrapper">
          <div className="magazine" id="magazine">
            
            {/* Page 1: COVER */}
            <div className="page cover-page active" data-page="1">
              <div className="page-content">
                <div className="magazine-meta">SPECIAL EDITION • ISSUE NO. 01</div>
                <h1 className="magazine-title">US & OUR STORY</h1>
                <div className="cover-image-frame">
                  <img src="https://i.pinimg.com/736x/19/98/9d/19989d24e52cbdaa67220fdfd8509139.jpg" alt="Boba Cat" className="magazine-cover-img" />
                </div>
                <h2 className="cover-quote">&quot;Will you let me shower you with amazing gifts?&quot;</h2>
                <div className="cover-footer">
                  <div className="footer-col">
                    <span className="p-number">P. 3</span>
                    <span className="f-desc">Our Beautiful Memories</span>
                  </div>
                  <div className="footer-col">
                    <span className="p-number">P. 5</span>
                    <span className="f-desc">Letters of Endless Love</span>
                  </div>
                  <div className="footer-col">
                    <span className="p-number">P. 9</span>
                    <span className="f-desc">Sound & Vision Special</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Page 2: TABLE OF CONTENTS & EDITORIAL */}
            <div className="page editorial-page" data-page="2">
              <div className="page-content">
                <div className="magazine-header-mini">CONTENTS & EDITORIAL</div>
                <h2 className="mag-heading">Inside This Issue</h2>
                <ul className="toc-list">
                  <li className="toc-item" data-target="1"><span>01. The Cover Story</span><span className="toc-dots"></span><span>Page 1</span></li>
                  <li className="toc-item" data-target="2"><span>02. Welcome Letter</span><span className="toc-dots"></span><span>Page 2</span></li>
                  <li className="toc-item" data-target="3"><span>03. Our Beautiful Memories</span><span className="toc-dots"></span><span>Page 3</span></li>
                  <li className="toc-item" data-target="5"><span>04. Letters of Devotion</span><span className="toc-dots"></span><span>Page 5</span></li>
                  <li className="toc-item" data-target="7"><span>05. Our Journey (Timeline)</span><span className="toc-dots"></span><span>Page 7</span></li>
                  <li className="toc-item" data-target="9"><span>06. Sound & Vision Features</span><span className="toc-dots"></span><span>Page 9</span></li>
                  <li className="toc-item" data-target="10"><span>07. Interactive Love Spells</span><span className="toc-dots"></span><span>Page 10</span></li>
                  <li className="toc-item" data-target="11"><span>08. Back Cover Surprise</span><span className="toc-dots"></span><span>Page 11</span></li>
                </ul>
                <div className="editorial-box">
                  <h3>A Letter from the Heart</h3>
                  <span className="drop-cap">T</span>
                  <p className="editorial-text">his magazine is dedicated entirely to us and the wonderful moments we share. Inside, you will find a celebration of our history, private letters from my heart to yours, our shared soundtrack, and some magical interactive surprises. I hope you enjoy turning these pages as much as I enjoyed compiling them for you.</p>
                  <p className="editorial-sig">— Your Editor & Love ❤️</p>
                </div>
              </div>
            </div>

            {/* Page 3: MEMORIES SPREAD 1 */}
            <div className="page memories-page-1" data-page="3">
              <div className="page-content">
                <div className="magazine-header-mini">EXHIBIT A • MEMORIES</div>
                <h2 className="mag-heading">Our Beautiful Memories</h2>
                <p className="mag-intro-text">Capturing the seconds, minutes, and days that define our journey together.</p>
                <div className="magazine-polaroid-spread">
                  <div className="polaroid-pic angle-left">
                    <img src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400" alt="Memory 1" />
                    <p className="caption">Where love grows 🌸</p>
                  </div>
                  <div className="polaroid-pic angle-right">
                    <img src="https://images.unsplash.com/photo-1515522141207-edc36ab17896?w=400" alt="Memory 2" />
                    <p className="caption">Laughter in the air ✨</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Page 4: MEMORIES SPREAD 2 */}
            <div className="page memories-page-2" data-page="4">
              <div className="page-content">
                <div className="magazine-header-mini">EXHIBIT B • MEMORIES</div>
                <div className="magazine-polaroid-spread-large">
                  <div className="polaroid-pic large-polaroid">
                    <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600" alt="Memory 3" />
                    <p className="caption">Our favorite place to be is together ❤️</p>
                  </div>
                </div>
                <div className="magazine-mini-gallery">
                  <img src="https://images.unsplash.com/photo-1516214104703-d870798883c5?w=200" alt="Memory 4" />
                  <img src="https://images.unsplash.com/photo-1515632096355-ec06cf31c75b?w=200" alt="Memory 5" />
                  <img src="https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=200" alt="Memory 6" />
                </div>
                <p className="gift-message-magazine">&quot;Every single moment with you is a treasure. These snapshots capture just a fraction of the joy you bring to my life.&quot;</p>
              </div>
            </div>

            {/* Page 5: LOVE LETTERS 1 */}
            <div className="page letters-page-1" data-page="5">
              <div className="page-content">
                <div className="magazine-header-mini">ESSAYS • LETTERS OF LOVE</div>
                <h2 className="mag-heading">Letters of Devotion</h2>
                <div className="mag-columns">
                  <div className="mag-col-text">
                    <h3>Chapter 1: The First Meeting</h3>
                    <span className="drop-cap">I</span>
                    <p> still remember the moment I saw you. Time seemed to stop, and all I could see was the light in your eyes. In that instant, I knew my life was about to change forever. You&apos;ve brought color to every corner of my world, making even the grayest days shine bright.</p>
                  </div>
                  <div className="mag-col-text" style={{ marginTop: '1.5rem' }}>
                    <h3>Chapter 2: Every Day With You</h3>
                    <span className="drop-cap">W</span>
                    <p>aking up next to you is the best part of my day. Your smile is my favorite sight, and your laugh is the most beautiful sound. Even the ordinary moments become extraordinary when you&apos;re here. Thank you for being my greatest blessing, my partner, and my best friend.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Page 6: LOVE LETTERS 2 */}
            <div className="page letters-page-2" data-page="6">
              <div className="page-content">
                <div className="magazine-header-mini">ESSAYS • LETTERS OF LOVE</div>
                <div className="mag-single-col">
                  <h3>Chapter 3: Forever & Beyond</h3>
                  <span className="drop-cap">I</span>
                  <p> want to spend the rest of my life getting to know you deeper, loving you stronger, and building beautiful memories together. You are my greatest dream come true. With all my heart, I promise to be yours, always and forever, through every storm and every sunset.</p>
                </div>
                <div className="magazine-pullquote">
                  <p className="pullquote-text">&quot;In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.&quot;</p>
                  <p className="pullquote-author">— Maya Angelou</p>
                </div>
              </div>
            </div>

            {/* Page 7: TIMELINE 1 */}
            <div className="page timeline-page-1" data-page="7">
              <div className="page-content">
                <div className="magazine-header-mini">CHRONICLES • TIMELINE</div>
                <h2 className="mag-heading">Our Timeline</h2>
                <p className="mag-intro-text">A walk down memory lane: how we grew together.</p>
                <div className="mag-timeline-list">
                  <div className="mag-timeline-node">
                    <div className="node-header">
                      <span className="node-date">Jan 15, 2023</span>
                      <h4>The Day We Met</h4>
                    </div>
                    <p>Our eyes met across the room and everything changed forever. A single look started this beautiful adventure.</p>
                  </div>
                  <div className="mag-timeline-node">
                    <div className="node-header">
                      <span className="node-date">Feb 14, 2023</span>
                      <h4>First Valentine&apos;s Day</h4>
                    </div>
                    <p>You said &quot;yes&quot; to being my Valentine. It was the happiest day of my year, filled with sweet smiles.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Page 8: TIMELINE 2 */}
            <div className="page timeline-page-2" data-page="8">
              <div className="page-content">
                <div className="magazine-header-mini">CHRONICLES • TIMELINE</div>
                <div className="mag-timeline-list">
                  <div className="mag-timeline-node">
                    <div className="node-header">
                      <span className="node-date">June 1, 2023</span>
                      <h4>Our First Trip</h4>
                    </div>
                    <p>We explored new paths together, taking photos and building a treasure chest of shared moments.</p>
                  </div>
                  <div className="mag-timeline-node">
                    <div className="node-header">
                      <span className="node-date">Dec 25, 2023</span>
                      <h4>Our First Christmas</h4>
                    </div>
                    <p>Celebrating the holiday season with you felt like magic. Wrapping gifts and drinking hot cocoa in our warm sanctuary.</p>
                  </div>
                  <div className="mag-timeline-node present-node">
                    <div className="node-header">
                      <span className="node-date">Today & Beyond</span>
                      <h4>Forever Begins Now</h4>
                    </div>
                    <p>With you, I see a future full of endless love, shared laughter, and new chapters to write side by side.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Page 9: SOUND & VISION */}
            <div className="page media-page" data-page="9">
              <div className="page-content">
                <div className="magazine-header-mini">REVIEWS • SOUND & VISION</div>
                <h2 className="mag-heading">Featured Media</h2>
                
                <div className="mag-media-layout">
                  <div className="mag-media-block">
                    <h3>A Video Message Just For You</h3>
                    <div className="video-container">
                      <div className="video-placeholder">
                        <div className="play-button">▶</div>
                        <p>Video Message Ready</p>
                      </div>
                    </div>
                    <div className="video-transcript-magazine">
                      <h4>Transcript excerpt:</h4>
                      <p>&quot;You know, I never believed in love at first sight until I met you. Every day with you is better than the last. I want you to know that you&apos;re not just my love, you&apos;re my home...&quot;</p>
                    </div>
                  </div>

                  <div className="mag-media-block" style={{ marginTop: '1.5rem' }}>
                    <h3>Songs That Speak of Us</h3>
                    <div className="playlist-container-mag">
                      <div className="vinyl-record-mag">
                        <div className="record-label-mag">♫ OUR PLAYLIST ♫</div>
                      </div>
                      <div className="songs-list-mag">
                        <div className="song-item-mag">
                          <span className="s-num">01</span>
                          <span className="s-name">Perfect - Ed Sheeran</span>
                        </div>
                        <div className="song-item-mag">
                          <span className="s-num">02</span>
                          <span className="s-name">All of Me - John Legend</span>
                        </div>
                        <div className="song-item-mag">
                          <span className="s-num">03</span>
                          <span className="s-name">Thinking Out Loud - Ed Sheeran</span>
                        </div>
                        <div className="song-item-mag">
                          <span className="s-num">04</span>
                          <span className="s-name">You & Me - Lifehouse</span>
                        </div>
                        <div className="song-item-mag">
                          <span className="s-num">05</span>
                          <span className="s-name">Make You Feel My Love - Adele</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Page 10: INTERACTIVE SURPRISES */}
            <div className="page interactive-page" data-page="10">
              <div className="page-content">
                <div className="magazine-header-mini">NOVELTIES • INTERACTIVE</div>
                <h2 className="mag-heading">Magical Surprises</h2>
                
                <div className="mag-interactive-layout">
                  <div className="mag-rose-box">
                    <h3>A digital bloom for eternal love</h3>
                    <div className="rose-container-mag">
                      <div className="rose">
                        <div className="petal petal-1"></div>
                        <div className="petal petal-2"></div>
                        <div className="petal petal-3"></div>
                        <div className="petal petal-4"></div>
                        <div className="petal petal-5"></div>
                        <div className="petal petal-6"></div>
                        <div className="stem"></div>
                        <div className="leaf leaf-1"></div>
                        <div className="leaf leaf-2"></div>
                      </div>
                    </div>
                  </div>

                  <div className="mag-envelope-box">
                    <h3>Open the envelope below</h3>
                    <div className="envelope-container-mag">
                      <div className="envelope" id="envelope">
                        <div className="envelope-flap"></div>
                        <div className="envelope-front">
                          <p className="envelope-text">To My Love</p>
                        </div>
                      </div>
                    </div>
                    <div id="letter-content" className="letter-content hidden">
                      <div className="letter-paper">
                        <h2>My Dearest Love,</h2>
                        <p>I promise to love you with all that I am, to support your dreams, to be there in your darkest moments, and to celebrate every victory by your side. You are my today and my tomorrow.</p>
                        <p className="signature">Your Forever Love ❤️</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Page 11: BACK COVER (THE SURPRISE) */}
            <div className="page back-cover-page" data-page="11">
              <div className="page-content">
                <div className="magazine-header-mini">BACK COVER • SPECIAL SURPRISE</div>
                <h2 className="mag-heading">A Final Surprise</h2>
                <p className="mag-intro-text">Click the mystery box below to complete this issue.</p>
                
                <div className="mag-mystery-box-layout">
                  <div className="mystery-container">
                    <div className="gift-box" id="mystery-box">
                      <div className="box-top"></div>
                      <div className="box-front"></div>
                      <div className="box-right"></div>
                      <div className="ribbon ribbon-h"></div>
                      <div className="ribbon ribbon-v"></div>
                      <div className="bow"></div>
                    </div>
                    <p className="click-hint">Click the box to reveal the surprise!</p>
                  </div>
                  <div id="surprise-content" className="surprise-content hidden">
                    <h2>🎉 Surprise! 🎉</h2>
                    <p>You are the best thing that ever happened to me. Every smile, every laugh, every moment with you is a gift I treasure deeply.</p>
                    <div className="confetti"></div>
                  </div>
                </div>
                
                <div className="magazine-barcode-footer">
                  <div className="barcode-container">
                    <div className="barcode-lines"></div>
                    <span className="barcode-number">LOVE-2026-FOREVER</span>
                  </div>
                  <span className="issue-number">ISSUE 01 • RETAIL VALUE: PRICELESS</span>
                </div>
              </div>
            </div>

          </div>

          {/* Magazine Navigation Controls */}
          <div className="magazine-controls">
            <button id="prev-page-btn" className="mag-nav-btn" disabled={true}>← Previous Page</button>
            <span className="page-indicator"><span id="current-page-num">1</span> / 11</span>
            <button id="next-page-btn" className="mag-nav-btn">Next Page →</button>
          </div>
        </div>
      </section>
    </div>
  )
}
