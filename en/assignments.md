---
layout: post
title: "Assignments and Laboratories"
permalink: /en/assignments/
lang: en
translation_url: /assignments/
banner: Assignments and Laboratories
---

* content
{:toc}

## 1. Purpose {#assessment-introdution}

This page aligns the syllabus, fifteen-week schedule, nine lectures, five individual assignments, team-project gates, and rules for AI Agent/Codex use. Every task contributes to one engineering evidence chain:

> real problem → requirements and acceptance → business/data models → architecture and code → testing, security, and performance → deployment and operation → real-world value

The objective is not to submit more prose or code. It is to turn a design claim into evidence that can be inspected, reproduced, and challenged.

## 2. Assessment Structure {#assessment-structure}

| Category | Quantity/stage | Weight | Primary object of assessment |
|---|---:|---:|---|
| Individual assignments | A1–A5 | 15% | Independent analysis, modeling, implementation, and verification |
| Questions, labs, peer review | Throughout | 5% | Question quality, evidence use, participation, actionable feedback |
| Team project | P0–P10 | 40% | Complete delivery from problem discovery to operation |
| Final examination and transfer | End of course | 40% | Understanding and transfer to an unfamiliar repository/domain |

Each individual assignment is worth 3%. Team members may share interview material, background, and public interfaces, but every student must independently complete and explain the analysis, experiment, code, and reflection in individual work.

## 3. Common Submission Standard {#submission-rules}

### 3.1 Minimum structure

Every submission must contain:

1. **Problem and objective:** what is being solved and why it matters;
2. **Facts and sources:** interviews, code, logs, data, rules, or literature used;
3. **Assumptions and boundary:** unverified claims and explicit exclusions;
4. **Alternatives:** at least two feasible choices and a selection rationale;
5. **Artifact:** model, code, test, configuration, data, or prototype;
6. **Verification:** sample, metric, environment, oracle, and threshold;
7. **Results and counterexamples:** success, failure, open issue, and possible falsifier;
8. **Reproduction:** environment, versions, commands, data, and expected output;
9. **AI record:** agent scope, important advice, acceptance/rejection, and human verification.

### 3.2 Suggested repository organization

```text
project/
├── README.md
├── docs/
│   ├── problem-and-evidence.md
│   ├── requirements.md
│   ├── models/
│   ├── architecture/
│   ├── experiments/
│   └── ai-use-log.md
├── src/
├── tests/
├── scripts/
├── data/README.md
└── .github/workflows/   # or equivalent CI configuration
```

Commands in the README must work in a clean environment. Generated output, private data, secrets, and large derived files should not be committed unless explicitly justified.

### 3.3 Evidence levels

| Level | Evidence | Interpretation |
|---|---|---|
| E0 | Assertion or polished demonstration | Useful only for forming a hypothesis |
| E1 | Example, screenshot, or local result | Shows possibility, not reliability |
| E2 | Reproducible test or controlled comparison | Supports a bounded engineering claim |
| E3 | Independent review, frozen sample, realistic load, or cross-team reproduction | Stronger protection against selective reporting |
| E4 | Operational user or business outcome, transfer, or delayed result | Supports a real-world value claim |

Use an evidence level appropriate to the claim. A prototype claim may use E1–E2; a security, learning, or real-world value claim normally requires E3–E4.

## 4. AI Agent and Codex Rules {#ai-policy}

Agents may investigate repositories, explain code, propose alternatives, create bounded patches, draft candidate tests, and organize evidence. Students must control scope and permissions, inspect every material change, execute independent verification, and remain able to explain the result.

The following are prohibited: submitting unexplained generated work; fabricating sources, experiments, users, feedback, or logs; exposing credentials or personal data; bypassing authorization; allowing the agent to approve its own high-risk operation; and hiding material agent use.

### AI-use record

```markdown
## AI-use record
- Objective and bounded task:
- Context and files provided:
- Tools and permissions granted:
- Important suggestions:
- Accepted/rejected decisions and reasons:
- Independent checks performed:
- Remaining uncertainty:
```

## 5. Five Individual Assignments {#individual-assignments}

### A1: Requirements and Acceptance {#assignment-a1}

**Question:** How can a real problem become a requirement that another person can independently judge?

#### Learning objectives

- distinguish observations, stakeholder goals, requirements, design choices, and assumptions;
- use scenarios and counterexamples to expose ambiguity;
- define acceptance criteria and value measures with explicit boundaries.

#### Task

Select one real workflow. Use at least two source types—such as an interview, observation, policy, support record, or system log—to describe the current process and pain point. Compare a software intervention with at least one non-software alternative. Produce three to five priority requirements, explicit non-goals, and normal, boundary, exceptional, and abuse scenarios.

#### Laboratory

Review an ambiguous requirement such as “the system must be intelligent, secure, and fast.” Convert each adjective into an observable context, measure, and threshold. Ask an agent to identify omissions, then independently verify every issue against the source material.

#### Required artifacts

- problem/evidence statement and stakeholder map;
- scenario or use-case model;
- requirements, non-goals, and acceptance table;
- frozen examples or decision rules;
- alternatives, limitations, and AI-use record.

#### Rubric

| Criterion | Weight |
|---|---:|
| Problem evidence and value | 25% |
| Requirement clarity and scope | 25% |
| Acceptance and counterexamples | 25% |
| Alternatives, traceability, reflection | 25% |

### A2: Business and Data Models {#assignment-a2}

**Question:** Can the model explain both the normal workflow and the exceptions that matter?

#### Task

From the A1 scenario, identify actors, activities, decisions, entities, relationships, states, events, and at least three business invariants. Represent one nontrivial rule as a decision table, constraint, or state machine. Analyze data provenance, quality, retention, legality, privacy, and bias.

#### Required artifacts

- process and domain model;
- data dictionary and relationship model;
- state transition or decision table;
- three invariants with violating examples and tests;
- data-quality/privacy note and revision of A1 assumptions.

#### Rubric

| Criterion | Weight |
|---|---:|
| Fit to scenarios and terminology | 25% |
| Rules, states, and invariants | 30% |
| Data quality and governance | 25% |
| Counterexamples and explanation | 20% |

### A3: Repository Investigation and Architecture {#assignment-a3}

**Question:** Can a student understand an unfamiliar system well enough to make a safe, testable decision?

#### Task

Clone and run an unfamiliar repository. Record setup and test commands; locate entry points, modules, persistent data, external interfaces, configuration, and critical dependencies; reconstruct one end-to-end call path; identify three architecture risks; and compare at least two responses to one risk in an ADR.

#### Laboratory

Use `rg`, dependency manifests, tests, and runtime traces before asking an agent for an explanation. Compare the agent's map with code and execution evidence. Mark inferred relationships explicitly.

#### Required artifacts

- reproduction instructions and environment;
- context/component diagram and call path;
- dependency and test map;
- risk register and one ADR;
- mismatch log between initial interpretation and observed behavior.

#### Rubric

| Criterion | Weight |
|---|---:|
| Reproducibility | 20% |
| Repository and execution understanding | 30% |
| Architecture reasoning | 30% |
| Evidence, uncertainty, communication | 20% |

### A4: Interface, Front-End, or Refactoring Slice {#assignment-a4}

**Question:** Can a small change be independently reviewed, tested, and reversed?

Choose one option:

- implement an API endpoint with contract, errors, authorization, idempotency, and tests;
- implement a user-flow slice with input validation, failure feedback, accessibility, and usability evidence; or
- refactor a bounded legacy area under characterization and regression tests.

The patch must remain small enough for a reviewer to understand. Separate refactoring from behavior change where practical. Record why agent-proposed code was accepted or rejected.

#### Required artifacts

- bounded task contract and alternatives;
- code diff and traceability to requirement;
- automated tests and execution output;
- review findings, rollback path, and AI-use record;
- user or maintainer evidence appropriate to the option.

#### Rubric

| Criterion | Weight |
|---|---:|
| Scope and design rationale | 20% |
| Implementation quality | 30% |
| Test fault-detection power | 25% |
| Reviewability, rollback, reflection | 25% |

### A5: Quality-Evidence Experiment {#assignment-a5}

**Question:** Does a controlled intervention measurably improve a quality claim without creating an unacceptable regression?

Choose testing, security, or performance. State a claim, variables, baseline, environment, sample/workload, metric, threshold, and stopping rule before changing the system. Run a baseline, apply one bounded intervention, repeat the measurement, and report variance, failures, side effects, and applicability limits.

Examples include comparing branch coverage with mutation detection, repairing an authorization weakness and replaying abuse cases, or profiling and removing an N+1 query under representative load.

#### Experiment report

```markdown
# Experiment title
## 1. Quality claim and real context
## 2. Hypothesis, variables, and threshold
## 3. Environment, data, and reproduction
## 4. Baseline
## 5. Change and selection rationale
## 6. Controlled result and uncertainty
## 7. Counterexamples, failures, and limits
## 8. AI use and independent verification
```

#### Rubric

| Criterion | Weight |
|---|---:|
| Experimental design | 25% |
| Reproducibility and data | 25% |
| Analysis and causal restraint | 30% |
| Limitations, side effects, reflection | 20% |

## 6. Nine Lecture Laboratories {#lecture-labs}

| Lecture | Core question | Laboratory | Evidence |
|---|---|---|---|
| 1 Requirements | Is the problem real and the requirement decidable? | Critique and rewrite ambiguous requirements | Sources, scenarios, acceptance, counterexamples |
| 2 Business modeling | Does the model explain rules and exceptions? | Build a state model and test invariants | Domain/data models and violating examples |
| 3 Architecture | Which structure best satisfies priority qualities? | Compare candidates and run a risk probe | Quality scenarios, ADR, probe result |
| 4 Patterns/refactoring | Does the abstraction reduce change cost? | Characterization test and small refactoring | Diff, regression, before/after measures |
| 5 Interfaces | Does the contract support both user goals and failure handling? | API or usability walkthrough | Contract, task result, errors |
| 6 Security | What asset can be harmed through which path? | Threat model and authorization abuse test | Threats, permission matrix, remediation |
| 7 Performance | Where is the measured bottleneck? | Baseline, profile, optimize, repeat | Workload, trace, controlled comparison |
| 8 Delivery/operation | Can release fail safely? | Pipeline and rollback drill | CI log, deployment, monitoring, recovery |
| 9 Verification | Can the test detect a meaningful fault? | Fault injection/mutation and AI evaluation | Oracle, frozen sample, error taxonomy |

## 7. Team Project Gates {#project-gates}

| Gate | Evidence required | Blocking failure |
|---|---|---|
| P0 Problem | User, context, sources, current alternative, scope | Invented or inaccessible problem |
| P1 Requirements | Scenarios, non-goals, acceptance, ownership | Core behavior cannot be judged |
| P2 Models | Domain/data/state models and invariants | Model contradicts key workflow |
| P3 Architecture | Alternatives, qualities, ADR, risk probe | Choice based only on fashion |
| P4 Proposal | Prototype, plan, falsifier, evidence strategy | Not deliverable in semester |
| P5 Testing | Strategy, frozen set, CI, defect evidence | No oracle for critical requirement |
| P6 Security | Threat model, permissions, tests, remediation | Undisclosed critical risk |
| P7 Performance/quality | Baseline and controlled experiment | Unsupported quality claim |
| P8 Trial release | Deployment, monitoring, rollback, owner | Release not observable/recoverable |
| P9 Reproduction | RC1, clean instructions, cross-team result | Independent team cannot reproduce |
| P10 Acceptance | Coherent value, implementation, evidence, roadmap | Demonstration contradicts evidence |

## 8. Questions and Peer Review {#peer-review}

High-quality review identifies a concrete claim, locates the relevant evidence, explains the defect or uncertainty, proposes a bounded next action, and states how completion will be verified. Reviewers should distinguish correctness defects from preferences and avoid approving generated work merely because it looks polished.

## 9. Final Individual Transfer Task {#transfer-task}

The student receives an unfamiliar repository, module, or domain problem and must investigate it, identify requirements and risks, compare alternatives, implement or test one minimal change, and explain the evidence. The task evaluates whether course scaffolds can be reconstructed independently rather than recalled mechanically.

## 10. Final Checklist {#final-checklist}

- [ ] The problem and important facts have identifiable sources.
- [ ] Assumptions, non-goals, and stopping conditions are explicit.
- [ ] At least two feasible alternatives were compared.
- [ ] Requirements trace to implementation and verification.
- [ ] Commands, versions, samples, and expected outputs are reproducible.
- [ ] Tests cover meaningful normal, boundary, exception, and abuse risks.
- [ ] Security, privacy, licenses, and secrets were reviewed.
- [ ] Failures, negative results, and applicability limits are reported.
- [ ] Material Agent/Codex use and human decisions are disclosed.
- [ ] Every contributor can explain the submitted work.
