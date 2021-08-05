import React from "react";

function Pagination() {
	return (
		<nav aria-label="Page navigation pagination">
			<ul className="pagination justify-content-center">
				<li className="page-item ">
					<a className="page-link text-dark" href="/" tabIndex="-1">
						Previous
					</a>
				</li>
				<li className="page-item">
					<a className="page-link  text-dark" href="/">
						1
					</a>
				</li>
				<li className="page-item">
					<a className="page-link text-dark" href="/">
						2
					</a>
				</li>
				<li className="page-item">
					<a className="page-link text-dark" href="/">
						3
					</a>
				</li>
				<li className="page-item">
					<a className="page-link text-dark" href="/">
						Next
					</a>
				</li>
			</ul>
		</nav>
	);
}

export default Pagination;
