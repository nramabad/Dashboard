import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchEmail, fetchDomain } from "../actions/pwned_actions";

class Pwned extends React.Component {
    componentDidMount() {
        let { query, queryType } = this.props

        // check for which HaveIBeenPwned API to use
        switch (queryType) {
            case "EMAIL":
                this.props.fetchEmail(query);
                break;
            case "DOMAIN":
                if (query.includes(".")) {
                    query = query.split(".").slice(-2, -1);
                }
                this.props.fetchDomain(query);
                break;
            default:
                break;
        }
    }

    componentDidUpdate(prevProps) {
        let { query, queryType } = this.props
        if ( query !== prevProps.query ) {
            switch (queryType) {
                case "EMAIL":
                    this.props.fetchEmail(query);
                    break;
                case "DOMAIN":
                    if (query.includes(".")) {
                        query = query.split(".").slice(-2, -1);
                    }
                    this.props.fetchDomain(query);
                    break;
                default: 
                    break;
            }
        }
    }

    render() {
        const { queryType } = this.props;
        
        if (this.props === undefined) {
            return <div className="small-show">Loading...</div>;
        } else if (this.props[queryType.toLowerCase()] === null) {
            return <div className="small-show">Nothing to show...</div>;
        } else if (Array.isArray(this.props[queryType.toLowerCase()])) {
            return (
                <section className="pwned">
                    <ul>
                        {this.props[queryType.toLowerCase()].map((site, idx) => (
                            <li key={idx}>{site}</li>
                        ))}
                    </ul>
                </section>
            );
        }
        const toHTML = `<section className='pwned' >
                            ${this.props[queryType.toLowerCase()].Description}
                        </section>`;
                        
        return (<span id="embedded-html" dangerouslySetInnerHTML={{ __html: toHTML }} />);
    }
}

const mapStateToProps = state => {
    return {
        email: state.entities.pwned.email,
        domain: state.entities.pwned.domain
    };
};

const mapDispatchToProps = dispatch => ({
    fetchDomain: domain => dispatch(fetchDomain(domain)),
    fetchEmail: email => dispatch(fetchEmail(email))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Pwned)
);