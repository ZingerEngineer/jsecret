import { signOut } from 'next-auth/react'
interface navigationItem {
  name: string
  href: string
  current: boolean
}
interface profileDropDownItem {
  label: string
  href?: string
  functionality?: () => void
  type: 'link' | 'button'
}

const doSignOut = () => {
  signOut({
    redirect: true,
    callbackUrl: '/'
  })
}

const navigationList: navigationItem[] = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Team', href: '/user/team', current: false },
  { name: 'Projects', href: '/user/project', current: false }
]

const profileDropdownList: profileDropDownItem[] = [
  { label: 'Your Profile', href: '#', type: 'link' },
  { label: 'Settings', href: '#', type: 'link' },
  { label: 'Sign out', type: 'button', functionality: () => doSignOut() }
]
export { navigationList, profileDropdownList }
