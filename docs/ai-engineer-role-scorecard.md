# AI Engineer Role Scorecard

Source video: Laurie Voss, “AI Writes the Code. So What's Left for Engineers?” — `https://www.youtube.com/watch?v=kspZP5BgkEU`

This derived framework turns the talk's thesis into a self-assessment for engineers and teams. The transcript argues that autonomous agents make code generation cheap, but the bottleneck moves to code review, product judgment, context, specification, delegation, accountability, and the parts of engineering that remain hard to automate.

## Core model

The future engineering role is less about typing code and more about owning the system around code: defining intent, reviewing outputs, managing agent workflows, understanding users, making tradeoffs, and holding accountability for shipped behavior.

The app should score whether a person or team is ready for this post-code engineering role.

## Score dimensions

### 1. Bottleneck awareness

Signals:
- The user understands that code generation is no longer the main constraint.
- They can identify the current bottleneck in their workflow.
- They expect bottlenecks to move as agents improve.
- They focus on what agents cannot yet do reliably.

### 2. Review and quality systems

Signals:
- They have a disciplined review process for agent-written code.
- They can evaluate correctness, maintainability, security, and product fit.
- They use tests, observability, and feedback loops instead of trusting generated output.
- They can keep review throughput high without rubber-stamping.

### 3. Specification and context skill

Signals:
- They can write clear specs, constraints, acceptance criteria, and examples.
- They can provide agents with the right context and boundaries.
- They can decompose work into delegable tasks.
- They can judge whether the agent solved the actual problem, not just produced code.

### 4. Product and human judgment

Signals:
- They understand users, product intent, and organizational tradeoffs.
- They can decide what should not be built.
- They can resolve ambiguity when requirements conflict.
- They remain accountable for outcomes, not just implementation artifacts.

### 5. Learning path readiness

Signals:
- They are actively shifting from typing code to directing systems.
- They practice reviewing agent output and improving prompts/specs.
- They build taste, judgment, and domain understanding.
- They can teach or mentor others in agent-native engineering workflows.

## Public app sections

1. Current role context
2. Bottleneck awareness
3. Review and quality
4. Specification and delegation
5. Product judgment
6. Learning path
7. Result panel

## Result outputs

- Agent-era engineering readiness score from 0 to 100
- Verdict
- Strongest capability
- Weakest bottleneck
- Recommended next steps

## Suggested thresholds

- 76–100: Agent-era engineering lead
- 56–75: Strong transition path
- 36–55: Still code-production centered
- 0–35: High displacement risk

## Important UI notes

- The app should not shame engineers for coding. It should show where human leverage moves.
- Emphasize bottlenecks, judgment, context, and accountability.
- The basis should mention only the dimensions that moved the result.
