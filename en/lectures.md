---
layout: post
title: "Lecture Notes"
permalink: /en/lectures/
lang: en
translation_url: /slides/
banner: Lecture Notes
---

* content
{:toc}

# Features and Audience {#features}

> **Audience:** senior undergraduates, graduate students, software professionals, and early-stage product teams.  
> **Workload:** nine lectures over 15 weeks and 60 hours, integrating explanation, cases, labs, review, and project work.  
> **Main thread:** real problem → valid requirement → business/data model → architecture/code → verification → operational value.  
> **Human-agent rule:** an AI Agent/Codex may investigate, propose, and implement bounded changes; humans retain responsibility for goals, authorization, trade-offs, independent verification, and release.

## How to Use These Notes

The nine lectures are not nine independent vocabularies. They unfold one engineering loop. Each lecture asks what real problem is being solved, what model or artifact is required, what evidence can test the claim, which alternatives were compared, what an agent may do, what humans must decide, and how the result becomes input to the next lecture.

### Running case: project evidence and quality-gate platform

A graduate course has thirty three-person teams. When work is judged only by a code repository and final demonstration, instructors discover too late that some teams chose an invented problem, wrote untestable requirements, adopted an unchangeable architecture, optimized coverage rather than fault detection, or selected favorable demo data.

The proposed platform stores problem evidence, requirements, models, architecture decisions, code versions, and experiments; supports P0–P10 gates and authorized peer reproduction; maintains requirement–code–test–operation traceability; and lets agents identify inconsistencies or draft candidate tests without assigning grades or approving high-risk actions.

The course does not assume that “build an intelligent teaching platform” is a valid requirement. It first tests whether the problem exists, whether process change is a better intervention, and which outcomes would demonstrate value.

### Common task contract

```markdown
## Objective
## Evidence and source
## In scope / out of scope
## Constraints and permissions
## Candidate approaches
## Acceptance criteria and tests
## Stop and escalation conditions
## Required output and reproduction
```

# Lecture 1 — Software Requirements {#lecture-1}

## 1.1 Problem

How can an observation about reality become a requirement that guides implementation and can be independently accepted or rejected? Requirements fail when teams confuse user requests with underlying problems, goals with system behavior, or preferred technology with necessity.

## 1.2 Criteria for a valid requirement

A valid requirement has an identifiable stakeholder and source, an explicit context, observable behavior or result, a bounded scope, a verification method, and a rationale connected to value or risk. Important terms must be measurable or decidable.

“Answer every legal question” is unbounded. A better claim is: “For the frozen set of 200 Hong Kong commercial-contract limitation clauses, version 1.0 identifies the clause and produces a cited review that meets the agreed rubric in blinded review by two legal experts; unsafe or unsupported cases are escalated.”

## 1.3 From problem to system requirement

Separate five layers:

| Layer | Example |
|---|---|
| Environment fact | Reviewers spend substantial time locating limitation clauses |
| Stakeholder goal | Reduce review time without increasing material omissions |
| System requirement | Highlight candidate clauses and attach cited rationale |
| Design decision | Retrieval plus rule checks plus language model |
| Assumption | Available precedents adequately cover the contract class |

This separation lets evidence overturn an assumption or design without silently changing the goal.

## 1.4 Scenarios, stories, and acceptance

A user story supports conversation; a scenario makes context and interaction concrete; a specification defines behavior and qualities; acceptance examples make a bounded part executable. None alone proves that the problem is worth solving.

```gherkin
Scenario: unsupported governing law is escalated
  Given a contract governed by a jurisdiction outside the approved set
  When the reviewer requests a limitation-clause assessment
  Then the system does not state a legal conclusion
  And it records the unsupported jurisdiction
  And it routes the item to an authorized human reviewer
```

## 1.5 Requirement–code consistency

Give each critical requirement a stable identifier and link it to implementation, tests, and operational measures. Traceability should help answer impact questions, not create paperwork.

```text
REQ-LAW-017 → review/service.py → tests/test_unsupported_law.py
            → metric: unsupported_jurisdiction_escalation_rate
```

## 1.6 Agent collaboration and gate

Codex can search for implementation points, detect inconsistent terms, and draft candidate examples. Humans verify sources, decide value and scope, approve legal/safety thresholds, and design independent tests. **Gate:** every priority requirement has a source, non-goal, acceptance method, and counterexample.

# Lecture 2 — Business and Data Modeling {#lecture-2}

## 2.1 Why model the business?

Code cannot compensate for a misunderstood rule. A business model exposes roles, activities, decisions, obligations, exceptions, and responsibility before they are dispersed across controllers, database triggers, prompts, and UI conditionals.

## 2.2 From workflow to domain model

Begin with a concrete scenario, extract domain events, identify the state that must persist, and then define entities, value objects, relationships, and bounded contexts. Do not begin with database tables.

For the running case:

```text
SubmissionReceived → EvidenceChecked → GateReviewed
                    ↘ RevisionRequested ↗
GateReviewed → Approved | Rejected | Escalated
```

Candidate concepts include `Project`, `Submission`, `Requirement`, `EvidenceItem`, `GateReview`, `Reviewer`, and `Decision`. A `GateDecision` is not a Boolean: it has status, rubric version, reasons, evidence references, reviewer identity, and time.

## 2.3 Rules and invariants

Important rules should be expressible as constraints, decision tables, or state transitions.

```python
def approve(review):
    assert review.reviewer_id != review.submission.author_id
    assert review.evidence_snapshot_id is not None
    assert review.status == "under_review"
    review.status = "approved"
```

The assertions are domain claims and require tests with violating cases. A database foreign key alone cannot establish reviewer independence or evidence completeness.

## 2.4 Data quality and governance

For every field, ask where it comes from, who may change it, how accuracy is checked, how long it is retained, whether its use is lawful, and how deletion or correction affects audit evidence. Training and evaluation data must not be silently mixed.

## 2.5 Transactions and events

Use a transaction when a set of changes must be observed atomically. Use events when other components need to react without taking ownership of the originating decision. Eventual consistency is a trade-off, not a default virtue; identify what users may observe while replicas disagree.

## 2.6 Agent collaboration and gate

An agent can extract candidate nouns, states, and rules from documents, compare code with a model, or generate tests for invariants. Humans resolve domain meaning, legal basis, ownership, and ambiguous exceptions. **Gate:** the model explains key normal and exceptional scenarios and has tests for important invariants.

# Lecture 3 — Software Architecture {#lecture-3}

## 3.1 What makes an architecture reasonable?

Architecture allocates responsibilities and dependencies to satisfy priority quality attributes under real constraints. A diagram is not an architecture unless its relations can be located in code, configuration, data ownership, and runtime behavior.

## 3.2 Derive structure from quality scenarios

Replace adjectives with scenarios:

> During a course deadline, when 300 students submit within ten minutes, 99% of accepted uploads are acknowledged within two seconds, no accepted submission is lost, and delayed evidence processing is visible to the student.

This scenario informs queueing, idempotency, persistence, monitoring, and capacity tests. It does not automatically imply microservices.

## 3.3 Prefer the smallest architecture that isolates change

A modular monolith is often an appropriate course-project baseline:

```text
web → application services → domain modules → repositories/adapters
                 ↓
            events/observability
```

Modules own business rules and expose explicit interfaces. Framework and database details remain replaceable at the edges. Services should be split only when evidence shows independent scaling, deployment, ownership, reliability, or security boundaries that justify distributed-system cost.

## 3.4 Framework benefits and costs

A framework supplies lifecycle, conventions, extension points, security mechanisms, and integrations. It also creates inversion of control, upgrade obligations, implicit behavior, and dependency risk. Teams must be able to identify the entry point, request path, configuration precedence, and test seam.

## 3.5 Architecture decisions and risk probes

```markdown
# ADR-004: Use a modular monolith
## Context
Three developers, one semester, coupled transactions, uncertain boundaries.
## Alternatives
Layered monolith; modular monolith; microservices.
## Decision
Modular monolith with enforced module interfaces.
## Consequences
Simple deployment; must test dependency rules; split only with evidence.
```

Resolve uncertainty with a small probe—for example, test whether the proposed storage handles representative document size—before building the full feature.

## 3.6 Agent collaboration and gate

Codex can inventory modules and dependencies, trace an API path, draft diagrams and ADR alternatives, and implement a bounded probe. Humans confirm every inferred relation, prioritize qualities, and own trade-offs. **Gate:** at least two alternatives, explicit quality scenarios, one recorded decision, and evidence on the highest technical risk.

# Lecture 4 — Design Patterns and Refactoring {#lecture-4}

## 4.1 Elegance beneath complexity

A pattern is a reusable relationship among context, problem, forces, and solution—not a class diagram to insert. Refactoring changes internal structure while preserving externally observable behavior. Both aim to make likely change easier without hiding important domain complexity.

## 4.2 Choose from the direction of change

- Use Strategy when one policy varies independently and callers should not branch on each policy.
- Use Adapter when an external interface must be isolated from the domain.
- Use Observer/events when reactions vary and do not own the initiating transaction.
- Avoid a pattern when the variation is hypothetical, the abstraction has one accidental instance, or the added indirection costs more than the change it isolates.

## 4.3 Diagnose causes, not only smells

Duplication, long functions, divergent change, and dependency cycles are symptoms. Ask whether the root cause is a missing domain concept, mixed responsibility, unstable interface, absent test seam, or premature abstraction.

## 4.4 Small-step refactoring

1. Reproduce the current behavior.
2. Add characterization tests at a stable boundary.
3. Make one structural change.
4. Run focused and regression tests.
5. Inspect the diff and measures.
6. Commit a reversible unit.

```python
# Before: policy is embedded in control flow
if user.role == "teacher": ...
elif user.role == "assistant": ...

# After: policy is named and independently tested
permission = policy_for(user.role)
permission.assert_can_review(submission)
```

The second form is better only if role policies actually vary and the boundary reduces change cost.

## 4.5 Agent collaboration and gate

Ask Codex for the smallest patch and explicit behavior-preservation tests. Reject broad cleanup unrelated to the task. Humans judge whether duplication is conceptual, whether the abstraction matches the domain, and whether tests constitute a valid oracle. **Gate:** small diff, passing regression, explainable improvement, and rollback path.

# Lecture 5 — Interface and Front-End Design {#lecture-5}

## 5.1 Interfaces allocate responsibility

An interface defines more than parameters. It defines semantics, state, errors, timing, authorization, versioning, idempotency, and observability. A user interface similarly mediates between the user's goal and the system's model.

## 5.2 API contract

```http
POST /projects/42/gate-reviews
Idempotency-Key: 7c9...
Content-Type: application/json

{"submission_version": 8, "rubric_version": "2026.1"}
```

```json
{
  "type": "https://example.edu/problems/conflict-of-interest",
  "status": 409,
  "code": "REVIEWER_CONFLICT",
  "detail": "The author cannot approve this submission."
}
```

The contract must specify duplicate requests, stale versions, authorization failure, validation failure, and retry safety.

## 5.3 Idempotency, concurrency, and versions

Idempotency keys prevent duplicate effects but require retention and conflict rules. Optimistic concurrency detects stale updates but requires a recovery interaction. Versioning should preserve existing consumers or provide an explicit migration path; a URL version alone does not solve semantic incompatibility.

## 5.4 User-centered interaction

Design around a task: “review evidence and record a justified decision,” not “display database fields.” Make system status visible, prevent dangerous actions, provide recovery, preserve entered work, support keyboard and assistive technologies, and test with representative users and tasks.

Measure completion, time, errors, recovery, and comprehension. Preference ratings alone do not prove usability.

## 5.5 Contract tests and agent collaboration

Consumer/provider contract tests protect shared semantics. Codex can draft schemas, edge cases, UI states, and compatibility tests. Humans determine user goals, error meaning, accessibility acceptance, and authority. **Gate:** documented contract, failure behavior, compatibility test, and task-based usability evidence.

# Lecture 6 — Security Design {#lecture-6}

## 6.1 Security begins with assets and authority

Identify assets, actors, trust boundaries, entry points, attacker capabilities, and impact. “Use encryption” is not a threat model. For the running case, assets include student identity, unpublished code, grades, evidence records, credentials, and review integrity.

## 6.2 Authentication is not authorization

Authentication establishes an identity claim. Authorization decides whether that identity may perform a particular action on a particular resource in the current context. Enforce authorization on the server at the domain operation, not only in the interface.

```python
def approve_gate(actor, review):
    require(actor.has_role("instructor"))
    require(actor.course_id == review.course_id)
    require(actor.id != review.submission.author_id)
    audit("gate.approved", actor.id, review.id)
```

Test horizontal access, vertical privilege escalation, stale roles, cross-course objects, and direct API calls.

## 6.3 Common application and agent risks

Validate inputs, parameterize database access, encode outputs, protect secrets, pin and scan dependencies, verify uploaded files, and maintain useful security logs. Agent systems add prompt injection, tool abuse, data exfiltration, excessive autonomy, untrusted repository instructions, and generated dependency risks.

Technical capability is not authorization. An agent that can run a deployment command must still stop for human approval if production release is outside its mandate.

## 6.4 Recovery and testing

Define secret rotation, backup restoration, incident ownership, evidence preservation, user notification, and safe degradation. Security testing combines static and dependency analysis with authorization tests, abuse cases, configuration review, and recovery drills.

## 6.5 Agent collaboration and gate

Codex can inventory data flows, propose threats, locate checks, and draft abuse tests. Humans validate the threat model, classify impact, grant least privilege, and approve sensitive actions. **Gate:** no undisclosed critical finding; permissions and escalation are explicit; priority controls have tests or review evidence.

# Lecture 7 — Performance Optimization {#lecture-7}

## 7.1 Performance is a contextual requirement

Specify operation, workload, data scale, concurrency, environment, percentile, error rate, resource ceiling, and observation window. An average measured on toy data is not a user-facing performance guarantee.

## 7.2 Measurement-first loop

> objective → representative workload → baseline → profile → bottleneck hypothesis → one bounded change → same-condition retest → side-effect check

Track distributions such as P50/P95/P99, throughput, saturation, errors, and resource use. Preserve raw results and configuration.

## 7.3 Example: N+1 query

```python
# N+1: one query for reviews, then one per submission
reviews = Review.query.all()
for review in reviews:
    print(review.submission.project.name)

# Candidate change: eager-load only required relationships
reviews = Review.query.options(
    joinedload(Review.submission).joinedload(Submission.project)
).all()
```

Validate query count, latency distribution, memory, result correctness, and behavior at representative cardinalities. An eager join can become worse when relationships are large.

## 7.4 Cache correctness cost

A cache introduces invalidation, staleness, memory pressure, and observability requirements. State which data may be stale for how long and what happens after a permission or grade changes. Never cache a security decision without understanding invalidation.

## 7.5 Agent collaboration and gate

Codex can locate hot paths, draft load scripts, and propose alternatives, but should not optimize before a baseline. Humans select representative workloads, interpret variance, and judge trade-offs. **Gate:** reproducible baseline, profile evidence, controlled comparison, and no unacceptable correctness/security regression.

# Lecture 8 — Continuous Integration, Release, and Operations {#lecture-8}

## 8.1 From commit to running service

A delivery pipeline turns source into a traceable artifact and progressively increases confidence:

> lint/type → unit → integration → security → package → staging → acceptance → approved production → observe/rollback

Every gate needs an owner, failure condition, preserved evidence, and exception process.

## 8.2 Minimal CI example

```yaml
name: quality
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.12" }
      - run: pip install -r requirements.txt
      - run: ruff check .
      - run: pytest --cov=src --cov-branch
```

Pin critical actions and dependencies according to the project's supply-chain policy. Coverage is a signal, not a sufficient gate.

## 8.3 Build, configuration, release, and rollback

Build once and promote the same immutable artifact. Keep environment-specific configuration and secrets outside source. Use backward-compatible database changes when rollback may cross schema versions. A one-click deployment is credible only when it includes validation, authorization, observation, and recovery—not merely a command button.

## 8.4 Observability and incident learning

Logs explain events, metrics summarize behavior, and traces connect work across components. Alerts must correspond to actionable service or user impact. An incident review reconstructs timeline, contributing conditions, detection, response, and preventive changes without reducing a system failure to individual blame.

## 8.5 Business and operational value

Architecture is constrained by service level, support effort, compliance, acquisition cost, retention, and willingness to pay. Operational measures should connect technical behavior to user outcomes and inform the next requirement revision.

## 8.6 Agent collaboration and gate

Codex may draft pipeline configuration, deployment documentation, monitoring queries, or rollback checklists. Humans control credentials, environment authority, service objectives, and production approval. **Gate:** reproducible artifact, protected secrets, visible health, tested rollback, and named incident owner.

# Lecture 9 — Software Verification and Testing {#lecture-9}

## 9.1 Verification and validation

Verification asks whether the implementation satisfies its specification. Validation asks whether the specified and implemented system addresses the real need. A perfectly tested irrelevant feature still fails validation.

## 9.2 Test levels and responsibilities

| Level | Primary purpose |
|---|---|
| Unit | Fast feedback on a bounded rule or component |
| Integration | Contract with database, service, queue, filesystem, or framework |
| End-to-end | Critical user flow through deployed boundaries |
| Property | Invariants across generated examples |
| Regression | Preserve behavior known to matter |
| Operational evaluation | Validate behavior and value under realistic use |

## 9.3 Test design and oracle strength

Use equivalence classes, boundaries, decision tables, state transitions, pairwise combinations, abuse cases, and properties. A test is valuable when it can fail for a meaningful defect.

```python
@given(scores=lists(integers(min_value=0, max_value=100), min_size=1))
def test_aggregate_score_stays_within_input_range(scores):
    result = aggregate(scores)
    assert min(scores) <= result <= max(scores)
```

Mutation testing or intentional fault injection can reveal assertions that execute code but do not detect incorrect behavior.

## 9.4 Test doubles and reality

Use doubles to control costly or nondeterministic collaborators, but retain integration tests for assumptions that doubles cannot establish. A mocked database does not prove transaction behavior; a stubbed model does not prove deployed model latency or error distribution.

## 9.5 Additional evidence for AI systems

Version the model, prompt, tools, corpus, and evaluation set. Freeze representative and adversarial samples; define an error taxonomy; use independent or blinded review where expert judgment is material; separate development from evaluation data; measure uncertainty and escalation; and retain safety gates.

An AI-generated test may share the same misunderstanding as AI-generated code. Independent test design reduces correlated error.

## 9.6 From test result to quality conclusion

“All tests passed” means only that these tests, in this environment, on this version, produced their expected observations. Report what was covered, the oracle, sample and environment, failures, and what remains untested.

## 9.7 Agent collaboration and final gate

Codex can generate candidate cases, locate untested branches, implement fixtures, and explain failures. Humans select the risk model, oracle, independent samples, and claim boundary. **Final gate:** critical requirements trace to credible evidence; another reviewer can reproduce the result; known limitations and unsafe cases are explicit.

# 10. Cross-Lecture Traceability and Final Delivery

## 10.1 Lecture–artifact–gate map

| Lecture | Main artifact | Project gate |
|---|---|---|
| Requirements | Problem evidence, scenarios, acceptance | P0–P1 |
| Business modeling | Domain/data/state models, invariants | P2 |
| Architecture | Quality scenarios, candidates, ADR, probe | P3–P4 |
| Patterns/refactoring | Tested, reversible structural change | Continuous review |
| Interfaces | API/UI contract and usability evidence | Prototype/P4–P5 |
| Security | Threat model, permissions, abuse tests | P6 |
| Performance | Baseline, profile, controlled optimization | P7 |
| Delivery/operation | CI/CD, monitoring, rollback, value measures | P8–P9 |
| Verification | Strategy, frozen set, independent reproduction | P5 and P10 |

## 10.2 Final evidence package

The final project package contains the problem and source evidence; requirements, non-goals, and traceability; business/data models; architecture decisions; reproducible source and configuration; automated tests and evaluation data; security/performance results; release, monitoring, and rollback records; operational or user-value evidence; agent-use disclosure; contribution history; limitations; and next-version roadmap.

## 10.3 Unified evaluation

Evaluate the coherence of the entire chain, not artifact volume. Strong work has a real and bounded problem, explicit alternatives and decisions, simple architecture appropriate to constraints, small reviewable changes, tests capable of detecting faults, independent evidence proportional to risk, safe agent authority, reproducible operation, and honest limits. Innovation is demonstrated when a novel or transferred solution survives this evidence process—not when novelty is merely asserted.
