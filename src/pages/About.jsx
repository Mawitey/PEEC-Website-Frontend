import React, { useState } from "react";

import churchFamily from "../images/Event7.webp";


function About() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>
      <div className="page-container">
        <h1 className="page-title">About Us</h1>

        <img
          src={churchFamily}
          alt="Philadelphia Evangelical Eritrean Church family"
          className="about-hero-image"
        />
      </div>

      {/* ================= VISION ================= */}
      <section className="dark-section about-section">
        <div className="about-header">
          <h2>The Vision of the Church</h2>

          <button
            type="button"
            className="about-read-btn read-more-btn"
            onClick={() => toggleSection("vision")}
            aria-expanded={openSection === "vision"}
            aria-controls="vision-content"
          >
            {openSection === "vision" ? (
              <>
                Show Less <span aria-hidden>{" ▲"}</span>
              </>
            ) : (
              <>
                Read More <span aria-hidden>{" ▼"}</span>
              </>
            )}
          </button>
        </div>

        {openSection === "vision" && (
          <div className="read-more-content" id="vision-content">
            <div className="about-card">
              <div className="content-wrapper">
                <p>
                  The vision of the Philadelphia Evangelical Eritrean Church is
                  to spread the Gospel to the ends of the earth, carrying the
                  cross of Christ and proclaiming the good news of the Lord
                  Jesus. The church seeks to:
                </p>

                <ul className="content-list">
                  <li>
                    Unite believers from Eritrea and other parts of the world,
                    both within and beyond the city of Columbus and to
                    faithfully witness and spread the gospel locally and
                    globally.
                  </li>
                  <li>
                    Rooted in the Word of God and empowered by the Holy Spirit,
                    the church is committed to reaching the Tigrinya-speaking
                    community in Columbus—as well as the Eritrean people in
                    Eritrea, making believers into true followers and disciples
                    of Christ.
                  </li>
                  <li>
                    In obedience to Scripture, the church desires to walk in
                    fellowship with all believers and partner with churches that
                    share a common faith and calling, extending the right hand
                    of fellowship.
                  </li>
                </ul>

                <p>
                  The Philadelphia Evangelical Eritrean Church of Columbus, Ohio
                  is guided by the Word of God and the full counsel of the Lord.
                  The theme verse of the church is:
                </p>

                <p className="verse">
                  <em>
                    “I know your works. See, I have set before you an open door,
                    and no one can shut it; for you have a little strength, have
                    kept My word, and have not denied My name.”
                  </em>
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ================= MISSION ================= */}
      <section className="light-section about-section">
        <div className="page-container">
          <div className="about-header">
            <h2>The Mission of the Church</h2>

            <button
              type="button"
              className="about-read-btn read-more-btn"
              onClick={() => toggleSection("mission")}
              aria-expanded={openSection === "mission"}
              aria-controls="mission-content"
            >
              {openSection === "mission" ? (
                <>
                  Show Less <span aria-hidden>{" ▲"}</span>
                </>
              ) : (
                <>
                  Read More <span aria-hidden>{" ▼"}</span>
                </>
              )}
            </button>
          </div>

          {openSection === "mission" && (
            <div className="read-more-content" id="mission-content">
              <div className="about-card">
                <div className="content-wrapper">
                  <p>
                    The mission of the Philadelphia Evangelical Eritrean Church
                    is to fulfill the Great Commission as commanded by the Lord
                    Jesus Christ by calling unbelievers to repentance, making
                    disciples, and teaching them to obey all that Christ has
                    commanded.
                  </p>

                  <ul className="content-list">
                    <li>
                      Proclaiming and witnessing the Gospel through the teaching
                      of the Word of God, prayer, and discipleship, with a
                      primary focus on serving the Tigrinya-speaking community
                      in the Columbus, Ohio region and reaching the Eritrean
                      people in Eritrea.
                    </li>
                    <li>
                      Strengthening the spiritual life and faith of believers,
                      equipping and training ministers, and advancing the Gospel
                      among unreached people.
                    </li>
                    <li>
                      Demonstrating Christ’s compassion by caring for the poor,
                      comforting the grieving, providing practical support where
                      needed, and building a unified and loving body of Christ.
                    </li>
                    <li>
                      Maintaining strong, godly, and cooperative relationships
                      with churches that share the same gospel-centered mission.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= HERITAGE IMAGE ================= */}
{/*       <section className="about-image-section"> */}
{/*         <div className="page-container"> */}
{/*           <img */}
{/*             src={heritagePhoto} */}
{/*             alt="PEEC members wearing traditional Eritrean clothing" */}
{/*             className="about-section-image" */}
{/*           /> */}
{/*         </div> */}
{/*       </section> */}

      {/* ================= HISTORY ================= */}
      <section className="dark-section about-section">
        <div className="about-header">
          <h2>
            A Brief History of the Philadelphia Evangelical Eritrean Church,
            Columbus, OH
          </h2>

          <button
            type="button"
            className="about-read-btn read-more-btn"
            onClick={() => toggleSection("history")}
            aria-expanded={openSection === "history"}
            aria-controls="history-content"
          >
            {openSection === "history" ? (
              <>
                Show Less <span aria-hidden>{" ▲"}</span>
              </>
            ) : (
              <>
                Read More <span aria-hidden>{" ▼"}</span>
              </>
            )}
          </button>
        </div>

        {openSection === "history" && (
          <div className="read-more-content history-content" id="history-content">
            <div className="content-wrapper">
              <h3>Preface</h3>
              <p>
                The Philadelphia Evangelical Eritrean Church in Columbus, Ohio,
                acknowledges Christ as its ultimate founder and head. This
                booklet recounts the church’s humble beginnings, growth,
                spiritual milestones, leadership appointments, and partnerships
                with other churches.
              </p>

              <h3>The Humble Beginnings</h3>
              <p>
                In 2008, the Columbus area was home to only a small number of
                Tigrinya-speaking believers, most of whom worshiped in English-
                or Amharic-speaking congregations. During that year, these
                believers began to intentionally gather for fellowship.
              </p>

              <p>
                Though many were still young in their faith, God providentially
                brought them together and used them to lay the foundation of
                what would become the Philadelphia Evangelical Eritrean Church.
                In its earliest stage, the fellowship met in private homes,
                marking the humble beginnings of the church.
              </p>

              <p>
                To the glory of God, the number of souls began to increase, and
                the house-to-house gatherings expanded and multiplied. As the
                fellowship continued to grow, a formal choir and worship leaders
                were organized, marking the beginning of regular and structured
                worship services.
              </p>

              <h3>God’s Promises for the Church</h3>
              <p>
                God raised Pastor Negga Woldesemait to shepherd and lead the
                congregation. Additionally, many ministers moved to Columbus and
                joined the church, becoming the founders of several ministries
                that continue to serve the fellowship.
              </p>

              <h3>Important Milestones</h3>
              <p>
                In September 2010, the church officially began holding its
                services at the Bethany Lutheran Church building, where it
                continued to meet until the end of 2015. Beginning in early
                2016, the church started holding its services at The Cross Walk
                Church building.
              </p>

              <p>
                In December 2012, the fellowship was formally recognized as a
                legal church.
              </p>

              <h3>Appointment and Ordination of Leaders</h3>
              <p>
                Since July 2017, Pastor Negga Woldesemait has been appointed to
                serve as the pastor of the church and continues in this role in
                obedience to the Lord’s call. Pastor Negga, together with four
                elected elders, leads the church.
              </p>

              <h3>Relationships with Other Churches</h3>
              <p>
                The Philadelphia Evangelical Church functions as an independent
                congregation under the Christian and Missionary Alliance
                (C&amp;MA) as an observing partner, though not a full member.
              </p>

              <h3>Legacy and Thanksgiving</h3>
              <p>
                The Philadelphia Evangelical Eritrean Church stands as a
                testimony of God’s faithfulness. Its growth is the result of the
                prayers, dedication, and service of countless members,
                ministers, and leaders.
              </p>

              <p>
                We say Ebenezer—“God has helped us to this day.”
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ================= YOUTH IMAGE ================= */}
{/*       <section className="about-image-section"> */}
{/*         <div className="page-container"> */}
{/*           <img */}
{/*             src={youthPhoto} */}
{/*             alt="PEEC youth group" */}
{/*             className="about-section-image" */}
{/*           /> */}
{/*         </div> */}
{/*       </section> */}

      {/* ================= STATEMENT OF FAITH ================= */}
      <section className="light-section about-section">
        <div className="page-container">
          <div className="about-header">
            <h2>PEEC Statement of Faith</h2>

            <button
              type="button"
              className="about-read-btn read-more-btn"
              onClick={() => toggleSection("faith")}
              aria-expanded={openSection === "faith"}
              aria-controls="faith-content"
            >
              {openSection === "faith" ? (
                <>
                  Show Less <span aria-hidden>{" ▲"}</span>
                </>
              ) : (
                <>
                  Read More <span aria-hidden>{" ▼"}</span>
                </>
              )}
            </button>
          </div>

          {openSection === "faith" && (
            <div className="read-more-content faith-content" id="faith-content">
              <div className="about-card">
                <div className="content-wrapper">
                  <p>
                    PEEC is a non-denominational church, prioritizing the
                    foundations of the Christian faith.
                  </p>

                  <ul className="faith-list">
                    <li>
                      <strong>The Bible:</strong> The infallible, inerrant Word
                      of God and our final authority for faith and life.
                    </li>
                    <li>
                      <strong>The Trinity:</strong> One eternal God existing in
                      three equal, divine persons: Father, Son, and Holy Spirit.
                    </li>
                    <li>
                      <strong>God:</strong> An infinite, unchangeable Spirit
                      perfect in wisdom, power, holiness, justice, and truth.
                    </li>
                    <li>
                      <strong>Jesus Christ:</strong> Truly God and man, born of
                      a virgin, who died for sins, rose again, and will return in
                      glory.
                    </li>
                    <li>
                      <strong>The Holy Spirit:</strong> Dwelling in believers to
                      grant new life and holiness.
                    </li>
                    <li>
                      <strong>The Church:</strong> A visible body called to
                      preach the Gospel and administer sacraments under
                      Scriptural authority.
                    </li>
                    <li>
                      <strong>Unity in Christ:</strong> We love and welcome all
                      who love the Lord Jesus Christ, embracing every believer
                      regardless of ethnic background or language differences.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default About;
