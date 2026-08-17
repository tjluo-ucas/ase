---
layout: post
title: "Textbooks and References"
permalink: /en/references/
lang: en
translation_url: /books/
banner: References
---

* content
{:toc}

## 1. Purpose {#introduction}

This reading list supports the nine lectures, five assignments A1–A5, and project gates P0–P10. Resources are selected by three principles: begin with an engineering problem rather than a tool name; prefer standards, primary work, classic books, and official documentation; and read a small number of sources deeply enough to reproduce, challenge, or apply their claims.

Online documentation changes. Record access date, version, and material configuration in every experiment.

## 2. Reading Labels and Method {#how-to-read}

| Label | Meaning | Expected use |
|---|---|---|
| **M** | Must read | Understand the claim; prepare one question and one counterexample |
| **R** | Recommended | Support an assignment, alternative comparison, or discussion |
| **T** | Tool/standard | Consult the relevant section during an experiment |
| **E** | Extended | Research, transfer task, or deeper inquiry |

For each source ask: What problem does it address? Which assumptions bound the method? What do the reported observations support—and not support? How could the method be reproduced, challenged, or extended in the current project?

## 3. Core Textbooks and Foundations {#core-textbooks}

### 3.1 Core textbooks

1. **M** Bertrand Meyer. *Handbook of Requirements and Business Analysis*. Springer, 2022. Problem, goal, stakeholder, boundary, and verifiable requirement analysis.
2. **M** Ian Sommerville. *Software Engineering*, 10th ed. Pearson, 2015. Requirements, architecture, process, verification, evolution, and management.
3. **R** Pierre Bourque and Richard E. Fairley, eds. [*SWEBOK Guide V4*](https://www.computer.org/education/bodies-of-knowledge/software-engineering/v4). Knowledge areas, terminology, and professional boundaries.
4. **R** David Patterson and Armando Fox. *Engineering Software as a Service*, 2nd ed., 2021. Agile SaaS construction from requirements through cloud deployment.
5. **E** Bertrand Meyer. *Object-Oriented Software Construction*, 2nd ed. Prentice Hall, 1997. Contracts, abstraction, modularity, inheritance, and correctness.

### 3.2 Method and critical reasoning

1. **R** Karl Popper. *The Logic of Scientific Discovery*. Falsifiability, counterexamples, and evidence that could overturn a claim.
2. **R** Frederick P. Brooks Jr. “No Silver Bullet—Essence and Accidents of Software Engineering.” *Computer*, 1987. Essential versus accidental complexity.
3. **R** David L. Parnas. “On the Criteria To Be Used in Decomposing Systems into Modules.” *Communications of the ACM*, 1972. Information hiding and change-oriented decomposition.
4. **E** Bertrand Meyer. “Artificial Intelligence for Software Engineering: From Probable to Provable.” *Communications of the ACM*, 2026. [DOI: 10.1145/3773295](https://doi.org/10.1145/3773295).

## 4. Lecture 1: Requirements {#lecture-1-reading}

### Must read

- **M** Meyer, *Handbook of Requirements and Business Analysis*, chapters on problems, goals, stakeholders, context, and requirements.
- **M** Karl E. Wiegers and Joy Beatty. *Software Requirements*, 3rd ed. Microsoft Press, 2013.

### Standards and resources

- **T** [ISO/IEC/IEEE 29148:2018—Requirements Engineering](https://www.iso.org/standard/72089.html).
- **T** [Cucumber Gherkin Reference](https://cucumber.io/docs/gherkin/reference). Executable examples do not replace problem evidence or complete analysis.
- **R** Suzanne Robertson and James Robertson. *Mastering the Requirements Process*, 3rd ed., 2012.
- **E** Axel van Lamsweerde. *Requirements Engineering: From System Goals to UML Models to Software Specifications*, 2009.

**Reading task:** find one syntactically correct but untestable requirement; compare the responsibility of a user story with a specification; propose a counterexample to one A1 requirement.

## 5. Lecture 2: Business and Data Modeling {#lecture-2-reading}

- **M** Eric Evans. *Domain-Driven Design*, 2003: ubiquitous language, entities, value objects, aggregates, bounded contexts.
- **M** Martin Fowler. *Analysis Patterns*, 1997: extracting reusable structures from domains.
- **T** [OMG BPMN 2.0.2](https://www.omg.org/spec/BPMN/2.0.2/PDF/).
- **T** [OMG UML Specification](https://www.omg.org/spec/UML/).
- **R** Martin Fowler. *Patterns of Enterprise Application Architecture*, 2002.
- **R** Martin Kleppmann. *Designing Data-Intensive Applications*, 2017.

**Reading task:** derive domain events from three scenarios; identify an invariant not expressible by a foreign key alone; compare mutable rows with append-only versions for audit and concurrency.

## 6. Lecture 3: Architecture and Frameworks {#lecture-3-reading}

- **M** Len Bass, Paul Clements, and Rick Kazman. *Software Architecture in Practice*, 4th ed., 2021.
- **M** Parnas, “On the Criteria To Be Used in Decomposing Systems into Modules.”
- **T** [C4 Model—Diagrams](https://c4model.com/diagrams).
- **R** Michael Nygard. [“Documenting Architecture Decisions”](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).
- **R** Neal Ford et al. *Software Architecture: The Hard Parts*, 2021.
- **R** Mark Richards and Neal Ford. *Fundamentals of Software Architecture*.
- **E** Robert C. Martin. *Clean Architecture*, 2017; read critically against project cost and alternatives.

**Reading task:** rewrite “scalable” as a quality-attribute scenario; compare a modular monolith with microservices; locate every diagram dependency in code or runtime configuration.

## 7. Lecture 4: Patterns and Refactoring {#lecture-4-reading}

- **M** Martin Fowler. *Refactoring*, 2nd ed., 2018; [online catalog](https://refactoring.com/).
- **M** Erich Gamma et al. *Design Patterns*, 1994.
- **T** [Martin Fowler—Refactoring resources](https://martinfowler.com/tags/refactoring.html).
- **R** Michael Feathers. *Working Effectively with Legacy Code*, 2004.
- **R** Joshua Kerievsky. *Refactoring to Patterns*, 2004.
- **E** John Ousterhout. *A Philosophy of Software Design*, 2nd ed., 2021.

**Reading task:** state when not to use one pattern; explain why immediate abstraction of coincidental duplication can be harmful; design characterization tests that separate behavior change from structural change.

## 8. Lecture 5: Interfaces, UI, and Front End {#lecture-5-reading}

- **M** Don Norman. *The Design of Everyday Things*, revised ed., 2013.
- **M** Steve Krug. *Don't Make Me Think, Revisited*, 2014.
- **T** [WCAG 2.2](https://www.w3.org/TR/WCAG22/).
- **T** [RFC 9110—HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110).
- **T** [RFC 9457—Problem Details for HTTP APIs](https://www.rfc-editor.org/info/rfc9457/).
- **T** [OpenAPI specifications](https://spec.openapis.org/oas/).
- **T** [MDN Web Docs](https://developer.mozilla.org/).
- **R** Jakob Nielsen. [“10 Usability Heuristics”](https://www.nngroup.com/articles/ten-usability-heuristics/).

**Reading task:** compare REST, RPC, and events for an approval operation; design both a stable machine error and useful recovery message; inspect a form for keyboard, label, focus, and error accessibility.

## 9. Lecture 6: Security {#lecture-6-reading}

- **M** Ross Anderson. *Security Engineering*, 3rd ed., 2020; [open reading page](https://www.cl.cam.ac.uk/~rja14/book.html).
- **M** Adam Shostack. *Threat Modeling*, 2014.
- **T** [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/).
- **T** [OWASP Top 10](https://owasp.org/www-project-top-ten/). A risk-awareness list, not a complete acceptance standard.
- **T** [NIST SP 800-218—SSDF 1.1](https://csrc.nist.gov/pubs/sp/800/218/final).
- **T** [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/).
- **R** [MITRE CWE](https://cwe.mitre.org/).

**Reading task:** draw trust boundaries and select three priority threats; convert ASVS controls into tests; distinguish an agent's technical capability from its business authorization.

## 10. Lecture 7: Performance {#lecture-7-reading}

- **M** Brendan Gregg. *Systems Performance*, 2nd ed., 2020.
- **M** Raj Jain. *The Art of Computer Systems Performance Analysis*, 1991.
- **T** [USE Method](https://www.brendangregg.com/usemethod.html).
- **T** [OpenTelemetry Observability Primer](https://opentelemetry.io/docs/concepts/observability-primer/).
- **T** [Grafana k6](https://grafana.com/docs/k6/latest/) or [Locust](https://docs.locust.io/).
- **R** Neil J. Gunther. *Guerrilla Capacity Planning*, 2007.

**Reading task:** specify workload, concurrency, P95, errors, and resource limits; explain why means conceal tail experience; design a baseline/profile/change/retest loop.

## 11. Lecture 8: Delivery and Operations {#lecture-8-reading}

- **M** Jez Humble and David Farley. *Continuous Delivery*, 2010.
- **M** Nicole Forsgren, Jez Humble, and Gene Kim. *Accelerate*, 2018.
- **T** [DORA metrics](https://dora.dev/guides/dora-metrics/).
- **T** [GitHub Actions CI](https://docs.github.com/en/actions/get-started/continuous-integration) or [GitLab CI/CD](https://docs.gitlab.com/ci/).
- **T** [Docker documentation](https://docs.docker.com/).
- **T** [Kubernetes concepts](https://kubernetes.io/docs/concepts/); small projects should not adopt Kubernetes only for the label.
- **R** [The Twelve-Factor App](https://12factor.net/).
- **R** [Google SRE Books](https://sre.google/books/).

**Reading task:** define each pipeline gate's input, failure condition, owner, and evidence; explain build-once/deploy-many; rehearse a database release that cannot simply be rolled back.

## 12. Lecture 9: Verification and Testing {#lecture-9-reading}

- **M** Gerard Meszaros. *xUnit Test Patterns*, 2007.
- **M** Steve Freeman and Nat Pryce. *Growing Object-Oriented Software, Guided by Tests*, 2009.
- **T** [pytest](https://docs.pytest.org/en/stable/getting-started.html), [Hypothesis](https://hypothesis.readthedocs.io/), [coverage.py](https://coverage.readthedocs.io/), and [mutmut](https://mutmut.readthedocs.io/).
- **R** Glenford Myers et al. *The Art of Software Testing*, 3rd ed., 2011.
- **E** Daniel Jackson. *Software Abstractions*, revised ed., 2012.
- **E** Leslie Lamport. *Specifying Systems*, 2002; [TLA+ resources](https://lamport.azurewebsites.net/tla/tla.html).

**Reading task:** derive tests from a decision table; use mutation to expose a high-coverage weak assertion; explain the boundary of what passing tests establish.

## 13. AI Agent and Codex {#codex-reading}

Product behavior, permissions, and configuration can change; consult official OpenAI documentation and record the date and environment used.

### Official guidance

- **M** [Codex Best Practices](https://learn.chatgpt.com/guides/best-practices).
- **M** [Custom Instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md).
- **M** [Agent Approvals & Security](https://learn.chatgpt.com/docs/agent-approvals-security).
- **R** [Code Review](https://learn.chatgpt.com/docs/code-review).
- **R** [Sandbox](https://learn.chatgpt.com/docs/sandboxing).
- **R** [Long-running Work](https://learn.chatgpt.com/docs/long-running-work).

### Research and evaluation

- **R** Mark Chen et al. “Evaluating Large Language Models Trained on Code.” [arXiv:2107.03374](https://arxiv.org/abs/2107.03374).
- **R** Carlos E. Jimenez et al. “SWE-bench.” ICLR 2024. [Project](https://www.swebench.com/).
- **E** John Yang et al. “SWE-agent.” 2024. [Project](https://swe-agent.com/).

**Reading task:** write a one-page `AGENTS.md`; preserve one material agent suggestion with diff and verification; define a destructive or sensitive action requiring human approval; analyze correlated error when one agent creates both code and tests.

## 14. Assignment and Gate Index {#assignment-index}

| Work | Priority reading | Standards/tools |
|---|---|---|
| A1, P0–P1 | Meyer; Wiegers & Beatty | ISO 29148; Gherkin |
| A2, P2 | Evans; Fowler | BPMN; UML |
| A3, P3–P4 | Bass et al.; Parnas | C4; ADR |
| A4 | Fowler; GoF; Norman | WCAG; HTTP; OpenAPI |
| A5 testing, P5 | Meszaros; Freeman & Pryce | pytest; Hypothesis; mutation |
| A5 security, P6 | Anderson; Shostack | ASVS; SSDF |
| A5 performance, P7 | Gregg; Jain | OpenTelemetry; k6/Locust |
| P8–P9 | Humble & Farley; *Accelerate* | DORA; CI; Docker; SRE |
| All agent work | Codex guidance | Approvals; review; sandbox |

## 15. Suggested Weekly Reading Rhythm {#weekly-reading-plan}

| Weeks | Focus |
|---|---|
| 1–3 | SWEBOK, Brooks, Meyer, Wiegers, ISO 29148 |
| 4–6 | Evans, modeling standards, Bass, Parnas, C4, ADR |
| 7–9 | Fowler, Feathers, Norman, Web/API standards, proposal evidence |
| 10–12 | Testing literature/tools, Anderson/Shostack/ASVS, Gregg/Jain |
| 13–15 | Continuous Delivery, DORA/SRE, Codex review/security, transfer reflection |

## 16. Citation and Integrity {#citation-policy}

Quote directly with page or section; cite paraphrased ideas; identify the source and license of diagrams, code, data, rubrics, and test samples; record author/organization, title, URL, and access date for Web material; verify AI-generated references against the original; never fabricate literature, identifiers, experimental data, feedback, or access records; and pin documentation or record versions when conditions matter to reproducibility.
