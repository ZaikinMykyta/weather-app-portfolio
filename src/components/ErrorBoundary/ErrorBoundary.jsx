import {Component} from 'react'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

class ErrorBoundary extends Component {
    state = {
        error:false
    }

    componentDidCatch(err, errInfo) {
        console.log(err, errInfo);
        this.setState({
            error:true
        })
    }

    render() {
        if(this.state.error) {
            console.log(this.state.error)
            return <ErrorMessage/>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;