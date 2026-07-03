/**
 * Airtap.ai — landing page content.
 * Centralized so all three variations share the same source of truth.
 */

export type ChatRole = "agent" | "user";

export interface ChatMessage {
  role: ChatRole;
  text: string;
  /** Optional rich attachment rendered inside the bubble. */
  attachment?: {
    kind: "flight" | "reel" | "job" | "cart" | "receipt";
    title: string;
    subtitle?: string;
    meta?: string;
  };
}

export interface Conversation {
  id: string;
  /** Short label shown in the carousel + title under the phone. */
  useCase: string;
  /** One-line context shown under the title. */
  tagline: string;
  accent: string;
  messages: ChatMessage[];
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: "flights",
    useCase: "Book a flight",
    tagline: "From “I need to travel” to a confirmed seat — hands-free.",
    accent: "#714FEE",
    messages: [
      { role: "user", text: "Book me a flight to Tokyo next Friday, window seat under $900." },
      { role: "agent", text: "On it. Opening Google Flights on your cloud phone now." },
      {
        role: "agent",
        text: "Found a great option — want me to grab it?",
        attachment: {
          kind: "flight",
          title: "SFO → HND · ANA",
          subtitle: "Fri, 9:45 AM · Nonstop · Window 32A",
          meta: "$874 round trip",
        },
      },
      { role: "user", text: "Yes, book it 🙌" },
      { role: "agent", text: "Booked. Boarding pass is in your wallet. Have a great trip ✈️" },
    ],
  },
  {
    id: "instagram",
    useCase: "Catch the trend",
    tagline: "Your feed, summarized — without the doomscroll.",
    accent: "#D66EF0",
    messages: [
      { role: "user", text: "What's the trending reel in my feed right now?" },
      { role: "agent", text: "Checking Instagram for you…" },
      {
        role: "agent",
        text: "This one's blowing up with people you follow:",
        attachment: {
          kind: "reel",
          title: "“60-second carbonara”",
          subtitle: "@kitchenminimal · 2.4M views",
          meta: "Saved to your collection",
        },
      },
      { role: "user", text: "Perfect, send me 3 more like that" },
      { role: "agent", text: "Done — 3 reels dropped in your DMs. Enjoy 🍝" },
    ],
  },
  {
    id: "linkedin",
    useCase: "Apply to jobs",
    tagline: "Tailored applications sent while you sleep.",
    accent: "#01A5BE",
    messages: [
      { role: "user", text: "Apply to 5 senior product designer roles in SF for me." },
      { role: "agent", text: "Got it. I'll use your saved résumé and Easy Apply on LinkedIn." },
      {
        role: "agent",
        text: "First 3 are in — tailoring each cover note:",
        attachment: {
          kind: "job",
          title: "Sr. Product Designer",
          subtitle: "Figma · Linear · Notion",
          meta: "3 of 5 submitted",
        },
      },
      { role: "user", text: "Skip anything below $160k" },
      { role: "agent", text: "Noted. Filtered + finished all 5. I'll ping you on replies 📨" },
    ],
  },
  {
    id: "groceries",
    useCase: "Run a routine",
    tagline: "Your Sunday reset, on autopilot every week.",
    accent: "#4FAC31",
    messages: [
      { role: "user", text: "Run my Sunday Reset routine." },
      { role: "agent", text: "Starting Sunday Reset — 3 tasks queued." },
      {
        role: "agent",
        text: "Groceries reordered from your usual cart:",
        attachment: {
          kind: "cart",
          title: "Weekly essentials · 18 items",
          subtitle: "Instacart · arrives 6–7 PM",
          meta: "$92.40",
        },
      },
      { role: "user", text: "Add oat milk and we're good" },
      { role: "agent", text: "Added. Laundry slot booked + inbox triaged too. All done ✅" },
    ],
  },
  {
    id: "briefing",
    useCase: "Morning briefing",
    tagline: "Wake up to a world that's already handled.",
    accent: "#ED7E30",
    messages: [
      { role: "user", text: "Good morning — what do I need to know?" },
      { role: "agent", text: "Morning! Pulling your briefing together…" },
      {
        role: "agent",
        text: "Here's your day at a glance:",
        attachment: {
          kind: "receipt",
          title: "3 meetings · 1 deadline",
          subtitle: "Rent paid · Package out for delivery",
          meta: "Gym booked 6 PM",
        },
      },
      { role: "user", text: "Move my 2pm to tomorrow" },
      { role: "agent", text: "Rescheduled and everyone's notified. You're all set ☀️" },
    ],
  },
];

export interface Routine {
  id: string;
  emoji: string;
  title: string;
  description: string;
  cadence: string;
  category: string;
}

export const ROUTINES: Routine[] = [
  {
    id: "sunday-reset",
    emoji: "🧺",
    title: "Sunday Reset",
    description: "Reorder groceries, triage your inbox, and book the week's chores in one run.",
    cadence: "Weekly · Sun 9 AM",
    category: "Lifestyle",
  },
  {
    id: "job-hunt",
    emoji: "💼",
    title: "Auto Job Hunt",
    description: "Apply to fresh roles matching your filters with a tailored note each time.",
    cadence: "Daily · 8 AM",
    category: "Career",
  },
  {
    id: "deal-watch",
    emoji: "🏷️",
    title: "Deal Watcher",
    description: "Track price drops on your wishlist and buy the moment they hit target.",
    cadence: "Every 6 hours",
    category: "Shopping",
  },
  {
    id: "morning-brief",
    emoji: "☀️",
    title: "Morning Briefing",
    description: "Calendar, weather, news and bills summarized straight to messaging.",
    cadence: "Daily · 7 AM",
    category: "Productivity",
  },
  {
    id: "social-pulse",
    emoji: "📈",
    title: "Social Pulse",
    description: "Catch the top reels and posts from people you follow — no scrolling.",
    cadence: "Daily · 6 PM",
    category: "Social",
  },
  {
    id: "bill-pay",
    emoji: "💳",
    title: "Bill Autopilot",
    description: "Detect due bills, confirm with you, and pay them before late fees hit.",
    cadence: "Monthly",
    category: "Finance",
  },
];

export interface Feature {
  icon: string;
  title: string;
  body: string;
}

export const SECURITY_POINTS: Feature[] = [
  {
    icon: "key",
    title: "No passwords, ever.",
    body: "You log into your apps the normal way, on your own account. Airtap never sees or stores your passwords.",
  },
  {
    icon: "lock",
    title: "Your phone, your phone.",
    body: "Your cloud phone runs in its own private, isolated container. No one else can access it. Not other users, not us.",
  },
];

export const HOW_IT_WORKS: Feature[] = [
  {
    icon: "phone",
    title: "Spin up your cloud phone",
    body: "A real Android device in the cloud, ready in seconds. Install the apps you already use.",
  },
  {
    icon: "login",
    title: "Log in once, privately",
    body: "Sign into your apps on a screen the agent can see but can't read. Your credentials stay yours.",
  },
  {
    icon: "chat",
    title: "Just text what you need",
    body: "Ask in plain English via messaging. The agent taps, types and swipes to get it done.",
  },
  {
    icon: "repeat",
    title: "Save it as a routine",
    body: "Loved the result? Turn any task into a routine that reruns on your schedule.",
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "What is Airtap?",
    a: "Airtap is a personal AI agent that lives in your messaging apps and operates the apps on your phone.",
  },
  {
    q: "What makes Airtap different from other AI agents?",
    a: "Traditional agents operate in browsers or cloud sandboxes and can only access web content. Airtap runs on a real phone with your real accounts — it taps, types, and swipes just like you would.",
  },
  {
    q: "How does it work?",
    a: "Text or send an iMessage to +1-650-213-7322. Airtap will reply and help you think through what you want to do. For advanced use cases, visit airtap.ai/app.",
  },
  {
    q: "What is Autopilot?",
    a: "Autopilot is our Android app that controls apps installed on your own Android device. Install it via sideloading through your account settings.",
  },
  {
    q: "What can I ask it to do?",
    a: "Anything you would do by hand in an app — digital couponing, playlist conversion, feed summarization, rideshare ordering, job applications, flight booking, and more.",
  },
  {
    q: "What are routines?",
    a: "A routine is a job you save to run automatically on a schedule, instead of sending it by hand each time.",
  },
  {
    q: "Do I need my own Android phone?",
    a: "No. Airtap runs on a cloud phone provisioned for you — no extra hardware required.",
  },
  {
    q: "Does it work on an iPhone?",
    a: "Yes. iPhone users can message the agent directly via iMessage. Android users can use Telegram or SMS.",
  },
  {
    q: "Do I have to give Airtap my passwords?",
    a: "No. You authenticate in your apps independently — Airtap has no access to your credentials.",
  },
  {
    q: "Where do I get help?",
    a: "Visit airtap.ai/support or email support@airtap.ai.",
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "I booked a whole trip from my lock screen. Texted Airtap, approved one flight, done. It feels like having a chief of staff.",
    name: "Priya Menon",
    role: "Founder, Lumen Labs",
    initials: "PM",
  },
  {
    quote: "The job-hunt routine applied to 40 roles in a week with tailored notes. I landed two interviews without opening LinkedIn once.",
    name: "Marcus Hale",
    role: "Product Designer",
    initials: "MH",
  },
  {
    quote: "What sold me was the privacy model. The agent does the work but literally can't see my passwords. That's the right way to build this.",
    name: "Dana Whitfield",
    role: "Security Engineer",
    initials: "DW",
  },
  {
    quote: "My Sunday Reset routine runs itself now — groceries, laundry, inbox. I got my weekends back.",
    name: "Sofia Russo",
    role: "Hospital Resident",
    initials: "SR",
  },
];

export const STATS = [
  { value: "2.3M+", label: "tasks completed" },
  { value: "180+", label: "apps supported" },
  { value: "0", label: "passwords stored" },
  { value: "4.9★", label: "average rating" },
];

export const LOGOS = ["TechCrunch", "The Verge", "Wired", "Product Hunt", "Fast Company"];

export const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Routines", href: "#routines" },
  { label: "Messaging", href: "#messaging" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: ["Cloud Phone", "AI Agent", "Routines Library", "Messaging Mode", "Pricing", "Changelog"],
  },
  {
    title: "Use cases",
    links: ["Travel booking", "Job applications", "Shopping & deals", "Social media", "Personal finance", "Daily briefings"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Press kit", "Contact", "Status"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Privacy & Security", "Trust Center", "API", "Community", "Support"],
  },
];
