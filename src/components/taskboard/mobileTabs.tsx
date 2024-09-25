import React from 'react';
import { Status } from '@/types';


interface MobileTabsProps {
  setActiveColumn: React.Dispatch<React.SetStateAction<Status>>
  activeColumn: Status
}

const MobileTabs = ({ setActiveColumn, activeColumn } : MobileTabsProps) => {

  type Tabs = {
    name: string
    status: Status,
  }

  const tabs:Tabs[] = [
    {name: 'To do', status: 'todo'},
    {name: 'In Progress', status: 'inProgress'},
    {name: 'Done', status: 'done'},
  ]

  const tabsColor = {
    todo: 'text-red-600 dark:text-red-400',
    inProgress: 'text-yellow-600 dark:text-yellow-400',
    done: 'text-green-600 dark:text-green-400'
  }

  return (
<div className='inline-flex h-11 items-center justify-center rounded-md bg-neutral-200/70 dark:bg-neutral-900/25 p-1 text-muted-foreground'>
    {tabs.map(tab => {
      const status = tab.status
      const active = status === activeColumn

        return <button
                key={status}
                onClick={() => setActiveColumn(status)}
                data-state={active}
                className={`flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=true]:bg-background data-[state=true]:shadow-md ${active && tabsColor[status]}`}>
                {tab.name}
              </button>
      })}
</div>
  );
};

export default MobileTabs;