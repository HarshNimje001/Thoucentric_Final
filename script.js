/* ═══════════════════════════════════════════════════════════════════
   EIC STRATEGY WORKSPACE — JavaScript
   Premium interactions, scroll reveals, counters, navigation
   ═══════════════════════════════════════════════════════════════════ */

// ─── Prompt Data ───
const prompts = [
  {
    title: 'Prompt 1 — Understand the case',
    text: `I want to work through this case step by step rather than jump to the answer. Here is the case context: EIC is a government-owned EV charging company with 2,800 public charging stations, 32% annual EV growth, 46% average station utilization and 35% fast-charging stations. Urban stations face peak-hour congestion, while several highway and semi-urban stations operate below capacity. Private charging operators are entering the market and customer expectations around availability, reliability and charging speed are rising. Around 68% of EV owners prefer home charging, while commercial fleets rely heavily on public charging. EIC can choose only one investment: A is ₹4,800 Cr for 2,000 additional DC fast chargers over 4 years, B is ₹3,900 Cr for Tier-2/Tier-3 and rural expansion over 5 years, and C is ₹2,600 Cr for intelligent network modernization over 3 years, including demand forecasting, load balancing, dynamic pricing, predictive maintenance, reservations, renewable integration and remote monitoring, with an expected 30% increase in station utilization. The Board is looking at financial viability, ROI, market demand, customer impact, operational efficiency, scalability, technology readiness, sustainability, implementation risk and long-term value, with 2030 as the horizon. First, help me structure the situation, the decision, the key facts, constraints and tensions. Separate facts from interpretation. Don't recommend an option yet.`
  },
  {
    title: 'Prompt 2 — Challenge the diagnosis + customers',
    text: `Now challenge the initial problem statement. The biggest contradiction I see is that EIC has only 46% average utilization, yet some urban stations are congested while some highway and semi-urban stations are underused. Also, 68% of EV owners prefer home charging, so total EV growth may not translate directly into public-charging demand. Explore the main customer groups: individual EV owners, urban users, highway users, semi-urban users and commercial fleets. For each, identify their main Job To Be Done, biggest pain point and what they value most. Then build a simple MECE diagnosis and tell me whether the real issue is mainly capacity, geographic access, demand-capacity mismatch, network efficiency, customer experience or something else. Give me a revised problem statement at the end, but don't recommend A, B or C yet.`
  },
  {
    title: 'Prompt 3 — Evaluate A, B and C',
    text: `Now compare the three options against the problem we have diagnosed rather than just comparing them on size or cost. For each option, explain what it solves, what it leaves unresolved, its biggest strength, biggest weakness and the key assumption it depends on. Then build a weighted decision matrix using root-cause fit, market demand alignment, customer impact, financial viability, ROI/value creation, operational efficiency, scalability to 2030, technology readiness, sustainability and implementation risk. Use the case data only and clearly flag where the evidence is incomplete. Don't invent financial returns. Also be careful with C's stated 30% utilization increase because the case does not clarify whether that means a relative increase or a percentage-point increase. End by telling me which option currently looks strongest and what could realistically make another option win.`
  },
  {
    title: 'Prompt 4 — Challenge the preferred option',
    text: `The analysis may now point toward one option, but I don't want to accept it too quickly. Use 5 Whys to test whether the preferred option is actually solving the root cause or just treating a symptom. Then use first-principles thinking: what does a customer fundamentally need from a charging network, what makes a charging station productive, what can EIC actually control, and what should EIC be trying to maximize with one major investment through 2030? In particular, challenge the idea that better utilization alone is enough if there are genuine regional infrastructure gaps. Also challenge the opposite idea that building more infrastructure automatically creates value. Make the strongest case against the preferred option and the strongest case for each alternative. Change the recommendation if the logic warrants it.`
  },
  {
    title: 'Prompt 5 — Build the strategy',
    text: `Based on the diagnosis, customer analysis and option challenge, develop the strategy for the option that best fits the problem. I don't want a list of technologies; I want the strategic mechanism. Explain how the chosen option creates customer value, improves network performance, uses capital better and prepares EIC for 2030. If C is the answer, connect demand forecasting, smart load balancing, dynamic pricing, reservations, predictive maintenance, renewable integration and remote monitoring to the specific problems we identified. Also show how the approach should differ between urban, highway and semi-urban locations. The strategy should recognize that none of the three options is perfect and should clearly state the assumptions under which the chosen option makes the most sense. End with one strong strategic principle and the key KPIs.`
  },
  {
    title: 'Prompt 6 — Turn it into a 3-year plan',
    text: `Now turn the strategy into a practical three-year implementation plan. Keep it simple and use three phases: 0–6 months, 6–18 months and 18–36 months. Phase 1 should build the network intelligence and establish the station-level baseline. Phase 2 should pilot and optimize the capabilities that address the demand-capacity mismatch. Phase 3 should scale what works and use the data to decide where physical expansion is actually required. For each phase, give me the main actions, what should be piloted, KPIs, key risks and the decision gate before moving ahead. Keep the plan consistent with the assumptions we have already identified: EV growth is unlikely to be uniform across locations, public-charging demand depends on specific customer segments, existing charging infrastructure is difficult to reallocate, and EIC's digital readiness is not fully known.`
  },
  {
    title: 'Prompt 7 — Stress-test the whole recommendation',
    text: `Before we finalize, try to break the recommendation. Look at it from customer value, growth potential, differentiation, capital efficiency, strategic logic, consumer behaviour, data requirements, implementation practicality and long-term scalability. Give me the strongest point and biggest weakness from each angle, without forcing everything to support the current choice. Then test the recommendation against four specific risks: faster or slower EV growth, stronger regional demand than expected, weak customer response to reservations or pricing, and technology/data limitations within EIC. Also tell me what would have to happen for A or B to become the better choice. Finish with the few assumptions we absolutely need to keep visible in the final recommendation.`
  },
  {
    title: 'Prompt 8 — Write the final recommendation',
    text: `Now synthesize everything into the final recommendation for the EIC Board. Select one option only and make the case evidence-driven rather than technology-driven. Structure it as: Executive Summary, Problem Statement, Root Cause, Decision Matrix Insight, Recommended Option, Why It Wins, Why the Other Two Are Not Preferred, Strategic Approach, 3-Year Implementation, KPIs and Business Impact, Risks and Mitigations, Key Assumptions and Final Recommendation. Make the trade-off clear: the chosen option does not solve every problem, but it is the best fit for the diagnosed problem under the stated assumptions. If C remains the recommendation, make the principle clear that EIC should modernize the network first, use the resulting demand intelligence to improve utilization and reliability, and then expand physically where the data proves expansion is required. Do not invent ROI, revenue, market share or unsupported outcomes. Keep it between 1,000 and 1,500 words.`
  }
];


// ─── DOM Ready ───
document.addEventListener('DOMContentLoaded', () => {

  // ─── Render Prompts ───
  const list = document.getElementById('prompt-list');
  if (list) {
    prompts.forEach((p, i) => {
      const el = document.createElement('div');
      el.className = 'prompt';
      el.innerHTML = `
        <button type="button">
          <span>${p.title}</span>
          <span class="prompt-toggle">+</span>
        </button>
        <div class="body">
          <pre>${p.text}</pre>
        </div>`;
      el.querySelector('button').addEventListener('click', () => {
        const wasOpen = el.classList.contains('open');
        // Close all others
        document.querySelectorAll('.prompt.open').forEach(other => {
          if (other !== el) other.classList.remove('open');
        });
        el.classList.toggle('open');
      });
      list.appendChild(el);
    });
  }


  // ─── Scroll Reveal ───
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));


  // ─── Animated Counters ───
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        if (isNaN(target)) return;
        
        const duration = 1800;
        const start = performance.now();
        
        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          el.textContent = current.toLocaleString();
          if (progress < 1) requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));


  // ─── Scroll Progress Bar ───
  const progressBar = document.getElementById('scrollProgress');
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });


  // ─── Sticky Navbar Scroll Effect ───
  const topbar = document.getElementById('topbar');
  const handleNavScroll = () => {
    if (window.scrollY > 50) {
      topbar.classList.add('scrolled');
    } else {
      topbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });


  // ─── Active Nav Link ───
  const navLinks = document.querySelectorAll('.topbar nav a');
  const sections = document.querySelectorAll('section[id]');
  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 120;
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollPos >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();


  // ─── Mobile Nav Toggle ───
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
    // Close on nav link click
    mainNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mainNav.classList.remove('open');
      });
    });
  }


  // ─── Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
