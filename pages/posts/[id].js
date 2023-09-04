import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

//return an array of possible values for id
export async function getStaticPaths() {
  const paths = getAllPostIds();
  //paths array looks like this
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return {
    paths,
    fallback: false,
  };
}

//will receive the sent params from getStaticPaths
export async function getStaticProps({ params }) {
  //******* conclusion - the dynamic id parameter is sent to the getStasticProps function  ****/

  //take the id from params and get the post data
  const postData = await getPostData(params.id);

  //the returned props from here will be sent to the Post component props
  return {
    props: {
      postData,
    },
  };
}

export default function Post(props) {
  // console.log(props);
  const {postData} = props;
  
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
