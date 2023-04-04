import { Component } from "react";

class QuoteBox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: null,
			author: null,
		};
	}

	fetchQuoteData() {
		const url = 'https://api.quotable.io/random';

		fetch(url, { method: 'GET' })
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					console.error(`fetching failed: ${res.status}`);
				}
			})
			.then((data) => {
				this.setState((state) => {
					return {
						text: data.content,
						author: data.author,
					};
				});
			})
	}

	componentDidMount() {
		this.fetchQuoteData();
	}

	render() {
		return (
			<div id="quote-box" className="quote-box" aria-live="polite">
				<p id="text">{this.state.text}</p>
				<p id="author">{this.state.author}</p>

				<div className="actions">
					<a id="tweet-quote" href={`https://twitter.com/intent/tweet/?text=${this.state.text} &ndash; ${this.state.author}`} target="_blank" rel="noreferrer">Tweet this quote</a>
				<button id="new-quote" onClick={this.fetchQuoteData.bind(this)}>New quote</button>
				</div>
			</div>
		);
	}
}

export default QuoteBox;