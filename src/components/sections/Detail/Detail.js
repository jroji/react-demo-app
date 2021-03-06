import React, { Component } from 'react';
import { ARTICLES_QUERY, ARTICLES_MUTATION } from './../../../queries';
import { connect } from 'react-redux';
import request from './../../../request';
import { fetchArticles } from './../../../stateManagement/thunks/Articles.thunks';

import './Detail.css';

class Detail extends Component {
	// definition
	constructor(props) {
		super(props);
		this.state = {
			article: {},
		}
	}

	// lifecycle
	componentWillMount() {
		this.delete = this.delete.bind(this);
    if (this.props.id) {
      request(ARTICLES_QUERY.One(this.props.id)).then(response => {
        this.setState({ article: response.data.article });
      });
    }
	}

  /**
	 * Request the articles and dispatch to store
   */
	delete() {
		request(ARTICLES_MUTATION.Remove(this.props.id)).then(response => {
			this.props.fetchArticles();
		});
	}

	// Renders
	render() {
		return (
			<section className="Detail">
				<div className="Detail__header">
					<h1>{this.state.article.author}</h1>
					<button className="Detail__trash" onClick={this.delete}><img alt="delete" className="Detail__icon" src="http://icon-icons.com/icons2/868/PNG/512/trash_bin_icon-icons.com_67981.png" /></button>
				</div>
				<pre>{this.state.article.title}</pre>
				<p className="Detail__content">{this.state.article.content}</p>
				<div>{this.state.article.tags ? this.state.article.tags.map((el, index) => <span key={index} className="Detail__tag">{el}</span>) : null}
				</div>
			</section>
		);
	}
}

let mapDispatchToProps = dispatch => ({
	fetchArticles: (articles) => dispatch(fetchArticles(true))
});

export default connect(
	null, mapDispatchToProps
)(Detail)

