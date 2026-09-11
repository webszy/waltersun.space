---
title:  Tokens Are Cheap Now. What Comes Next?
published: 2026-09-11T07:12:14.951Z
description: 'Cheaper tokens don’t guarantee cheaper results. This essay explores how agents, workflows, and verification turn AI capabilities into reliable work worth paying for.'
updated: ''
tags:
  - Productivity
  - Artificial Intelligence
  - AI Agents
  - LLMs
  - AI Infrastructure, 
  - Workflow Automation 
  - AI Evaluation
  - AI Economics
draft: false
pin: 0
toc: true
lang: ''
abbrlink: ''
---

# Tokens Are Cheap Now. What Comes Next?

The other day, a very simple question about farming occurred to me.

Suppose one region has a bumper soybean harvest. That is usually good news for farmers. But what happens if every surrounding region also has a bumper harvest, while demand fails to keep pace?

Soybeans suddenly flood the market. Everyone wants to sell, and prices begin to fall. Output has increased, but farmers may not earn any more money.

At that point, growing even more soybeans may no longer solve the problem.

So some people start pressing soybeans into oil. Others make tofu or soy sauce. What was once sold only by weight is processed into a range of products that meet different needs.

The question shifts from "How do we grow more soybeans?" to something else:

**How do we turn the soybeans we have already grown into something people actually need?**

I started wondering whether something similar is happening to tokens today.

## 1. Tokens Are Having a "Bumper Harvest"

When we talk about AI, it is easy to focus on production capacity.

Who has the strongest model? Who scores highest on benchmarks? Who has more GPUs? Who can consistently generate high-quality content?

These questions still matter. But as more models become available to call and deploy, we are increasingly buying model capabilities from another perspective:

> How much does a million tokens cost?

This means model capability is not just an impressive technical achievement. It is also becoming a production input that can be purchased, combined, and included in a budget.

I prefer to describe this shift as follows:

**Tokens are moving from "capability in itself" to a raw material for intelligence.**

By "raw material," I do not mean that tokens can be piled up in a warehouse like grain. I mean that we can treat the capabilities a model provides as inputs to other work, rather than treating its output as a finished product.

But there is an important qualification to make at the outset.

A million tokens from different models are not a million equivalent units of intelligence. Compatible interfaces do not guarantee interchangeable capabilities. Prices can be compared, but results must be tested on specific tasks.

A cheap model may not actually be cheaper for your task. An expensive model may not justify its premium on every task, either.

So "tokens are cheap now" does not mean every capability has become inexpensive, nor that differences between models have disappeared. My question is this: when the model capabilities needed for certain tasks become available at a lower cost, what should we do next?

Oil, steel, and electricity did not become less important when they became foundational inputs to production.

But obtaining production inputs and using them to produce something are two different things.

## 2. If Tokens Are Crude Oil, Who Is Doing the Processing?

That led me to a second analogy: crude oil.

Oil has an easy-to-follow value chain. Upstream companies extract it. Intermediaries transport and trade it. Refineries then turn it into different fuels and chemical feedstocks, which go into products and services further downstream.

Borrowing this structure for AI, foundation models are somewhat like oil fields. The capabilities they provide are the raw material. API aggregation, reselling, and gateway services take on some of the roles played by traders and pipelines.

Agents, runtimes, and workflows are trying to solve the next problem: how to organize these capabilities to complete tasks.

But this analogy is only useful for understanding the division of labor. It cannot tell us where the value lies simply from a product's name.

A system called a "gateway" may do more than forward requests; it may also help assign tasks and control quality. A product called an "agent" may do little more than put a single model call inside a chat interface.

A better question than what something is called is:

> **What has the model's output become after passing through your system?**

An easier-to-access model call? A more reliable service connection? Or a piece of work that has been checked and is ready to deliver?

All of these offer real value, but they solve different problems.

Access, caching, billing, rate limiting, and failover can all be technically demanding and important. Without this infrastructure, the task-oriented systems that come later may not be able to function at all.

But there is still a gap between making model calls reliable and making task completion reliable.

That gap is where the "processing" I am interested in takes place.

## 3. A Thriving Distribution Layer Does Not Mean Delivery Has Matured

I have had some direct exposure to token reselling, so the dynamics of the distribution layer feel particularly tangible to me.

Where can we find cheaper supply? How do we connect more models, manage accounts and quotas, standardize interfaces, handle rate limits, and improve reliability?

These are concrete needs, and the economics are relatively straightforward: what does procurement cost, what does providing the service cost, what price can we charge, and how much is left over?

This is not an argument that reselling is an inferior business, or that trading creates no value.

On the contrary, it addresses real obstacles users face when trying to access model capabilities.

But we need to be careful about what a thriving reseller market actually tells us.

It may indicate that access barriers remain between supply and demand. It may mean that users need a more unified service. Or it may reflect price differences across channels. None of these observations, on its own, proves that the entire industry is mature or immature. Nor does it prove that the processing layer lacks value.

I am more interested in a specific question:

**Of the model calls reliably delivered to users, how many ultimately become work that passes acceptance checks?**

Selling more tokens and completing more tasks are not the same number.

Nor can we judge a company solely by its billing unit. A service that charges by the token may provide strong delivery capabilities. A product that charges by the task may simply have repackaged the pricing of a model call.

What matters more is the responsibility it takes on.

Can it detect when a task has not been completed? Can it address problems with the result? Are there explicit acceptance criteria before delivery?

A thriving distribution layer can create the conditions for processing. But having the conditions in place does not mean the results have already materialized.

## 4. Real Processing Is Not Just Repackaging Tokens

Some AI products have a very simple structure: write a prompt, call a model once, format the output, and put it in an interface.

That can certainly be a valuable product. Saving users a few copy-and-paste steps or a few tool switches may be worth paying for. For some low-risk tasks, it may be entirely sufficient.

The problem arises in a different situation: the product promises to complete a task, but what it actually delivers is a single, unverified model response.

If the model gets it right, the task may be complete. If the model gets it wrong, the product has simply presented the error more neatly.

A polished interface can then make an unfinished task feel complete.

Take software development as an example.

Suppose we need to fix a form-validation bug: input containing only whitespace should not be submitted as valid content.

The model's first change checks only whether the string is empty. It does not handle whitespace-only input. The code looks reasonable and may even compile successfully, but the problem remains.

A product that merely displays the output stops there.

A system organized around delivery can go further. It can read the project's existing validation rules, run tests covering empty strings, whitespace-only strings, and normal input, detect the failure, and feed the actual error back to the model.

After the model makes another change, the system reruns the tests, checks that normal input still works, and summarizes the code changes and verification results.

What has been added is not merely a larger number of calls. It is a process that can detect failure, address it, and check the result again.

Of course, it should not retry indefinitely. If it exceeds its budget, lacks permissions, encounters conflicting requirements, or repeatedly fails the checks, it should clearly report what is blocking progress and hand the task to a human, rather than pretend it is complete.

This is what I mean by processing capability:

> **Within explicit task and resource constraints, turning more outputs that are not ready for delivery into results that meet the acceptance criteria.**

To assess this capability, we need to compare the same model on the same set of tasks. Does adding the system increase the rate of successful delivery, or lower the total cost of achieving the same quality?

A system's dependence on a strong model does not mean it adds no value. But the model's own capabilities cannot all be credited to the system, either.

What we need to identify is what the system actually adds.

## 5. What Makes the Loop Work Is Verifiable Feedback

Generate, verify, revise, and verify again.

The process sounds straightforward. But what makes it work is not simply "trying a few more times." It is the system's ability to determine whether this attempt is actually better.

In programming tasks, compilers, type checks, tests, database constraints, interface contracts, and results from execution in a real environment can all provide feedback.

Their importance does not come from the fact that they "were not written by a model." It comes from the fact that the judgment does not rely solely on the model's assessment of itself.

A model can help write tests, and humans can write faulty ones. What matters is whether the tests reflect actual requirements, whether the checks run in a real environment, and whether the acceptance criteria can be arbitrarily changed to accommodate the result being evaluated.

If the code is wrong and the model changes the tests until they pass, it has changed how the work is graded. It has not demonstrated that the problem is solved.

This means "the tests passed" calls for further questions of its own.

Which tests passed? Which requirements did they cover? Did they show that the code can run, or that it implements the behavior the user needs?

In the form-validation example, compilation is only a very low bar. What actually needs to be checked is whether invalid input is blocked and valid input can still be submitted.

Processing, then, does not begin only after the model has generated something.

**Defining the task clearly and establishing acceptance criteria are also part of the processing.**

Asking a model to check or reflect on its own work is not useless. It may spot omissions, reexamine its reasoning, or improve its wording. But without additional external evidence, those improvements still cannot substitute for independent verification.

"I have thought about it again" and "this result has been tested" are not the same thing.

This is one reason software development lends itself to feedback loops: some of its checks can be automated and can provide relatively clear feedback within a short time.

Strategic advice, creative evaluation, and long-term planning face different difficulties. Some outcomes have no single correct answer. Some effects take a long time to observe. Some judgments must be made by the people who will actually bear the consequences.

Verification is not impossible in these fields. It may require fact-checking, small-scale trials, user feedback, or human review, with different costs and timelines.

Products need to account for those limitations rather than substitute a more persuasive answer for verification.

So when I look at an AI opportunity now, my first question is:

> **Where will the verification come from?**

Only then do I ask which model it should use.

## 6. Making Cheap Models Reliable Is a Question of Economics

If a system can use a lower-cost model to complete tasks that previously required an expensive one, it can certainly create value.

This is also one way I think about runtimes.

A runtime is not just a matter of technical aesthetics or organizing components more elegantly. It also involves a very specific calculation: can the additional engineering cost buy a lower cost of delivery?

We should not treat "cheap models," "small models," and "open-source models" as interchangeable categories, much less call them all inferior raw materials.

Price, size, openness, and a model's ability to perform a particular task are different dimensions. What we actually need to compare is how specific solutions perform on specific tasks.

A model may be cheap per call but require extensive retries, complicated verification, and frequent human takeovers. It may not save money in the end.

Another model may cost more per call but reduce the work required afterward, making it the lower-cost choice overall.

Nor do falling model prices automatically mean rising profits for the processing layer.

Consider a purely hypothetical example: one basic call to each of two models costs 10 yuan and 1 yuan, respectively, leaving a price gap of 9 yuan. If both prices fall by 90%, that gap shrinks to 0.9 yuan.

Using engineering to make the lower-priced model work may still pay off, but the absolute room available to cover the extra cost has changed.

So "the cheaper models become, the more valuable the processing layer becomes" is not a conclusion we can make without conditions.

More precisely, lower generation costs may make more tasks worth attempting. They may also make verification, execution, and delivery more prominent bottlenecks. But whether the processing layer earns a return depends on whether the gains it creates cover its own costs.

And those gains are not limited to "switching to a cheaper model."

Fewer failures, fewer human takeovers, less damage from errors, and faster delivery can all be valuable. A system may need these capabilities even when it already uses the strongest model.

I am not interested in using the cheapest model. I am interested in this:

**Completing the work at a lower total cost while meeting the acceptance criteria.**

## 7. What the Token-Processing Industry Really Needs to Improve Is Its "Conversion Rate"

Following this line of thought, the way we evaluate systems needs to change as well.

Model benchmarks, context length, generation speed, and price per million tokens all matter. But they mainly tell us what properties the raw material has and what it costs to obtain.

They do not directly answer the question: how much work did this system actually complete?

Suppose two systems use the same model to handle the same set of tasks.

System A hands a task to a human after the first failure.

System B can detect the failure, identify its cause, and try again, turning some of those failed tasks into acceptable results.

System B uses more tokens, yet it may still be the better system. The additional model-call costs may be lower than the human labor costs and failure losses it avoids.

But there are at least two distinct questions here, and they should not be collapsed into one metric.

The first is an engineering question:

> **With the same model, the same tasks, and the same token budget, which system delivers more acceptable results?**

For now, I call this **Token Conversion Efficiency**.

The task set and acceptance criteria must remain fixed for the comparison. If one system chooses easy tasks and another handles difficult ones, directly comparing their success rates tells us little.

Likewise, if we want to identify the processing system's own contribution, we should control for the model as much as possible. Improvements after switching to a stronger model cannot all be attributed to the workflow.

The second question is closer to running an actual business:

> **At the same quality standard, what is the total cost of completing one accepted task?**

A straightforward way to think about it is:

**Cost per accepted delivery = (All model-call and tool-execution costs + Human intervention costs + Allocated development and maintenance costs) / Number of tasks that pass acceptance checks.**

The word "all" matters.

Failed attempts, discarded approaches, additional verification, retries, and tasks ultimately handed to humans all incur costs. Counting only the model call that finally succeeded will not reveal the real cost of delivery.

Nor can cost be considered in isolation.

We also need to track the successful delivery rate, end-to-end completion time, human takeover rate, and the potential consequences of failure. A cheap system that frequently cannot finish tasks may suit very different use cases from an expensive but reliable one.

Beyond these measures lies the broader concept of **Token Value Added**: how much additional economic value do these processed capabilities ultimately create?

This is related to engineering efficiency, but the two are not equivalent.

A system can be extraordinarily efficient at completing tasks nobody needs. It can also be perfectly reasonable to use more resources to complete a small number of high-value tasks.

So engineering must demonstrate that the system genuinely adds something. The business must also demonstrate that this addition is worth paying for.

The point is not to replace existing evaluations with a new name. It is to shift our attention, when assessing products, making purchases, and discussing business value, from "how many tokens were used" to "what was accomplished, and at what cost."

When processing capability can only be explained through demos rather than continuously checked, it is difficult to compare accurately.

Consumption can tell us how busy a system is. On its own, it cannot tell us how useful it is.

## 8. What If the Upstream Providers Build Their Own Refineries?

At this point, an obvious counterquestion arises:

If processing matters so much, why would model providers not do it themselves?

We cannot avoid this question.

There is no reason to assume model providers will stop at the API layer. They can move further downstream and offer agents, execution environments, and end-user products.

And as models improve, some things that once required complicated workflows may become possible with a single call.

That could eliminate the value of certain processing steps.

Downstream products therefore cannot treat "this currently requires several extra steps" as a lasting advantage. Something that is complicated today may not remain complicated tomorrow. A product that compensates for a model's weakness today cannot assume that weakness will last forever.

But not all task complexity comes from models being insufficiently intelligent.

A system embedded in a real business process may also need to handle data permissions, interface constraints, approval chains, organizational policies, exceptions, and boundaries of responsibility.

There is still concrete work between a model's ability to write correct code and its ability to carry out a change in a particular organization's real environment.

That is what I mean when I say downstream systems need to grow around specific use cases.

Serving a specific use case does not automatically create a defensible advantage, either. If the product only uses a different set of prompts and an easily replicated integration, replacing it may not be difficult.

What needs to be demonstrated is whether your understanding of the use case, your integrations, and your verification capabilities can keep lowering delivery costs in ways that are not easily replaced by another solution.

This is also where the oil analogy has to stop.

Oil and tokens differ in how interchangeable they are. Physical refineries and software systems also face different constraints on replication. The existence of many independent refineries in the oil industry does not imply that AI's downstream market must develop the same structure.

**The analogy helps explain the division of labor. It cannot guarantee profits for any layer.**

## 9. Users Should Be Buying Results, Not Tokens

For end users, the more natural request is usually not "buy a million tokens."

It is: fix this bug, process these invoices, complete the contract review within the agreed scope, or deliver a software feature that is ready to launch.

Once quality, timing, and data requirements are met, whether the work used half a million or five million tokens should increasingly become the service provider's own cost issue.

It is like eating at a restaurant. We care about the meal, not how much electricity the kitchen used.

The electricity bill has not disappeared. It simply is not the main reason the customer is buying the meal.

So the shift I hope to see is this:

**Tokens gradually move into the cost ledger, while delivered results move to the center of the value proposition.**

This does not mean every product must charge by the result.

Subscriptions, per-seat pricing, and usage-based pricing can all make sense. There is nothing wrong with infrastructure services continuing to charge by the token. Even end-user products may need usage limits to manage costs.

Maturity does not depend on whether the word "token" literally appears on the price sheet.

The more important question is whether users still have to turn the model calls they have purchased into finished results themselves.

If users still need to repeatedly copy outputs, check for errors, retry manually, and perform almost all of the acceptance work, then the product's actual delivery commitment is limited, whatever its pricing model.

Conversely, a system that can define task boundaries, organize execution, provide verification, and deal clearly with failure has an opportunity to price around those capabilities.

But charging for results does not mean customers cannot compare prices.

They can still compare reliability, price, speed, integration costs, and failure risks. Whether the processing layer can command a premium depends on whether its differences are valuable and how easily those differences can be replicated.

Creating value and acquiring pricing power are related, but they are not the same thing.

Tokens will not cease to matter as a production input. Users simply should not have to understand those inputs and organize the production process themselves as a prerequisite to getting a result.

## 10. And That Is Exactly Where the Problem Lies

Looking back, what I think we really need to watch is a possible mismatch between two kinds of progress.

One is that model capabilities become easier to obtain, generation costs fall, and more resources become available to call upon.

The other is that we can reliably complete more real-world tasks at an acceptable cost.

The first can create the conditions for the second. It cannot automatically substitute for it.

Model calls may become cheaper while requirements remain poorly defined. Generation may become faster while acceptance still depends on manual work. A system may consume more tokens without delivering a proportionate increase in results.

This does not mean AI has no value, or that processing systems have made no progress.

It means we cannot infer the pace of value realization solely from changes on the supply side.

The question worth asking is:

> **When model capabilities become cheaper to access, how much cheaper do reliable results actually become?**

If the market has already priced in a timetable for turning these capabilities into revenue, profits, and productivity, but the maturation of actual delivery capabilities keeps falling behind that timetable, expectations may need to be adjusted.

The problem may not be that the future has disappeared.

It may be that the future still exists, but the road to it is longer than we first imagined.

So rather than focusing on how many model calls are made each day or how many tokens are consumed, I am now more interested in another number:

How much work did those calls ultimately complete that actually passed acceptance checks?

**Generating content has become cheaper. That does not mean obtaining reliable results has.**

Getting from the former to the latter is what I mean by the token-processing industry.

In the next article, we will talk about AI's "expectation decay."
