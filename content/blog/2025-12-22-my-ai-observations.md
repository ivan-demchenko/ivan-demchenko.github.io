---
title: My AI observations
date: "2025-12-22"
slug: my-ai-observations
categories:
  - blog
tags:
  - ai
  - engineering
  - architecture
---

# A Year of Watching AI Closely

It’s been a while since I last wrote here. This year has been intense in many ways, and as it comes to an end, I feel the need to reflect on one hard-to-ignore topic: AI, not from a hype perspective, not from a futurist angle, but from the everyday reality of actually using it — especially in engineering work. This year, I mostly focused on Anthropic models using Claude Code or Cline.

## Great Promise, Reality Check

Over the past year or two, AI companies have made a lot of promises. Perhaps even too much. Marketing in 2024–25 reached levels that were hard to ignore.

Looming AGI and robotics are set to replace people.
- CEOs predicting the disappearance of entry-level jobs and advocating for regulations and universal basic income.
- Endless debates about whether AI is creative and what it means to be creative.
- Hype surrounding vibe coding led many to believe that software engineers would no longer be required.

To be honest, I bought into some of the hype as it was gaining momentum. The amount of investment in AI is staggering. Some of these fantasies may eventually become reality. But living through this wave as a practitioner, the gap between promise and reality became increasingly visible, at least in 2025. Unfortunately, I saw people outsourcing engineering to LLMs to meet unrealistic deadlines based on the promises of LLMs.

## Unexpected Side Effect: Loneliness

In 2012, Rich Hickey gave a great presentation - [Easy vs Simple](https://www.youtube.com/watch?v=SxdOUGdseq4) - *easy is not the same as simple*.

It's easy to prompt an LLM based on a first idea. However, it is more difficult to think deeply, understand the problem space, come up with a solution, have your ideas challenged, refine them through discussion, fit the solution into an existing system, balance trade-offs and make good decisions.

> It’s so much easier to suggest solutions when you don’t know too much about the problem.

*Malcolm Forbes*

Humans evolved to work together. Teamwork is the most natural way we solve complex problems; we have evolved this way. Yet AI subtly pushes us in the opposite direction:

> Why talk to another person if I can just prompt an LLM and get code instantly?

Well, we’ve seen this pattern before. Social media promised ultimate connection and ended up amplifying division, tribes, and loneliness. AI now promises productivity and independence. What will it quietly take away?

When the feedback loop becomes “you-model”, something essential is lost.

## Teamwork Still Matters

> A problem well defined is a problem half solved.

Dan Martell

At its core, engineering is about understanding and solving problems, with coding usually being the final stage. Successful systems are kept as simple as possible to help maintain the balance between time-to-market and accidental complexity. In my opinion, coding agents often fall short in sufficiently large systems:

- They often skip critical dependencies
- They don’t maintain a durable mental model of architecture
- In my experience, after 20–30 minutes of real work, some agents tend to derail from the initial implementation plan, especially in the mature systems, and if we try to adjust the plan halfway through
- They focus on “working code”, immediate gain, not on long-term clarity or complexity reduction - this is still very much up to the LLM user.

As a system (or a component of a system) grows, understanding interactions between components or pieces is critical. At this point, it looks like LLMs struggle here as they are not designed for this. All of this translates into more information to be fed into the model (aside from the system and the user prompt), which occupies the context window quite a bit.

People with deep, contextual knowledge of different parts of a system are far better positioned to produce solutions that account for complexity, trade-offs, and future maintenance — not just something that compiles.

If anything, we should foster more teamwork, not less. Even if that becomes pair prompting instead of pair programming, the human loop still matters.

## Failed Promises and Hidden Costs

I think LLMs are great tools — there's no doubt about that. However, they are still tools, and like every powerful tool, they have a learning curve. I'm not just talking about opening a browser page and typing in a prompt. There’s something much more subtle going on. LLM behaviour depends entirely on natural language:

- We often don't know or cannot express exactly what we want
- No deterministic guarantees
- No real way to "lock" behaviour

We were told: just learn to prompt.
Then: learn prompt engineering.
Then: adopt prompting frameworks.

We all know AI can generate good code. But coding is not problem solving.

Teams now create elaborate setups for non-trivial features. Just look at all the tutorials on how to use LLMs effectively — the variety of approaches is striking. All this tooling around with LLMs suggests uncontrollable complexity:

- PRD -> task -> subtask frameworks
- Prompt libraries
- Company-specific conventions and guardrails

Isn’t that contradictory? On the one hand, we try to create intelligent machines that can think for themselves; on the other hand, we try to limit them so that they do exactly what we want and are more deterministic. This is just human laziness.

All these guardrails and prompts must be constantly reviewed and verified — otherwise, agents go sideways and the prompts will become obsolete. I wouldn't be surprised if someone is working on a variation of the Markdown format that allows other Markdown files to be extended.

The irony is hard to ignore:

- Time saved on producing code is spent reviewing and correcting markdown files
- Mental effort shifts from solving problems to validating AI output
- Engineers still need to understand, adjust, and take responsibility for the final solution

In my experience, LLMs often suggest overly complex solutions. This results in all kinds of leftovers — unused abstractions, dead code, architectural “slop” — which becomes a real problem when customers report issues, and no one has a complete understanding of the system. Every line of code is liability. Yes, this can be mitigated with a more refined prompt, but how do you refine the prompt in the first place? The answer is to solve a problem "outside the IDE" first.

At the end of the day:

- Engineers are still responsible for the code
- Other engineers still review it
- Customers still want a simple and reliable product

So the question remains: what did we actually gain?

However, I strongly believe that enhancing products with AI is the way forward.

## Conclusion

AI is an amazing tool — and a deeply complex one. It requires:

- Significant learning and setup efforts
- Continuous supervision
- Infrastructure, process, and cultural changes

The question of ROI remains unanswered. AI is not a magic solution, nor will it replace professionals. What is clear is that human collaboration augmented by AI is a superpower that we must hone.

Human intelligence operates with remarkably few resources. Just look at our brains. Rather than replacing people, a better long-term investment is hiring a diverse pool of people (both junior and senior) and enabling them to think, collaborate and solve problems together more effectively.

That’s a future I’d like to build toward.