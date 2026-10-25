const values = { no: 0, maybe: 1, yes: 2 };

export const bottleneckQuestions = [
  { id: 'b1', title: 'Can you name the current bottleneck after code generation?', help: 'Agent-written code is cheap; the value moves to whatever still slows shipping.' },
  { id: 'b2', title: 'Do you expect bottlenecks to keep moving?', help: 'As review, testing, and deployment improve, the human job shifts again.' },
  { id: 'b3', title: 'Can you separate code volume from shipped value?', help: 'More code is not the same as more correct product behavior.' },
  { id: 'b4', title: 'Do you focus on what agents cannot reliably own yet?', help: 'The durable human role sits at the boundary of ambiguity and accountability.' }
];

export const reviewQuestions = [
  { id: 'r1', title: 'Do you review agent code with a defined checklist?', help: 'Correctness, security, maintainability, and product fit need explicit review.' },
  { id: 'r2', title: 'Do tests or observability catch agent mistakes?', help: 'Agent output needs systems that reveal regressions and hidden failure modes.' },
  { id: 'r3', title: 'Can you keep review fast without rubber-stamping?', help: 'The next bottleneck is often review throughput and judgment quality.' },
  { id: 'r4', title: 'Can you reject plausible-looking code?', help: 'Agent code often looks coherent even when it solves the wrong problem.' }
];

export const specQuestions = [
  { id: 's1', title: 'Can you write clear acceptance criteria?', help: 'Agents need precise definitions of done, edge cases, and non-goals.' },
  { id: 's2', title: 'Can you give agents the right context and constraints?', help: 'Context selection becomes a core engineering skill.' },
  { id: 's3', title: 'Can you decompose work into delegable tasks?', help: 'Agent-native engineering depends on clean task boundaries.' },
  { id: 's4', title: 'Can you tell if the actual problem was solved?', help: 'A working diff can still miss the user or business need.' }
];

export const judgmentQuestions = [
  { id: 'j1', title: 'Do you understand the user and product intent?', help: 'Human judgment remains strongest where requirements are ambiguous.' },
  { id: 'j2', title: 'Can you decide what should not be built?', help: 'Saying no is harder to automate than generating another implementation.' },
  { id: 'j3', title: 'Can you resolve conflicting requirements?', help: 'Tradeoffs across product, security, cost, and reliability need accountable judgment.' },
  { id: 'j4', title: 'Do you own outcomes beyond implementation?', help: 'The human role is accountability for shipped behavior, not just code artifacts.' }
];

export const learningQuestions = [
  { id: 'l1', title: 'Are you practicing agent direction, not only coding?', help: 'The role shift requires reps in prompting, reviewing, and orchestration.' },
  { id: 'l2', title: 'Do you improve prompts/specs after failures?', help: 'Failures should update the workflow, not just the immediate code.' },
  { id: 'l3', title: 'Are you building taste and domain understanding?', help: 'Taste helps decide which outputs are good, appropriate, and valuable.' },
  { id: 'l4', title: 'Can you teach others agent-native workflows?', help: 'Mentoring becomes about leverage, quality systems, and judgment.' }
];

const groups = [
  { key: 'bottleneck', label: 'Bottleneck', questions: bottleneckQuestions, weight: 20 },
  { key: 'review', label: 'Review', questions: reviewQuestions, weight: 25 },
  { key: 'spec', label: 'Specification', questions: specQuestions, weight: 20 },
  { key: 'judgment', label: 'Judgment', questions: judgmentQuestions, weight: 25 },
  { key: 'learning', label: 'Learning', questions: learningQuestions, weight: 10 }
];

const validIds = new Map(groups.flatMap(group => group.questions.map(q => [q.id, group.key])));

function normalizeAnswers(input) {
  if (!Array.isArray(input)) return [];
  const seen = new Set();
  const answers = [];
  for (const item of input) {
    if (!item || typeof item !== 'object') continue;
    const id = String(item.id || '');
    const answer = String(item.answer || '');
    if (!validIds.has(id) || !(answer in values) || seen.has(id)) continue;
    seen.add(id);
    answers.push({ id, group: validIds.get(id), answer, value: values[answer] });
  }
  return answers;
}

function level(percent) {
  if (percent >= 75) return 'Strong';
  if (percent >= 50) return 'Developing';
  if (percent >= 25) return 'Fragile';
  return 'Missing';
}

function verdict(score, answered) {
  if (answered < 12) return { verdict: 'Needs more signal.', explain: 'Answer more of the scorecard before trusting the result. Partial answers can hide the real bottleneck.' };
  if (score >= 76) return { verdict: 'Agent-era engineering lead.', explain: 'You are oriented around judgment, review, context, and accountability instead of only code production.' };
  if (score >= 56) return { verdict: 'Strong transition path.', explain: 'You have several agent-native habits, but one bottleneck still needs deliberate practice.' };
  if (score >= 36) return { verdict: 'Still code-production centered.', explain: 'You can use agents, but the workflow still depends too much on typing or accepting code.' };
  return { verdict: 'High displacement risk.', explain: 'The current skill set is too close to the part agents are making cheap: raw code production.' };
}

function nextSteps(score, groupScores, answered) {
  if (answered < 12) return ['Answer more questions first so the review can find the real weak point.'];
  const weakest = [...groupScores].sort((a, b) => a.percent - b.percent)[0];
  const steps = [];
  if (weakest.key === 'bottleneck') steps.push('Map your current delivery workflow and identify which step slows down after code generation gets faster.');
  if (weakest.key === 'review') steps.push('Create a code review checklist for agent output: correctness, tests, security, maintainability, and product fit.');
  if (weakest.key === 'spec') steps.push('Write specs with examples, non-goals, constraints, and acceptance tests before delegating to agents.');
  if (weakest.key === 'judgment') steps.push('Spend more time with users, incidents, and product tradeoffs so you can judge whether outputs matter.');
  if (weakest.key === 'learning') steps.push('Practice agent orchestration loops: delegate, inspect, patch the prompt/spec, and repeat.');
  steps.push(score >= 76 ? 'Start mentoring others in your agent-native review and specification workflow.' : 'Run one small project where you measure review quality and bottleneck movement explicitly.');
  return steps;
}

export function score(payload) {
  const answers = normalizeAnswers(payload?.answers);
  const byId = new Map(answers.map(a => [a.id, a]));
  const groupScores = groups.map(group => {
    const answered = group.questions.filter(q => byId.has(q.id));
    const raw = answered.reduce((sum, q) => sum + byId.get(q.id).value, 0);
    const possible = group.questions.length * 2;
    const percent = Math.round((raw / possible) * 100);
    return { key: group.key, label: group.label, raw, possible, percent, level: level(percent) };
  });
  const weighted = groupScores.reduce((sum, group) => sum + group.percent * (groups.find(g => g.key === group.key).weight / 100), 0);
  const finalScore = Math.max(0, Math.min(100, Math.round(weighted * (answers.length / 20))));
  const v = verdict(finalScore, answers.length);
  return {
    score: finalScore,
    ...v,
    answered: answers.length,
    total: 20,
    groupScores,
    weakest: [...groupScores].sort((a, b) => a.percent - b.percent)[0],
    nextSteps: nextSteps(finalScore, groupScores, answers.length),
    band: finalScore >= 76 ? 'green' : finalScore >= 56 ? 'amber' : 'red'
  };
}
