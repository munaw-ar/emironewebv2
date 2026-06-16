import ContentPage, { type ContentSection } from "@/components/layout/ContentPage";

const sections: ContentSection[] = [
  {
    "heading": "Who we are",
    "blocks": [
      {
        "kind": "lead",
        "text": "Emir One runs ethical, Sharia-aligned cold-email infrastructure for B2B firms, and emirone.com is our public site."
      },
      {
        "kind": "p",
        "text": "In this policy, \"we\", \"us\" and \"our\" mean Emir One. \"You\" means anyone visiting the site or sending us their details. For the purposes of GDPR and similar laws, Emir One is the controller of the personal data described here. If you need our registered entity name and postal address for a formal request or notice, email privacy@emirone.com and we will provide them."
      },
      {
        "kind": "p",
        "text": "Questions about anything below go to privacy@emirone.com. We read those, and a person replies."
      }
    ]
  },
  {
    "heading": "What we collect, and how",
    "blocks": [
      {
        "kind": "lead",
        "text": "We collect very little, and only in the few places where you actually hand it to us or where the site needs it to function."
      },
      {
        "kind": "h3",
        "text": "The free deliverability checker"
      },
      {
        "kind": "p",
        "text": "When you type a domain into our checker, the lookup runs in your own browser against Cloudflare's public DNS-over-HTTPS resolver. The domain you enter is not sent to or stored on our servers. We do not keep a record of what you checked."
      },
      {
        "kind": "h3",
        "text": "Newsletter signup"
      },
      {
        "kind": "p",
        "text": "If you subscribe, we store the email address you give us and a note of which page you signed up from (so we know what you were reading when you decided to join). That is it."
      },
      {
        "kind": "h3",
        "text": "Booking and contact"
      },
      {
        "kind": "p",
        "text": "When you book a call or get in touch, we store the details you submit: your name, email, company, website, phone, and the goal you describe. We use this to understand your situation and prepare for the conversation. Scheduling runs through an embedded Cal.com calendar."
      },
      {
        "kind": "h3",
        "text": "Aggregate analytics"
      },
      {
        "kind": "p",
        "text": "We record lightweight, aggregate events, for example that a report was downloaded. These are counts and patterns, not profiles. They are never tied to advertising and are not used to follow you around the internet."
      },
      {
        "kind": "h3",
        "text": "Admin session storage"
      },
      {
        "kind": "p",
        "text": "The only thing the site stores in your browser is a session token, and only for our private admin area. Ordinary visitors never receive it."
      },
      {
        "kind": "p",
        "text": "We do not run advertising cookies, ad trackers, or third-party marketing pixels. We do not buy, sell, rent, or trade personal data. We do not knowingly collect sensitive personal data, and we ask you not to send it."
      }
    ]
  },
  {
    "heading": "How and why we use it",
    "blocks": [
      {
        "kind": "p",
        "text": "Everything we collect serves a plain purpose:"
      },
      {
        "kind": "ul",
        "items": [
          "Newsletter email: to send you the research and updates you asked for, and to record where you subscribed so the list stays honest.",
          "Booking and contact details: to respond to you, assess fit, prepare for and run the call, and follow up on what we discussed.",
          "Aggregate analytics: to see which research and pages are useful and to keep the site working well.",
          "Admin session token: to keep our own team securely signed in to the private admin area."
        ]
      },
      {
        "kind": "p",
        "text": "We do not use your information for automated decision-making that produces legal or similarly significant effects on you, and we do not profile you for advertising."
      }
    ]
  },
  {
    "heading": "Our legal bases",
    "blocks": [
      {
        "kind": "p",
        "text": "Where GDPR or comparable law applies, we rely on the following:"
      },
      {
        "kind": "ul",
        "items": [
          "Consent (Art 6(1)(a)): for the newsletter. You can unsubscribe at any time using the link in every email, and withdrawing consent is as easy as giving it.",
          "Contractual necessity (Art 6(1)(b)): to handle your booking or enquiry and the steps leading up to a possible engagement.",
          "Legitimate interests (Art 6(1)(f)): to run aggregate analytics, keep the site secure, and contact relevant B2B prospects through our outbound work. Where we rely on legitimate interests, you have the right to object under Art 21, and we will stop unless we have a compelling, lawful reason not to.",
          "Legal obligation: where we are required to keep or disclose information to comply with the law."
        ]
      }
    ]
  },
  {
    "heading": "How we contact people for outbound",
    "blocks": [
      {
        "kind": "lead",
        "text": "Our business is cold email done ethically, so we hold ourselves to a strict standard for the messages we send on behalf of clients and for ourselves."
      },
      {
        "kind": "p",
        "text": "Every recipient has a real, specific reason to be contacted. We work on a consent-first and legitimate-interest basis, we minimise the personal data we use, and we never invent connections, fake \"Re:\" subject lines, or manufacture urgency."
      },
      {
        "kind": "p",
        "text": "If someone asks to be removed, we honour it immediately, the same day, across every sending domain, using a maintained suppression list. Once you are on that list, you stay off."
      },
      {
        "kind": "p",
        "text": "We operate in line with GDPR (legitimate interest under Art 6(1)(f), with the right to object under Art 21), US CAN-SPAM, UK PECR, and the Australian Spam Act."
      }
    ]
  },
  {
    "heading": "Processors and sub-processors we rely on",
    "blocks": [
      {
        "kind": "p",
        "text": "We keep our stack small and use established providers. Each one only ever handles the data needed to do its job, and is bound to keep it confidential and secure."
      },
      {
        "kind": "ul",
        "items": [
          "Vercel: hosting and content delivery for the site, plus privacy-respecting Speed Insights, which measures page performance without setting cookies or tracking individuals.",
          "Supabase: our Postgres database, where booking, contact, and newsletter records are stored. Data here may be processed and stored in the United States.",
          "Cal.com: the embedded calendar used to schedule calls.",
          "Cloudflare: its public DNS-over-HTTPS resolver answers deliverability-checker lookups from your browser. We do not store the result.",
          "Google Fonts: serves the typefaces the site uses."
        ]
      },
      {
        "kind": "p",
        "text": "We do not add new categories of processor without updating this policy."
      },
      {
        "kind": "p",
        "text": "Because Google serves these fonts from its own content delivery network, your browser's IP address is shared with Google when a page loads. We use Google Fonts only to render type, never to track you."
      }
    ]
  },
  {
    "heading": "International data transfers",
    "blocks": [
      {
        "kind": "p",
        "text": "Some of our providers, including Supabase, may process or store data in the United States, so your information may be handled outside your own country."
      },
      {
        "kind": "p",
        "text": "Where we transfer personal data out of the UK, EEA, or another region with transfer rules, we rely on appropriate safeguards such as the European Commission's Standard Contractual Clauses (and the UK Addendum where relevant), together with the providers' own security commitments. If you want detail on the safeguards covering your data, email privacy@emirone.com."
      }
    ]
  },
  {
    "heading": "How long we keep it",
    "blocks": [
      {
        "kind": "p",
        "text": "We keep personal data only as long as there is a clear reason to:"
      },
      {
        "kind": "ul",
        "items": [
          "Newsletter email: until you unsubscribe, after which we remove you from the active list.",
          "Booking and contact details: for as long as needed to handle your enquiry and any resulting engagement, then for a reasonable period afterwards for records, legal, and tax purposes.",
          "Suppression list: kept indefinitely on purpose, because its whole job is to make sure we never contact someone who has opted out.",
          "Aggregate analytics: retained in aggregate form and not tied back to you."
        ]
      },
      {
        "kind": "p",
        "text": "When data is no longer needed, we delete it or anonymise it."
      }
    ]
  },
  {
    "heading": "Cookies and similar technologies",
    "blocks": [
      {
        "kind": "p",
        "text": "We do not use tracking or advertising cookies, and we do not run third-party marketing trackers."
      },
      {
        "kind": "p",
        "text": "The only browser storage the site uses is a session token for our private admin area, which ordinary visitors never receive. Our analytics and the Vercel Speed Insights we use are designed to work without cookies and without identifying you. You can clear or block browser storage in your settings at any time without breaking the public site."
      }
    ]
  },
  {
    "heading": "Data security",
    "blocks": [
      {
        "kind": "p",
        "text": "We take reasonable technical and organisational steps to protect your information against unauthorised access, disclosure, misuse, and loss, and we keep the amount of personal data we hold deliberately small."
      },
      {
        "kind": "p",
        "text": "No method of transmission or storage is perfectly secure, so we cannot promise absolute security, but we treat your data as something to protect, not collect."
      }
    ]
  },
  {
    "heading": "If something goes wrong",
    "blocks": [
      {
        "kind": "p",
        "text": "We hold very little personal data and we work to keep it secure. If a breach ever affects your personal information, we will notify the relevant supervisory authority within the time the law requires (for example, within 72 hours under GDPR where feasible) and tell affected people without undue delay where there is a real risk to them."
      }
    ]
  },
  {
    "heading": "Your rights",
    "blocks": [
      {
        "kind": "p",
        "text": "Depending on where you live, you may have the right to:"
      },
      {
        "kind": "ul",
        "items": [
          "Access the personal data we hold about you.",
          "Correct anything that is wrong or out of date.",
          "Delete your data, where we are not required to keep it.",
          "Object to processing we base on legitimate interests, including outbound contact.",
          "Withdraw consent, for example by unsubscribing from the newsletter.",
          "Receive your data in a portable format.",
          "Complain to a supervisory authority (such as the UK ICO, your local EU data protection authority, or the Australian OAIC)."
        ]
      },
      {
        "kind": "p",
        "text": "To exercise any of these, email privacy@emirone.com. We will not charge you for a reasonable request, and we will respond within the time the relevant law allows. We may need to confirm your identity first so we do not hand your data to the wrong person."
      }
    ]
  },
  {
    "heading": "Your US state privacy rights",
    "blocks": [
      {
        "kind": "p",
        "text": "If you live in California or another US state with a consumer-privacy law (such as Virginia, Colorado, Connecticut, or Utah), you have rights over your personal information, including the right to know what we hold, to request a copy, to ask us to correct or delete it, and not to be treated differently for exercising those rights."
      },
      {
        "kind": "p",
        "text": "We do not sell your personal information, and we do not share it for cross-context behavioural advertising, as those terms are defined under California law. We never have. To make a request, email privacy@emirone.com and we will verify it and respond within the time the law allows."
      }
    ]
  },
  {
    "heading": "Children",
    "blocks": [
      {
        "kind": "p",
        "text": "This is a B2B service and is not intended for anyone under 18. We do not knowingly collect personal data from children. If you believe a child has sent us information, email privacy@emirone.com and we will delete it."
      }
    ]
  },
  {
    "heading": "Changes to this policy",
    "blocks": [
      {
        "kind": "p",
        "text": "We update this policy when how we work changes, for example if we add a provider or a new feature. The current version always lives on this page, with the \"Last updated\" date at the top. If a change is significant, we will make that clear rather than slip it in quietly."
      }
    ]
  },
  {
    "heading": "Contact",
    "blocks": [
      {
        "kind": "p",
        "text": "For anything about your privacy, your data, or this policy, email privacy@emirone.com."
      },
      {
        "kind": "p",
        "text": "For terms and legal matters, use legal@emirone.com. For careers, careers@emirone.com. For general and research questions, research@emirone.com. If you need our registered entity name and postal address, ask at privacy@emirone.com and we will provide them."
      }
    ]
  }
];

export default function PrivacyPolicy() {
  return (
    <ContentPage
      eyebrow="Privacy Policy"
      titleHtml="Privacy <em>Policy.</em>"
      lastUpdated="17 June 2026"
      intro={["This explains exactly what Emir One collects when you use emirone.com, why, where it goes, and what you can ask us to do with it. We have written it to match how the site actually works, not how a generic template says a website should work."]}
      numbered
      sections={sections}
    />
  );
}
