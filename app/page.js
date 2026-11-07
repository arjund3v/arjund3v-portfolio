import { getContent } from "../lib/content";
import { dateText, isCurrent } from "../lib/format";
import { SITE, DEFAULT_HERO } from "../lib/site";
import Effects from "../components/Effects";
import Projects from "../components/Projects";

// Rebuilt at most once a minute, and instantly after any change in /admin.
export const revalidate = 60;

function Line({ l }) {
  if (l.startsWith("$ ")) {
    return (
      <>
        <span className="k">$</span> {l.slice(2)}
      </>
    );
  }
  let m = l.match(/^([0-9a-f]{7}) (\(.*?\) )?(.*)$/);
  if (m) {
    return (
      <>
        <span className="k">{m[1]}</span> {m[2] ? <span className="cm">{m[2]}</span> : null}
        {m[3]}
      </>
    );
  }
  m = l.match(/^([A-Za-z]+:)(\s+)(.*)$/);
  if (m) {
    return (
      <>
        <span className="k">{m[1]}</span>
        {m[2]}
        {m[3]}
      </>
    );
  }
  return <>{l}</>;
}

function Timeline({ id, items, title, sub }) {
  return (
    <div className="tl" id={id}>
      {items.map((d) => (
        <div key={d.id} className={"item" + (isCurrent(d) ? " now" : "")}>
          <div className="when">{dateText(d)}</div>
          <div>
            <h3>{d[title]}</h3>
            <div className="sub">{d[sub]}</div>
            {d.detail ? <p>{d.detail}</p> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function Home() {
  const c = await getContent();
  const hero = c.hero[0] || DEFAULT_HERO;
  const lines = String(hero.content || "").split("\n");

  return (
    <>
      <Effects />
      <nav>
        <div>
          <span className="dots"><i /><i /><i /></span>
          <span className="logo">arjun.dev</span>
          <a href="#experience">experience.c</a>
          <a href="#education">education.c</a>
          <a href="#projects">projects.c</a>
          <a href="#contact">contact.c</a>
        </div>
      </nav>

      <main>
        <section id="home" className="hero">
          <div className="hi">// hello, world</div>
          <h1>
            <span className="pr">&gt;</span>
            <span className="typed">{SITE.name}</span>
          </h1>
          <p className="role">{SITE.role}</p>
          <p className="b">{SITE.summary}</p>

          <div className="win">
            <div className="bar">
              <span className="dots"><i /><i /><i /></span>
              <span>{hero.file || "bash"}</span>
            </div>
            <pre>
              {lines.map((l, i) => (
                <span key={i}>
                  <Line l={l} />
                  {"\n"}
                </span>
              ))}
              <span className="k">$</span> <span className="cur" style={{ margin: 0, verticalAlign: "-1px" }} />
            </pre>
          </div>

          <div className="btns">
            <a className="btn p" href="#projects">View projects</a>
            <a className="btn" href={SITE.resume}>Resume</a>
            <a className="btn" href={SITE.github}>GitHub</a>
            <a className="btn" href={SITE.linkedin}>LinkedIn</a>
          </div>
        </section>

        <div className="two">
          <section id="experience">
            <h2>experience</h2>
            <Timeline id="work-list" items={c.work} title="role" sub="company" />
          </section>
          <section id="education">
            <h2>education</h2>
            <Timeline id="education-list" items={c.education} title="program" sub="school" />
          </section>
        </div>

        <section id="skills">
          <h2>skills</h2>
          <div className="skills" id="skills-list">
            {c.skills.map((s) => (
              <span key={s.id} className="chip">{s.name}</span>
            ))}
          </div>
        </section>

        <section id="projects">
          <h2>projects</h2>
          <Projects projects={c.projects} />
          <p style={{ marginTop: 18 }}>
            <a className="btn" href={SITE.github + "/"}>More on GitHub</a>
          </p>
        </section>

        <section id="contact" className="contact">
          <h2>contact</h2>
          <p><span>email</span><a href={"mailto:" + SITE.email}>{SITE.email}</a></p>
          <p><span>github</span><a href={SITE.github}>{SITE.github.replace("https://", "")}</a></p>
          <p><span>linkedin</span><a href={SITE.linkedin}>{SITE.linkedin.replace("https://www.", "").replace(/\/$/, "")}</a></p>
        </section>
      </main>

      <footer>// © {new Date().getFullYear()} {SITE.name}</footer>
    </>
  );
}
