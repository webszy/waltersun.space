export type ProjectStatus
  = | 'active'
    | 'in-development'
    | 'paused'
    | 'archived'
    | 'concept'

export interface Project {
  name: string
  description: string
  /**
   * Project homepage / product URL.
   * When set, Projects page shows a “Visit” link that opens this URL.
   */
  url?: string
  status?: ProjectStatus
  order?: number
  tags?: string[]
}

/** Display labels for project status badges */
export const projectStatusLabel: Record<ProjectStatus, string> = {
  'active': 'Active',
  'in-development': 'In development',
  'paused': 'Paused',
  'archived': 'Archived',
  'concept': 'Concept',
}

/**
 * Maintainable project list for homepage + /projects.
 * Add or edit entries here — no content collection required for V1.
 *
 * Set `url` to enable the project link on the Projects page (and homepage cards).
 */
export const projects: Project[] = [
  {
    name: 'iapStats',
    description: 'Mobile monetization and acquisition analytics.',
    // url: 'https://example.com',
    status: 'in-development',
    order: 1,
    tags: ['Mobile', 'Analytics', 'Monetization'],
  },
  {
    name: 'Codetoken.Cloud',
    description: 'An OpenAI-compatible AI API gateway for Codex, Claude, and multi-model workflows.',
    url: 'https://codetoken.cloud',
    status: 'active',
    order: 2,
    tags: ['AI', 'API Gateway', 'Developer Tools'],
  },
  {
    name: 'DeepCheck',
    description: 'A web-based public information analysis tool.',
    url: 'https://deepcheck.dev',
    status: 'active',
    order: 3,
    tags: ['Web', 'Product'],
  },
  {
    name: 'ParseAny.link',
    description: 'A web-based public information analysis tool.',
    url: 'https://parseany.link',
    status: 'active',
    order: 4,
    tags: ['Web', 'Product'],
  },
]

export function getProjects(): Project[] {
  return [...projects].sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

export function getProjectStatusLabel(status: ProjectStatus): string {
  return projectStatusLabel[status]
}
