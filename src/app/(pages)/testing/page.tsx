import Button from '@/components/ui/button'
import React from 'react'

const TestingPage = () => {
    return (
        <div className='flex items-center justify-center gap-5 h-screen'>
            <Button>
                test Button
            </Button>
            <Button variant='outline'>
                outline
            </Button>
        </div>
    )
}

export default TestingPage
