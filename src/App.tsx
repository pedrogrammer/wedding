import { useState, type CSSProperties } from "react";
import "./App.css";
import { Artwork, Chevron, Reveal } from "./components/Artwork";
import { Countdown } from "./components/Countdown";
import { InvitationIntro } from "./components/InvitationIntro";
import { RsvpDialog } from "./components/RsvpDialog";
import { ScheduleRose } from "./components/ScheduleRose";
import { VenueMap } from "./components/VenueMap";
import { useReveal } from "./hooks/useReveal";
import { asset } from "./lib/assets";

function GardenHero() {
  return (
    <header className="scene garden-hero" aria-labelledby="couple-names">
      <div className="canvas">
        <video
          className="garden-film"
          src={asset("garden.mov")}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
        />
        <div className="garden-glow" aria-hidden="true" />
        <Artwork
          name="hero-paper.webp"
          width={744}
          className="hero-message-paper"
          left={-212}
          top={763}
        />
        <Reveal
          className="couple-names positioned"
          style={{ top: 294, left: -120, width: 560 }}
          delay={3}
        >
          <h1 id="couple-names">
            Pedram
            <br />
            <br />
            Asal
          </h1>
        </Reveal>
        <Reveal
          className="wedding-day positioned"
          style={{ top: 154, left: -120, width: 560, height: 37 }}
          delay={3}
        >
          <p>Wedding Day</p>
        </Reveal>
        <Reveal
          className="wedding-date positioned"
          style={{ top: 196, left: -120, width: 560, height: 37 }}
          delay={3}
        >
          <p>1405/8/7</p>
        </Reveal>
        <Reveal
          className="couple-amp positioned"
          style={{ top: 356, left: 138, width: 55 }}
          delay={3}
        >
          <span>&amp;</span>
        </Reveal>
        <Artwork
          name="hero-flowers-left.webp"
          width={218}
          left={-77}
          top={568}
          motion="sway-left"
        />
        <Artwork
          name="hero-flowers-right.webp"
          width={210}
          left={198}
          top={586}
          motion="sway-right"
        />
        <Artwork
          name="hero-top-floral.webp"
          width={735}
          left={280}
          top={-785}
        />
        <div className="hero-message" lang="fa" dir="rtl">
          <Reveal className="hero-invocation" effect="fade" duration={1}>
            <p>به نام آفریننده عشق</p>
          </Reveal>
          <Reveal className="hero-blessing" effect="fade" duration={1}>
            <p>
              <span className="hero-blessing-line">به شوق آغاز یک زندگی،</span>
              <span className="hero-blessing-line hero-blessing-invitation">
                شما را به جشن پیوندمان دعوت می‌کنیم.
              </span>
            </p>
          </Reveal>
          <Reveal className="hero-welcome" effect="fade" delay={0.2}>
            <p>
              تصویر عشق تنها نمای ماندگار ذهن ماست.
              ما عشق را برای هم نقاشی کردیم به رنگ آب زلال.
              اما جشن زندگی را رنگین می‌خواهیم. حضور شما،
              این قاب عاشقانه را زیباتر خواهد کرد.
            </p>
          </Reveal>
        </div>
        <a
          className="scroll-prompt positioned"
          href="#welcome"
          style={{ top: 518, left: 2, width: 316 }}
        >
          <span>Scroll down</span>
          <Chevron />
        </a>
      </div>
      <span id="welcome" className="welcome-anchor" />
    </header>
  );
}

const events = [
  {
    time: "4 PM",
    name: "عقد آریایی",
    timeTop: 141,
    nameTop: 145,
    dotTop: 161,
    left: 188,
    width: 128,
  },
  {
    time: "5 PM",
    name: "پذیرایی",
    timeTop: 246,
    nameTop: 250,
    dotTop: 266,
    left: 188,
    width: 128,
  },
  {
    time: "6 PM",
    name: "رقص",
    timeTop: 350,
    nameTop: 354,
    dotTop: 370,
    left: 188,
    width: 128,
  },
  {
    time: "9 PM",
    name: "شام",
    timeTop: 455,
    nameTop: 459,
    dotTop: 475,
    left: 188,
    width: 128,
  },
];

function Schedule() {
  return (
    <section
      className="scene schedule-scene"
      aria-labelledby="schedule-heading"
      lang="fa"
    >
      <div className="canvas">
        <Artwork
          name="schedule-paper-top.webp"
          width={744}
          height={346}
          left={-212}
          top={-20}
        />
        <Artwork
          name="schedule-paper-bottom.webp"
          width={744}
          height={259}
          left={-212}
          top={321}
        />
        <h2
          id="schedule-heading"
          className="script-title schedule-title positioned"
          style={{ top: 45 }}
          dir="rtl"
        >
          برنامهٔ مراسم
        </h2>
        <ol className="event-list">
          {events.map((event, index) => (
            <li key={event.time}>
              <Reveal
                className="event-time positioned"
                style={{
                  top: event.timeTop,
                  left: index < 3 ? 4 : 1,
                  width: index < 3 ? 129 : 136,
                }}
                effect="fade"
                duration={1.5}
                delay={index * 0.1}
              >
                <time>{event.time}</time>
              </Reveal>
              <Reveal
                className="event-name positioned"
                style={{
                  top: event.nameTop,
                  left: event.left,
                  width: event.width,
                }}
                effect="fade"
                duration={1.5}
                delay={index * 0.1}
              >
                <span dir="rtl">{event.name}</span>
              </Reveal>
            </li>
          ))}
        </ol>
        <svg
          className="timeline-line positioned"
          style={{ top: 160, left: 158, width: 2, height: 321.425 }}
          viewBox="0 0 2 323"
          aria-hidden="true"
        >
          <path
            d="M1 1v321"
            stroke="#9c8575"
            fill="none"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
        {events.map((event) => (
          <span
            key={event.time}
            className="timeline-dot positioned"
            style={{ top: event.dotTop, left: 155 }}
          />
        ))}
        <ScheduleRose />
        <Reveal
          className="heading-ornament positioned"
          style={{ top: 56, left: 277, width: 78 }}
          effect="left"
        >
          <img src={asset("heading-right.webp")} alt="" />
        </Reveal>
        <Reveal
          className="heading-ornament positioned"
          style={{ top: 56, left: -34, width: 79 }}
          effect="right"
        >
          <img src={asset("heading-left.webp")} alt="" />
        </Reveal>
      </div>
    </section>
  );
}

const petals = [
  { width: 41, top: 20, left: 295, x: 77, y: 381, rotate: 2, duration: 8 },
  { width: 43, top: 11, left: 37, x: -77, y: 381, rotate: 2, duration: 8 },
  { width: 42, top: 127, left: -34, x: 67, y: 224, rotate: -6, duration: 9 },
  { width: 38, top: 144, left: 327, x: -99, y: 251, rotate: 2, duration: 8 },
  { width: 38, top: 260, left: -15, x: 39, y: 83, rotate: -12, duration: 3 },
  { width: 42, top: 284, left: 250, x: -39, y: 73, rotate: -6, duration: 2 },
];

function Location() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section
      className="scene location-scene"
      aria-labelledby="location-heading"
    >
      <div className="canvas" ref={ref}>
        <Reveal
          className="positioned"
          style={{ top: 81, left: 110, width: 96 }}
          effect="zoom"
          duration={3}
        >
          <img src={asset("location-ornament.webp")} alt="" />
        </Reveal>
        <Reveal
          className="positioned"
          style={{ top: 174, left: -30, width: 380 }}
          effect="fade"
          duration={1}
        >
          <img
            src={asset("venue.webp")}
            alt="Illustration of Islamic Center of Melville"
          />
        </Reveal>
        {petals.map((petal, index) => (
          <Artwork
            key={index}
            name={`petal-${index + 1}.webp`}
            {...petal}
            className={`petal ${visible ? "petal-falling" : ""}`}
            style={
              {
                "--petal-x": `${petal.x}px`,
                "--petal-y": `${petal.y}px`,
                "--petal-rotate": `${petal.rotate}deg`,
                "--petal-duration": `${petal.duration}s`,
                "--petal-animation":
                  index < 4 ? `petal-${index + 1}` : "petal-fall",
              } as CSSProperties
            }
          />
        ))}
        <Reveal
          className="location-name body-copy positioned"
          style={{ top: 111, left: 44, width: 232 }}
        >
          <p>Islamic Center of Melville</p>
        </Reveal>
        <Reveal
          className="location-address body-copy positioned"
          style={{ top: 149, left: 6, width: 308 }}
        >
          <p>Address: 118 Old East Neck Road Melville, NY 11747</p>
        </Reveal>
        <h2
          id="location-heading"
          className="script-title positioned"
          style={{ top: 28 }}
        >
          Location
        </h2>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section className="scene map-scene" aria-label="Venue directions">
      <div className="canvas">
        <Artwork
          name="map-frame.svg"
          width={341}
          left={-10}
          top={2}
          className="map-frame"
        />
        <VenueMap />
        <Artwork name="map-ornament-top.webp" width={190} left={65} top={-26} />
        <Artwork
          name="map-ornament-bottom.webp"
          width={190}
          left={65}
          top={328}
        />
      </div>
    </section>
  );
}

function GuestDetails() {
  return (
    <section
      className="scene guest-details-scene"
      aria-label="Dress code and gift preference"
    >
      <div className="canvas">
        <Reveal
          className="positioned"
          style={{ top: -183, left: -96, width: 122 }}
          effect="zoom"
          duration={2.3}
        >
          <img src={asset("dress-rose.webp")} alt="" />
        </Reveal>
        <Artwork
          name="dress-paper.webp"
          width={744}
          height={452}
          left={-212}
          top={20}
        />
        <Reveal
          className="body-copy positioned"
          style={{ top: 361, left: 5, width: 310 }}
        >
          <p>Kindly, no boxed gifts please.</p>
        </Reveal>
        <h2 className="script-title positioned" style={{ top: 284 }}>
          Gift Preference
        </h2>
        <Reveal
          className="body-copy positioned"
          style={{ top: 163, left: 10, width: 300 }}
        >
          <p>
            We kindly ask guests to avoid deep red and maroon attire for the
            celebration.
          </p>
        </Reveal>
        <h2 className="script-title positioned" style={{ top: 86 }}>
          Dress Code
        </h2>
        <Artwork
          name="dress-top-floral.webp"
          width={587}
          left={317}
          top={-614}
        />
        <Artwork
          name="dress-flowers-right.webp"
          width={276}
          left={155}
          top={-1}
          motion="sway-dress-right"
        />
        <Artwork
          name="dress-flowers-left.webp"
          width={251}
          left={-80}
          top={264}
          motion="sway-wide"
        />
      </div>
    </section>
  );
}

function Attendance({ onOpen }: { onOpen: () => void }) {
  return (
    <section
      className="scene attendance-scene"
      aria-labelledby="attendance-heading"
    >
      <div className="canvas">
        <Reveal
          className="body-copy positioned"
          style={{ top: 135, left: -26, width: 372 }}
        >
          <p>
            To help us prepare for a joyful celebration, kindly confirm your
            attendance.
          </p>
        </Reveal>
        <h2
          id="attendance-heading"
          className="script-title positioned"
          style={{ top: 51 }}
        >
          Confirm Your Attendance
        </h2>
        <Reveal
          className="positioned"
          style={{ top: 210, left: 65, width: 190 }}
          effect="zoom"
          duration={1.5}
          delay={0.5}
        >
          <button
            className="rsvp-seal"
            onClick={onOpen}
            aria-label="Confirm your attendance"
          >
            <img src={asset("rsvp-seal.webp")} alt="Burgundy wax seal" />
          </button>
        </Reveal>
        <Chevron className="positioned attendance-chevron" />
        <button className="click-to-open positioned" onClick={onOpen}>
          Click to open
        </button>
      </div>
    </section>
  );
}

function InvitationFooter() {
  return (
    <footer className="scene invitation-footer">
      <div className="canvas">
        <Artwork name="footer-photo.webp" width={450} left={-65} top={0} />
        <div className="footer-gradient positioned" aria-hidden="true" />
        <Reveal
          className="positioned script-title"
          style={{ top: 12 }}
          effect="fade"
          duration={1}
        >
          <p>Hope to see you there!</p>
        </Reveal>
        <Artwork
          name="footer-flowers.webp"
          width={537}
          left={-108}
          top={173}
          motion="sway-subtle"
        />
        <Reveal
          className="footer-names body-copy positioned"
          style={{ top: 73, left: -20, width: 360 }}
        >
          <p>Pedram and Asal</p>
        </Reveal>
      </div>
    </footer>
  );
}

function App() {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  return (
    <>
      <main className="invitation">
        <GardenHero />
        <Countdown />
        <Schedule />
        <Location />
        <MapSection />
        <GuestDetails />
        <Attendance onOpen={() => setRsvpOpen(true)} />
        <InvitationFooter />
      </main>
      <InvitationIntro />
      {rsvpOpen && <RsvpDialog open onClose={() => setRsvpOpen(false)} />}
    </>
  );
}
export default App;
