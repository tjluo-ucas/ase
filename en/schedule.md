---
layout: post
title: "Schedule"
permalink: /en/schedule/
lang: en
translation_url: /schedule/
banner: Schedule
---

* content
{:toc}

## 1. How the Schedule Works {#introdution}

The course runs for 15 weeks, four class hours per week, for a total of 60 hours. It uses a “structured support → evidence feedback → fading scaffold → transfer and creation” progression. One semester project connects requirements, models, architecture, code, testing, release, and operation.

Theory and practice are interleaved. Every week closes a loop of preparation, modeling or experimentation, delivery, and evidence review. Project quality gates expose invalid problem definitions, infeasible architectures, and unverifiable systems before the final demonstration.

### Suggested four-hour pattern

| Activity | Time | Purpose |
|---|---:|---|
| Review previous evidence | 20 min | Discuss recurring errors, counterexamples, and open questions |
| Core concepts and methods | 40 min | Explain motivation, conditions, limits, and alternatives |
| Case analysis | 45 min | Derive problems and evidence from real systems or failures |
| Code/model laboratory | 60 min | Investigate, model, implement, or verify a bounded task |
| Team discussion and cross-review | 45 min | Compare alternatives and provide actionable challenges |
| Project work and reflection | 30 min | Update artifacts, task contracts, and learning records |

## 2. Fifteen-Week Plan {#details}

| Week | Topic and focus | Preparation | In-class work | Deliverable and quality gate |
|---:|---|---|---|---|
| **1** | **Software, engineering, and evidence-based delivery.** Three core questions, two routes, nine tasks, scaffold fading, and human/agent responsibility. | Read syllabus, rubrics, and AI policy; analyze one familiar product and one failure. | Compare a successful demo with a solved real problem; baseline task; Git, task-contract, and agent-record demonstration. | Diagnostic and learning plan; personal repository; one-page value/risk analysis. |
| **2** | **Requirements I: problem, user, context, value.** Stakeholders, goals, constraints, obstacles, and value measures. | Investigate a real workflow using at least two source types; draft three candidate problem statements. | Interview role-play; derive goals from facts; compare software and non-software interventions. | Opportunity brief. **P0: sourced problem with semester-sized scope.** |
| **3** | **Requirements II: scenarios, specifications, acceptance.** Convert vague adjectives into decidable requirements and cover normal, boundary, exceptional, and abuse cases. | Critique ambiguity and premature design in a requirements document; draft three key scenarios. | Requirements review, counterexamples, frozen examples, agent-assisted consistency check with human source verification. | **A1 (3%)** and requirements baseline. **P1: every core requirement has source, owner, and verification method.** |
| **4** | **Business and data modeling.** Roles, activities, rules, exceptions, entities, relationships, states, events, data quality, and legality. | Collect domain terms and sample data; sketch a process or state change; inspect permissions. | Convert natural-language rules into constraints, state machines, or decision tables. | **A2 (3%)**, data/privacy note, baseline v0.2. **P2: models explain key scenarios and exceptions.** |
| **5** | **Architecture I: qualities and decomposition.** Derive responsibilities and compare layers, modular monoliths, microservices, and event-driven alternatives. | Compare two systems with similar functions but different architectures; identify three priority qualities. | Context/component modeling, trade-off review, premature-microservice case, first ADR. | Two candidate architectures, quality scenarios, trade-off table, ADR, and risk probe. |
| **6** | **Architecture II: frameworks, repository investigation, task decomposition.** | Run a reference repository; record entry points, dependencies, tests, and one unclear call path. | Repository archaeology; dependency/call graph; framework constraints; write bounded task contracts. | **A3 (3%)**, architecture baseline and vertical slice. **P3: explainable architecture and testable risks.** |
| **7** | **Patterns and refactoring.** Select patterns from change pressure; distinguish useful abstraction from overdesign; refactor in reversible steps. | Locate duplication, long functions, mixed responsibilities, or unstable dependencies. | Characterization tests; live refactoring; compare complexity and duplication; review a small Codex patch. | Tested refactoring PR/MR with rationale, results, rollback, and agent decision record. |
| **8** | **Interfaces and front-end programming.** Inputs, outputs, errors, state, timing, permissions, versions, usability, accessibility. | Critique a public API and sketch the project's key user flow. | Contract and compatibility exercises; prototype usability walkthrough; compare task time and errors. | **A4 (3%)** and running prototype v0.1 with contract, code, tests, and user evidence. |
| **9** | **Project proposal and plan review.** Defend value, requirements, architecture, scope, innovation claim, and validation plan. | Prepare at most 15 slides; freeze key requirements/samples; organize risk, license, data, and AI plan. | Proposal defense and common-rubric review; ask what would falsify the proposed solution. | Revised baseline and evidence plan. **P4: testable objective, deliverable scope, and validation path.** |
| **10** | **Verification, automated testing, and CI.** Unit, integration, end-to-end, property, regression, and test fault-detection power. | Enumerate normal, boundary, exception, and abuse cases; inspect current tests and draft CI. | Contract testing, fault injection or mutation, pipeline construction, frozen/golden sample discussion. | Test strategy, frozen set, defect/coverage report, and running CI. **P5: independent oracle for critical requirements.** |
| **11** | **Security, threat modeling, and defense.** Assets, adversaries, trust boundaries, identity, authorization, secrets, supply chain, and agent permissions. | Prepare asset inventory and data-flow sketch; inspect dependencies, secrets, and current agent access. | Threat-model workshop, abuse cases, permission matrix, security tests, prompt-injection and data-leak review. | Threat model, security requirements, tests, and remediation plan. **P6: no undisclosed critical risk.** |
| **12** | **Performance and scalability.** Translate “fast” into workloads, measures, and windows; locate algorithm, database, network, cache, or architecture bottlenecks. | Define user/data/concurrency scale; run baseline; formulate two bottleneck hypotheses. | Benchmarking, profiling, load tests, percentiles, throughput, resources, and side-effect analysis. | **A5 (3%)**, performance baseline, controlled optimization, midterm evidence package. **P7: minimum quality thresholds passed.** |
| **13** | **Continuous delivery, operations, and business model.** Deployment, configuration, monitoring, alerts, rollback, response, service level, and cost. | Draw deployment; estimate infrastructure/maintenance cost; select operational measures. | Release/rollback drill, observability, incident review, and comparison of revenue/service models. | Release plan, measures, rollback, value proposition, and test deployment. **P8: observable, reversible, accountable release.** |
| **14** | **Integration, cross-review, and release candidate.** Audit traceability, team/agent contributions, licenses, known risks, and reproducibility. | Package RC, evidence index, and reproduction environment; review an unfamiliar team module. | Cross-team acceptance and black-box tests; architecture/code review; agent-use audit; failure drill. | RC1, evidence matrix, and contribution record. **P9: another team reproduces critical results.** |
| **15** | **Acceptance, transfer, and retrospective.** Establish what the system solved and did not solve; test individual transfer. | Freeze code; submit report, acceptance material, slides/video, and reflection. | Defense, sampled live re-verification, individual transfer task, peer evaluation, course retrospective. | Final evidence package and roadmap. **P10: coherent project evidence and individual explanatory competence.** |

## 3. Individual Assignments {#homework}

The five assignments contribute 15% in total (3% each). AI tools are permitted only with a record of purpose, important input, acceptance/rejection decisions, and independent verification.

| Assignment | Due | Core task | Required evidence |
|---|---:|---|---|
| A1 Requirements and acceptance | Week 3 | Convert a real problem into scenarios, non-goals, requirements, and criteria | Sources, counterexamples, frozen samples or rules |
| A2 Business and data models | Week 4 | Model flow, domain objects, states, and invariants | Explanation of normal and exceptional scenarios |
| A3 Repository and architecture | Week 6 | Run and explain an unfamiliar repository | Reproduction commands, architecture, risk, and ADR |
| A4 Interface/refactoring slice | Week 8 | Deliver one runnable, tested, reversible change | Diff, contract, tests, and review record |
| A5 Quality-evidence experiment | Week 12 | Controlled test, security, or performance study | Baseline, method, data, result, limits, reproduction |

## 4. Team Project Milestones {#teamwork}

| Milestone | Time | Main artifact | Passing condition |
|---|---:|---|---|
| P0 Opportunity | W2 | User, problem evidence, scope, risks | Real problem and feasible scope |
| P1–P2 Requirements/models | W3–4 | Acceptance, domain/data models | Key cases, exceptions, verification clear |
| P3 Architecture | W6 | Alternatives, ADR, risk probe, tasks | Evidence-based choice; risks tested |
| P4 Proposal | W9 | Report, prototype, plan, evidence strategy | Falsifiable and deliverable |
| P5–P7 Midterm quality | W10–12 | CI, tests, security, performance | Running core and controlled risks |
| P8 Trial release | W13 | Deployment, monitoring, rollback | Observable and recoverable |
| P9 Release candidate | W14 | RC1, reproduction, evidence matrix | Independent reproduction |
| P10 Acceptance | W15 | Code, evidence, defense, roadmap | Value, implementation, and evidence agree |

## 5. Questions, Discussion, and Peer Review {#in-class-peer-discuss}

This 5% component rewards the quality rather than the frequency of contributions: identifying a missing source or assumption, proposing a falsifying counterexample, comparing alternatives and risks, giving actionable review advice, revising a claim after evidence, or detecting an error or authority violation in an agent suggestion.

## 6. Final Examination and Transfer Task {#final_project}

The final 40% combines conceptual discrimination with an individual task in an unfamiliar repository, module, or domain. The student investigates the context, identifies constraints and unknowns, compares alternatives, implements a minimal change or experiment, submits evidence and remaining risks, and explains both agent involvement and personal decisions.

## 7. Submission and Academic Integrity {#honer_code}

All work must identify sources and licenses, provide traceability and reproducible commands, report failures and limitations, disclose material Agent/Codex use, and protect personal data, secrets, and unpublished code. Fabricated tests, experiments, users, feedback, commits, or contributions are prohibited. Satisfaction, lines of code, coverage, or demonstration polish cannot independently establish learning or product value.
