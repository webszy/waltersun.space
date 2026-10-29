---
title: "The CDF Chronicles (Part 1): I Tried to Keep AI in Check—and Tied Myself in Knots"
published: 2026-10-29T15:35:28.770Z
description: 'I tried to control AI coding with rules, only to get tangled in the complexity I created.'
updated: ''
tags:
  - AI Agents
  - Coding Agents
  - Agent Workflows
  - Software Architecture
  - Prompt Engineering
  - AI-Assisted Development
  - Overengineering
  - Developer Experience
draft: false
pin: 0
toc: true
lang: ''
abbrlink: ''
---

*From a Single Prompt to Three Components, I Nearly Turned My Coding Rules into a Workflow Engine*

Last year, I bought a bunch of storage bins to make things easier to find around the house.

At first, they worked well.

Batteries, screws, charging cables—everything had its place.

As I accumulated more stuff, I accumulated more bins. Eventually, I couldn't remember which bin held what, so I bought a label maker.

Then even the labels weren't enough. Some things didn't fit neatly into any category, so I gave them a bin of their own and labeled it "To Be Sorted."

That bin eventually became the fullest one in the house.

A few days ago, I needed a pair of nail clippers.

First, I tried to figure out which category they belonged to.

Then which shelf that category was on.

In the end, I found them in "To Be Sorted."

That day, something occurred to me. The mess wasn't simply the result of having more stuff. The extra layer I'd added to organize everything had itself become something I needed to manage.

And then I thought about the development rules I'd written for AI. They had followed almost exactly the same path. What started as four lines had gradually turned into three components, four sets of handoff rules, and a pile of fields created just to keep everything organized.

---

## 1. When Execution Gets Cheap, Misunderstandings Get Executed Cheaply Too

In my previous essay, I compared AI-assisted development to a small refinery. I ended that piece with the refinery still behind a construction fence.

This time, I want to take down part of that fence.

Inside is something called CDF: Controlled Development Flow.

What it looks like today can wait. I'd rather start with why it came into existence.

Writing code used to be slow, and changing it was even more expensive. A moderately complex requirement naturally forced you to think before acting. Many risks weren't prevented by formal processes. They were held back by a simple thought: "I don't want to waste two days of work."

In a sense, thinking things through came with a free layer of protection. That protection came from the cost of execution itself.

Now that protection is largely gone.

An AI agent can create a dozen files, modify several APIs, and casually refactor a couple of components in minutes. For the first time, execution feels abundant.

And when something becomes abundant, scarcity shifts elsewhere.

> **When execution becomes dirt cheap, acting on a misunderstanding becomes dirt cheap, too.**

In the past, turning a misunderstanding into code might take a developer two days. Somewhere during those two days, they would probably notice that something was wrong.

Now, five minutes later, the misunderstanding may already be spread across a dozen files.

There's a simple way to test this.

Open the last set of changes you asked an AI agent to make. Go through the files one by one and ask yourself:

*Did I actually ask it to change this?*

---

## 2. My First Prompt Was Just an Attempt to Pass My Own Instincts to Another Developer

The earliest version of CDF was extremely simple. It was roughly four lines:

> You are a software engineer with an INTJ personality.
>
> Read the code and think before acting.
>
> Provide a concrete plan, including the steps and potential impact.
>
> Wait for user approval before making changes.

There were no risk levels, no explicit modification boundaries, and no handoff rules.

It barely qualified as a process.

All I really wanted to say was: think before you act.

Later, I realized I hadn't invented that principle for AI. It was simply how I already worked when writing code myself.

When someone gives me a requirement, I rarely open a file and start editing immediately. I first try to understand what they actually want. Then I look at how the existing system works, find the parts that matter, consider what else might be affected, think through an implementation, and decide where this particular change should stop.

Those steps never needed names before.

I was the one doing the work, and keeping them in my head was enough.

Once someone else—or something else—was doing the work, that was no longer enough.

I wasn't inventing a development methodology for AI. I was trying to write down one developer's instincts so another could follow them.

There's an important qualification here.

It had to be the same judgment I actually used, not a stricter standard I had invented for the AI.

Otherwise, I wasn't transferring my working habits. I was just replacing myself with a more timid developer.

---

## 3. "Think Before You Act" Turned Out to Be a Long List of Questions

Once I started using those four lines, I quickly discovered how much was hiding inside "think before you act."

What does thinking things through actually mean?

Is the user describing the outcome they want, or have they already suggested a solution that might not be right?

How does the current system work? Which parts of the code are relevant? Is there an existing implementation worth following?

Will this change affect another module? Is it a local modification, or does it touch something shared across the application?

What counts as done? How should the result be verified? And if the plan itself turns out to be wrong, how do we back out?

Then there was another question I began to care about more and more:

*What shouldn't be changed along the way?*

So those few lines gradually grew.

First came requirement analysis. Then code-level evidence, impact assessment, risk classification, and acceptance criteria. For changes that warranted it, the agent also had to obtain approval before proceeding.

What started as a prompt gradually began to resemble a workflow.

I should clarify something here, because it's easy to read this as "every one-line change requires a document."

That was never the intention.

Small changes should be fast. Riskier changes need more control.

If the task is to change a line of copy, there are really only four things to check: what to change, what to leave alone, how to verify the result, and whether the same text is used elsewhere.

For a change that small, the agent can check those things and get on with it. It doesn't need to generate a formal document, report each item, or stop for human approval every time.

A request like "add a notification center to the product" is a different matter. That's the kind of task that needs the full process.

---

## 4. It Can Do the Wrong Thing for Very Good Reasons

If I had to pick one design decision that best represents CDF, I'd choose the "What Not to Change" list.

The more I used AI to write code, the more I noticed something frustrating.

The problem wasn't simply that it made mistakes. Sometimes it did the wrong thing in a way that seemed entirely reasonable.

Imagine a simple requirement:

*Add a button to this page.*

The agent reads the code and notices that the shared button component could be improved.

While it's there, it sees that the color and spacing definitions are a little inconsistent. The page structure could use some cleanup, too. And the naming of one API doesn't quite match the others.

So it starts fixing things.

Look at each decision separately, and it's hard to say any of them is necessarily wrong. Some of the resulting code might genuinely be better.

But when the agent finishes, the request to add one button has somehow turned into a small refactoring project.

This kind of problem can be surprisingly hard to catch during code review.

When reviewing code, it's easy to focus on whether the changes are well written.

But there's another question worth asking:

**Should this code have been touched at all?**

This is where reasonable developers can disagree.

Suppose the agent's additional changes genuinely improve the code, and all the tests pass. Was it being helpful, or did it cross a boundary it wasn't authorized to cross?

I think code quality and authorization are two separate questions.

At the same time, I can see the other side. If you lock the scope down so tightly that the agent can't make necessary related changes, it may not be able to finish the task properly.

There has to be some room for judgment.

But even with that flexibility, a plan needs a second list.

Not just what to change, but what not to change.

For example: no real-time push notifications, no emails, no refactoring of the billing module, and no changes to the global messaging system.

There's one condition that makes this list useful.

It has to exist before the work begins.

If you write it afterward, you're only approving what has already happened.

This was the point where CDF began to change.

It was no longer just asking AI to plan before coding. It was starting to define the boundaries of what the agent was authorized to modify.

That's why I eventually came to think that "Controlled" mattered more than "Planning."

---

## 5. An Approved Development Intent Shouldn't Keep Living in Chat History

The first genuinely new thing to come out of CDF wasn't another component.

It was a file on disk.

I got the idea from seeing how other projects handled similar problems.

The reasoning was simple.

Once a requirement has gone through analysis, gathered supporting evidence, settled on an approach, defined its scope, and received explicit approval, something has changed.

It's no longer just an ongoing conversation.

The development intent has become stable enough to write down.

So I started saving those decisions to disk as task files.

A development task now had somewhere to live, instead of existing only inside a particular conversation.

**Conversations scroll away; files stay put.**

Of course, saving a decision to a file doesn't guarantee it will remain correct forever. The codebase may change, and yesterday's assumptions may no longer hold.

Still, task files solved two very practical problems.

The first was continuity.

I could work on something today, stop halfway through, open a new session tomorrow, and continue from the file.

The second was even more practical.

It saved tokens.

A task that stretches across several sessions or several days can consume a surprising amount of context.

The first session analyzes requirements, reads code, and makes a plan.

The second spends time reconstructing the previous conversation, understanding the plan again, and figuring out what's already been done.

The third may repeat much of the same work.

A lot of those tokens aren't producing anything new. They're being spent confirming decisions that have already been made.

A task file reduces that repetition.

The next session mainly needs two things: the task file and the parts of the codebase that are currently relevant.

It doesn't make the model smarter. It doesn't give the model new capabilities.

It simply reduces the need to repeatedly reconstruct information that was already settled.

This connects to the refinery analogy from my previous essay, where I compared tokens to crude oil.

Better refining doesn't necessarily mean switching to a more powerful model.

Sometimes it means using the same model and the same amount of tokens, but changing the process so that more of those tokens produce useful results.

**What you save isn't just money. It's the extra yield you get from the same barrel of crude.**

There's a practical way to examine this, too.

Pick a task you've been working on for several days. Look at how much of the context was spent re-establishing decisions that had already been made.

That's the part a better process can reduce.

---

## 6. The Earliest Structure Was Already Close to the Answer, but I Couldn't Explain Why

Once task files existed, the overall structure was simple.

There was one entry point responsible for analysis, planning, defining scope, and waiting for approval.

After approval, there were two paths.

Either execute the task immediately, or save it as a task file and continue later.

Looking back, this was already quite close to the structure I eventually returned to.

But I didn't know that at the time.

I just thought, *this seems to work.*

Why should planning stay here?

Why should task files appear at this point in the process?

Why two parts instead of three?

I couldn't explain it.

A structure you can't explain is difficult to defend.

You don't need someone else to dismantle it. The next time you reconsider the architecture, you may dismantle it yourself.

That's exactly what I did.

Following what seemed like a reasonable modular design approach at the time, I split the structure into three components with four sets of handoff rules.

Then I spent a long time finding my way back.

---

## 7. "It's Called a Flow, So It Should Only Manage Flow" Sounded Perfectly Reasonable

As the rules grew, I started looking at CDF through the eyes of a software architect.

It contained analysis, planning, risk classification, scope definition, and approval.

But it also dealt with which step we were on, where to go next, and when work should stop.

That led me to a question that seemed perfectly reasonable at the time.

If it's called Controlled Development Flow, shouldn't it be responsible only for the flow?

The reasoning felt sound.

Even looking back now, I can understand why I thought it made sense.

So I redefined the Flow component. It would handle orchestration and no longer perform analysis itself.

Analysis and planning became a separate component.

What used to be a straight line—Flow, followed by writing a task file—bec
