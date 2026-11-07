'use client';

import { useState } from 'react';
import { techChips, safeUrl, shortUrl, isFeatured } from '../lib/format';

// Pick a project on the left, see its details on the right.
export default function Projects({ projects }) {
	const list = [...projects.filter(isFeatured), ...projects.filter((p) => !isFeatured(p))];
	const [sel, setSel] = useState(list[0]?.id);
	const cur = list.find((p) => p.id === sel) || list[0];

	if (!cur) return <div className="msg">No projects yet.</div>;

	return (
		<div className="pv">
			<div
				className="side"
				role="tablist"
				aria-label="Projects"
			>
				<div className="sh">projects/</div>
				{list.map((p) => (
					<button
						key={p.id}
						role="tab"
						aria-selected={p.id === cur.id}
						className={'pi' + (p.id === cur.id ? ' on' : '')}
						onClick={() => setSel(p.id)}
					>
						{p.title}
						{isFeatured(p) ? <b>★</b> : null}
					</button>
				))}
			</div>
			<div
				className="detail"
				key={cur.id}
			>
				<div className="dbar">
					<span className="dots">
						<i />
						<i />
						<i />
					</span>
					{cur.title}.md
				</div>
				<div className="db">
					<div className="lb">name</div>
					<h3>{cur.title}</h3>
					<div className="t">
						{techChips(cur.tech).map((t) => (
							<span key={t}>{t}</span>
						))}
					</div>
					<div className="lb">overview</div>
					<p>{cur.overview || cur.desc}</p>
					<div className="lb">links</div>
					<div className="l">
						{safeUrl(cur.github) && (
							<a
								href={safeUrl(cur.github)}
								target="_blank"
								rel="noopener noreferrer"
							>
								<span>repo</span>
								{shortUrl(cur.github)}
							</a>
						)}
						{safeUrl(cur.demo) && (
							<a
								href={safeUrl(cur.demo)}
								target="_blank"
								rel="noopener noreferrer"
							>
								<span>demo</span>
								{shortUrl(cur.demo)}
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
