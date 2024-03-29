import { Menu, Transition } from '@headlessui/react'
import Button, { ButtonProps } from './Button'
import { Fragment } from 'react'

interface DropdownProps extends ButtonProps {
  title?: string
  onClick?: () => void
}

export const Dropdown = (props: DropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className={props.className} as={Button} icon={props.icon}>
        {props.title}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute  p-1 right-2 mt-2 w-56 origin-top-right divide-y z-40 divide-gray-100 rounded-md bg-dark border border-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">{props.children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export const DropdownItem = (props: DropdownProps) => {
  return (
    <Menu.Item>
      <div
        className={`cursor-pointer block justify-between roundedtext-stone-200 px-3 py-2 text-sm hover:bg-midnightLight duration-200
        ${props.className}`}
        onClick={props.onClick}
      >
        <div className="flex items-center">
          {props.icon && <div className="mr-3">{props.icon}</div>}
          {props.children}
        </div>
      </div>
    </Menu.Item>
  )
}
