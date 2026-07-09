// kaesra/team-agent.ts
// Multi-agent team orchestration — leader + workers pattern
// Users define a team, assign roles, and the leader distributes work.

import type { Plugin, Hooks } from "../index"

export interface TeamConfig {
  name: string
  leader: {
    name: string
    role: string
    model?: string
  }
  workers: Array<{
    name: string
    role: string
    model?: string
    specialty: string
  }>
}

const TEAM_SYSTEM_PROMPT = `
## 🤖 Team Orchestration Mode

You are the TEAM LEADER. You have a team of specialized workers at your disposal.
Your job:

1. **Understand the goal** — what does the user want to achieve?
2. **Decompose** — break it down into independent tasks
3. **Delegate** — use the \`task\` tool to assign work to the right worker
4. **Aggregate** — collect results and combine them
5. **Deliver** — present the final output

Available workers and their specialties:
{{WORKERS}}

How to delegate:
- Use \`task\` with \`subagent_type\` set to the worker's name
- Give each worker a clear, self-contained prompt
- Run independent tasks in parallel (background=true)
- Wait for results before aggregating
- Ask follow-up questions if a worker's output is unclear

Remember: you don't do the work yourself. You orchestrate.
`.trim()

export function TeamAgent(team: TeamConfig): Plugin {
  return async (_input) => {
    const workerDescriptions = team.workers
      .map((w) => `- **${w.name}** (${w.specialty}): ${w.role}`)
      .join("\n")

    const hooks: Hooks = {
      "experimental.chat.system.transform": async (_input, output) => {
        const teamPrompt = TEAM_SYSTEM_PROMPT.replace("{{WORKERS}}", workerDescriptions)
        output.system = [teamPrompt, ...output.system]
      },
      "chat.message": async (input, output) => {
        // Auto-set the team context on first message
        if (input.agent === team.leader.name) {
          // Inject team awareness
          const parts = output.parts
          if (parts.length > 0 && parts[0].type === "text") {
            // Don't modify — just let the system prompt do the work
          }
        }
      },
    }
    return hooks
  }
}

/**
 * Pre-defined team templates
 */
export const TeamTemplates = {
  /**
   * Full-stack development team
   */
  fullstack: (): TeamConfig => ({
    name: "fullstack",
    leader: { name: "lead", role: "Tech Lead — orchestrates the team, reviews code, makes architectural decisions" },
    workers: [
      { name: "frontend", role: "Frontend specialist — React, CSS, UI/UX", specialty: "React/TypeScript/CSS" },
      { name: "backend", role: "Backend specialist — APIs, databases, auth", specialty: "Node.js/Python/SQL" },
      { name: "devops", role: "DevOps specialist — CI/CD, Docker, deployment", specialty: "Docker/GitHub Actions/AWS" },
      { name: "tester", role: "QA specialist — writes tests, finds bugs", specialty: "Jest/Vitest/Playwright" },
    ],
  }),

  /**
   * Research + code team
   */
  research: (): TeamConfig => ({
    name: "research",
    leader: { name: "lead", role: "Research Lead — synthesizes findings, makes recommendations" },
    workers: [
      { name: "researcher", role: "Deep research — reads docs, searches web, analyzes codebases", specialty: "Web search/Documentation/Code analysis" },
      { name: "implementer", role: "Implementation — writes production code based on research", specialty: "TypeScript/Python/Go" },
      { name: "reviewer", role: "Code reviewer — finds bugs, security issues, style problems", specialty: "Security/Performance/Code quality" },
    ],
  }),

  /**
   * Solo + review team (lightweight)
   */
  duo: (): TeamConfig => ({
    name: "duo",
    leader: { name: "lead", role: "Primary developer — does the main work" },
    workers: [
      { name: "reviewer", role: "Reviews all changes for bugs, security, and style", specialty: "Code review/Security/Testing" },
    ],
  }),
}
