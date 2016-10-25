import { AppRegistry } from 'react-native'
import Spoors from './App'

// App registration and rendering on web.
AppRegistry.registerComponent('Spoors', () => Spoors)
AppRegistry.runApplication('Spoors', { rootTag: document.getElementById('root') })