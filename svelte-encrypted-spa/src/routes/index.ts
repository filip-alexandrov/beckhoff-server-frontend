import Live from './Live.svelte'
import Mariana from './Mariana.svelte'
import Everest from './Everest.svelte'
import Explore from './Explore.svelte'
import Visualization from './Visualization.svelte'
import Test from './Test.svelte'

const routes = {
    '/': Live,
    '/visualization': Visualization,
    '/explore': Explore,
    '/mariana': Mariana,
    '/everest': Everest,
    "/test": Test
}

export default routes
