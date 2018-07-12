import React ,{ Component} from 'react';


export default class Input extends Component {
    render() {
        const { name, type , value, onChange, label } = this.props;
        // const { name, type = 'text', value, onChange, label } = this.props;
        return (
            <div>
                <label htmlFor={name}>{label}</label>
                {/* <label htmlFor="new-email">{label} </label> */}
                <input
                    onChange={onChange}
                    name={name}
                    id={name}
                    type={type}
                    value={value} />
            </div>
        );
    }
}