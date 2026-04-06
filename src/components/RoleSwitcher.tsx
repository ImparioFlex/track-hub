import { ClipboardList, Users, HandHelping, Store } from 'lucide-react'

export type Role = 'director' | 'parent' | 'volunteer' | 'vendor'

interface RoleSwitcherProps {
  current: Role
  onChange: (role: Role) => void
}

const roles: { id: Role; label: string }[] = [
  { id: 'director', label: 'Director' },
  { id: 'parent', label: 'Parent' },
  { id: 'volunteer', label: 'Volunteer' },
  { id: 'vendor', label: 'Vendors' },
]

const roleIcons: Record<Role, React.ReactNode> = {
  director: <ClipboardList size={16} />,
  parent: <Users size={16} />,
  volunteer: <HandHelping size={16} />,
  vendor: <Store size={16} />,
}

export function RoleSwitcher({ current, onChange }: RoleSwitcherProps) {
  return (
    <div className="flex gap-1.5 bg-sand-100 p-1 rounded-lg">
      {roles.map((role) => (
        <button
          key={role.id}
          onClick={() => onChange(role.id)}
          className={`
            flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-md text-[13px] font-semibold transition-all duration-200
            ${current === role.id
              ? 'bg-white text-sand-950 shadow-sm'
              : 'text-sand-500 hover:text-sand-700'}
          `}
        >
          {roleIcons[role.id]}
          <span className="hidden min-[380px]:inline">{role.label}</span>
        </button>
      ))}
    </div>
  )
}
