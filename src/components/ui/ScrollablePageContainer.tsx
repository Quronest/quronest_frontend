import { ReactNode } from 'react'
import { ScrollArea } from './ScrollArea'

function ScrollablePageContainer({children}:{children:ReactNode}) {
  return (
    <ScrollArea className="h-screen mx-auto">
        {children}
    </ScrollArea>
  )
}

export default ScrollablePageContainer