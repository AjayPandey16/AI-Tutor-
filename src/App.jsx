import { useState } from 'react'
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, BookOpen,
  Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Clock3,
  Heart, Home, Lightbulb, Menu, MessageCircle, MoreHorizontal, Plus,
  Send, Sparkles, Smile, Sun, Target, X,
} from 'lucide-react'

const initialActivities = [
  { id: 1, title: 'Read together', detail: 'The Very Hungry Caterpillar', time: '8:30 AM', icon: BookOpen, color: 'peach', done: true },
  { id: 2, title: 'Outdoor play', detail: 'A little sunshine in the park', time: '10:15 AM', icon: Sun, color: 'yellow', done: true },
  { id: 3, title: 'Creative time', detail: 'Watercolor painting', time: '2:00 PM', icon: Sparkles, color: 'lavender', done: false },
]

const navItems = [
  { label: 'Overview', icon: Home },
  { label: 'Activities', icon: Activity },
  { label: 'Growth & insights', icon: Heart },
]

function App() {
  const todayLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date()).toUpperCase()
  const [activeNav, setActiveNav] = useState('Overview')
  const [activities, setActivities] = useState(initialActivities)
  const [range, setRange] = useState('This week')
  const [rangeOpen, setRangeOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAssistant, setShowAssistant] = useState(false)
  const [showAddActivity, setShowAddActivity] = useState(false)
  const [activityName, setActivityName] = useState('')
  const [chatText, setChatText] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const completed = activities.filter((activity) => activity.done).length
  const progress = Math.round((completed / Math.max(activities.length, 1)) * 100)

  function toggleActivity(id) {
    setActivities((items) => items.map((item) => item.id === id ? { ...item, done: !item.done } : item))
  }

  function addActivity(event) {
    event.preventDefault()
    const title = activityName.trim()
    if (!title) return
    setActivities((items) => [...items, {
      id: Date.now(), title, detail: 'A new little moment', time: 'Just added',
      icon: Heart, color: 'mint', done: false,
    }])
    setActivityName('')
    setShowAddActivity(false)
  }

  function sendMessage(event) {
    event.preventDefault()
    const message = chatText.trim()
    if (!message) return
    setChatMessages((items) => [...items, { from: 'you', text: message }, {
      from: 'assistant',
      text: 'Every child grows at their own pace. Try turning this into a small, playful moment together today.',
    }])
    setChatText('')
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNavOpen ? 'sidebar-open' : ''}`}>
        <a className="brand" href="#" aria-label="Little Moments home">
          <span className="brand-mark"><Heart size={19} fill="currentColor" /></span>
          <span>little<span className="brand-light">moments</span></span>
        </a>

        <div className="family-switcher">
          <div className="family-avatar">P</div>
          <div className="family-copy"><strong>Patel family</strong><span>Free plan</span></div>
          <ChevronDown size={16} className="muted-icon" />
        </div>

        <p className="nav-caption">MENU</p>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-link ${activeNav === label ? 'active' : ''}`} onClick={() => { setActiveNav(label); setMobileNavOpen(false) }}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
              {label === 'Activities' && <span className="nav-count">{activities.length}</span>}
            </button>
          ))}
        </nav>

        <p className="nav-caption child-caption">YOUR CHILD</p>
        <button className="child-switcher" onClick={() => setActiveNav('Overview')}>
          <span className="child-avatar">👧🏻</span>
          <span className="child-copy"><strong>Mia Patel</strong><small>Age 4 · Sunflower</small></span>
          <ChevronDown size={15} className="muted-icon" />
        </button>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-sparkle"><Sparkles size={16} /></div>
            <strong>A little more magic?</strong>
            <p>Unlock all the lovely ways to support Mia's growth.</p>
            <button onClick={() => setShowAssistant(true)}>Explore Plus <ArrowRight size={14} /></button>
          </div>
          <button className="parent-profile">
            <div className="parent-avatar">A</div>
            <div className="family-copy"><strong>Ajay Patel</strong><span>Parent account</span></div>
            <MoreHorizontal size={19} className="muted-icon" />
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu icon-button" aria-label="Open menu" onClick={() => setMobileNavOpen(!mobileNavOpen)}><Menu size={20} /></button>
          <div className="breadcrumb"><span>Family space</span><span className="breadcrumb-slash">/</span><strong>{activeNav}</strong></div>
          <div className="topbar-actions">
            <span className="today-label"><span className="online-dot" /> All caught up</span>
            <div className="notification-wrap">
              <button className="icon-button notification-button" aria-label="Notifications" onClick={() => setShowNotifications(!showNotifications)}><Bell size={19} /><i /></button>
              {showNotifications && <div className="notification-popover"><strong>You're all caught up!</strong><p>We'll let you know when there's a new little moment to celebrate.</p></div>}
            </div>
            <div className="top-avatar">A</div>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> {todayLabel}</div>
              <h1>A lovely day to grow, <span>Ajay.</span> <span className="wave">✳</span></h1>
              <p className="welcome-subtitle">Here's a little look at Mia's day so far.</p>
            </div>
            <button className="assistant-button" onClick={() => setShowAssistant(true)}>
              <span className="assistant-icon"><Sparkles size={17} /></span>
              Ask your AI assistant <ArrowRight size={15} />
            </button>
          </section>

          <section className="hero-grid">
            <article className="child-card card-3d">
              <div className="child-card-top">
                <div className="child-card-heading"><span className="sunburst">✳</span><span>YOUR LITTLE STAR</span></div>
                <button className="quiet-icon" aria-label="More child options"><MoreHorizontal size={20} /></button>
              </div>
              <div className="child-profile">
                <div className="large-avatar"><span>👧🏻</span><i><Heart size={12} fill="currentColor" /></i></div>
                <div><h2>Mia Patel</h2><p>4 years, 2 months old</p></div>
              </div>
              <div className="child-card-divider" />
              <div className="mood-row">
                <div className="mood-icon"><Smile size={19} /></div>
                <div className="mood-copy"><span>Today's mood</span><strong>Feeling sunny</strong></div>
                <span className="mood-emoji">☀️</span>
              </div>
              <div className="card-decoration decoration-one" /><div className="card-decoration decoration-two" />
            </article>

            <article className="progress-card card-3d">
              <div className="card-heading-row">
                <div><div className="section-kicker">A DAY WELL SPENT</div><h2>Little wins today</h2></div>
                <div className="target-icon"><Target size={19} /></div>
              </div>
              <div className="progress-content">
                <div className="progress-ring" style={{ '--progress': `${progress * 3.6}deg` }}>
                  <div className="progress-ring-inner"><strong>{completed}<span>/{activities.length}</span></strong><small>done</small></div>
                </div>
                <div className="progress-copy"><strong>You're doing great!</strong><p>Every little moment adds up to something wonderful.</p><span className="progress-note"><ArrowUpRight size={14} /> 2 more than yesterday</span></div>
              </div>
              <div className="progress-footer"><span>DAILY RHYTHM</span><span>{progress}% complete</span></div>
              <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
            </article>
          </section>

          <section className="middle-grid">
            <article className="activity-card surface-card">
              <div className="section-header">
                <div><div className="section-kicker">MADE OF LITTLE MOMENTS</div><h2>Today's activities <span className="activity-counter">{completed}/{activities.length}</span></h2></div>
                <button className="add-button" onClick={() => setShowAddActivity(true)}><Plus size={16} /> Add activity</button>
              </div>
              <div className="activity-list">
                {activities.map(({ id, title, detail, time, icon: Icon, color, done }) => (
                  <div className={`activity-row ${done ? 'activity-done' : ''}`} key={id}>
                    <button className={`activity-check ${done ? 'checked' : ''}`} aria-label={`${done ? 'Mark incomplete' : 'Mark complete'}: ${title}`} onClick={() => toggleActivity(id)}>{done && <Check size={14} />}</button>
                    <div className={`activity-icon ${color}`}><Icon size={18} strokeWidth={1.8} /></div>
                    <div className="activity-copy"><strong>{title}</strong><span>{detail}</span></div>
                    <span className="activity-time"><Clock3 size={13} /> {time}</span>
                    <button className="activity-more quiet-icon" aria-label={`More options for ${title}`}><MoreHorizontal size={18} /></button>
                  </div>
                ))}
                {activities.length === 0 && <p className="empty-activities">Add a little moment to get your day started.</p>}
              </div>
              <button className="view-all-button" onClick={() => setActiveNav('Activities')}>See all activities <ArrowRight size={15} /></button>
            </article>

            <article className="insight-card surface-card">
              <div className="insight-top"><div className="insight-icon"><Lightbulb size={18} /></div><span className="insight-tag"><span /> A LITTLE INSIGHT</span><button className="quiet-icon" aria-label="More insight options"><MoreHorizontal size={19} /></button></div>
              <h2>Big feelings, little words</h2>
              <p>Mia's been finding new ways to name how she feels. Stories can make those conversations feel extra easy.</p>
              <div className="insight-suggestion"><div className="book-thumbnail">📚</div><div><span>TRY TOGETHER</span><strong>Read a feelings story</strong></div><ArrowUpRight size={16} /></div>
              <button className="insight-link" onClick={() => setShowAssistant(true)}>Get a few ideas <ArrowRight size={14} /></button>
              <div className="insight-orb" />
            </article>
          </section>

          <section className="week-card surface-card">
            <div className="week-heading">
              <div><div className="section-kicker">THE LITTLE THINGS ADD UP</div><h2>Mia's week at a glance</h2></div>
              <div className="range-wrap">
                <button className="range-button" onClick={() => setRangeOpen(!rangeOpen)}>{range} <ChevronDown size={15} /></button>
                {rangeOpen && <div className="range-menu">{['This week', 'Last week', 'This month'].map((option) => <button key={option} onClick={() => { setRange(option); setRangeOpen(false) }}>{option}</button>)}</div>}
              </div>
            </div>
            <div className="chart-area">
              <div className="chart-y-labels"><span>12</span><span>8</span><span>4</span><span>0</span></div>
              <div className="chart">
                {[['Mon', 54], ['Tue', 73], ['Wed', 42], ['Thu', 89], ['Fri', 64], ['Sat', 35], ['Sun', 20]].map(([day, height], index) => (
                  <div className={`chart-day ${index === 3 ? 'today-chart-day' : ''}`} key={day}>
                    <div className="bar-stack"><span style={{ height: `${height}%` }} /><span style={{ height: `${Math.max(14, height * .54)}%` }} /></div>
                    <span className="chart-label">{day}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="chart-legend"><span><i className="legend-mint" /> Play & movement</span><span><i className="legend-peach" /> Learning & creativity</span><span className="chart-total"><ArrowDownRight size={14} /> A little more time outside</span></div>
          </section>

          <footer className="page-footer"><span>Made for the moments that matter <Heart size={12} fill="currentColor" /></span><span>Little Moments · A softer way to keep up</span></footer>
        </div>
      </main>

      {mobileNavOpen && <button className="mobile-scrim" aria-label="Close menu" onClick={() => setMobileNavOpen(false)} />}

      {showAddActivity && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowAddActivity(false) }}>
        <form className="dialog-card" onSubmit={addActivity}>
          <button type="button" className="dialog-close" aria-label="Close" onClick={() => setShowAddActivity(false)}><X size={18} /></button>
          <div className="dialog-icon mint"><Plus size={19} /></div><div className="section-kicker">MAKE A LITTLE PLAN</div><h2>Add an activity</h2><p>Small moments make the loveliest days.</p>
          <label className="input-label" htmlFor="activity-name">Activity name</label>
          <input id="activity-name" autoFocus value={activityName} onChange={(event) => setActivityName(event.target.value)} placeholder="e.g. Build a blanket fort" />
          <button className="dialog-submit" type="submit">Add to Mia's day <ArrowRight size={15} /></button>
        </form>
      </div>}

      {showAssistant && <div className="modal-backdrop assistant-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowAssistant(false) }}>
        <section className="assistant-panel">
          <header className="assistant-panel-head"><div className="assistant-title-mark"><Sparkles size={18} /></div><div><strong>Your AI assistant</strong><span>Here for the little questions</span></div><button className="dialog-close" aria-label="Close assistant" onClick={() => setShowAssistant(false)}><X size={18} /></button></header>
          <div className="assistant-chat">
            <div className="assistant-welcome"><div className="assistant-orbit"><Sparkles size={25} /></div><h2>Hi Ajay, I'm here for you.</h2><p>Wondering about Mia's day, routines, or those big little feelings? Let's figure it out together.</p></div>
            <div className="suggestion-chips">{['Ideas for rainy days', 'Help with bedtime', 'Celebrate a little win'].map((prompt) => <button key={prompt} onClick={() => { setChatText(prompt); }}>{prompt}<ChevronRight size={14} /></button>)}</div>
            {chatMessages.map((message, index) => <div className={`chat-message ${message.from}`} key={index}>{message.text}</div>)}
          </div>
          <form className="chat-input-row" onSubmit={sendMessage}><input aria-label="Ask a question" value={chatText} onChange={(event) => setChatText(event.target.value)} placeholder="Ask me anything about your day..." /><button aria-label="Send message" type="submit"><Send size={17} /></button></form>
          <div className="assistant-disclaimer">A thoughtful companion, not a replacement for professional advice.</div>
        </section>
      </div>}
    </div>
  )
}

export default App
