import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

export const LoadingComponent : React.FC<{inverted?:boolean , content?:string}> = ({inverted=true, content}) => (
    <Dimmer active inverted={inverted}>
        <Loader content={content} />
    </Dimmer>
)
