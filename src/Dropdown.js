import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Dropdown extends Component {
    state = {
        isVisible: false,
        selected: {},
        hasError: false,
        search: this.props.children,
        result: {}
    }

    static defaultProps = {
        className: 'dropdown',
        children: [],
        isStored: false,
        filter: false
    }

    static getDerivedStateFromError (error) {
        return { hasError: true }
    }

    static getDerivedStateFromProps(props, state) {
        // console.log('current selection', state.selected)
        return null
    }

    componentDidMount() {
        this.setState({ result: this.state.search })
        document.addEventListener('click', this.handleClickOutside)
    }
    
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
    }

    setWrapperRef = node => {
        this.wrapperRef = node
    }

    setSelectedData = async (ev, data) => {
        ev.persist()
        await this.setState({ selected: data })
    }

    toggleDropdown = async () => {
        await this.setState((state, props) => ({
            isVisible: state.isVisible = !state.isVisible
        }))
    }

    handleClickOutside = async event => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            await this.setState({ isVisible: false })
        }
    }

    filterList = async event => {
        let updatedList = this.state.search

        updatedList = await updatedList.filter(item => {
            return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1
        })

        await this.setState({ result: updatedList })
    }

    render () {
        const { selected, hasError, isVisible, result } = this.state
        const { className, children, filter } = this.props

        if (hasError) {
            return <div className={`${className} ${className}-error`}></div>
        }

        return (
            <div ref={this.setWrapperRef} className={`${className}`}>
                <button type="button"
                    className={`${className}-button`}
                    onClick={() => this.toggleDropdown()}>
                    {selected.label ? selected.label : 'Select Item'}
                </button>

                {filter ? 
                    <input type="text"
                        className={`${className}-filter`}
                        name={`${className}-filter`}
                        id={`${className}-filter`}
                        onChange={e => this.filterList()}/>
                : null}

                {result ? '' : ''}

                {isVisible && children.length ?
                <ul className={`${className}-list`}>
                    {children.length ? children.map((child, i) => {
                        return <li
                            key={i}
                            className={`${className}-list--item`}
                            onClick={e => {
                                this.props.onClick(e, child)
                                this.setSelectedData(e, child)
                            }}>
                                {child.label}
                            </li>
                    }) : ''}
                </ul>
                : ''}
            </div>
        )
    }
}

Dropdown.propTypes = {
    className: PropTypes.string,
    children: PropTypes.array,
    isStored: PropTypes.bool,
    filter: PropTypes.bool
}

export default Dropdown
