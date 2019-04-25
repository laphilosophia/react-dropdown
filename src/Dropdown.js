import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Dropdown.scss'

class Dropdown extends Component {
    state = {
        isVisible: false,
        selected: {},
        hasError: false,
        search: this.props.children,
        result: {}
    }

    static defaultProps = {
        children: [],
        isStored: false,
        storeKey: 'dropdown-selected',
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
        const { storeKey } = this.props
        const stored = localStorage.getItem(storeKey)

        this.setState({
            result: this.state.search,
            selected: JSON.parse(stored) || {}
        })
        document.addEventListener('click', this.handleClickOutside)
    }
    
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
    }

    setWrapperRef = node => {
        this.wrapperRef = node
    }

    isEmpty = obj => {
        for (const key in obj) {
            if(obj.hasOwnProperty(key))
                return false
        }
    
        return true
    }

    setSelectedData = async (ev, data) => {
        const { isStored, storeKey } = this.props

        ev.persist()

        await this.setState({
            selected: data,
            result: this.props.children,
            isVisible: false
        })

        if (isStored) {
            await localStorage.setItem(storeKey, JSON.stringify(data))
        }
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
        this.setState({ result: this.props.children })

        let updatedList = this.state.search

        updatedList = await updatedList.filter(item => {
            return JSON.stringify(item).toLowerCase().search(event.target.value.toLowerCase()) !== -1
        })

        await this.setState({ result: updatedList })
    }

    clearFilter = () => this.setState({ selected: {} })

    render () {
        const { selected, hasError, isVisible, result } = this.state
        const { filter } = this.props

        if (hasError) {
            return (
                <div className="dropdown">
                    <span className="dropdown-error"></span>
                </div>
            )
        }

        return (
            <React.Fragment>
            <div ref={this.setWrapperRef} className="dropdown">
                <button type="button"
                    className={`dropdown-placeholder ${isVisible ? 'is-visible' : ''}`}
                    onClick={() => this.toggleDropdown()}>
                    {selected.label ? selected.label : 'Select Item'}
                </button>

                {result.length ?
                    <nav className={`dropdown-menu ${isVisible ? 'is-visible' : ''}`}>
                        {filter ? 
                            <React.Fragment>
                                <input type="text"
                                    className="dropdown-input"
                                    name="dropdown-input"
                                    id="dropdown-input"
                                    placeholder="Filter..."
                                    defaultValue={selected.label}
                                    onChange={e => this.filterList(e)}/>

                                {this.isEmpty(selected) ? '' : <i onClick={this.clearFilter}>x</i>}
                            </React.Fragment>
                        : null}
                        <div className="dropdown-list">
                            <ul>
                                {result.length ? result.map((item, i) =>
                                    <li
                                        key={i}
                                        className="dropdown-list--item"
                                        onClick={e => {
                                            this.props.onClick(e, item)
                                            this.setSelectedData(e, item)
                                        }}>
                                            {item.label}
                                        </li>
                                ) : ''}
                            </ul>
                        </div>
                    </nav>
                : ''}
            </div>
            {selected ? <p className="dropdown-result" data-value={selected.value}>{selected.label}</p> : ''}
            </React.Fragment>
        )
    }
}

Dropdown.propTypes = {
    children: PropTypes.array,
    isStored: PropTypes.bool,
    storeKey: PropTypes.string,
    filter: PropTypes.bool
}

export default Dropdown
