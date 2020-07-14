import CMS from "netlify-cms-app"
import PropTypes from 'prop-types';
import React from 'react';

class Control extends React.Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        forID: PropTypes.string,
        value: PropTypes.node,
        classNameWrapper: PropTypes.string.isRequired,
    }

    static defaultProps = {
        value: '',
    }

    render() {
        const {
            forID,
            value,
            onChange,
            classNameWrapper,
        } = this.props;

        return (
            <input
                type="color"
                id={forID}
                className={classNameWrapper}
                value={value || ''}
                onChange={e => onChange(e.target.value)}
                style={{ height: "75px" }}
            />
        );
    }
}

CMS.registerWidget("color", Control)