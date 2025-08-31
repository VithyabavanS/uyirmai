import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import client from '../../../tina/__generated__/client'
import { useParams } from 'react-router-dom'
import React from 'react'

const BlogPostPage = () => {
  const { filename } = useParams()
  const [props, setProps] = React.useState(null)

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await client.queries.post({
        relativePath: `${filename}.md`,
      });
      setProps(res);
    };
    fetchData();
  }, [filename]);

  return props ? <SinglePost {...props} /> : <div>Loading...</div>;
}

const SinglePost = (props) => {
  const { data } = useTina(props)

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className='text-3xl m-8 text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
        {data.post.title}
      </h1>
      <div className='prose'>
        <TinaMarkdown content={data.post.body} />
      </div>
    </div>
  )
}

export default BlogPostPage
