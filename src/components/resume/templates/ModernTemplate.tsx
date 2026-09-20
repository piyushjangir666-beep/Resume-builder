import { ResumeData } from '@/types/resume';

interface Props {
  resume: ResumeData;
  style: React.CSSProperties;
  accentColor: string;
}

// Shared section heading — bold title + full-width underline
function Heading({ title }: { title: string }) {
  return (
    <div style={{ marginTop: '14px', marginBottom: '6px' }}>
      <p style={{ fontWeight: 700, fontSize: '11.5pt', color: '#000', marginBottom: '2px' }}>{title}</p>
      <div style={{ borderBottom: '1.5px solid #000' }} />
    </div>
  );
}

// Bullet line
function Bullet({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', gap: '6px', marginBottom: '2px' }}>
      <span style={{ fontSize: '10pt', lineHeight: '1.5', flexShrink: 0 }}>•</span>
      <span style={{ fontSize: '10pt', lineHeight: '1.5', color: '#111' }}>{text}</span>
    </div>
  );
}

export default function ModernTemplate({ resume, style }: Props) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, achievements } = resume;

  const contactItems = [
    { label: personalInfo.location, href: null },
    { label: personalInfo.phone, href: personalInfo.phone ? `tel:${personalInfo.phone}` : null },
    { label: personalInfo.email, href: personalInfo.email ? `mailto:${personalInfo.email}` : null },
    { label: personalInfo.linkedin ? 'LinkedIn' : null, href: personalInfo.linkedin || null },
    { label: personalInfo.github ? 'GitHub' : null, href: personalInfo.github || null },
    { label: personalInfo.portfolio ? 'Portfolio' : null, href: personalInfo.portfolio || null },
  ].filter(i => i.label);

  return (
    <div style={{ ...style, fontFamily: 'Times New Roman, serif', color: '#000', padding: '36px 48px', fontSize: '10.5pt', lineHeight: '1.5' }}>

      {/* ── NAME ── */}
      <div style={{ textAlign: 'center', marginBottom: '6px' }}>
        <h1 style={{ fontSize: '18pt', fontWeight: 700, color: '#000', margin: 0, letterSpacing: '0.3px' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.title && (
          <p style={{ fontSize: '10.5pt', color: '#333', marginTop: '2px' }}>{personalInfo.title}</p>
        )}
      </div>

      {/* ── CONTACT LINE ── */}
      {contactItems.length > 0 && (
        <p style={{ textAlign: 'center', fontSize: '9.5pt', color: '#222', marginBottom: '4px' }}>
          {contactItems.map((item, i) => (
            <span key={i}>
              {i > 0 && <span style={{ margin: '0 5px', color: '#555' }}>■</span>}
              {item.href
                ? <a href={item.href} target="_blank" rel="noreferrer" style={{ color: '#1a56db', textDecoration: 'none' }}>{item.label}</a>
                : item.label}
            </span>
          ))}
        </p>
      )}

      <div style={{ borderBottom: '1.5px solid #000', marginBottom: '2px' }} />

      {/* ── CAREER OBJECTIVE / SUMMARY ── */}
      {summary && (
        <>
          <Heading title="Career Objective" />
          <p style={{ fontSize: '10pt', color: '#111', lineHeight: '1.6', textAlign: 'justify' }}>{summary}</p>
        </>
      )}

      {/* ── TECHNICAL SKILLS ── */}
      {skills.length > 0 && (
        <>
          <Heading title="Technical Skills" />
          <div style={{ paddingLeft: '4px' }}>
            {skills.map((skill, i) => <Bullet key={i} text={skill} />)}
          </div>
        </>
      )}

      {/* ── EXPERIENCE ── */}
      {experience.length > 0 && (
        <>
          <Heading title="Work Experience" />
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <p style={{ fontWeight: 700, fontSize: '10.5pt', color: '#000', margin: 0 }}>
                  {exp.jobTitle}{exp.company ? ` — ${exp.company}` : ''}
                </p>
                <p style={{ fontSize: '9.5pt', color: '#444', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                  {exp.startDate}{(exp.endDate || exp.current) ? ` – ${exp.current ? 'Present' : exp.endDate}` : ''}
                </p>
              </div>
              {exp.location && (
                <p style={{ fontSize: '9.5pt', color: '#555', margin: '1px 0' }}>{exp.location}</p>
              )}
              {exp.responsibilities && (
                <div style={{ marginTop: '3px', paddingLeft: '4px' }}>
                  {exp.responsibilities.split('\n').filter(Boolean).map((line, i) => (
                    <Bullet key={i} text={line.replace(/^[-•]\s*/, '')} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {/* ── ACADEMIC QUALIFICATION ── */}
      {education.length > 0 && (
        <>
          <Heading title="Academic Qualification" />
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '8px' }}>
              <p style={{ fontWeight: 700, fontSize: '10.5pt', color: '#000', margin: 0 }}>
                {edu.degree}{edu.field ? ` (${edu.field})` : ''}
                {edu.grade ? <span style={{ fontWeight: 400, fontSize: '10pt' }}> : {edu.grade}</span> : ''}
              </p>
              <p style={{ fontSize: '10pt', color: '#111', margin: '1px 0' }}>
                {edu.institution}{(edu.startYear || edu.endYear) ? ` : ${edu.endYear || edu.startYear}` : ''}
              </p>
            </div>
          ))}
        </>
      )}

      {/* ── PROJECTS ── */}
      {projects.length > 0 && (
        <>
          <Heading title="Projects" />
          {projects.map((proj, idx) => (
            <div key={proj.id} style={{ marginBottom: '8px' }}>
              <p style={{ fontWeight: 700, fontSize: '10.5pt', color: '#000', margin: '0 0 2px 0' }}>
                {idx + 1}. {proj.name}
                {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" style={{ fontWeight: 400, fontSize: '9pt', color: '#1a56db', marginLeft: '6px' }}>Live ↗</a>}
                {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" style={{ fontWeight: 400, fontSize: '9pt', color: '#1a56db', marginLeft: '6px' }}>GitHub ↗</a>}
              </p>
              {proj.description && (
                <div style={{ paddingLeft: '4px' }}>
                  {proj.description.split('\n').filter(Boolean).map((line, i) => (
                    <Bullet key={i} text={line.replace(/^[-•]\s*/, '')} />
                  ))}
                </div>
              )}
              {proj.technologies && (
                <div style={{ paddingLeft: '4px' }}>
                  <Bullet text={`Tech Stack: ${proj.technologies}`} />
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {/* ── CERTIFICATIONS ── */}
      {certifications.length > 0 && (
        <>
          <Heading title="Certifications" />
          {certifications.map(cert => (
            <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <p style={{ fontSize: '10pt', color: '#111', margin: 0 }}>
                {cert.credentialUrl
                  ? <a href={cert.credentialUrl} target="_blank" rel="noreferrer" style={{ fontWeight: 700, color: '#1a56db', textDecoration: 'none' }}>{cert.name}</a>
                  : <strong>{cert.name}</strong>}
                {cert.organization ? ` — ${cert.organization}` : ''}
              </p>
              <p style={{ fontSize: '9.5pt', color: '#555', whiteSpace: 'nowrap', marginLeft: '8px' }}>{cert.date}</p>
            </div>
          ))}
        </>
      )}

      {/* ── ACHIEVEMENTS ── */}
      {achievements.length > 0 && (
        <>
          <Heading title="Achievements" />
          <div style={{ paddingLeft: '4px' }}>
            {achievements.map(ach => (
              <Bullet key={ach.id} text={ach.title + (ach.description ? ` — ${ach.description}` : '')} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
