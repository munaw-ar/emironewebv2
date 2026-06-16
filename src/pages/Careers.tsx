import ContentPage, { type ContentSection } from "@/components/layout/ContentPage";

const sections: ContentSection[] = [
  {
    "heading": "Who we are",
    "blocks": [
      {
        "kind": "lead",
        "text": "Emir One builds ethical, Sharia-aligned cold-email infrastructure for B2B firms. We run outbound under our clients' names, and we run it the way we would want it run if our own reputation were on the line. Because it is."
      },
      {
        "kind": "p",
        "text": "We are small on purpose. A lean, senior team writes the copy, builds the systems, and answers every reply. There is no junior layer doing the real work while a name partner takes the call. The person who sends the email is the person who reads the reply."
      },
      {
        "kind": "p",
        "text": "We are remote-friendly and work across time zones. We care more about what you have built and how you think than where you sit."
      }
    ]
  },
  {
    "heading": "How we work",
    "blocks": [
      {
        "kind": "p",
        "text": "A few things are not up for debate here. They are the reason the work is good, and the reason people stay."
      },
      {
        "kind": "h3",
        "text": "Craft over volume"
      },
      {
        "kind": "p",
        "text": "We do not spray and pray. Lists are built from real signals, copy is written by a human for one human, and if an email reads like it could have gone to 200 people it does not go to anyone. The bar is high and we hold it."
      },
      {
        "kind": "h3",
        "text": "The honesty doctrine"
      },
      {
        "kind": "p",
        "text": "No fake \"Re:\" lines. No fabricated connections. No manufactured urgency. Every recipient has a real reason to be contacted, and opt-outs are honored the same day across every domain. We send nothing we would be embarrassed to have our names on."
      },
      {
        "kind": "h3",
        "text": "Sharia-aligned ethics"
      },
      {
        "kind": "p",
        "text": "Honesty, fairness, and no harm are not a marketing layer. They are how we make decisions about targeting, copy, and who we will and will not work with. You do not have to be Muslim to work here. You do have to take these principles seriously."
      },
      {
        "kind": "h3",
        "text": "Transparency, inside and out"
      },
      {
        "kind": "p",
        "text": "Clients see their campaigns, the targeting logic, the drafts before they send, and the outcomes. We work the same way internally. You will know why a decision was made, and your work will be visible. That cuts both ways, and we like it that way."
      }
    ]
  },
  {
    "heading": "Who we're looking for",
    "blocks": [
      {
        "kind": "p",
        "text": "Less a job description, more a description of a person. We hire exceptional writers, operators, and engineers who care about doing outbound the right way. Values fit matters more to us than a long CV."
      },
      {
        "kind": "p",
        "text": "You will probably recognise yourself in most of this:"
      },
      {
        "kind": "ul",
        "items": [
          "You take real pride in the craft, whether that is a sentence, a system, or a sending setup. Good enough is not a phrase you use much.",
          "You would rather do less, better, than more, sloppier.",
          "You are honest by default, including when it is inconvenient.",
          "You are comfortable owning something end to end and being accountable for how it turns out.",
          "You can write a clear sentence. This matters even if writing is not your job.",
          "You have built or written things you are genuinely proud of, and you can point to them."
        ]
      },
      {
        "kind": "p",
        "text": "If you want shortcuts, mass blasting, or growth at any cost, we are not the place for you, and that is fine."
      }
    ]
  },
  {
    "heading": "Open roles",
    "blocks": [
      {
        "kind": "p",
        "text": "Honest answer: there are no formal full-time openings right now. We are small and we open roles only when there is real work for a real person, not to pad a headcount."
      },
      {
        "kind": "p",
        "text": "That said, we always want to hear from outstanding people, and we work with a small set of trusted contractors. The kinds of people we keep an eye out for:"
      },
      {
        "kind": "ul",
        "items": [
          "Writers and copy people who can make a cold email sound like a human wrote it to one person, because one human did.",
          "GTM operators who can build targeting from signals, run a clean campaign, and handle replies like they matter.",
          "Full-stack and automation engineers who like building reliable systems and the infrastructure underneath them."
        ]
      },
      {
        "kind": "p",
        "text": "If you are excellent and you reach out at the right moment, that timing has a way of working out. We would rather meet great people early than scramble to find them later."
      }
    ]
  },
  {
    "heading": "How to reach us",
    "blocks": [
      {
        "kind": "p",
        "text": "Email careers@emirone.com. No formal application, no portal, no cover-letter theatre."
      },
      {
        "kind": "p",
        "text": "Tell us three things:"
      },
      {
        "kind": "ul",
        "items": [
          "Who you are, briefly.",
          "What you have built or written, with links to the real thing wherever you can. Show us the work, not a description of it.",
          "Why this. Why outbound done honestly is something you actually care about."
        ]
      },
      {
        "kind": "p",
        "text": "We read every message a real person sends. We will not always have a role, and we will tell you so plainly. But we keep good people in mind, and we follow up when there is something real to talk about."
      }
    ]
  }
];

export default function Careers() {
  return (
    <ContentPage
      eyebrow="Careers"
      titleHtml="Build outbound that earns the <em>reply.</em>"
      intro={["We are a small, deliberately lean team that does cold email the honest way. We do not hire often. When we do, we hire for craft and character, not headcount. If that is you, we want to hear from you."]}
      sections={sections}
    />
  );
}
