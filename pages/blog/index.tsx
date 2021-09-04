import data from "../../blog.json";
export default function BlogPage({ post, morePosts, preview }) {
	return (
		<>
			<h1>Blog</h1>
			<p>{JSON.stringify(data, null, 4)}</p>
		</>
	)
}