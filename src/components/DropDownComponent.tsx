import { TProject } from '@/services/db/schemas/project.schema'
import { TTeam } from '@/services/db/schemas/team.schema'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { getUserProjects } from '@/app/dashboard/api/getUserProjects'
import { getUserTeams } from '@/app/dashboard/api/getUserTeams'
// Define the props interface
interface DropDownProps {
  itemsList: TTeam[] | TProject[]
  onSelect: (item: string) => void
}

// Correctly define and destructure props in the component
export default function DropDown({ itemsList, onSelect }: DropDownProps) {
  const [selectedItem, setSelectedItem] = useState<string>('Roaming')

  const handleSelect = (newValue: string) => {
    setSelectedItem(newValue)
    onSelect(newValue)
  }
  let dropDownItems = ['Roaming', ...itemsList.map((item) => item.name)]

  return (
    <>
      {dropDownItems ? (
        <Menu
          as="div"
          className="relative inline-block w-full"
        >
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              {selectedItem || 'Roaming'}
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 h-5 w-5 text-gray-400"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
          >
            <div className="py-1">
              {dropDownItems.map((item) => (
                <MenuItem key={item}>
                  <button
                    onClick={() => handleSelect(item)}
                    className="w-full flex justify-start px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900"
                  >
                    {item}
                  </button>
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Menu>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}
