---
layout: post
title: "Syllabus"
permalink: /en/syllabus/
lang: en
translation_url: /2019/02/08/intro/
banner: Syllabus
---

* content
{:toc}

## 1. Syllabus at a Glance {#introduction}

| Item | Description |
|---|---|
| Course | Intelligent Software Engineering |
| Level | Graduate professional foundation/core course |
| Workload | 60 class hours over 15 weeks |
| Learning modes | Problem lectures, case discussions, code laboratories, literature critique, team project, and individual transfer task |
| Team organization | Normally three students, with rotating roles and traceable individual contributions |
| Engineering environment | Git, GitHub or GitLab, automated testing, continuous integration, containers, and approved AI Agent/Codex use |

## 2. Purpose and Position {#contents}

### 2.1 Software and software engineering

Software is a computer-based artificial system that extends human cognition and action. Its behavior depends not only on source code, but also on data, models, configuration, runtime environments, external interfaces, and patterns of use. AI systems are therefore software systems and must be evaluated in explicit contexts against explicit constraints—not merely by an impressive demonstration or a model metric.

Development follows a recurring inquiry-and-delivery loop:

> Observe reality → formulate a falsifiable objective → model requirements and the domain → design and implement → collect evidence → evaluate operational value → revise the problem and solution

Software engineering provides the theories, methods, tools, and organizational mechanisms needed to sustain this loop under constraints of value, quality, cost, schedule, security, and social responsibility.

### 2.2 Three core questions

1. **Problem and value:** Which real problems are worth solving with software, and what evidence establishes genuine user or social value?
2. **Structure and evolution:** How should responsibilities, data, interfaces, and dependencies be organized so that the system remains understandable and changeable?
3. **Correctness and evidence:** How can claims about behavior, security, performance, and value be tested, reproduced, and challenged?

### 2.3 Two complementary routes

- **Construction:** requirements, models, architecture, interfaces, implementation, deployment, and operation.
- **Criticism and verification:** counterexamples, tests, reviews, experiments, measurements, and operational feedback.

Construction without criticism produces plausible but unverified systems. Criticism without construction produces analysis without delivery. Students must use both routes in every project stage.

### 2.4 Nine engineering tasks

The course integrates nine recurring tasks:

1. requirements and application contexts;
2. business and data modeling;
3. software architecture and application frameworks;
4. design patterns and refactoring;
5. interface and front-end design;
6. automated testing and continuous delivery;
7. security and defensive design;
8. performance evaluation and optimization; and
9. business models and operational service.

### 2.5 Creativity as disciplined inquiry

Creativity is not measured by novelty alone. Students must discover a worthwhile problem, generate alternatives, make a reasoned choice, implement a testable system, confront counterevidence, and transfer the resulting insight to a new context. Scaffolding is gradually withdrawn so that students move from guided reproduction to independent creation.

## 3. Intended Learning Outcomes {#outcomes}

By the end of the course, a student should be able to:

1. explain the motivation, assumptions, benefits, limits, and applicable contexts of major software-engineering methods;
2. investigate an unfamiliar repository and reconstruct its modules, dependencies, API paths, tests, and risks;
3. turn a real problem into sourced requirements, explicit non-goals, acceptance criteria, and value measures;
4. construct and critique business, domain, data, state, and architecture models;
5. compare architecture and design alternatives using quality-attribute scenarios and evidence;
6. deliver small, reversible code changes protected by meaningful tests;
7. evaluate correctness, security, performance, usability, and operability with reproducible procedures;
8. configure a continuous-integration and deployment path with quality gates and rollback;
9. collaborate responsibly with Codex while retaining human authorization and verification; and
10. evaluate whether released software produces the intended real-world value.

### Outcome evidence

| Outcome area | Evidence |
|---|---|
| Problem and requirements | Interviews or sources, scenarios, requirements, non-goals, acceptance criteria |
| Modeling and architecture | Domain/data models, quality scenarios, architecture diagrams, ADRs |
| Implementation | Small reviewed changes, readable code, traceable commits |
| Verification | Automated tests, frozen samples, security/performance experiments, counterexamples |
| Operation and value | Deployment records, observability, user or operational measures |
| Independent judgment | Individual assignments, transfer task, reflection, agent-use record |

## 4. Audience {#audience}

The course is intended for master's and doctoral students in computer science, software engineering, and related fields. Students from other disciplines are welcome when they have sufficient programming experience and want to build data-intensive or intelligent software.

## 5. Prerequisites {#prior-knowledge}

### Required

- competence in at least one general-purpose language, preferably Python, Java, JavaScript/TypeScript, Ruby, or a comparable language;
- basic data structures, algorithms, databases, Web concepts, and command-line work;
- ability to read technical English and use Git for basic version control.

### Recommended preparation

Students should be able to clone and run an unfamiliar repository, execute its test command, inspect a stack trace, and explain a small code change. Short online courses may be used to refresh HTML, CSS, JavaScript, Python, databases, Git, and Linux tools.

## 6. Teaching and Learning Mechanism {#teaching-model}

### 6.1 Four-stage fading scaffold

1. **Structured reproduction:** the instructor supplies examples, templates, and explicit decision criteria.
2. **Guided variation:** students modify a known solution and explain the resulting trade-offs.
3. **Independent inquiry:** teams define alternatives, tests, and stopping conditions.
4. **Transfer and creation:** individuals apply the method in an unfamiliar repository or domain.

### 6.2 Weekly learning loop

> Preparation and observation → question and model → implement or experiment → peer challenge → evidence review → reflection and revision

The course does not postpone practice until all theory has been taught. Every week produces a reviewable artifact and updates the semester project.

### 6.3 Typical activities

- critique ambiguous requirements and unsupported value claims;
- reconstruct a business rule as a decision table, invariant, or state machine;
- compare candidate architectures through explicit quality scenarios;
- protect legacy behavior with characterization tests before refactoring;
- design API contracts and usability tasks;
- model threats and test authorization boundaries;
- establish performance baselines before optimization;
- build CI gates, deploy, observe, and conduct a failure review.

## 7. Discussion Topics {#topics}

### 7.1 Requirements and application contexts

Identify the user, environment, problem, constraints, current alternative, expected benefit, and evidence source. Express requirements through scenarios, use cases or user stories, specifications, and acceptance criteria. Distinguish environment facts, business goals, system requirements, design decisions, and unverified assumptions.

**Artifacts:** problem statement, stakeholder map, scenarios, requirement baseline, acceptance criteria, and value measures.

### 7.2 Business and data models

Model goals, roles, activities, rules, exceptions, entities, relations, states, and events. Evaluate data accuracy, completeness, timeliness, legality, bias, consistency, auditability, and evolution.

**Artifacts:** process model, domain model, data dictionary, state model, and business-rule table.

### 7.3 Architecture and application frameworks

Allocate responsibilities and dependencies; compare modular monoliths, layers, services, and event-driven designs; and evaluate reliability, security, performance, testability, and evolvability. Treat a framework as a set of useful abstractions plus constraints and lifecycle risks.

**Artifacts:** context/component/deployment views, quality scenarios, architecture decision records, and risk probes.

### 7.4 Patterns and refactoring

Select patterns from recurring change pressures rather than vocabulary. Detect duplication, long functions, mixed responsibilities, and uncontrolled dependencies. Refactor in small, reversible steps under test protection and measure the result.

**Artifacts:** smell analysis, refactoring plan, code diff, regression evidence, and before/after measures.

### 7.5 Interfaces and front-end programming

Specify inputs, outputs, errors, state, timing, authorization, idempotency, compatibility, and observability. Design user interfaces around user goals and evaluate completion rate, error rate, time, accessibility, and feedback.

**Artifacts:** API contract, interaction flow, prototype, error policy, and usability evidence.

### 7.6 Automated testing and continuous delivery

Combine unit, integration, end-to-end, property, and regression tests according to risk. Cover normal, boundary, exceptional, and abuse paths. Build CI gates for construction, tests, analysis, security, and release; document rollback and audit evidence.

**Artifacts:** test strategy, frozen examples, automated test code, defect report, CI/CD pipeline, and rollback plan.

### 7.7 Security and defensive design

Identify assets, attackers, trust boundaries, and attack paths. Design authentication, authorization, encryption, secret handling, dependency governance, logging, incident response, and agent tool permissions. Separate actions an agent may execute from those requiring human approval.

**Artifacts:** asset inventory, threat model, permission matrix, security tests, and recovery plan.

### 7.8 Performance evaluation and optimization

Derive response-time, throughput, concurrency, resource, and scalability objectives from user value. Use representative loads, profiling, and controlled comparison. Do not trade away correctness, security, or maintainability without an explicit decision.

**Artifacts:** performance objective, workload model, benchmark, profile, and before/after experiment.

### 7.9 Business model and operations

Explain which users receive value, who pays, how acquisition and service costs are sustained, and how the architecture reflects service levels and compliance. Use operational evidence to revise requirements and the product model.

**Artifacts:** value proposition, business-model canvas, cost/benefit analysis, service objectives, operational measures, and roadmap.

### 7.10 Common discussion standard

For every topic, students must identify evidence sources, assumptions, alternatives, selection rationale, validation method, agent contribution, human responsibility, unresolved risks, and counterexamples.

## 8. AI Agent and Codex Policy {#ai-policy}

### 8.1 Principle

AI assistance is permitted as an engineering instrument, not as an unacknowledged substitute for student judgment. The student remains accountable for every submitted claim, dependency, code change, and result.

### 8.2 Permitted uses

Agents may investigate a repository, explain unfamiliar code, suggest alternatives, draft bounded implementations, generate candidate tests, summarize diffs, and help organize documentation. Their output must be reviewed against primary sources, executable evidence, or direct inspection.

### 8.3 Required disclosure

Submissions must record the task given to the agent, relevant context and permissions, material suggestions, accepted and rejected changes, verification performed by the student, and any unresolved uncertainty.

### 8.4 Prohibited practices

Students must not submit unexplained generated work; invent sources, data, experiments, users, or test results; expose credentials or personal data; bypass authorization; let an agent approve its own high-risk change; or conceal agent use where disclosure is required.

## 9. Assessment {#assessment}

| Component | Weight | Primary evidence |
|---|---:|---|
| Five individual assignments | 15% | Independent problem analysis, modeling, implementation, and verification |
| Questions, laboratories, and peer review | 5% | Quality of inquiry, evidence use, and actionable feedback |
| Team project | 40% | End-to-end delivery from problem discovery through operation |
| Final examination and transfer task | 40% | Conceptual understanding and application in an unfamiliar context |

### Team-project rubric

The project is evaluated on problem evidence and value, requirements and traceability, models and architecture, implementation quality, verification, security/performance/operation, and the clarity of individual contributions. A polished demonstration cannot compensate for a missing evidence chain.

### Minimum gates

A project cannot receive a passing project grade if it cannot be reproduced, lacks an identifiable contribution history, fabricates evidence, exposes sensitive data, or has no defensible connection between its stated problem and delivered behavior.

## 10. Candidate Projects {#projects}

Suggested directions include a learning-management or course-selection service, discussion and knowledge-support system, customer-management service, evidence-based legal AI workflow, data-analysis or prediction service, conversational assistant with a bounded domain, game-playing or planning agent, and a software delivery/evidence platform. Teams may propose another project when they can document access to users, data, and a feasible validation path.

Every project must deliver a problem and evidence statement, requirements and non-goals, domain/data models, architecture decisions, a reproducible repository, automated tests, security and performance evidence, deployment/operation records, agent-use disclosure, and a final value evaluation.

## 11. Instructor {#instructor}

**Professor Tiejian Luo**  
School of Computer Science and Technology, University of Chinese Academy of Sciences; adjunct researcher and former chief engineer of the Intelligent Software Research Center, Institute of Software, Chinese Academy of Sciences.

His work focuses on applying artificial intelligence and information technology to real-world problems, including large-scale educational and learning platforms, intelligent software, data science, model evaluation, and AI applications.

## 12. Course Quality Improvement {#quality-improvement}

The course uses anonymous student feedback, artifact quality, reproducibility results, gate failure patterns, delayed reflection, and transfer-task performance to improve its materials and teaching design. Satisfaction is informative but insufficient by itself; course claims must be supported by evidence that students can independently apply, evaluate, and create software-engineering solutions.
