import {withRouter} from 'react-router-dom'
import React  from 'react'

// Componente para regresar a la posicion 0,0 en cada página 
class ScrollToTop extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }
    render() {
        return this.props.children
    }
}

export default withRouter(ScrollToTop)