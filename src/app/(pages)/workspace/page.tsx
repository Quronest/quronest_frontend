import { Screen } from '@/components/modules/workspace/Screen'
import { mockTabs } from '@/types/TabRefDataType'
import React from 'react'

const WorkSpacePage = () => {
  return (
    <Screen defaultTabList={mockTabs} defaultActiveTab={mockTabs[2]} id='left'/>
  )
}

export default WorkSpacePage
