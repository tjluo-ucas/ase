---
layout: post1
title: "Course Overview"
permalink: /en/
lang: en
translation_url: /
---

Intelligent Software Engineering: Solving Real Problems with Verifiable, Evolvable Software
============================================================================================

## 1. What Is Intelligent Software Engineering?

Humanity increasingly faces problems that exceed an individual's capacity to understand, calculate, or act. To involve computers in solving these problems, people must observe reality, identify regularities, formulate hypotheses, and express knowledge and proposed solutions as data models, algorithms, rules, programs, or machine-learning models trained from examples.

Software is not merely a collection of source files. It is an intellectual product that extends human cognition, decision making, and action. In the revised Bloom taxonomy, cognitive activity spans six levels: remember, understand, apply, analyze, evaluate, and create. Software can support or automate activities at these levels, but its value ultimately depends on whether it reliably improves human work under explicit conditions and constraints.

Software development is therefore a creative process that turns a real-world problem into an executable system:

> Real problem → users and context → testable requirements → business and data models → architecture and code → testing and deployment → operational evidence → product evolution

Software engineering systematizes the knowledge needed to conceive, specify, model, architect, implement, verify, operate, and evolve software. Intelligent software engineering further studies how machine learning, large language models, and AI agents can improve both software products and the process used to build them.

In this course, intelligent software engineering means:

> The theories, methods, and implementation techniques for efficiently developing high-quality intellectual products that solve real problems in a verifiable, maintainable, and sustainable way.

## 2. Why Software Engineering Remains Difficult

After more than half a century of development, software projects still suffer from distorted requirements, runaway costs, delayed delivery, declining quality, and products that users do not adopt. These failures cannot be reduced to slow coding. They arise from software's essential complexity.

### 2.1 Problems and requirements are uncertain

What users request is not necessarily what they need. A request to “add an intelligent question-answering feature” may conceal a more concrete problem: users cannot locate authoritative evidence, understand a workflow, or determine responsibility.

A requirement must therefore explain:

- who encounters the problem and in what context;
- why current alternatives are inadequate;
- which user behavior or business result should change;
- how success and failure will be measured; and
- which assumptions, constraints, and risks bound the claim.

“The system can answer every legal question” cannot be tested or responsibly delivered. “Within four weeks, move review of limitation-of-liability clauses in Hong Kong commercial contracts from unvalidated to passing 200 frozen examples, blinded review by two experts, and a safety gate” has a defined scope, time frame, evaluation object, and evidence standard.

### 2.2 Software components are interdependent

Requirements, data, algorithms, interfaces, architecture, security, performance, and operations are coupled. Changing an identity model can affect the database, login API, authorization rules, cache, audit log, automated tests, and existing user records.

Software complexity comes not only from the amount of code, but also from:

- domain concepts and their relationships;
- dependencies among modules;
- state transitions and exceptional paths;
- concurrency, networks, and distributed execution;
- trade-offs among security, performance, cost, and maintainability; and
- historical constraints accumulated through evolution.

### 2.3 Software must remain dependable while it changes

Requirements, laws, data distributions, runtime environments, dependencies, and business models all change. A system that works today may fail under tomorrow's scale, extension, or threat model. The central engineering task is therefore not just to write a working program, but to maintain consistency among requirements, design, code, tests, and operational behavior throughout change.

## 3. Why Codex Agents Do Not Remove Essential Complexity

Codex and related agents can investigate repositories, generate code, add tests, explain failures, run tools, and propose refactorings. They reduce the cost of implementation, search, and repetitive work, but they do not eliminate the essential complexity of deciding what should be built and proving that it works.

### 3.1 Faster implementation does not prove that a problem is worth solving

An agent can implement the wrong feature faster. If “contract review is slow,” the right intervention may be clause detection, source verification, or workflow redesign—not a generic chat interface. Teams must establish the pain point and value measure before selecting the technology.

### 3.2 Plausible code does not prove that the requirement is correct

An agent produces a likely implementation from the context it receives. Ambiguous requirements, missing constraints, or incorrect acceptance criteria can yield coherent code with incorrect business behavior. Important capabilities therefore need traceability across:

> requirement → acceptance criterion → implementation → automated test → operational measure

### 3.3 Lower code-production cost can accelerate technical debt

Without constraints and review, AI-assisted development can create duplicated abstractions, inconsistent patterns, unnecessary dependencies, hidden security weaknesses, superficial tests, local optimizations that conflict with the architecture, and code that no team member can explain.

Agent productivity should not be measured by lines of code. It should be measured by reduced cognitive load, stronger verification, smaller safe changes, and maintainable engineering assets.

## 4. Preventing Technical Debt and False Requirements

### 4.1 Begin with user outcomes, not features

For every proposed feature, ask:

1. Who is the target user?
2. What difficulty occurs in which situation?
3. What behavior or result should change after intervention?
4. What evidence will show that the change occurred?

A feature without a user task, value outcome, or risk-control objective should not enter the roadmap merely because it is technically feasible.

### 4.2 Turn aspirations into testable requirements

Requirements should state scope, preconditions, inputs, outputs, exceptions, and decision thresholds. Intelligent systems additionally need frozen evaluation sets, error taxonomies, expert or user review procedures, safety gates, human-escalation rules, and versions for data, models, prompts, and code.

### 4.3 Control architecture risk through small increments

Each iteration should produce a small, complete value loop. Architecture decisions should record the problem, alternatives, rationale, costs, and rollback path. Refactoring must preserve externally observable behavior, be protected by automated tests, and demonstrate improvement through evidence such as complexity, duplication, defect rate, or maintenance time.

### 4.4 Establish automated quality gates

Depending on project risk, changes should pass unit, integration, and end-to-end tests; type and static analysis; dependency and secret scanning; authorization and abuse-case tests; performance regression checks; and, for AI systems, frozen-sample evaluation and appropriate human review.

Coverage alone is insufficient. A test must be capable of detecting a meaningful fault.

### 4.5 Bound agent authority and human responsibility

Codex may search code, propose alternatives, implement a bounded change, add tests, and organize documentation. Humans remain responsible for deciding whether a problem is worth solving, approving requirements and acceptance criteria, making architecture and risk trade-offs, authorizing sensitive operations, reviewing security and compliance, and deciding whether a system is ready to release.

### 4.6 Use operational evidence to test product value

Delivery is not the end of the project. Teams must observe whether users adopt the software, complete tasks faster, make fewer errors, require less manual review, remain willing to use or pay for the service, and encounter new safety or usability problems. If operational evidence does not support the value claim, the team should revise or stop the feature rather than continue accumulating code.

## 5. Core Course Tasks

The course follows the thread “real problem → system proposal → engineering evidence → operational value.” Students collaborate with Codex agents to:

1. identify a real problem worth solving;
2. analyze users, contexts, constraints, pain points, and value measures;
3. represent domain knowledge as business rules and domain/data models;
4. design an architecture with explicit responsibilities and evolution paths;
5. implement readable, testable, and refactorable code;
6. design interfaces, interactions, and exception handling;
7. establish testing, security, performance, and continuous-integration gates;
8. specify the agent's context, task, tool permissions, and acceptance criteria;
9. evaluate real-world value using feedback and operational data; and
10. reflect on changing requirements, architecture decisions, and technical debt.

The final deliverable is not merely a demonstration. It is a coherent evidence package: problem statement, requirements and acceptance criteria, business and data models, architecture decisions, code, tests, deployment record, operational measures, and reflective analysis.

## 6. Course Position

The term “software engineering” appeared during the 1960s, and the NATO conferences around 1968 are widely treated as an important milestone in the field's institutional development. Margaret Hamilton's Apollo work helped establish software as a legitimate engineering discipline and demonstrated the importance of reliability, error detection, priority scheduling, and recovery in critical systems.

At ICSE 2018, the software-engineering community marked fifty years of the field. Frederick Brooks delivered a [keynote](https://www.youtube.com/watch?v=StN49re9Nq8&t=67s), as did Margaret Hamilton in a separate [keynote](https://www.youtube.com/watch?v=ZbVOF0Uk5lU).

Software engineering has accumulated strong bodies of knowledge in requirements, architecture, patterns, formal methods, automated testing, continuous integration, security engineering, and measurement. Probabilistic intelligent software, data dependence, limited interpretability, agent autonomy, and rapidly generated code now introduce additional quality and governance challenges.

The course takes the following position:

> AI agents can improve software-production efficiency, but they cannot replace understanding of real problems, engineering judgment, or accountable decision making. The goal of intelligent software engineering is not to generate more code; it is to build smaller, clearer, and more verifiable systems that continue to solve valuable problems.
