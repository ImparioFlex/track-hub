export type Role = 'director' | 'parent' | 'volunteer' | 'vendor'

interface RoleSwitcherProps {
  current: Role
  onChange: (role: Role) => void
}

const roles: { id: Role; label: string; icon: string }[] = [
  { id: 'director', label: 'Director', icon: '📋' },
  { id: 'parent', label: 'Parent', icon: '👨‍👩‍👧' },
  { id: 'volunteer', label: 'Volunteer', icon: '🙋' },
  { id: 'vendor', label: 'Vendors', icon: '🏪' },
]

export function RoleSwitcher({ current, onChange }: RoleSwitcherProps) {
  return (
    <div className="flex gap-1.5 bg-sand-100 p-1 rounded-xl">
      {roles.map((role) => (
        <button
          key={role.id}
          onClick={() => onChange(role.id)}
          className={`
            flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200
            ${current === role.id
              ? 'bg-white text-sand-950 shadow-sm'
              : 'text-sand-500 hover:text-sand-700'}
          `}
        >
          <span className="text-base">{role.icon}</span>
          <span className="hidden min-[380px]:inline">{role.label}</span>
        </button>
      ))}
    </div>
  )
}
