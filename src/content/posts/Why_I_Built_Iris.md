---
title: Why I Built Iris, and Why I Paused It
published: 2026-09-23T08:33:00.733Z
description: ' Why I built Iris, a personal AI system — and why I paused it. On State-first design, replaceable agents, controlled execution, and knowing when to stop'
updated: ''
tags:
  - personal-ai
  - agent-architecture
  - agent-engineer
  - state-management
  - system-design
  - solo-development
  - cloudflare-workers
  - scope-control,
  - open-source
  - ai-infrastructure
draft: false
pin: 0
toc: true
lang: ''
abbrlink: ''
---
# Why I Built Iris, and Why I Paused It

A few days ago, I was still seriously designing Iris.

I was designing its database, defining Project, Milestone, Task, Resource, and Capability; wiring it up to Cloudflare Worker, D1, and Git; thinking about how to let the Agent read my state, how it could reach out to me proactively, and even starting to consider letting Iris manage Iris's own development.

A few days later, I decided to pause the project.

At the point I paused it, Iris was already deployable, the standalone Memory Git Repo was already connected, and v0.2 was in fact close to done. Following the original roadmap, the next step would have been the Notification Adapter, letting Iris reach me proactively through different channels. I had even started thinking about going one layer further with a Connect Gateway, bringing different Agents, notification channels, and external systems onto a single entry point.

There was no technical problem I couldn't get past. On the contrary, the path forward was quite clear.

What actually changed was my understanding of the thing itself.

Iris started as nothing more than a personal AI I wanted to build for myself. By the end of development, I gradually realized that what was really worth keeping was probably not the software, but the understanding of Personal AI that took shape along the way.

So I decided to stop, clean up the existing code, open-source it, and stop extending the product's features.

This article is a record of that process.

---

## The System I Needed Was One That Knew "What's Happening Right Now"

I've always had a lot of things going on at once.

There are products in development, ad campaigns, servers and various online services, financial matters, and also daily life, kids, reminders, and long-term plans.

These things aren't complicated in themselves. What's really troublesome is that they all persist at the same time, over a long stretch.

A project gets to a certain point today; three days later I come back and have to reconstruct where I left off. Something I can't deal with right now might be forgotten a week later. Some decisions get made in chats, some materials live in Git, some tasks are noted somewhere else entirely.

ChatGPT can discuss problems with me, a Todo app can record tasks, a calendar can remind me of times, Git can store files.

Each tool solves part of the problem, but there's no single place that continuously maintains one thing:

**what state I'm actually in right now.**

So I started designing Iris.

The initial idea was simple. I wanted a personal secretary.

It should know which projects I have, where each one stands, what tasks are open right now, what's currently waiting, when it should remind me, and what information is worth keeping for the long term.

Later I could just ask:

> What should I be doing right now?

It wouldn't need to ask me again what I've been up to lately, and it wouldn't need to dig through dozens of chat logs.

It should already know.

This became the starting point for everything else in Iris's design.

---

## From Personal Secretary to Life OS

Once I started modeling, the problem quickly shifted.

If it were just a Todo, there'd be no need to build a system of my own at all.

What I really needed to describe was a person's ongoing state.

So the earliest core objects that got locked down in Iris were:

```text
Project
Milestone
Task
Resource
Capability
```

These five objects ended up forming the skeleton of Iris.

### Project

I defined Project very broadly.

A product is of course a Project — DeepUsername, for example.

An ad campaign can be a Project, and a long-term life goal can become a Project too.

Project doesn't only mean "software project." It's more like a long-lived, continuously changing container of state.

### Milestone

Under a Project are Milestones.

For example:

```text
DeepUsername
├── v0.5
└── v1.0
```

A Milestone describes a phase goal.

Once a phase is done, it doesn't disappear — it becomes part of that project's history.

That way what I see isn't just "what's left to do," but also how a project got to where it is today.

### Task

Only actions that actually need doing become Tasks.

A Task can belong to a Milestone, and it can also record its own origin — a particular PRD, a certain chapter, or a discussion.

This matters.

An ordinary Todo only records "what to do," and over time it's easy to forget "why it needed doing."

I wanted the tasks in Iris to hold on to as much context as possible.

### Resource

As the design went further, I pulled Resource out on its own.

Markdown, documents, files and directories in Git all count as Resources.

A Task is an action; a Resource is what an action depends on or produces.

Once I separated the two, the whole model got a lot clearer.

### Capability

Last is Capability.

Scripts, Skills, APIs, and other callable execution entry points all count as capabilities.

Iris can know what capabilities it has, but the capabilities themselves shouldn't be mixed in with tasks, knowledge, or project state.

By this point, I was no longer treating Iris as a traditional task manager.

It was starting to look more like a very small Life OS.

Projects, tasks, materials, and capabilities each have a clear place, and the Agent is just one role running on top of all of it.

That distinction mattered more and more later on.

---

## State First

While building Iris, I gradually arrived at my most central judgment:

**The core asset of a Personal AI should be State.**

Most AI products today are still centered on Conversation.

The typical flow goes roughly:

```text
Conversation
    ↓
Reasoning
    ↓
Action
```

The user says something, the model understands the problem from context, and then takes action.

This pattern works well for one-off problems.

Over long-running use, the trouble starts.

A person's life is not an infinitely growing chat log.

For instance: a product has now finished v0.5 and is preparing v1.0. That's a piece of state.

A vendor is waiting on the other party to reply — that's also state.

A decision has been made and won't be revisited in the short term — that's a piece of state too.

This information should simply exist, directly.

So Iris's pattern gradually became:

```text
State
  ↓
Reasoning
  ↓
Action
  ↓
State Update
```

Before each round of work, the Agent first reads the current state of the world.

After finishing, it updates that state.

Chat is just one entry point that produces state changes.

This led to an important consequence:

**The Agent is no longer equal to Iris.**

Today I can hook Hermes up to Iris.

Tomorrow I could swap in a different Agent.

The model can of course keep changing too.

Claude, GPT, or any new model down the line — they're all just the reasoning layer.

As long as Project, Milestone, Task, Resource, finances, and reminders — all this state — still exists, swapping the Agent doesn't make the whole system start over.

I grew more and more certain that the thing a long-term Personal AI most needs to protect is this layer.

The model can be swapped, the Agent can be swapped, the executor can be swapped.

The state should stay.

---

## SQL for State, Git for Long-Term Resources

Once State First was settled, the technical architecture naturally began to layer itself.

In the end Iris took roughly this shape:

```text
                   User
                     │
               Hermes / Agent
                     │
                  Iris API
                     │
          ┌──────────┴──────────┐
          │                     │
         D1                  Git Repo
          │                     │
  Structured State        Resources
  Projects                Markdown
  Milestones              Knowledge
  Tasks                   Scripts
  Schedule                Skills
  Finance                 Capabilities
```

The Worker is the control plane.

I chose Cloudflare Worker, then built the API with Hono, Drizzle, Zod, and OpenAPI.

D1 holds the authoritative structured state.

Git takes on the role of the long-term workspace.

At one point I'd considered all sorts of knowledge-base designs, but I leaned more and more toward letting Git do the most ordinary thing: store Markdown, scripts, Skills, content assets, and Capability-related resources.

This structure has one very plain benefit.

A database is good at answering:

> What's the current state?

Git is good at answering:

> What exactly is the content? What did it look like before?

The two don't have to be forced into one system.

The Agent reads and modifies structured state through the API, and reaches for the corresponding Resource when it needs the content.

Iris Core Code and Iris Memory can therefore be kept separate.

The code is one system; the Memory Repo is the long-term data and content space belonging to a particular user.

If multiple Irises ever exist, they can use the same Core while owning different Memory.

---

## An Agent Shouldn't Do Everything

Early on with Iris, I also went through the expansion phase that's so common with Agent products.

Since there's already an Agent, you naturally start to think:

Could it do research for me?

Could it write code?

Could it do product design automatically?

Could it find problems on its own?

Could it add new capabilities to itself?

Keep going down that road and you easily end up with a "do-everything" personal Agent.

That's when I started actively narrowing Iris's scope.

I redefined its responsibilities for v1.0.

Iris is a secretary.

It's responsible for recording, tracking, and maintaining project state, managing reminders and todos, summarizing financial information, and proactively notifying me when something needs attention.

How a product gets designed, how code gets written, how a business call gets made — those can stay with me and with other specialized tools.

This round of narrowing gave me another important principle:

> thinking and save your think, build which need.

Thinking can keep unfolding.

Thoughts worth keeping can be kept.

But what actually goes into code must have a clear need.

I later boiled this principle down to a single word:

**Controlled.**

The code needs to be controlled, the Agent's execution needs to be controlled, and my own urge to build needs to be controlled.

If I implemented every capability the moment I thought of it, Iris would inevitably grow into a huge, unmaintainable system.

So thinking can be free; execution must be constrained.

---

## Deterministic Things Should Exit the Agent

Pushing Controlled further raised an interesting question:

What, exactly, should the Agent be doing?

For example:

```text
Query a Project
Create a Task
Update a Milestone
Read a Resource
```

These operations don't have much intelligence in them.

The input is fixed, the rules are fixed, the result is fixed.

Making the Agent interpret and re-decide how to execute them from scratch every time only adds uncertainty.

That's when I formed another judgment:

> If the world is deterministic, there will be more and more APIs.
> If the world is uncertain, there will be more and more Agents.

Checking a project's state — use an API.

Modifying a Task — use an API.

Any operation with stable inputs and outputs should also gradually harden into a Capability.

What's genuinely suited to an Agent is something like this:

> Based on my recent project state, my schedule, and my current goals, decide what's most worth prioritizing today.

There's no single answer here; it requires synthesizing a lot of context, and it requires reasoning.

So the distinction between Iris and Hermes started to become clear.

At the time I summed it up in one line:

> Hermes accumulates Skills; I accumulate APIs.

Hermes is more like an Agent that keeps learning different ways of working.

Iris, on the other hand, wants to gradually turn already-settled behaviors into stable interfaces.

As the system matures, the Agent doesn't have to get heavier and heavier.

Many already-validated behaviors should actually exit the Agent and move into an API, a Script, or a Capability.

Intelligence is reserved for the places where uncertainty genuinely exists.

---

## I Even Started Thinking About Letting Iris Manage Its Own Development

Once I got here, a very natural idea appeared:

Iris itself can be a Project too.

For example:

```text
Project: Iris

Milestone:
  v0.1

Tasks:
  Git integration
  Resource API
  Capability API
  README

Resources:
  PRD
  Architecture
  Source Code
```

Since Iris can manage DeepUsername, it can of course manage Iris.

One step further, it could even observe its own usage.

Suppose I have the Agent perform the same kind of operation several times in a row — Iris could recognize:

this behavior is now relatively stable, and might be worth hardening into a Worker API.

It then creates a Task:

> Should this operation be hardened into a Capability?

Once I approve, it calls Codex to implement it.

For a while this idea struck me as fascinating.

Iris was starting to have a limited capacity for self-evolution.

But Controlled still holds here.

It can discover a need, propose a change, and create a Task — but it can't modify its own production environment just because it decided on its own that a feature should be added.

The whole flow should look something like:

```text
Observe
   ↓
Propose
   ↓
Create Task
   ↓
Human Approval
   ↓
Implement
   ↓
Test
   ↓
Deploy
```

Self-evolution is also just a controlled development process.

The human still keeps the final say.

---

## Once Development Actually Began, the Abstractions Turned Into Constraints

A lot of what came before sounds like architecture design.

Only after I actually started writing Iris did those ideas gradually turn into real constraints.

Early on I did Auth and test routing first, then wired up D1.

Then I implemented Project, Milestone, Task, Resource, and Capability in turn.

There were plenty of not-so-grand problems inside.

How do you generate a Token?

How do you create a test user?

How should D1's time fields be handled?

Without Cloudflare credentials, how far can local testing go?

Does a Resource ID have to exist?

Can a Capability still be deleted once other objects reference it?

What should happen when a Capability is already in use and then gets an incompatible change?

These problems have nothing to do with grand concepts like "Personal AI," but whether the system ends up reliable depends precisely on details like these.

For instance, I ended up setting one constraint on Capability:

a Capability that's already referenced can't be casually deleted, even if it's disabled.

When an incompatible change happens, the API should reject it.

That's what architectural ideas look like once they land in code.

"Capabilities are system assets" ultimately has to become database relationships, validation rules, and HTTP errors.

Another example is Resource.

At first it was just an abstract concept.

Once the GitHub API was actually wired in, I had to decide how to establish stable references between Git files, directories, Markdown, and database records.

Working through places like these, I could feel one thing more and more:

when you design a system, the diagram can be drawn very nicely.

Only once you start dealing with deletion, failure, permissions, references, and migration does the architecture really begin to be tested.

---

## Iris Had Reached the Step Just Before Actively Connecting to the Outside World

By the time I paused, Iris had moved past its earliest pure-concept stage.

The Worker could be deployed.

D1 had structured data.

The standalone Memory Git Repo was wired in.

v0.2 was close to done.

The deployment flow had gradually settled:

configure `wrangler.jsonc`, set the variables and the GitHub Secret, run the remote migration, deploy the Worker, create a remote API Token, and then configure the local Agent with the Iris API address and Token.

In the end it could genuinely run end to end:

```text
Agent
  ↓
Iris API
  ↓
Structured State
  ↓
Git-backed Resources
```

At this point, Iris could already receive information, store information, maintain state, and then hand that state back to the Agent to use.

What remained to be built was the reverse direction.

Iris can't just wait around for me to always go ask it.

So the next step in the original plan was the Notification Adapter.

I didn't want the notification logic bound to any one specific channel. Iris should produce a unified Notification, and the Adapter should decide how it ultimately gets sent out.

It might be Telegram, or email, Push, Conduit, or some other channel down the line.

The structure would roughly become:

```text
Iris
  ↓
Notification
  ↓
Adapter
  ├── Telegram
  ├── Email
  ├── Push
  └── ...
```

Once I got there, I started thinking about the Connect Gateway.

Because the problem was no longer just notifications.

In the future there might be different Agents accessing Iris, and there might be multiple external systems feeding events into Iris. Hermes can be an entry point, and other Agents can become entry points too; notification channels, executors, and external services all need connecting as well.

If I kept building forward, a Gateway would very naturally appear:

```text
                 Agents
                   │
                   │
External Apps ─ Connect Gateway ─ Notification Channels
                   │
                   │
                 Iris
                   │
          State / Resources
```

The Gateway is responsible for connecting to the world.

Iris keeps maintaining state.

The Agent handles reasoning.

The Adapter handles the specific protocols and channel differences.

At this stage, Iris was starting to move from an API service toward a real personal system — one that could run long-term, sense things proactively, and reach out to the user on its own.

And it was right at this spot that I decided to pause.

---

## The Question Shifted from "How to Build It" to "Whether I Still Need to Build It Myself"

When Iris began, the problem I faced was:

> How do I build a long-lived Personal AI?

So I had to solve state, Memory, Agent, scheduling, notifications, permissions, Git, and API myself.

Later I'd even gotten as far as the Notification Adapter and the Connect Gateway.

Keep building, and I already roughly knew how these pieces should fit together.

What actually made me stop was a different question:

> Will this infrastructure still need to be maintained by me in the future?

If future platforms can offer a Persistent Agent, letting an Agent exist long-term; if Personal Context can stably hold personal state; if Connected Apps, Scheduler, Notification, and Tool Calling all gradually become native platform capabilities — then a large part of Iris's code is really just infrastructure.

Even the problem the Connect Gateway sets out to solve is very likely to gradually become a standard capability of AI platforms.

I built Iris myself because I needed a personal AI.

Maintaining a stack of Auth, database, Worker, Agent Runtime, Scheduler, Notification Adapter, Gateway, Memory, and Git Integration was never my actual goal.

If one day an off-the-shelf platform can fully meet this need, continuing to maintain Iris loses its meaning.

For me, this was the project's last and most important act of scope control.

Controlled shouldn't only constrain whether a single function should be written.

It should also constrain whether a project should continue.

---

## The Software Itself Can Also Become the Problem

Solo development easily develops a kind of inertia.

Something already has a lot of code written and its architecture figured out, so continuing feels natural.

Iris especially.

It was no longer just a casual experiment. I'd put a lot of thinking into it about Personal AI, Agents, State, and Capability, and the actual development had already been pushed fairly far along.

That, if anything, made stopping harder.

But in the end I still felt that the point of software is to solve a problem.

What I wanted was a long-term AI that genuinely understands me.

If a Persistent Agent offered by OpenAI or some other platform in the future can do that, I can just use it directly.

There's no need to keep maintaining a whole stack of infrastructure just to prove I once designed a more complete architecture.

A system originally meant to reduce cognitive load — if it later requires me to maintain a database, deploy Workers, handle API compatibility, the Notification Adapter, the Gateway, and the Agent Runtime every day — becomes a new cognitive load in itself.

At this point, stopping fits Iris's own design principles better than piling on more features.

---

## So I Decided to Open-Source It

After pausing, I wasn't planning to delete Iris.

I'll clean up the existing code and fill in what's necessary to deploy and run it, so that others can genuinely stand it up.

The code is here: https://github.com/webszy/iris_assisant

The README will cover environment variables, D1 migration, Worker deployment, Token creation, the Memory Repo, and configuring the local Skill.

Beyond that, no more feature expansion.

Its status will be closer to:

```text
Paused
Reference Implementation
```

I hope it stays around as an architecture experiment.

Because looking back, Iris has already formed a fairly complete line of thinking about Personal AI:

```text
Structured Personal State

        +

Replaceable Agent

        +

Controlled Execution

        +

Persistent Resources

        +

Deterministic Capabilities
```

Some of these judgments I still agree with, even if Iris is never developed any further.

A Personal AI needs to maintain structured state over the long term.

The Agent should be replaceable.

The data shouldn't belong to any one model.

Deterministic behaviors should gradually settle into APIs or Capabilities.

The parts where uncertainty genuinely exists are then handed to the Agent.

Thinking can be free; execution needs to be controlled.

The system can even observe itself and propose evolutions, but the final boundary of execution is still decided by the human.

These things matter far more than how many endpoints Iris's repo currently has.

---

## Finally

Right as the system was starting to look more and more like what I'd originally imagined, I came back to that very simple question from the very beginning:

> What am I actually trying to solve?

The answer still hasn't changed.

I want a personal AI that understands me over the long term, maintains my state, and reminds me when I need it.

Whether this thing ends up being written by me, in the end, doesn't matter all that much.

If Iris has to exist, it can keep existing.

If future platforms can already carry this work, Iris can just as well come to an end.

So I'm reluctant to read this pause as a failure.

It's more like an experiment that has already done its job.

I set out to design a Personal AI, and instead, through this project, I ended up taking Personal AI apart and looking at it once: what should the model be responsible for, what should stay in the system, what needs determinism, what can be handed to probability, what can run automatically, and which decisions must stay in human hands.

The code is paused.

These judgments stay.

For me, that's enough.
