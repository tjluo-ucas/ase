---
layout: post
title: "Assignments and Labs"
permalink: /en/assignments/
lang: en
translation_url: /assignments/
banner: Assignments and Labs
---

* content
{:toc}

## 1. Assessment structure {#assessment}

| Component | Weight | Authoritative evidence |
|---|---:|---|
| Six individual assignments | 30% | ISE-A1 through ISE-A6, 5 points each |
| Classroom participation, labs, and peer review | 10% | Teacher-scored contribution quality, 0–5 per class |
| Team project | 40% | P0–P10 evidence gates, repository, release, and defence |
| Final examination and individual transfer | 20% | Conceptual discrimination and unfamiliar-context transfer |

The weights total 100%. The six tasks below are the complete set of independently graded assignments for Fall 2026. Participation is scored only by the teacher; AI does not assign participation marks.

## 2. Release and deadline rule {#calendar}

All times are Asia/Shanghai. Tasks are released after Monday class at 16:30 and close exactly seven days later at 16:30. Platform timestamps are authoritative.

| Task | Window | Title |
|---|---|---|
| ISE-A1 | 21 Sep → 28 Sep 2026 | Problem and stakeholder evidence brief |
| ISE-A2 | 5 Oct → 12 Oct 2026 | Domain model and testable specification |
| ISE-A3 | 19 Oct → 26 Oct 2026 | Repository investigation and reproducible build |
| ISE-A4 | 2 Nov → 9 Nov 2026 | End-to-end vertical slice and automated verification |
| ISE-A5 | 16 Nov → 23 Nov 2026 | Quality and security counterexample study |
| ISE-A6 | 30 Nov → 7 Dec 2026 | Reliability and observability evidence lab |

## 3. Common submission contract and five-point rubric {#contract}

Every submission identifies the real problem, sources, assumptions, alternatives, bounded artifact, verification method, raw result, counterexample or limitation, reproduction commands, and material AI use. A stable commit hash or tag is required for code. Screenshots and demonstrations do not replace source, tests, or reproduction instructions.

| Criterion | Points |
|---|---:|
| Problem, context, and method choice | 1.25 |
| Execution, artifact quality, and reproducibility | 1.50 |
| Analysis, counterexample, and limits | 1.25 |
| Communication, reflection, and AI verification | 1.00 |
| **Maximum per task** | **5.00** |

## 4. Six individual assignments {#individual-assignments}

### ISE-A1: Problem and stakeholder evidence brief

Investigate one authentic workflow with at least two source types. Identify stakeholders, current process, pain, constraints, value measures, non-goals, and a semester-sized scope. Compare a software intervention with a non-software alternative. Submit the evidence ledger, problem statement, stakeholder map, normal/boundary/abuse scenarios, and unresolved assumptions.

### ISE-A2: Domain model and testable specification

Turn the A1 workflow into a domain vocabulary, process or event flow, state model, data dictionary, and at least three invariants. Express one material rule as a decision table, contract, assertion, or temporal property. Include violating examples and independent checks. Explain data source, permission, retention, quality, and privacy boundaries.

### ISE-A3: Repository investigation and reproducible build

Clone and run an unfamiliar repository. Record environment, setup, build, and test commands; locate entry points, modules, persistent data, external interfaces, configuration, and critical dependencies; reconstruct one end-to-end call path; identify three risks; and compare two responses to one risk in an ADR. Clearly mark observed facts and inferred relationships.

### ISE-A4: End-to-end vertical slice and automated verification

Implement one bounded, reviewable, reversible slice from requirement through interface, authorization, data change, and user feedback. Include a task contract, small diff, automated unit/integration/end-to-end checks as appropriate, failure feedback, accessibility or API error behavior, review findings, and rollback path.

### ISE-A5: Quality and security counterexample study

Choose a significant test or security claim. Freeze the environment, baseline, oracle, abuse case or fault model, threshold, and stopping rule before changing the system. Apply one bounded intervention, rerun the same evidence procedure, and report failures, rejected candidates, side effects, and applicability limits. Coverage or a passing happy path alone is insufficient.

### ISE-A6: Reliability and observability evidence lab

Define a representative workload or failure scenario and a measurable reliability claim. Instrument the critical path, collect baseline latency/error/resource evidence, inject or reproduce one failure, improve detection or recovery, and repeat the measurement. Submit dashboards or structured logs, alert rationale, rollback/recovery evidence, residual risks, and exact reproduction steps.

## 5. Team project gates {#team-project}

| Gate | Week | Passing evidence |
|---|---:|---|
| P0–P2 | 2–4 | Sourced problem, traceable requirements, domain/data models, exceptions |
| P3–P4 | 6–9 | Architecture alternatives, ADRs, runnable prototype, falsifiable plan |
| P5–P7 | 10–12 | Independent oracles, security evidence, reliability/performance thresholds |
| P8–P9 | 13–14 | Observable reversible release and cross-team reproduction |
| P10 | 15 | Coherent code, evidence, individual contribution, acceptance, and roadmap |

## 6. AI use and academic integrity {#ai-policy}

AI and Codex may inspect repositories, propose alternatives, draft bounded code, add tests, and analyze failure logs. Their output is a candidate, not authority. Students must disclose material use, explain accepted and rejected suggestions, run independent checks, protect secrets and personal data, and retain failed evidence. Fabricated users, interviews, commits, tests, execution, or results are academic misconduct. The AI Tutor must not release a complete answer to the current assessed task.

Late or reopened submission is possible only when the teacher records permission in `learn.spaiq.ai`; the platform record, not an informal message, determines status.
