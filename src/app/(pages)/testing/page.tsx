import SideNavBar from '@/components/sideNavBar'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import React from 'react'

const TestingPage = () => {
    return (
        <div className='h-screen flex'>
            <SideNavBar />
            <div className='flex items-center justify-center gap-5 h-full w-full'>
                <Button>
                    test Button
                </Button>
                <Button variant='outline'>
                    outline
                </Button>
                <Input className='max-w-xl' placeholder="test me"/>
            </div>
        </div>
    )
}

export default TestingPage
